// Register Screen

function renderRegister() {
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
    headerTitle.textContent = 'Create Account';
    
    header.appendChild(backBtn);
    header.appendChild(headerTitle);
    screen.appendChild(header);
    
    // Main content
    const content = createElement('div', `flex-1 flex flex-col items-center justify-center ${isMobile ? 'px-8' : 'px-16'} gap-6`);
    
    // Cow mascot
    const cowContainer = createElement('div', 'animate-float mb-4');
    cowContainer.appendChild(createCowMascot(isMobile ? 100 : 140, true, 'encouraging'));
    content.appendChild(cowContainer);
    
    // Form
    const form = createElement('div', `w-full ${isMobile ? 'max-w-md' : 'max-w-lg'} space-y-4`);
    
    const nameInput = createInput('Full Name', 'text');
    const emailInput = createInput('Email', 'email');
    const passwordInput = createInput('Password', 'password');
    const confirmPasswordInput = createInput('Confirm Password', 'password');
    
    const registerButton = createButton('CREATE ACCOUNT', () => {
        const name = nameInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        if (!name || !email || !password || !confirmPassword) {
            alert('Please fill in all fields');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        
        AppState.userData.name = name;
        Storage.save('userData', AppState.userData);
        
        alert('Registration successful! Welcome to CebuLingo!');
        navigateTo('main-menu');
    }, 'primary', true);
    registerButton.style.height = isMobile ? '56px' : '64px';
    registerButton.style.fontSize = isMobile ? '16px' : '18px';
    
    form.appendChild(nameInput);
    form.appendChild(emailInput);
    form.appendChild(passwordInput);
    form.appendChild(confirmPasswordInput);
    form.appendChild(registerButton);
    
    content.appendChild(form);
    screen.appendChild(content);
    container.appendChild(screen);
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}
