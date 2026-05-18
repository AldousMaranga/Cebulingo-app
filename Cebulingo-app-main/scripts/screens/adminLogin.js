// Admin Login Screen

function renderAdminLogin() {
    const container = document.getElementById('content-container');
    
    const screen = createElement('div', 'flex flex-col h-full items-center justify-center');
    screen.style.backgroundColor = '#0F172A';
    
    const content = createElement('div', 'px-16 w-full max-w-md');
    
    // Icon
    const iconContainer = createElement('div', 'text-center mb-8');
    iconContainer.innerHTML = '<i data-lucide="shield" style="width: 80px; height: 80px; color: #6BB6FF; margin: 0 auto; display: block;"></i>';
    
    // Title
    const title = createElement('h1', 'text-white text-center mb-8');
    title.style.fontSize = '32px';
    title.textContent = 'Admin Access';
    
    content.appendChild(iconContainer);
    content.appendChild(title);
    
    // Form
    const form = createElement('div', 'space-y-4');
    
    const usernameInput = createInput('Username', 'text');
    const passwordInput = createInput('Password', 'password');
    
    const loginButton = createButton('LOGIN', () => {
        const username = usernameInput.value;
        const password = passwordInput.value;
        
        if (username === 'admin' && password === 'admin') {
            navigateTo('admin-dashboard');
        } else {
            alert('Invalid credentials. Use admin/admin');
        }
    }, 'primary', true);
    loginButton.style.height = '56px';
    
    const backButton = createButton('BACK', () => navigateTo('main-menu'), 'secondary', true);
    backButton.style.height = '48px';
    
    form.appendChild(usernameInput);
    form.appendChild(passwordInput);
    form.appendChild(loginButton);
    form.appendChild(backButton);
    
    content.appendChild(form);
    screen.appendChild(content);
    container.appendChild(screen);
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}
