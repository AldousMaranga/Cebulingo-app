// Reusable Components for CebuLingo

// Cow Mascot Component
function createCowMascot(size = 120, animated = true, pose = 'default') {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size * 1.3);
    svg.setAttribute('viewBox', '0 0 120 156');
    svg.setAttribute('fill', 'none');
    
    // SVG content based on pose
    svg.innerHTML = getCowSVGContent(animated, pose);
    
    return svg;
}

function getCowSVGContent(animated, pose) {
    const animateClass = animated ? 'class' : 'data-no-animate';
    
    // Determine arm positions based on pose
    let leftArm = '';
    let rightArm = '';
    let eyesContent = '';
    let mouthContent = '';
    let extraElements = '';
    
    // Left Arm
    if (pose === 'waving') {
        leftArm = `<g ${animateClass}="animate-wave" style="transform-origin: 35px 65px">
            <ellipse cx="32" cy="60" rx="6" ry="16" fill="#D6B68A" transform="rotate(-25 32 60)"/>
            <ellipse cx="28" cy="48" rx="7" ry="8" fill="#D6B68A"/>
            <ellipse cx="25" cy="44" rx="2.5" ry="4" fill="#C9A779"/>
            <ellipse cx="28" cy="42" rx="2.5" ry="4" fill="#C9A779"/>
            <ellipse cx="31" cy="44" rx="2.5" ry="4" fill="#C9A779"/>
        </g>`;
    } else if (pose === 'celebrating') {
        leftArm = `<g ${animateClass}="animate-celebrate-left">
            <ellipse cx="32" cy="55" rx="6" ry="18" fill="#D6B68A" transform="rotate(-35 32 55)"/>
            <ellipse cx="26" cy="42" rx="7" ry="8" fill="#D6B68A"/>
        </g>`;
    } else if (pose === 'thinking') {
        leftArm = `<g>
            <ellipse cx="38" cy="68" rx="6" ry="14" fill="#D6B68A" transform="rotate(15 38 68)"/>
            <ellipse cx="40" cy="56" rx="7" ry="8" fill="#D6B68A"/>
        </g>`;
    } else {
        leftArm = `<g>
            <ellipse cx="35" cy="70" rx="6" ry="16" fill="#D6B68A" transform="rotate(-10 35 70)"/>
            <ellipse cx="33" cy="86" rx="6" ry="7" fill="#D6B68A"/>
        </g>`;
    }
    
    // Right Arm
    if (pose === 'celebrating') {
        rightArm = `<g ${animateClass}="animate-celebrate-right">
            <ellipse cx="88" cy="55" rx="6" ry="18" fill="#D6B68A" transform="rotate(35 88 55)"/>
            <ellipse cx="94" cy="42" rx="7" ry="8" fill="#D6B68A"/>
        </g>`;
    } else if (pose === 'encouraging' || pose === 'happy') {
        rightArm = `<g>
            <ellipse cx="85" cy="65" rx="6" ry="16" fill="#D6B68A" transform="rotate(20 85 65)"/>
            <ellipse cx="90" cy="52" rx="7" ry="8" fill="#D6B68A"/>
            <ellipse cx="92" cy="46" rx="3" ry="5" fill="#C9A779" transform="rotate(20 92 46)"/>
        </g>`;
    } else {
        rightArm = `<g>
            <ellipse cx="85" cy="70" rx="6" ry="16" fill="#D6B68A" transform="rotate(10 85 70)"/>
            <ellipse cx="87" cy="86" rx="6" ry="7" fill="#D6B68A"/>
        </g>`;
    }
    
    // Eyes
    if (pose === 'celebrating' || pose === 'happy') {
        eyesContent = `
            <g ${animateClass}="animate-blink">
                <ellipse cx="46" cy="40" rx="8" ry="9" fill="#FFFFFF"/>
                <circle cx="47" cy="41" r="6" fill="#2C2C2C"/>
                <circle cx="49" cy="39" r="3" fill="#FFFFFF"/>
                <path d="M 40 36 Q 46 34 52 36" stroke="#5A4A3A" stroke-width="2" fill="none" stroke-linecap="round"/>
            </g>
            <g ${animateClass}="animate-blink">
                <ellipse cx="74" cy="40" rx="8" ry="9" fill="#FFFFFF"/>
                <circle cx="73" cy="41" r="6" fill="#2C2C2C"/>
                <circle cx="71" cy="39" r="3" fill="#FFFFFF"/>
                <path d="M 68 36 Q 74 34 80 36" stroke="#5A4A3A" stroke-width="2" fill="none" stroke-linecap="round"/>
            </g>`;
    } else if (pose === 'thinking') {
        eyesContent = `
            <g ${animateClass}="animate-blink">
                <ellipse cx="46" cy="40" rx="7" ry="8" fill="#FFFFFF"/>
                <circle cx="48" cy="41" r="5" fill="#2C2C2C"/>
                <circle cx="49" cy="39" r="2.5" fill="#FFFFFF"/>
            </g>
            <g ${animateClass}="animate-blink">
                <ellipse cx="74" cy="38" rx="7" ry="8" fill="#FFFFFF"/>
                <circle cx="73" cy="39" r="5" fill="#2C2C2C"/>
                <circle cx="71" cy="37" r="2.5" fill="#FFFFFF"/>
            </g>`;
    } else {
        eyesContent = `
            <g ${animateClass}="animate-blink">
                <ellipse cx="46" cy="40" rx="8" ry="9" fill="#FFFFFF"/>
                <circle cx="47" cy="41" r="6" fill="#2C2C2C"/>
                <circle cx="49" cy="39" r="3" fill="#FFFFFF"/>
            </g>
            <g ${animateClass}="animate-blink">
                <ellipse cx="74" cy="40" rx="8" ry="9" fill="#FFFFFF"/>
                <circle cx="73" cy="41" r="6" fill="#2C2C2C"/>
                <circle cx="71" cy="39" r="3" fill="#FFFFFF"/>
            </g>`;
    }
    
    // Mouth
    if (pose === 'celebrating' || pose === 'happy') {
        mouthContent = `<path d="M 48 58 Q 60 64 72 58" stroke="#5A4A3A" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
    } else if (pose === 'thinking') {
        mouthContent = `<path d="M 50 58 Q 56 60 62 58" stroke="#5A4A3A" stroke-width="2" fill="none" stroke-linecap="round"/>`;
    } else {
        mouthContent = `<path d="M 48 58 Q 60 62 72 58" stroke="#5A4A3A" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
    }
    
    // Extra elements
    if (pose === 'thinking') {
        extraElements = `
            <circle cx="20" cy="35" r="2" fill="#6BB6FF" opacity="0.6"/>
            <circle cx="14" cy="28" r="3" fill="#6BB6FF" opacity="0.7"/>
            <ellipse cx="8" cy="18" rx="8" ry="10" fill="#6BB6FF" opacity="0.8" stroke="#1A73E8" stroke-width="1"/>
            <text x="5" y="21" fill="#1A73E8" font-size="12">?</text>`;
    } else if (pose === 'celebrating' || pose === 'happy') {
        extraElements = `<g ${animateClass}="animate-float">
            <path d="M 10,20 Q 10,15 14,15 Q 18,15 18,20 Q 18,25 10,30 Q 2,25 2,20 Q 2,15 6,15 Q 10,15 10,20" fill="#FF6B9D" opacity="0.7"/>
            <path d="M 108,25 Q 108,21 111,21 Q 114,21 114,25 Q 114,28 108,32 Q 102,28 102,25 Q 102,21 105,21 Q 108,21 108,25" fill="#FF6B9D" opacity="0.7"/>
        </g>`;
    }
    
    return `
        <!-- Tail -->
        <g ${animateClass}="animate-wag" style="transform-origin: 88px 88px">
            <path d="M 88 88 Q 98 90 102 94 Q 106 98 104 102" stroke="#D6B68A" stroke-width="4" fill="none" stroke-linecap="round"/>
            <ellipse cx="104" cy="104" rx="4" ry="6" fill="#8B7355"/>
        </g>
        
        <!-- Back legs -->
        <rect x="66" y="105" width="10" height="38" rx="5" fill="#D6B68A"/>
        <rect x="48" y="105" width="10" height="38" rx="5" fill="#D6B68A"/>
        <ellipse cx="71" cy="143" rx="6" ry="4.5" fill="#5A4A3A"/>
        <ellipse cx="53" cy="143" rx="6" ry="4.5" fill="#5A4A3A"/>
        
        <!-- Body -->
        <ellipse cx="60" cy="82" rx="32" ry="28" fill="#D6B68A"/>
        <ellipse cx="60" cy="90" rx="18" ry="14" fill="#E8C9A1" opacity="0.6"/>
        <ellipse cx="42" cy="76" rx="8" ry="6" fill="#C9A779" opacity="0.7"/>
        <ellipse cx="72" cy="80" rx="9" ry="7" fill="#C9A779" opacity="0.7"/>
        <ellipse cx="54" cy="92" rx="7" ry="5" fill="#C9A779" opacity="0.7"/>
        
        <!-- Front legs -->
        <rect x="62" y="105" width="10" height="38" rx="5" fill="#D6B68A"/>
        <rect x="44" y="105" width="10" height="38" rx="5" fill="#D6B68A"/>
        <ellipse cx="67" cy="143" rx="6" ry="4.5" fill="#5A4A3A"/>
        <ellipse cx="49" cy="143" rx="6" ry="4.5" fill="#5A4A3A"/>
        
        <!-- Right arm -->
        ${rightArm}
        
        <!-- Neck -->
        <ellipse cx="60" cy="58" rx="18" ry="16" fill="#D6B68A"/>
        
        <!-- Head -->
        <ellipse cx="60" cy="42" rx="26" ry="24" fill="#D6B68A"/>
        
        <!-- Left ear -->
        <g ${animateClass}="animate-wiggle" style="transform-origin: 40px 28px">
            <ellipse cx="40" cy="28" rx="10" ry="14" fill="#D6B68A"/>
            <ellipse cx="40" cy="30" rx="6" ry="9" fill="#E8C9A1"/>
        </g>
        
        <!-- Right ear -->
        <g ${animateClass}="animate-wiggle" style="transform-origin: 80px 28px">
            <ellipse cx="80" cy="28" rx="10" ry="14" fill="#D6B68A"/>
            <ellipse cx="80" cy="30" rx="6" ry="9" fill="#E8C9A1"/>
        </g>
        
        <!-- Horns -->
        <path d="M 38 22 Q 33 16 31 14 Q 29 12 30 15" stroke="#F5E6D3" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M 38 22 Q 33 16 31 14" stroke="#8B7355" stroke-width="2" fill="none" stroke-linecap="round"/>
        <path d="M 82 22 Q 87 16 89 14 Q 91 12 90 15" stroke="#F5E6D3" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M 82 22 Q 87 16 89 14" stroke="#8B7355" stroke-width="2" fill="none" stroke-linecap="round"/>
        
        <!-- Snout -->
        <ellipse cx="60" cy="52" rx="18" ry="14" fill="#E8C9A1"/>
        <ellipse cx="54" cy="53" rx="3.5" ry="4.5" fill="#5A4A3A"/>
        <ellipse cx="66" cy="53" rx="3.5" ry="4.5" fill="#5A4A3A"/>
        
        <!-- Eyes -->
        ${eyesContent}
        
        <!-- Mouth -->
        ${mouthContent}
        
        <!-- Rosy cheeks -->
        <ellipse cx="34" cy="48" rx="7" ry="6" fill="#FFB6C1" opacity="0.5"/>
        <ellipse cx="86" cy="48" rx="7" ry="6" fill="#FFB6C1" opacity="0.5"/>
        
        <!-- Forehead spot -->
        <ellipse cx="60" cy="32" rx="7" ry="5" fill="#C9A779" opacity="0.6"/>
        
        <!-- Left arm -->
        ${leftArm}
        
        <!-- Extra elements -->
        ${extraElements}
    `;
}

