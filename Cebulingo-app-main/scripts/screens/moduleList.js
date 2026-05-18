// Module List Screen

function renderModules() {
    const container = document.getElementById('content-container');
    const isMobile = AppState.isMobile;
    
    const screen = createElement('div', 'flex flex-col h-full overflow-y-auto');
    screen.style.backgroundColor = '#1C1C1C';
    
    // Header
    const header = createElement('div', `flex items-center gap-4 ${isMobile ? 'p-4' : 'p-8'} border-b border-[#2A2A2A]`);
    const backBtn = createElement('button', 'btn-icon');
    backBtn.innerHTML = '<i data-lucide="arrow-left" style="width: 20px; height: 20px; color: #6BB6FF;"></i>';
    backBtn.onclick = navigateBack;
    
    const title = createElement('h1', 'text-white flex-1');
    title.style.fontSize = isMobile ? '20px' : '28px';
    title.textContent = 'Learning Modules';
    
    header.appendChild(backBtn);
    header.appendChild(title);
    screen.appendChild(header);
    
    // Content
    const content = createElement('div', `flex-1 ${isMobile ? 'px-6 py-6' : 'px-12 py-8'}`);
    
    const modules = [
        { id: 1, title: 'Basics', icon: '🌟', lessons: 5, completed: 5, locked: false },
        { id: 2, title: 'Family & Friends', icon: '👨‍👩‍👧', lessons: 5, completed: 2, locked: false },
        { id: 3, title: 'Food & Dining', icon: '🍽️', lessons: 5, completed: 0, locked: true },
        { id: 4, title: 'Numbers & Time', icon: '⏰', lessons: 5, completed: 0, locked: true },
        { id: 5, title: 'Shopping', icon: '🛍️', lessons: 5, completed: 0, locked: true },
        { id: 6, title: 'Travel', icon: '✈️', lessons: 5, completed: 0, locked: true }
    ];
    
    const modulesGrid = createElement('div', `grid ${isMobile ? 'grid-1' : 'grid-2'} gap-4`);
    
    modules.forEach(module => {
        const card = createElement('div', `card p-6 transition-all ${module.locked ? 'opacity-50' : 'hover:scale-[1.02] cursor-pointer'}`);
        
        const topRow = createElement('div', 'flex items-start justify-between mb-4');
        
        const leftSide = createElement('div', 'flex items-center gap-4');
        const icon = createElement('div', 'text-5xl');
        icon.textContent = module.icon;
        
        const info = createElement('div', '');
        const moduleTitle = createElement('h3', 'text-white mb-1');
        moduleTitle.style.fontSize = isMobile ? '18px' : '22px';
        moduleTitle.textContent = module.title;
        
        const lessonsText = createElement('p', 'text-[#BEBEBE]');
        lessonsText.style.fontSize = '14px';
        lessonsText.textContent = `${module.lessons} lessons`;
        
        info.appendChild(moduleTitle);
        info.appendChild(lessonsText);
        leftSide.appendChild(icon);
        leftSide.appendChild(info);
        
        const status = createElement('div', '');
        if (module.locked) {
            status.innerHTML = '<i data-lucide="lock" style="width: 24px; height: 24px; color: #666;"></i>';
        } else {
            status.innerHTML = `<i data-lucide="check-circle" style="width: 24px; height: 24px; color: #10B981;"></i>`;
        }
        
        topRow.appendChild(leftSide);
        topRow.appendChild(status);
        
        // Progress bar
        if (!module.locked) {
            const progressContainer = createElement('div', 'mt-4');
            const progressBar = createElement('div', 'progress-bar');
            const progressFill = createElement('div', 'progress-bar-fill');
            progressFill.style.width = `${(module.completed / module.lessons) * 100}%`;
            progressBar.appendChild(progressFill);
            
            const progressText = createElement('p', 'text-[#BEBEBE] mt-2');
            progressText.style.fontSize = '12px';
            progressText.textContent = `${module.completed}/${module.lessons} completed`;
            
            progressContainer.appendChild(progressBar);
            progressContainer.appendChild(progressText);
            card.appendChild(progressContainer);
        }
        
        card.appendChild(topRow);
        
        if (!module.locked) {
            card.onclick = () => navigateTo('lesson-start');
        }
        
        modulesGrid.appendChild(card);
    });
    
    content.appendChild(modulesGrid);
    screen.appendChild(content);
    container.appendChild(screen);
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}
