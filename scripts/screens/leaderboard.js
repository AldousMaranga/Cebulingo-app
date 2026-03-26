// Leaderboard Screen

function renderLeaderboard() {
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
    title.textContent = 'Leaderboard';
    
    header.appendChild(backBtn);
    header.appendChild(title);
    screen.appendChild(header);
    
    // Content
    const content = createElement('div', `flex-1 ${isMobile ? 'px-6 py-6' : 'px-12 py-8'}`);
    
    // Podium
    const podium = createElement('div', 'podium mb-8');
    
    const topUsers = [
        { rank: 2, name: 'Maria Santos', xp: 3500, avatar: '👩' },
        { rank: 1, name: 'Juan Dela Cruz', xp: 4200, avatar: '👨' },
        { rank: 3, name: 'Pedro Garcia', xp: 3100, avatar: '🧑' }
    ];
    
    [topUsers[0], topUsers[1], topUsers[2]].forEach(user => {
        const place = createElement('div', 'podium-place');
        
        const avatar = createElement('div', 'text-4xl mb-2');
        avatar.textContent = user.avatar;
        
        const podiumBlock = createElement('div', `podium-block ${user.rank === 1 ? 'first' : user.rank === 2 ? 'second' : 'third'}`);
        podiumBlock.textContent = user.rank;
        podiumBlock.style.fontSize = '32px';
        podiumBlock.style.fontWeight = '700';
        podiumBlock.style.color = 'white';
        
        const nameText = createElement('p', 'text-white text-center mt-2');
        nameText.style.fontSize = '14px';
        nameText.textContent = user.name;
        
        const xpText = createElement('p', 'text-[#6BB6FF] text-center');
        xpText.style.fontSize = '12px';
        xpText.textContent = `${user.xp} XP`;
        
        place.appendChild(avatar);
        place.appendChild(podiumBlock);
        place.appendChild(nameText);
        place.appendChild(xpText);
        podium.appendChild(place);
    });
    
    content.appendChild(podium);
    
    // Rankings list
    const rankingsList = createElement('div', 'space-y-2');
    
    const users = [
        { rank: 4, name: 'You', xp: AppState.userData.totalXP, avatar: '🐮', isCurrentUser: true },
        { rank: 5, name: 'Ana Reyes', xp: 2400, avatar: '👩' },
        { rank: 6, name: 'Carlos Martinez', xp: 2100, avatar: '👨' },
        { rank: 7, name: 'Lisa Wong', xp: 1950, avatar: '👩' },
        { rank: 8, name: 'Miguel Cruz', xp: 1800, avatar: '🧑' }
    ];
    
    users.forEach(user => {
        const card = createElement('div', `card p-4 flex items-center gap-4 ${user.isCurrentUser ? 'border-2' : ''}`);
        if (user.isCurrentUser) {
            card.style.borderColor = '#1A73E8';
        }
        
        const rank = createElement('div', 'text-white');
        rank.style.fontSize = '20px';
        rank.style.fontWeight = '700';
        rank.style.minWidth = '40px';
        rank.textContent = `#${user.rank}`;
        
        const avatar = createElement('div');
        avatar.style.fontSize = '32px';
        avatar.textContent = user.avatar;
        
        const info = createElement('div', 'flex-1');
        const name = createElement('p', 'text-white');
        name.style.fontSize = '16px';
        name.textContent = user.name;
        
        const xp = createElement('p', 'text-[#BEBEBE]');
        xp.style.fontSize = '14px';
        xp.textContent = `${user.xp} XP`;
        
        info.appendChild(name);
        info.appendChild(xp);
        
        card.appendChild(rank);
        card.appendChild(avatar);
        card.appendChild(info);
        rankingsList.appendChild(card);
    });
    
    content.appendChild(rankingsList);
    screen.appendChild(content);
    container.appendChild(screen);
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}
