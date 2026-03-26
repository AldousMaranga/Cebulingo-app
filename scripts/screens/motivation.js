// Motivation Screen

function renderMotivation() {
    const container = document.getElementById('content-container');
    const isMobile = AppState.isMobile;
    
    const screen = createElement('div', 'flex flex-col h-full');
    screen.style.backgroundColor = '#1C1C1C';
    
    screen.appendChild(createProgressHeader(100, navigateBack));
    
    const content = createElement('div', `flex-1 flex flex-col items-center justify-center ${isMobile ? 'px-8' : 'px-16'} gap-8 text-center`);
    
    // Celebrating cow
    const cowContainer = createElement('div', '');
    cowContainer.appendChild(createCowMascot(isMobile ? 140 : 180, true, 'celebrating'));
    content.appendChild(cowContainer);
    
    // Title
    const title = createElement('h1', 'text-white');
    title.style.fontSize = isMobile ? '32px' : '42px';
    title.textContent = 'You\'re All Set!';
    
    // Description
    const description = createElement('p', 'text-[#BEBEBE] max-w-md');
    description.style.fontSize = isMobile ? '16px' : '18px';
    description.textContent = 'Get ready to start your Cebuano learning journey! Let\'s begin with your first lesson.';
    
    content.appendChild(title);
    content.appendChild(description);
    
    // Sparkle effect
    content.appendChild(createSparkleEffect());
    
    // Button
    const buttonContainer = createElement('div', `w-full ${isMobile ? 'max-w-md' : 'max-w-lg'} mt-4`);
    const startBtn = createButton('START LEARNING', () => navigateTo('dashboard'), 'primary', true);
    startBtn.style.height = isMobile ? '56px' : '64px';
    startBtn.style.fontSize = isMobile ? '16px' : '18px';
    buttonContainer.appendChild(startBtn);
    content.appendChild(buttonContainer);
    
    screen.appendChild(content);
    container.appendChild(screen);
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}
