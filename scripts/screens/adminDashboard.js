// Admin Dashboard Screen

function renderAdminDashboard() {
    const container = document.getElementById('content-container');
    
    const screen = createElement('div', 'flex h-full');
    screen.style.backgroundColor = '#0F172A';
    
    // Sidebar
    const sidebar = createElement('div', 'w-64 border-r border-[#1E293B] p-6');
    
    const logo = createElement('h1', 'text-white mb-8');
    logo.style.fontSize = '24px';
    logo.innerHTML = '<i data-lucide="shield" style="width: 24px; height: 24px; display: inline; vertical-align: middle; margin-right: 8px; color: #6BB6FF;"></i> Admin Panel';
    
    const menuItems = [
        { label: 'Overview', icon: 'layout-dashboard', active: true },
        { label: 'Users', icon: 'users' },
        { label: 'Lessons', icon: 'book-open' },
        { label: 'Analytics', icon: 'bar-chart' },
        { label: 'Settings', icon: 'settings' }
    ];
    
    const menu = createElement('div', 'space-y-2 mb-8');
    menuItems.forEach(item => {
        const menuItem = createElement('button', `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${item.active ? 'bg-[#1E293B]' : 'hover:bg-[#1E293B]'}`);
        menuItem.innerHTML = `
            <i data-lucide="${item.icon}" style="width: 20px; height: 20px; color: ${item.active ? '#6BB6FF' : '#94A3B8'};"></i>
            <span style="color: ${item.active ? 'white' : '#94A3B8'}; font-size: 14px;">${item.label}</span>
        `;
        menu.appendChild(menuItem);
    });
    
    const logoutBtn = createButton('Logout', () => navigateTo('admin-login'), 'secondary', true);
    
    sidebar.appendChild(logo);
    sidebar.appendChild(menu);
    sidebar.appendChild(logoutBtn);
    
    // Main content
    const mainContent = createElement('div', 'flex-1 overflow-y-auto p-8');
    
    const header = createElement('h2', 'text-white mb-6');
    header.style.fontSize = '28px';
    header.textContent = 'Dashboard Overview';
    mainContent.appendChild(header);
    
    // Stats cards
    const statsGrid = createElement('div', 'grid grid-3 gap-6 mb-8');
    
    const stats = [
        { label: 'Total Users', value: '1,234', icon: 'users', color: '#6BB6FF' },
        { label: 'Active Lessons', value: '48', icon: 'book-open', color: '#10B981' },
        { label: 'Completion Rate', value: '67%', icon: 'trending-up', color: '#FFD700' }
    ];
    
    stats.forEach(stat => {
        const card = createElement('div', 'p-6 rounded-xl');
        card.style.backgroundColor = '#1E293B';
        
        const iconContainer = createElement('div', 'mb-4');
        iconContainer.innerHTML = `<i data-lucide="${stat.icon}" style="width: 32px; height: 32px; color: ${stat.color};"></i>`;
        
        const value = createElement('div', 'text-white mb-1');
        value.style.fontSize = '32px';
        value.style.fontWeight = '700';
        value.textContent = stat.value;
        
        const label = createElement('div', 'text-[#94A3B8]');
        label.style.fontSize = '14px';
        label.textContent = stat.label;
        
        card.appendChild(iconContainer);
        card.appendChild(value);
        card.appendChild(label);
        statsGrid.appendChild(card);
    });
    
    mainContent.appendChild(statsGrid);
    
    // Recent activity
    const activityTitle = createElement('h3', 'text-white mb-4');
    activityTitle.style.fontSize = '20px';
    activityTitle.textContent = 'Recent Activity';
    mainContent.appendChild(activityTitle);
    
    const activityTable = createElement('div', 'rounded-xl overflow-hidden');
    activityTable.style.backgroundColor = '#1E293B';
    
    const table = createElement('table', '');
    table.innerHTML = `
        <thead>
            <tr>
                <th>User</th>
                <th>Action</th>
                <th>Time</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Juan Dela Cruz</td>
                <td>Completed Lesson</td>
                <td>2 minutes ago</td>
            </tr>
            <tr>
                <td>Maria Santos</td>
                <td>Started Unit 2</td>
                <td>15 minutes ago</td>
            </tr>
            <tr>
                <td>Pedro Garcia</td>
                <td>Earned Achievement</td>
                <td>1 hour ago</td>
            </tr>
            <tr>
                <td>Ana Reyes</td>
                <td>Completed Lesson</td>
                <td>2 hours ago</td>
            </tr>
        </tbody>
    `;
    
    activityTable.appendChild(table);
    mainContent.appendChild(activityTable);
    
    screen.appendChild(sidebar);
    screen.appendChild(mainContent);
    container.appendChild(screen);
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}
