// Lesson Start Screen

function renderLessonStart() {
    const container = document.getElementById('content-container');
    const isMobile = AppState.isMobile;
    
    const screen = createElement('div', 'flex flex-col h-full items-center justify-center');
    screen.style.backgroundColor = '#1C1C1C';
    
    const content = createElement('div', `${isMobile ? 'px-8' : 'px-16'} text-center space-y-8`);
    
    // Cow mascot
    const cowContainer = createElement('div', 'animate-float mb-6');
    cowContainer.appendChild(createCowMascot(isMobile ? 140 : 180, true, 'encouraging'));
    content.appendChild(cowContainer);
    
    // Title
    const title = createElement('h1', 'text-white mb-4');
    title.style.fontSize = isMobile ? '28px' : '36px';
    title.textContent = 'Lesson: Basic Greetings';
    
    // Description
    const description = createElement('p', 'text-[#BEBEBE] max-w-md mx-auto');
    description.style.fontSize = isMobile ? '16px' : '18px';
    description.textContent = 'Learn essential Cebuano greetings to start conversations confidently!';
    
    content.appendChild(title);
    content.appendChild(description);
    
    // Buttons
    const buttonContainer = createElement('div', `w-full max-w-md mx-auto space-y-3 mt-8`);
    
    const startBtn = createButton('START LESSON', () => navigateTo('lesson-reviewer'), 'primary', true);
    startBtn.style.height = isMobile ? '56px' : '64px';
    
    const backBtn = createButton('BACK', navigateBack, 'secondary', true);
    backBtn.style.height = isMobile ? '48px' : '56px';
    
    buttonContainer.appendChild(startBtn);
    buttonContainer.appendChild(backBtn);
    content.appendChild(buttonContainer);
    
    screen.appendChild(content);
    container.appendChild(screen);
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}
