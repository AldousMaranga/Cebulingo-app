// Quick Intro Screen

function renderQuickIntro() {
    const container = document.getElementById('content-container');
    const isMobile = AppState.isMobile;
    
    const screen = createElement('div', 'flex flex-col h-full');
    screen.style.backgroundColor = '#1C1C1C';
    
    // Progress header
    screen.appendChild(createProgressHeader(10, navigateBack));
    
    // Content
    const content = createElement('div', `flex-1 flex flex-col items-center justify-center ${isMobile ? 'px-8' : 'px-16'} gap-8`);
    
    // Cow mascot
    const cowContainer = createElement('div', 'animate-float');
    cowContainer.appendChild(createCowMascot(isMobile ? 140 : 180, true, 'waving'));
    content.appendChild(cowContainer);
    
    // Text
    const title = createElement('h1', 'text-white text-center');
    title.style.fontSize = isMobile ? '28px' : '36px';
    title.textContent = 'Welcome to CebuLingo!';
    
    const description = createElement('p', 'text-[#BEBEBE] text-center max-w-md');
    description.style.fontSize = isMobile ? '16px' : '18px';
    description.textContent = 'Let\'s personalize your learning experience with a few quick questions.';
    
    content.appendChild(title);
    content.appendChild(description);
    
    // Continue button
    const buttonContainer = createElement('div', `w-full ${isMobile ? 'max-w-md' : 'max-w-lg'} mt-8`);
    const continueBtn = createButton('CONTINUE', () => navigateTo('question-1'), 'primary', true);
    continueBtn.style.height = isMobile ? '56px' : '64px';
    buttonContainer.appendChild(continueBtn);
    content.appendChild(buttonContainer);
    
    screen.appendChild(content);
    container.appendChild(screen);
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}
