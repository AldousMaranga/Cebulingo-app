// Lesson Gameplay Screen

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let questions = [];

function initQuizData() {
    questions = [
        {
            cebuano: 'Kumusta',
            english: 'Hello / How are you?',
            options: [
                { text: 'Hello', image: 'people greeting' },
                { text: 'Goodbye', image: 'people waving goodbye' },
                { text: 'Thank you', image: 'gratitude' },
                { text: 'Please', image: 'polite request' }
            ],
            correctIndex: 0
        },
        {
            cebuano: 'Salamat',
            english: 'Thank you',
            options: [
                { text: 'Hello', image: 'people greeting' },
                { text: 'Thank you', image: 'gratitude' },
                { text: 'Please', image: 'polite request' },
                { text: 'Goodbye', image: 'people waving goodbye' }
            ],
            correctIndex: 1
        },
        {
            cebuano: 'Palihug',
            english: 'Please',
            options: [
                { text: 'Thank you', image: 'gratitude' },
                { text: 'Yes', image: 'thumbs up' },
                { text: 'Please', image: 'polite request' },
                { text: 'No', image: 'thumbs down' }
            ],
            correctIndex: 2
        }
    ];
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
}

function renderLessonGameplay() {
    initQuizData();
    renderQuestion();
}

function renderQuestion() {
    const container = document.getElementById('content-container');
    const isMobile = AppState.isMobile;
    
    container.innerHTML = '';
    
    const screen = createElement('div', 'flex flex-col h-full');
    screen.style.backgroundColor = '#1C1C1C';
    
    // Header with progress
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    const header = createElement('div', `flex items-center gap-4 ${isMobile ? 'p-4' : 'p-6'}`);
    
    const closeBtn = createElement('button', 'btn-icon');
    closeBtn.innerHTML = '<i data-lucide="x" style="width: 20px; height: 20px; color: #6BB6FF;"></i>';
    closeBtn.onclick = () => {
        if (confirm('Are you sure you want to exit? Your progress will be lost.')) {
            navigateTo('dashboard');
        }
    };
    
    const progressContainer = createElement('div', 'flex-1');
    const progressBar = createElement('div', 'progress-bar');
    const progressFill = createElement('div', 'progress-bar-fill');
    progressFill.style.width = `${progress}%`;
    progressBar.appendChild(progressFill);
    progressContainer.appendChild(progressBar);
    
    header.appendChild(closeBtn);
    header.appendChild(progressContainer);
    screen.appendChild(header);
    
    // Question content
    const content = createElement('div', `flex-1 flex flex-col ${isMobile ? 'px-6 py-4' : 'px-12 py-8'}`);
    
    const question = questions[currentQuestionIndex];
    
    // Question text
    const questionText = createElement('div', 'text-center mb-8');
    const instruction = createElement('p', 'text-[#BEBEBE] mb-4');
    instruction.style.fontSize = isMobile ? '14px' : '16px';
    instruction.textContent = 'What does this mean?';
    
    const cebuanoWord = createElement('h1', 'text-white');
    cebuanoWord.style.fontSize = isMobile ? '32px' : '48px';
    cebuanoWord.style.fontWeight = '700';
    cebuanoWord.textContent = question.cebuano;
    
    questionText.appendChild(instruction);
    questionText.appendChild(cebuanoWord);
    content.appendChild(questionText);
    
    // Options grid
    const optionsGrid = createElement('div', `grid ${isMobile ? 'grid-2' : 'grid-2'} gap-4 flex-1 max-w-3xl mx-auto w-full`);
    
    question.options.forEach((option, index) => {
        const optionCard = createElement('div', 'image-card transition-all cursor-pointer');
        optionCard.style.height = isMobile ? '140px' : '180px';
        optionCard.style.backgroundColor = '#2A2A2A';
        optionCard.style.display = 'flex';
        optionCard.style.flexDirection = 'column';
        optionCard.style.alignItems = 'center';
        optionCard.style.justifyContent = 'center';
        optionCard.style.padding = '1rem';
        
        // Placeholder for image
        const imagePlaceholder = createElement('div', 'mb-3');
        imagePlaceholder.style.fontSize = '48px';
        imagePlaceholder.textContent = '🖼️';
        
        const label = createElement('p', 'text-white text-center');
        label.style.fontSize = isMobile ? '14px' : '16px';
        label.textContent = option.text;
        
        optionCard.appendChild(imagePlaceholder);
        optionCard.appendChild(label);
        
        optionCard.onclick = () => selectAnswer(index, optionCard);
        optionsGrid.appendChild(optionCard);
    });
    
    content.appendChild(optionsGrid);
    
    // Check button
    const buttonContainer = createElement('div', `w-full max-w-3xl mx-auto mt-6`);
    const checkBtn = createButton('CHECK', checkAnswer, 'primary', true);
    checkBtn.id = 'check-button';
    checkBtn.style.height = isMobile ? '56px' : '64px';
    checkBtn.disabled = true;
    checkBtn.style.opacity = '0.5';
    buttonContainer.appendChild(checkBtn);
    content.appendChild(buttonContainer);
    
    screen.appendChild(content);
    container.appendChild(screen);
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function selectAnswer(index, card) {
    // Remove previous selection
    document.querySelectorAll('.image-card').forEach(c => {
        c.style.boxShadow = '';
        c.classList.remove('selected');
    });
    
    // Select current
    card.style.boxShadow = '0 0 0 4px #1A73E8';
    card.classList.add('selected');
    selectedAnswer = index;
    
    // Enable check button
    const checkBtn = document.getElementById('check-button');
    checkBtn.disabled = false;
    checkBtn.style.opacity = '1';
}

function checkAnswer() {
    const question = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === question.correctIndex;
    
    // Visual feedback
    const cards = document.querySelectorAll('.image-card');
    if (isCorrect) {
        cards[selectedAnswer].style.boxShadow = '0 0 0 4px #10B981';
        SoundEffects.playCorrect();
        score++;
        
        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                renderQuestion();
            } else {
                navigateTo('lesson-complete');
            }
        }, 1500);
    } else {
        cards[selectedAnswer].style.boxShadow = '0 0 0 4px #EF4444';
        cards[question.correctIndex].style.boxShadow = '0 0 0 4px #10B981';
        SoundEffects.playIncorrect();
        
        setTimeout(() => {
            // Show correct answer and continue
            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                renderQuestion();
            } else {
                navigateTo('lesson-complete');
            }
        }, 2000);
    }
    
    // Disable check button
    const checkBtn = document.getElementById('check-button');
    checkBtn.disabled = true;
    checkBtn.style.opacity = '0.5';
}
