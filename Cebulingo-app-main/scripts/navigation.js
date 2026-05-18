// Navigation System for CebuLingo

function navigateTo(screen) {
    // Add current screen to history
    if (AppState.currentScreen && AppState.currentScreen !== screen) {
        AppState.screenHistory.push(AppState.currentScreen);
    }
    
    // Update current screen
    AppState.currentScreen = screen;
    
    // Render the screen
    renderScreen(screen);
}

function navigateBack() {
    if (AppState.screenHistory.length > 0) {
        const previousScreen = AppState.screenHistory.pop();
        AppState.currentScreen = previousScreen;
        renderScreen(previousScreen);
    } else {
        navigateTo('main-menu');
    }
}

function renderScreen(screen) {
    // Clear container
    clearContainer();
    
    // Stop any ongoing speech
    TTS.stop();
    
    // Check if admin page
    const isAdminPage = screen === 'admin-login' || screen === 'admin-dashboard';
    const app = document.getElementById('app');
    const container = document.getElementById('content-container');
    
    if (isAdminPage) {
        app.style.backgroundColor = '#0F172A';
        container.className = 'w-full h-screen';
        container.style.maxWidth = '100%';
        container.style.borderRadius = '0';
    } else {
        app.style.backgroundColor = '#1C1C1C';
        updateViewMode();
    }
    
    // Call the appropriate render function
    const renderFunctionName = `render${screen.split('-').map(s => capitalize(s)).join('')}`;
    const renderFunction = window[renderFunctionName];
    
    if (renderFunction) {
        renderFunction();
    } else {
        console.error(`Render function not found: ${renderFunctionName}`);
        renderMainMenu();
    }
    
    // Re-initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}
