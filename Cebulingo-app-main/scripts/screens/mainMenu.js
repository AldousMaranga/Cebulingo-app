// Main Menu Screen

function renderMainMenu() {
    const container = document.getElementById('content-container');
    const isMobile = AppState.isMobile;
    
    const screen = createElement('div', `flex items-center justify-between h-full relative ${isMobile ? 'flex-col px-8 py-12' : 'flex-row px-16 py-16 gap-16'}`);
    
    // Sparkle effect
    screen.appendChild(createSparkleEffect());
    
    // Admin button
    const adminBtn = createElement('button', 'absolute top-6 right-6 z-20 p-3 rounded-xl transition-all hover:scale-110');
    adminBtn.style.backgroundColor = '#2A2A2A';
    adminBtn.innerHTML = '<i data-lucide="shield" style="width: 20px; height: 20px; color: #6BB6FF;"></i>';
    adminBtn.onclick = () => navigateTo('admin-login');
    screen.appendChild(adminBtn);
    
    // View mode toggle button
    const toggleBtn = createElement('button', 'absolute top-6 left-6 z-20 p-3 rounded-xl transition-all hover:scale-110');
    toggleBtn.style.backgroundColor = '#2A2A2A';
    toggleBtn.title = isMobile ? 'Switch to Desktop Mode' : 'Switch to Mobile Mode';
    toggleBtn.innerHTML = isMobile 
        ? '<i data-lucide="monitor" style="width: 20px; height: 20px; color: #6BB6FF;"></i>'
        : '<i data-lucide="smartphone" style="width: 20px; height: 20px; color: #6BB6FF;"></i>';
    toggleBtn.onclick = () => {
        toggleViewMode();
        renderMainMenu();
    };
    screen.appendChild(toggleBtn);
    
    // Left section - Cow and Title
    const leftSection = createElement('div', `flex flex-col items-center justify-center gap-6 z-10 ${isMobile ? 'flex-1' : 'flex-1'}`);
    
    const cowContainer = createElement('div', 'animate-float');
    cowContainer.appendChild(createCowMascot(isMobile ? 160 : 240, true, 'waving'));
    leftSection.appendChild(cowContainer);
    
    const titleContainer = createElement('div', 'text-center');
    const title = createElement('h1', 'text-white mb-2');
    title.style.fontSize = isMobile ? '48px' : '72px';
    title.style.fontWeight = '700';
    title.style.letterSpacing = '-0.5px';
    title.textContent = 'CebuLingo';
    
    const subtitle = createElement('p', 'text-[#BEBEBE]');
    subtitle.style.fontSize = isMobile ? '18px' : '24px';
    subtitle.style.fontWeight = '500';
    subtitle.textContent = 'Learn Cebuano in Minutes';
    
    titleContainer.appendChild(title);
    titleContainer.appendChild(subtitle);
    leftSection.appendChild(titleContainer);
    
    // Quick Access Navigation - Desktop Only
    if (!isMobile) {
        const navContainer = createElement('div', 'flex gap-3 mt-4');
        
        const navItems = [
            { icon: 'layout-dashboard', label: 'Dashboard', action: () => navigateTo('dashboard'), primary: true },
            { icon: 'trophy', label: 'Leaderboard', action: () => navigateTo('leaderboard') },
            { icon: 'book-open', label: 'Modules', action: () => navigateTo('modules') },
            { icon: 'user', label: 'Profile', action: () => navigateTo('profile') }
        ];
        
        navItems.forEach(item => {
            const btn = createElement('button', 'flex flex-col items-center gap-2 p-4 rounded-xl transition-all hover:scale-105');
            btn.style.background = item.primary ? 'linear-gradient(135deg, #1A73E8 0%, #6BB6FF 100%)' : '#2A2A2A';
            btn.innerHTML = `
                <i data-lucide="${item.icon}" style="width: 32px; height: 32px; color: ${item.primary ? 'white' : '#6BB6FF'};"></i>
                <span style="color: white; font-size: 14px;">${item.label}</span>
            `;
            btn.onclick = item.action;
            navContainer.appendChild(btn);
        });
        
        leftSection.appendChild(navContainer);
    }
    
    screen.appendChild(leftSection);
    
    // Right section - Buttons
    const rightSection = createElement('div', `space-y-4 z-10 ${isMobile ? 'w-full' : 'w-full max-w-md'}`);
    
    const getStartedBtn = createElement('button', `btn btn-primary w-full rounded-2xl ${isMobile ? 'h-16' : 'h-20'}`);
    getStartedBtn.style.fontSize = isMobile ? '16px' : '20px';
    getStartedBtn.textContent = 'GET STARTED';
    getStartedBtn.onclick = () => navigateTo('quick-intro');
    
    const loginBtn = createElement('button', `btn btn-secondary w-full rounded-2xl ${isMobile ? 'h-16' : 'h-20'}`);
    loginBtn.style.fontSize = isMobile ? '16px' : '20px';
    loginBtn.textContent = 'I ALREADY HAVE AN ACCOUNT';
    loginBtn.onclick = () => navigateTo('login');
    
    rightSection.appendChild(getStartedBtn);
    rightSection.appendChild(loginBtn);
    
    // Quick Access Cards - Mobile Only
    if (isMobile) {
        const mobileNav = createElement('div', 'grid grid-4 pt-4');
        
        const mobileNavItems = [
            { icon: 'layout-dashboard', label: 'Dashboard', action: () => navigateTo('dashboard'), primary: true },
            { icon: 'trophy', label: 'Ranks', action: () => navigateTo('leaderboard') },
            { icon: 'book-open', label: 'Modules', action: () => navigateTo('modules') },
            { icon: 'user', label: 'Profile', action: () => navigateTo('profile') }
        ];
        
        mobileNavItems.forEach(item => {
            const btn = createElement('button', 'flex flex-col items-center gap-2 p-3 rounded-xl transition-all hover:scale-105');
            btn.style.background = item.primary ? 'linear-gradient(135deg, #1A73E8 0%, #6BB6FF 100%)' : '#2A2A2A';
            btn.innerHTML = `
                <i data-lucide="${item.icon}" style="width: 20px; height: 20px; color: ${item.primary ? 'white' : '#6BB6FF'};"></i>
                <span style="color: white; font-size: 10px;">${item.label}</span>
            `;
            btn.onclick = item.action;
            mobileNav.appendChild(btn);
        });
        
        rightSection.appendChild(mobileNav);
    }
    
    screen.appendChild(rightSection);
    container.appendChild(screen);
    
    // Initialize icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}
