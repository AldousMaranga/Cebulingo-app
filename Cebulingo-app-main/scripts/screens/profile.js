// Profile Screen

function renderProfile() {
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
    title.textContent = 'Profile';
    
    header.appendChild(backBtn);
    header.appendChild(title);
    screen.appendChild(header);
    
    // Content
    const content = createElement('div', `flex-1 ${isMobile ? 'px-6 py-6' : 'px-12 py-8'}`);
    
    // Profile header
    const profileHeader = createElement('div', 'text-center mb-8');
    
    const avatar = createElement('div', 'w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center');
    avatar.style.background = 'linear-gradient(135deg, #1A73E8 0%, #6BB6FF 100%)';
    avatar.style.fontSize = '48px';
    avatar.textContent = '🐮';
    
    const userName = createElement('h2', 'text-white mb-2');
    userName.style.fontSize = isMobile ? '24px' : '32px';
    userName.textContent = AppState.userData.name;
    
    const userLevel = createElement('p', 'text-[#BEBEBE]');
    userLevel.style.fontSize = '16px';
    userLevel.textContent = `Level ${AppState.userData.currentLevel}`;
    
    profileHeader.appendChild(avatar);
    profileHeader.appendChild(userName);
    profileHeader.appendChild(userLevel);
    content.appendChild(profileHeader);
    
    // Stats grid
    const statsGrid = createElement('div', `grid ${isMobile ? 'grid-2' : 'grid-3'} gap-4 mb-8`);
    
    const stats = [
        { label: 'Day Streak', value: AppState.userData.streak, icon: 'flame', color: '#FF6B35' },
        { label: 'Total XP', value: AppState.userData.totalXP, icon: 'star', color: '#FFD700' },
        { label: 'Lessons Done', value: 7, icon: 'check-circle', color: '#10B981' }
    ];
    
    stats.forEach(stat => {
        const statCard = createElement('div', 'stat-card');
        
        const iconContainer = createElement('div', 'mb-3');
        iconContainer.innerHTML = `<i data-lucide="${stat.icon}" style="width: 40px; height: 40px; color: ${stat.color}; fill: ${stat.icon === 'star' ? stat.color : 'none'};"></i>`;
        
        const value = createElement('div', 'stat-value');
        value.textContent = stat.value;
        
        const label = createElement('div', 'stat-label');
        label.textContent = stat.label;
        
        statCard.appendChild(iconContainer);
        statCard.appendChild(value);
        statCard.appendChild(label);
        statsGrid.appendChild(statCard);
    });
    
    content.appendChild(statsGrid);
    
    // Achievements section
    const achievementsTitle = createElement('h3', 'text-white mb-4');
    achievementsTitle.style.fontSize = isMobile ? '20px' : '24px';
    achievementsTitle.textContent = 'Achievements';
    content.appendChild(achievementsTitle);
    
    const achievements = [
        { id: 1, title: 'First Steps', desc: 'Complete your first lesson', icon: '🎯', unlocked: true },
        { id: 2, title: 'Week Warrior', desc: 'Maintain a 7-day streak', icon: '🔥', unlocked: true },
        { id: 3, title: 'XP Master', desc: 'Earn 1000 XP', icon: '⭐', unlocked: true },
        { id: 4, title: 'Perfect Score', desc: 'Get 3 stars on any lesson', icon: '💯', unlocked: true },
        { id: 5, title: 'Unit Champion', desc: 'Complete an entire unit', icon: '🏆', unlocked: false },
        { id: 6, title: 'Polyglot', desc: 'Complete all modules', icon: '🌟', unlocked: false }
    ];
    
    const achievementsGrid = createElement('div', 'space-y-3');
    
    achievements.forEach(achievement => {
        const achCard = createElement('div', `achievement ${achievement.unlocked ? '' : 'locked'}`);
        
        const achIcon = createElement('div', 'achievement-icon');
        achIcon.style.background = achievement.unlocked 
            ? 'linear-gradient(135deg, #1A73E8 0%, #6BB6FF 100%)'
            : '#2A2A2A';
        achIcon.textContent = achievement.icon;
        
        const achInfo = createElement('div', 'flex-1');
        const achTitle = createElement('p', `text-white mb-1 ${achievement.unlocked ? '' : 'opacity-50'}`);
        achTitle.style.fontSize = '16px';
        achTitle.style.fontWeight = '600';
        achTitle.textContent = achievement.title;
        
        const achDesc = createElement('p', `text-[#BEBEBE] ${achievement.unlocked ? '' : 'opacity-50'}`);
        achDesc.style.fontSize = '14px';
        achDesc.textContent = achievement.desc;
        
        achInfo.appendChild(achTitle);
        achInfo.appendChild(achDesc);
        
        achCard.appendChild(achIcon);
        achCard.appendChild(achInfo);
        
        if (achievement.unlocked) {
            const checkmark = createElement('div', '');
            checkmark.innerHTML = '<i data-lucide="check" style="width: 24px; height: 24px; color: #10B981;"></i>';
            achCard.appendChild(checkmark);
        }
        
        achievementsGrid.appendChild(achCard);
    });
    
    content.appendChild(achievementsGrid);
    screen.appendChild(content);
    container.appendChild(screen);
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}
