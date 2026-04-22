const http = require('http');
const OpenAI = require('openai');

const port = Number(process.env.OPENAI_RECOMMENDATION_PORT || 8787);
const model = process.env.OPENAI_RECOMMENDATION_MODEL || 'gpt-5.2';
const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
    console.error('OPENAI_API_KEY is required to run the recommendation server.');
    process.exit(1);
}

const client = new OpenAI({ apiKey });

function sendJson(response, statusCode, payload) {
    response.writeHead(statusCode, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    });
    response.end(JSON.stringify(payload));
}

function readRequestBody(request) {
    return new Promise((resolve, reject) => {
        let body = '';

        request.on('data', (chunk) => {
            body += chunk.toString();
            if (body.length > 100_000) {
                reject(new Error('Request body too large.'));
                request.destroy();
            }
        });

        request.on('end', () => resolve(body));
        request.on('error', reject);
    });
}

function buildPrompt(payload) {
    return JSON.stringify({
        question_text: payload.questionText || '',
        prompt_text: payload.promptText || '',
        correct_answer: payload.correctAnswer || '',
        user_answer: payload.userAnswer || '',
        choices: Array.isArray(payload.choices) ? payload.choices : [],
        is_correct: Boolean(payload.isCorrect),
        attempts_used: Number(payload.attemptsUsed || 0),
        attempts_remaining: Number(payload.attemptsRemaining || 0),
        reveal_answer: Boolean(payload.revealAnswer),
        difficulty: payload.difficulty || '',
        lesson_type: payload.lessonType || '',
        question_type: payload.questionType || '',
        has_image: Boolean(payload.hasImage)
    }, null, 2);
}

async function generateRecommendation(payload) {
    const response = await client.responses.create({
        model,
        reasoning: { effort: 'low' },
        instructions: [
            'You write micro-feedback for a Cebuano learning quiz.',
            'Return JSON only with keys: message and tone.',
            'Tone must be one of: success, warning.',
            'If correct, write one short encouraging line of 5 to 14 words.',
            'If incorrect, write 1 to 2 short sentences, practical and friendly.',
            'Vary wording naturally so repeated answers do not sound identical.',
            'Do not reveal the correct answer unless reveal_answer is true.',
            'When reveal_answer is false, give an indirect clue that leads toward the answer without saying it.',
            'For every incorrect response, include at least one concrete clue about the correct answer.',
            'Prefer semantic clues when possible, such as category, common use, place, behavior, association, or function.',
            'Do not give generic advice by itself, such as "read the clue again" or "look more carefully", unless it is paired with a specific clue.',
            'Choose clues that are helpful but not too obvious: specific enough to guide, not specific enough to directly reveal.',
            'If the answer is an animal, prefer clues like habitat, role, food, sound, or use, instead of broad labels alone.',
            'If the answer is an object, prefer clues like purpose, location, material, or a visible trait.',
            'If the answer is food, prefer clues like taste, where it is commonly eaten, ingredient type, or when people eat it.',
            'If choices are available, use them to hint at the distinguishing trait that separates the correct answer from the wrong ones.',
            'Example: if the answer is pig, a good clue could be that it is a farm animal or a commonly eaten meat.',
            'Do not use the answer word, obvious synonyms, translations, or near-spellings when reveal_answer is false.',
            'When helpful, use the available choices to make the clue more specific.',
            'Make the hint match the question type.',
            'For image questions, point the learner back to visible features in the picture.',
            'For spelling questions, prefer hints about letter count, starting sound, or spelling pattern.',
            'For pronunciation questions, prefer hints about rhythm, syllables, or saying the word more slowly.',
            'For phrase typing or phrase pronunciation, prefer hints about word order, number of words, or the main keyword in the clue.',
            'For regular multiple-choice text questions, guide the learner to the exact clue meaning, not just the category.',
            'When reveal_answer is true, you may briefly state the correct answer because the app is about to move on.',
            'If attempts_remaining is more than 0, encourage another try.',
            'If attempts_remaining is 0, briefly close the feedback because the app will move on.',
            'Avoid emojis, quotation marks unless needed, and avoid sounding robotic.'
        ].join(' '),
        input: `Quiz context:\n${buildPrompt(payload)}`,
        text: {
            format: {
                type: 'json_schema',
                name: 'quiz_feedback',
                schema: {
                    type: 'object',
                    additionalProperties: false,
                    properties: {
                        message: { type: 'string' },
                        tone: { type: 'string', enum: ['success', 'warning'] }
                    },
                    required: ['message', 'tone']
                }
            }
        }
    });

    const outputText = response.output_text || '{}';
    return JSON.parse(outputText);
}

const server = http.createServer(async (request, response) => {
    if (request.method === 'OPTIONS') {
        response.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        response.end();
        return;
    }

    if (request.method !== 'POST' || request.url !== '/api/recommendation') {
        sendJson(response, 404, { error: 'Not found' });
        return;
    }

    try {
        const rawBody = await readRequestBody(request);
        const payload = rawBody ? JSON.parse(rawBody) : {};
        const recommendation = await generateRecommendation(payload);
        sendJson(response, 200, recommendation);
    } catch (error) {
        console.error('Recommendation generation failed.', error);
        sendJson(response, 500, {
            error: 'Recommendation generation failed.'
        });
    }
});

server.listen(port, () => {
    console.log(`OpenAI recommendation server listening on http://localhost:${port}/api/recommendation`);
});
