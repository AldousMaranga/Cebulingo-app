// Dashboard Screen - 3D Learning Path

function renderDashboard() {
    const container = document.getElementById('content-container');
    const isMobile = AppState.isMobile;
    
    const screen = createElement('div', 'h-full overflow-y-auto relative');
    screen.style.backgroundColor = '#1C1C1C';
    
    // Top Header Bar
    const header = createElement('div', `sticky top-0 z-20 ${isMobile ? 'px-4 py-3' : 'px-8 py-4'}`);
    header.style.background = 'linear-gradient(180deg, #1C1C1C 0%, rgba(28, 28, 28, 0.98) 100%)';
    header.style.borderBottom = '1px solid #2A2A2A';
    
    const headerContent = createElement('div', 'flex items-center justify-between');
    
    // Left side
    const leftSide = createElement('div', 'flex items-center gap-3');
    const backBtn = createElement('button', `btn-icon ${isMobile ? 'p-2' : 'p-2.5'}`);
    backBtn.innerHTML = '<i data-lucide="arrow-left" style="width: 20px; height: 20px; color: #6BB6FF;"></i>';
    backBtn.onclick = navigateBack;
    
    const logo = createElement('h1', 'text-white');
    logo.style.fontSize = isMobile ? '18px' : '24px';
    logo.textContent = 'CebuLingo';
    
    leftSide.appendChild(backBtn);
    leftSide.appendChild(logo);
    
    // Center - Stats
    const centerSide = createElement('div', 'flex items-center gap-3');
    const streakBadge = createElement('div', `flex items-center gap-2 ${isMobile ? 'px-3 py-1.5' : 'px-4 py-2'} rounded-xl`);
    streakBadge.style.backgroundColor = '#2A2A2A';
    streakBadge.innerHTML = `
        <i data-lucide="flame" style="width: ${isMobile ? '16px' : '20px'}; height: ${isMobile ? '16px' : '20px'}; color: #FF6B35;"></i>
        <span class="text-white" style="font-size: ${isMobile ? '14px' : '16px'};">${AppState.userData.streak}</span>
    `;
    
    const xpBadge = createElement('div', `flex items-center gap-2 ${isMobile ? 'px-3 py-1.5' : 'px-4 py-2'} rounded-xl`);
    xpBadge.style.backgroundColor = '#2A2A2A';
    xpBadge.innerHTML = `
        <i data-lucide="star" style="width: ${isMobile ? '16px' : '20px'}; height: ${isMobile ? '16px' : '20px'}; color: #FFD700; fill: #FFD700;"></i>
        <span class="text-white" style="font-size: ${isMobile ? '14px' : '16px'};">${AppState.userData.totalXP}</span>
    `;
    
    centerSide.appendChild(streakBadge);
    centerSide.appendChild(xpBadge);
    
    // Right side
    const rightSide = createElement('div', 'flex items-center gap-2');
    const leaderboardBtn = createElement('button', `btn-icon ${isMobile ? 'p-2' : 'p-2.5'}`);
    leaderboardBtn.innerHTML = '<i data-lucide="trophy" style="width: 20px; height: 20px; color: #6BB6FF;"></i>';
    leaderboardBtn.onclick = () => navigateTo('leaderboard');
    
    const profileBtn = createElement('button', `btn-icon ${isMobile ? 'p-2' : 'p-2.5'}`);
    profileBtn.innerHTML = '<i data-lucide="user" style="width: 20px; height: 20px; color: #6BB6FF;"></i>';
    profileBtn.onclick = () => navigateTo('profile');
    
    rightSide.appendChild(leaderboardBtn);
    rightSide.appendChild(profileBtn);
    
    headerContent.appendChild(leftSide);
    headerContent.appendChild(centerSide);
    headerContent.appendChild(rightSide);
    header.appendChild(headerContent);
    screen.appendChild(header);
    
    // Learning Path Content
    const pathContainer = createElement('div', `${isMobile ? 'px-6 py-8' : 'px-12 py-12'} relative`);
    const pathContent = createElement('div', 'max-w-2xl mx-auto relative');
    
    // Mock units data
    const units = [
        {
            id: 1,
            title: 'Unit 1',
            description: 'Form basic sentences, greet people',
            color: '#1A73E8',
            lessons: [
                { id: 1, title: 'Basic Greetings', type: 'lesson', status: 'completed', stars: 3, xp: 150 },
                { id: 2, title: 'Introductions', type: 'lesson', status: 'completed', stars: 3, xp: 150 },
                { id: 3, title: 'Practice', type: 'practice', status: 'completed', stars: 3, xp: 100 },
                { id: 4, title: 'Common Phrases', type: 'lesson', status: 'completed', stars: 2, xp: 120 },
                { id: 5, title: 'Unit 1 Review', type: 'review', status: 'completed', stars: 3, xp: 200 }
            ]
        },
        {
            id: 2,
            title: 'Unit 2',
            description: 'Talk about family and friends',
            color: '#6BB6FF',
            lessons: [
                { id: 6, title: 'Family Members', type: 'lesson', status: 'completed', stars: 3, xp: 150 },
                { id: 7, title: 'Relationships', type: 'lesson', status: 'completed', stars: 2, xp: 120 },
                { id: 8, title: 'Story Time', type: 'story', status: 'current', stars: 0, xp: 0 },
                { id: 9, title: 'Describing People', type: 'lesson', status: 'unlocked', stars: 0, xp: 0 },
                { id: 10, title: 'Unit 2 Boss', type: 'boss', status: 'locked', stars: 0, xp: 0 }
            ]
        },
        {
            id: 3,
            title: 'Unit 3',
            description: 'Order food and drinks',
            color: '#1A73E8',
            lessons: [
                { id: 11, title: 'Food Basics', type: 'lesson', status: 'locked', stars: 0, xp: 0 },
                { id: 12, title: 'At the Restaurant', type: 'lesson', status: 'locked', stars: 0, xp: 0 },
                { id: 13, title: 'Practice', type: 'practice', status: 'locked', stars: 0, xp: 0 }
            ]
        }
    ];
    
    units.forEach((unit, unitIndex) => {
        const unitSection = createElement('div', 'relative mb-16');
        
        // Unit header
        const unitHeader = createElement('div', `${isMobile ? 'p-4 mb-8' : 'p-6 mb-12'} rounded-2xl`);
        unitHeader.style.backgroundColor = '#2A2A2A';
        unitHeader.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="text-white mb-1" style="font-size: ${isMobile ? '20px' : '28px'};">${unit.title}</h2>
                    <p class="text-[#BEBEBE]" style="font-size: ${isMobile ? '14px' : '16px'};">${unit.description}</p>
                </div>
                <div class="${isMobile ? 'w-12 h-12' : 'w-16 h-16'} rounded-xl flex items-center justify-center" style="background-color: ${unit.color};">
                    <span class="text-white" style="font-size: ${isMobile ? '20px' : '28px'};">${unit.id}</span>
                </div>
            </div>
        `;
        
        // Lessons
        const lessonsContainer = createElement('div', 'relative');
        
        unit.lessons.forEach((lesson, lessonIndex) => {
            const isLeft = lessonIndex % 2 === 0;
            const isCurrent = lesson.status === 'current';
            
            const lessonWrapper = createElement('div', `relative mb-12 flex ${isLeft ? 'justify-start' : 'justify-end'}`);
            const lessonContainer = createElement('div', `flex flex-col items-center ${isLeft ? 'mr-auto' : 'ml-auto'}`);
            
            // Current lesson cow
            if (isCurrent) {
                const cowWrapper = createElement('div', 'absolute -top-20 left-1/2 transform -translate-x-1/2 z-10');
                const cowAnimated = createElement('div', 'animate-bounce-gentle');
                cowAnimated.appendChild(createCowMascot(isMobile ? 80 : 120, true, 'happy'));
                cowWrapper.appendChild(cowAnimated);
                lessonContainer.appendChild(cowWrapper);
            }
            
            // Lesson button
            const lessonSize = lesson.type === 'boss' ? (isMobile ? 'w-24 h-24' : 'w-32 h-32') 
                : lesson.type === 'review' ? (isMobile ? 'w-20 h-20' : 'w-28 h-28')
                : (isMobile ? 'w-16 h-16' : 'w-24 h-24');
            
            let lessonColor = '#3A3A3A';
            if (lesson.status === 'completed') lessonColor = '#10B981';
            else if (lesson.status === 'current') lessonColor = '#FFD700';
            else if (lesson.status === 'unlocked') lessonColor = unit.color;
            
            const lessonBtn = createElement('button', `${lessonSize} rounded-full flex items-center justify-center transition-all duration-300 ${lesson.status !== 'locked' ? 'hover:scale-110 cursor-pointer' : 'cursor-default opacity-50'} ${isCurrent ? 'animate-pulse' : ''}`);
            lessonBtn.style.backgroundColor = lessonColor;
            lessonBtn.style.boxShadow = lesson.status !== 'locked' ? `0 8px 24px ${lessonColor}40` : 'none';
            
            if (lesson.status === 'unlocked' || lesson.status === 'current') {
                lessonBtn.onclick = () => navigateTo('lesson-start');
            }
            
            // Lesson icon
            let iconHTML = '';
            if (lesson.status === 'completed') {
                iconHTML = `<i data-lucide="check-circle" style="width: ${isMobile ? '32px' : '40px'}; height: ${isMobile ? '32px' : '40px'}; color: white;"></i>`;
            } else if (lesson.status === 'locked') {
                iconHTML = `<i data-lucide="lock" style="width: ${isMobile ? '24px' : '32px'}; height: ${isMobile ? '24px' : '32px'}; color: #888;"></i>`;
            } else if (lesson.type === 'boss') {
                iconHTML = `<i data-lucide="crown" style="width: ${isMobile ? '32px' : '40px'}; height: ${isMobile ? '32px' : '40px'}; color: white;"></i>`;
            } else if (lesson.type === 'practice') {
                iconHTML = `<i data-lucide="award" style="width: ${isMobile ? '24px' : '32px'}; height: ${isMobile ? '24px' : '32px'}; color: white;"></i>`;
            } else if (lesson.type === 'story') {
                iconHTML = '<span style="font-size: ' + (isMobile ? '24px' : '32px') + ';">📖</span>';
            } else {
                iconHTML = `<i data-lucide="star" style="width: ${isMobile ? '24px' : '32px'}; height: ${isMobile ? '24px' : '32px'}; color: white;"></i>`;
            }
            lessonBtn.innerHTML = iconHTML;
            
            lessonContainer.appendChild(lessonBtn);
            
            // Lesson info
            const lessonInfo = createElement('div', 'mt-3 text-center');
            const lessonTitle = createElement('p', lesson.status === 'locked' ? 'text-gray-600 mb-1' : 'text-white mb-1');
            lessonTitle.style.fontSize = isMobile ? '12px' : '14px';
            lessonTitle.textContent = lesson.title;
            lessonInfo.appendChild(lessonTitle);
            
            // Stars
            if (lesson.status !== 'locked' && lesson.stars > 0) {
                const starsContainer = createElement('div', 'flex items-center justify-center gap-1');
                for (let i = 0; i < 3; i++) {
                    const star = createElement('span');
                    star.innerHTML = `<i data-lucide="star" style="width: ${isMobile ? '12px' : '16px'}; height: ${isMobile ? '12px' : '16px'}; color: ${i < lesson.stars ? '#FFD700' : '#666'}; fill: ${i < lesson.stars ? '#FFD700' : 'none'};"></i>`;
                    starsContainer.appendChild(star);
                }
                lessonInfo.appendChild(starsContainer);
            }
            
            // XP badge
            if (lesson.status === 'completed' && lesson.xp > 0) {
                const xpBadge = createElement('div', `mt-2 ${isMobile ? 'px-2 py-1' : 'px-3 py-1'} rounded-full`);
                xpBadge.style.backgroundColor = '#2A2A2A';
                xpBadge.innerHTML = `<span class="text-[#6BB6FF]" style="font-size: ${isMobile ? '10px' : '12px'};">+${lesson.xp} XP</span>`;
                lessonInfo.appendChild(xpBadge);
            }
            
            lessonContainer.appendChild(lessonInfo);
            lessonWrapper.appendChild(lessonContainer);
            lessonsContainer.appendChild(lessonWrapper);
        });
        
        unitSection.appendChild(unitHeader);
        unitSection.appendChild(lessonsContainer);
        pathContent.appendChild(unitSection);
    });
    
    // End message
    const endMessage = createElement('div', 'text-center mt-12 mb-8');
    const endCow = createElement('div', 'inline-block');
    endCow.appendChild(createCowMascot(isMobile ? 100 : 140, true, 'encouraging'));
    endMessage.appendChild(endCow);
    
    const endText = createElement('p', 'text-[#BEBEBE] mt-4');
    endText.style.fontSize = isMobile ? '14px' : '16px';
    endText.textContent = 'More units coming soon! 🎉';
    endMessage.appendChild(endText);
    
    pathContent.appendChild(endMessage);
    pathContainer.appendChild(pathContent);
    screen.appendChild(pathContainer);
    container.appendChild(screen);
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}
