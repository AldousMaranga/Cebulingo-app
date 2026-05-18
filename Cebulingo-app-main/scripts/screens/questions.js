// Question Screens

function renderQuestion1() {
    const container = document.getElementById('content-container');
    const isMobile = AppState.isMobile;
    
    const screen = createElement('div', 'flex flex-col h-full');
    screen.style.backgroundColor = '#1C1C1C';
    
    screen.appendChild(createProgressHeader(25, navigateBack));
    
    const content = createElement('div', `flex-1 flex flex-col items-center justify-center ${isMobile ? 'px-8' : 'px-16'} gap-6`);
    
    const title = createElement('h2', 'text-white text-center');
    title.style.fontSize = isMobile ? '24px' : '32px';
    title.textContent = 'Why do you want to learn Cebuano?';
    
    content.appendChild(title);
    
    const options = [
        { text: 'Travel & Culture', icon: '✈️' },
        { text: 'Family & Friends', icon: '👨‍👩‍👧' },
        { text: 'Work & Business', icon: '💼' },
        { text: 'Personal Interest', icon: '💡' }
    ];
    
    const optionsContainer = createElement('div', `w-full ${isMobile ? 'max-w-md' : 'max-w-lg'} space-y-3`);
    
    options.forEach(option => {
        const btn = createElement('button', 'w-full card p-4 flex items-center gap-4 transition-all hover:scale-[1.02]');
        btn.style.cursor = 'pointer';
        btn.innerHTML = `
            <span style="font-size: 32px;">${option.icon}</span>
            <span class="text-white" style="fontSize: ${isMobile ? '16px' : '18px'};">${option.text}</span>
        `;
        btn.onclick = () => navigateTo('question-2');
        optionsContainer.appendChild(btn);
    });
    
    content.appendChild(optionsContainer);
    screen.appendChild(content);
    container.appendChild(screen);
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function renderQuestion2() {
    const container = document.getElementById('content-container');
    const isMobile = AppState.isMobile;
    
    const screen = createElement('div', 'flex flex-col h-full');
    screen.style.backgroundColor = '#1C1C1C';
    
    screen.appendChild(createProgressHeader(50, navigateBack));
    
    const content = createElement('div', `flex-1 flex flex-col items-center justify-center ${isMobile ? 'px-8' : 'px-16'} gap-6`);
    
    const title = createElement('h2', 'text-white text-center');
    title.style.fontSize = isMobile ? '24px' : '32px';
    title.textContent = 'How much time can you dedicate daily?';
    
    content.appendChild(title);
    
    const options = [
        { text: '5 minutes', desc: 'Just the basics' },
        { text: '10 minutes', desc: 'Nice and casual' },
        { text: '15 minutes', desc: 'Getting serious' },
        { text: '20+ minutes', desc: 'Super committed!' }
    ];
    
    const optionsContainer = createElement('div', `w-full ${isMobile ? 'max-w-md' : 'max-w-lg'} space-y-3`);
    
    options.forEach(option => {
        const btn = createElement('button', 'w-full card p-4 flex flex-col items-start gap-1 transition-all hover:scale-[1.02]');
        btn.style.cursor = 'pointer';
        btn.innerHTML = `
            <span class="text-white" style="fontSize: ${isMobile ? '16px' : '18px'}; font-weight: 600;">${option.text}</span>
            <span class="text-[#BEBEBE]" style="fontSize: ${isMobile ? '13px' : '14px'};">${option.desc}</span>
        `;
        btn.onclick = () => navigateTo('question-3');
        optionsContainer.appendChild(btn);
    });
    
    content.appendChild(optionsContainer);
    screen.appendChild(content);
    container.appendChild(screen);
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function renderQuestion3() {
    const container = document.getElementById('content-container');
    const isMobile = AppState.isMobile;
    
    const screen = createElement('div', 'flex flex-col h-full');
    screen.style.backgroundColor = '#1C1C1C';
    
    screen.appendChild(createProgressHeader(75, navigateBack));
    
    const content = createElement('div', `flex-1 flex flex-col items-center justify-center ${isMobile ? 'px-8' : 'px-16'} gap-6`);
    
    const title = createElement('h2', 'text-white text-center');
    title.style.fontSize = isMobile ? '24px' : '32px';
    title.textContent = 'What\'s your current level?';
    
    content.appendChild(title);
    
    const options = [
        { text: 'Complete Beginner', desc: 'Never studied before' },
        { text: 'Some Basics', desc: 'Know a few words' },
        { text: 'Intermediate', desc: 'Can have basic conversations' },
        { text: 'Advanced', desc: 'Want to improve fluency' }
    ];
    
    const optionsContainer = createElement('div', `w-full ${isMobile ? 'max-w-md' : 'max-w-lg'} space-y-3`);
    
    options.forEach(option => {
        const btn = createElement('button', 'w-full card p-4 flex flex-col items-start gap-1 transition-all hover:scale-[1.02]');
        btn.style.cursor = 'pointer';
        btn.innerHTML = `
            <span class="text-white" style="fontSize: ${isMobile ? '16px' : '18px'}; font-weight: 600;">${option.text}</span>
            <span class="text-[#BEBEBE]" style="fontSize: ${isMobile ? '13px' : '14px'};">${option.desc}</span>
        `;
        btn.onclick = () => navigateTo('motivation');
        optionsContainer.appendChild(btn);
    });
    
    content.appendChild(optionsContainer);
    screen.appendChild(content);
    container.appendChild(screen);
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}
