// CebuLingo App - Main Application Logic
// Pure JavaScript implementation

// App State
const AppState = {
    currentScreen: 'main-menu',
    screenHistory: [],
    isMobile: window.innerWidth <= 768,
    userData: {
        name: 'Language Learner',
        streak: 28,
        totalXP: 2580,
        currentLevel: 3,
        completedLessons: []
    },
    lessonData: {
        currentScore: 0,
        totalQuestions: 0,
        wrongQuestions: []
    }
};

// Local Storage Management
const Storage = {
    save(key, data) {
        localStorage.setItem(`cebulingo_${key}`, JSON.stringify(data));
    },
    load(key) {
        const data = localStorage.getItem(`cebulingo_${key}`);
        return data ? JSON.parse(data) : null;
    },
    clear(key) {
        localStorage.removeItem(`cebulingo_${key}`);
    }
};

// Initialize App
function initApp() {
    // Load saved data
    const savedUserData = Storage.load('userData');
    if (savedUserData) {
        AppState.userData = { ...AppState.userData, ...savedUserData };
    }

    // Setup view mode toggle
    setupViewModeToggle();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const wasMobile = AppState.isMobile;
        AppState.isMobile = window.innerWidth <= 768;
        if (wasMobile !== AppState.isMobile) {
            updateViewMode();
        }
    });

    // Initialize navigation
    navigateTo('main-menu');
}

// View Mode Management
function setupViewModeToggle() {
    const app = document.getElementById('app');
    const container = document.getElementById('content-container');
    
    // Check saved preference
    const savedMode = Storage.load('viewMode');
    if (savedMode) {
        AppState.isMobile = savedMode === 'mobile';
        updateViewMode();
    }
}

function toggleViewMode() {
    AppState.isMobile = !AppState.isMobile;
    Storage.save('viewMode', AppState.isMobile ? 'mobile' : 'desktop');
    updateViewMode();
}

function updateViewMode() {
    const app = document.getElementById('app');
    const container = document.getElementById('content-container');
    
    if (AppState.isMobile) {
        app.classList.remove('desktop-mode');
        container.className = 'w-full max-w-[393px] h-screen max-h-[852px] relative overflow-hidden transition-all duration-300 shadow-2xl';
    } else {
        app.classList.add('desktop-mode');
        container.className = 'w-full max-w-[1200px] h-screen relative overflow-hidden transition-all duration-300 rounded-lg shadow-2xl';
    }
    container.style.backgroundColor = '#1C1C1C';
    
    // Re-render current screen
    const currentRender = window[`render${capitalize(AppState.currentScreen.replace(/-([a-z])/g, (g) => g[1].toUpperCase()))}`];
    if (currentRender) {
        currentRender();
    }
}

// Utility Functions
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function createElement(tag, className, styles = {}) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    Object.assign(element.style, styles);
    return element;
}

function clearContainer() {
    const container = document.getElementById('content-container');
    container.innerHTML = '';
}

// Sound Effects
const SoundEffects = {
    playCorrect() {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVK3m7KlcFQxBouLyvHAjBjiO1vPOeSsFJHnI8d2RQwoUX7Xq66tYFApGnt/yvWsgBDGH0fPTgjMGHm7A7+OZSA0PVK3m7KlcFQxBouLyvHAjBjiO1vPOeSsFJHnI8d2RQwoUX7Xq66tYFApGnt/yvWsgBDGH0fPTgjMGHm7A7+OZSA0PVK3m7KlcFQxBouLyvHAjBjiO1vPOeSsFJHnI8d2RQwoUX7Xq66tYFApGnt/yvWsgBDGH0fPTgjMGHm7A7+OZSA0PVK3m7KlcFQxBouLyvHAjBjiO1vPOeSsFJHnI8d2RQwoUX7Xq66tYFApGnt/yvWsgBDGH0fPTgjMGHm7A7+OZSA0PVK3m7KlcFQxBouLyvHAjBjiO1vPOeSsFJHnI8d2RQwoUX7Xq66tYFApGnt/yvWsgBDGH0fPTgjMGHm7A7+OZSA0PVK3m7KlcFQxBouLyvHAjBjiO1vPOeSsFJHnI8d2RQwoUX7Xq66tYFApGnt/yvWsgBDGH0fPTgjMGHm7A7+OZSA0PVK3m7KlcFQxBouLyvHAjBjiO1vPOeSsFJHnI8d2RQwoUX7Xq66tYFApGnt/yvWsgBDGH0fPTgjMGHm7A7+OZSA0PVK3m7KlcFQxBouLyvHAjBjiO1vPOeSsFJHnI8d2RQwoUX7Xq66tYFApGnt/yvWsgBDGH0fPTgjMGHm7A7+OZSA0PVK3m7KlcFQxBouLyvHAjBjiO1vPOeSsFJHnI8d2RQwoUX7Xq66tYFApGnt/yvWsgBDGH0fPTgjMGHm7A7+OZSA0PVK3m7Kl=');
        audio.volume = 0.3;
        audio.play().catch(() => {});
    },
    playIncorrect() {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBj+a2/LDciUFLIHO8tiJNwgZaLvt55==');
        audio.volume = 0.3;
        audio.play().catch(() => {});
    }
};

// Text-to-Speech
const TTS = {
    speak(text, lang = 'fil-PH') {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang;
            utterance.rate = 0.8;
            window.speechSynthesis.cancel(); // Cancel any ongoing speech
            window.speechSynthesis.speak(utterance);
        }
    },
    stop() {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
    }
};

// Save user data periodically
setInterval(() => {
    Storage.save('userData', AppState.userData);
}, 30000); // Save every 30 seconds

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
