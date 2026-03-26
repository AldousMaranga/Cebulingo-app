// Login Screen

function renderLogin() {
    const container = document.getElementById('content-container');
    const isMobile = AppState.isMobile;
    
    const screen = createElement('div', 'flex flex-col h-full');
    screen.style.backgroundColor = '#1C1C1C';
    
    // Header with back button
    const header = createElement('div', `flex items-center gap-4 ${isMobile ? 'p-4' : 'p-8'}`);
    const backBtn = createElement('button', 'btn-icon');
    backBtn.innerHTML = '<i data-lucide="arrow-left" style="width: 20px; height: 20px; color: #6BB6FF;"></i>';
    backBtn.onclick = navigateBack;
    
    const headerTitle = createElement('h2', 'text-white');
    headerTitle.style.fontSize = isMobile ? '20px' : '28px';
    headerTitle.textContent = 'Welcome Back!';
    
    header.appendChild(backBtn);
    header.appendChild(headerTitle);
    screen.appendChild(header);
    
    // Main content
    const content = createElement('div', `flex-1 flex flex-col items-center justify-center ${isMobile ? 'px-8' : 'px-16'} gap-6`);
    
    // Cow mascot
    const cowContainer = createElement('div', 'animate-float mb-4');
    cowContainer.appendChild(createCowMascot(isMobile ? 120 : 160, true, 'happy'));
    content.appendChild(cowContainer);
    
    // Form
    const form = createElement('div', `w-full ${isMobile ? 'max-w-md' : 'max-w-lg'} space-y-4`);
    
    const emailInput = createInput('Email or Username', 'text');
    const passwordInput = createInput('Password', 'password');
    
    const loginButton = createButton('LOG IN', () => {
        const email = emailInput.value;
        const password = passwordInput.value;
        
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        alert('Login successful! Welcome back!');
        navigateTo('main-menu');
    }, 'primary', true);
    loginButton.style.height = isMobile ? '56px' : '64px';
    loginButton.style.fontSize = isMobile ? '16px' : '18px';
    
    const registerLink = createElement('p', 'text-center text-[#BEBEBE]');
    registerLink.style.fontSize = isMobile ? '14px' : '16px';
    registerLink.innerHTML = `Don't have an account? <a href="#" style="color: #6BB6FF; text-decoration: underline;">Register here</a>`;
    registerLink.querySelector('a').onclick = (e) => {
        e.preventDefault();
        navigateTo('register');
    };
    
    form.appendChild(emailInput);
    form.appendChild(passwordInput);
    form.appendChild(loginButton);
    form.appendChild(registerLink);
    
    content.appendChild(form);
    screen.appendChild(content);
    container.appendChild(screen);
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}