// Sparkle Effect Component
function createSparkleEffect() {
    const container = createElement('div', 'absolute inset-0 pointer-events-none overflow-hidden');
    
    for (let i = 0; i < 20; i++) {
        const sparkle = createElement('div', 'sparkle', {
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`
        });
        sparkle.innerHTML = '✨';
        container.appendChild(sparkle);
    }
    
    return container;
}

// Progress Header Component
function createProgressHeader(progress, onBack) {
    const header = createElement('div', 'flex items-center gap-4 p-4');
    
    const backBtn = createElement('button', 'btn-icon');
    backBtn.innerHTML = '<i data-lucide="arrow-left" style="width: 20px; height: 20px; color: #6BB6FF;"></i>';
    backBtn.onclick = onBack;
    
    const progressContainer = createElement('div', 'flex-1');
    const progressBar = createElement('div', 'progress-bar');
    const progressFill = createElement('div', 'progress-bar-fill');
    progressFill.style.width = `${progress}%`;
    progressBar.appendChild(progressFill);
    progressContainer.appendChild(progressBar);
    
    header.appendChild(backBtn);
    header.appendChild(progressContainer);
    
    return header;
}

// Button Component
function createButton(text, onClick, style = 'primary', fullWidth = true) {
    const button = createElement('button', `btn btn-${style} ${fullWidth ? 'w-full' : ''}`);
    button.textContent = text;
    button.onclick = onClick;
    return button;
}

// Input Component
function createInput(placeholder, type = 'text') {
    const input = createElement('input', 'input');
    input.type = type;
    input.placeholder = placeholder;
    return input;
}
