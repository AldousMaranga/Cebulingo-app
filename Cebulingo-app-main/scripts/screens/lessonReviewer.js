// Lesson Reviewer Screen

function renderLessonReviewer() {
    const container = document.getElementById('content-container');
    const isMobile = AppState.isMobile;
    
    const screen = createElement('div', 'flex flex-col h-full');
    screen.style.backgroundColor = '#1C1C1C';
    
    // Header
    const header = createProgressHeader(30, navigateBack);
    screen.appendChild(header);
    
    // Content
    const content = createElement('div', `flex-1 flex flex-col ${isMobile ? 'px-8 py-6' : 'px-16 py-8'}`);
    
    // Title
    const title = createElement('h2', 'text-white text-center mb-8');
    title.style.fontSize = isMobile ? '24px' : '32px';
    title.textContent = 'Review These Words';
    
    content.appendChild(title);
    
    // Review cards
    const reviewData = [
        { cebuano: 'Kumusta', english: 'Hello / How are you?' },
        { cebuano: 'Salamat', english: 'Thank you' },
        { cebuano: 'Palihug', english: 'Please' },
        { cebuano: 'Oo', english: 'Yes' },
        { cebuano: 'Dili', english: 'No' }
    ];
    
    const cardsContainer = createElement('div', `space-y-4 flex-1 overflow-y-auto ${isMobile ? 'max-w-md' : 'max-w-2xl'} mx-auto w-full`);
    
    reviewData.forEach(item => {
        const card = createElement('div', 'card p-6 flex items-center justify-between');
        
        const leftSide = createElement('div', '');
        const cebuanoText = createElement('p', 'text-white mb-1');
        cebuanoText.style.fontSize = isMobile ? '20px' : '24px';
        cebuanoText.style.fontWeight = '600';
        cebuanoText.textContent = item.cebuano;
        
        const englishText = createElement('p', 'text-[#BEBEBE]');
        englishText.style.fontSize = isMobile ? '14px' : '16px';
        englishText.textContent = item.english;
        
        leftSide.appendChild(cebuanoText);
        leftSide.appendChild(englishText);
        
        const speakerBtn = createElement('button', 'btn-icon');
        speakerBtn.innerHTML = '<i data-lucide="volume-2" style="width: 24px; height: 24px; color: #6BB6FF;"></i>';
        speakerBtn.onclick = () => TTS.speak(item.cebuano, 'fil-PH');
        
        card.appendChild(leftSide);
        card.appendChild(speakerBtn);
        cardsContainer.appendChild(card);
    });
    
    content.appendChild(cardsContainer);
    
    // Continue button
    const buttonContainer = createElement('div', `w-full ${isMobile ? 'max-w-md' : 'max-w-2xl'} mx-auto mt-6`);
    const continueBtn = createButton('CONTINUE TO QUIZ', () => navigateTo('lesson-gameplay'), 'primary', true);
    continueBtn.style.height = isMobile ? '56px' : '64px';
    buttonContainer.appendChild(continueBtn);
    content.appendChild(buttonContainer);
    
    screen.appendChild(content);
    container.appendChild(screen);
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}
