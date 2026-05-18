// Lesson Complete Screen

function renderLessonComplete() {
    const container = document.getElementById('content-container');
    const isMobile = AppState.isMobile;
    
    const screen = createElement('div', 'flex flex-col h-full items-center justify-center relative');
    screen.style.backgroundColor = '#1C1C1C';
    
    // Sparkle effect
    screen.appendChild(createSparkleEffect());
    
    const content = createElement('div', `${isMobile ? 'px-8' : 'px-16'} text-center space-y-6 z-10`);
    
    // Celebrating cow
    const cowContainer = createElement('div', '');
    cowContainer.appendChild(createCowMascot(isMobile ? 160 : 200, true, 'celebrating'));
    content.appendChild(cowContainer);
    
    // Title
    const title = createElement('h1', 'text-white mb-2');
    title.style.fontSize = isMobile ? '36px' : '48px';
    title.style.fontWeight = '700';
    title.textContent = 'Lesson Complete!';
    
    // Score
    const scoreText = createElement('p', 'text-[#BEBEBE] mb-4');
    scoreText.style.fontSize = isMobile ? '18px' : '22px';
    scoreText.textContent = `You earned ${score * 50} XP!`;
    
    content.appendChild(title);
    content.appendChild(scoreText);
    
    // Stars
    const starsContainer = createElement('div', 'flex items-center justify-center gap-2 mb-8');
    for (let i = 0; i < 3; i++) {
        const star = createElement('span');
        star.innerHTML = `<i data-lucide="star" style="width: ${isMobile ? '40px' : '56px'}; height: ${isMobile ? '40px' : '56px'}; color: #FFD700; fill: ${i < score ? '#FFD700' : 'none'};"></i>`;
        starsContainer.appendChild(star);
    }
    content.appendChild(starsContainer);
    
    // Button
    const buttonContainer = createElement('div', `w-full max-w-md mx-auto`);
    const continueBtn = createButton('CONTINUE', () => navigateTo('dashboard'), 'primary', true);
    continueBtn.style.height = isMobile ? '56px' : '64px';
    buttonContainer.appendChild(continueBtn);
    content.appendChild(buttonContainer);
    
    screen.appendChild(content);
    container.appendChild(screen);
    
    // Update user data
    AppState.userData.totalXP += score * 50;
    Storage.save('userData', AppState.userData);
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}
