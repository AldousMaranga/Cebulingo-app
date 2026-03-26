# CebuLingo - Pure HTML/CSS/JavaScript Version

## Overview

CebuLingo has been successfully converted from React to pure HTML, CSS, and vanilla JavaScript while maintaining all the original designs and functionality.

## Technology Stack

- **HTML5** - Structure and markup
- **CSS3** - Styling with custom CSS and Tailwind-inspired utilities
- **Vanilla JavaScript** - All application logic and interactivity
- **Lucide Icons** - Icon library (loaded via CDN)
- **Web APIs**:
  - LocalStorage for data persistence
  - Web Speech API for text-to-speech
  - Audio API for sound effects

## File Structure

```
/
├── index.html                          # Main HTML file
├── styles/
│   ├── globals.css                     # Global styles and animations
│   └── components.css                  # Component-specific styles
├── scripts/
│   ├── app.js                          # Main app logic and state management
│   ├── navigation.js                   # Navigation system
│   ├── components.js                   # Reusable components (Cow, buttons, etc.)
│   └── screens/
│       ├── mainMenu.js                 # Main menu screen
│       ├── login.js                    # Login screen
│       ├── register.js                 # Registration screen
│       ├── quickIntro.js               # Quick intro screen
│       ├── questions.js                # Onboarding questions (1-3)
│       ├── motivation.js               # Motivation screen
│       ├── dashboard.js                # 3D learning path dashboard
│       ├── lessonStart.js              # Lesson start screen
│       ├── lessonReviewer.js           # Lesson reviewer
│       ├── lessonGameplay.js           # Quiz gameplay
│       ├── lessonComplete.js           # Lesson completion screen
│       ├── leaderboard.js              # Leaderboard with podium
│       ├── moduleList.js               # Module list screen
│       ├── profile.js                  # User profile
│       ├── adminLogin.js               # Admin login
│       └── adminDashboard.js           # Admin dashboard
└── README.md                           # This file
```

## Features

### ✅ Fully Implemented

1. **Main Menu** - With animated cow mascot, sparkle effects, and navigation buttons
2. **Authentication** - Login and registration screens
3. **Onboarding Flow** - Quick intro and 3 personalized questions
4. **3D Learning Dashboard** - Vertical learning path with units and lessons
5. **Lesson System** - Start, reviewer, quiz gameplay, and completion screens
6. **Quiz Mechanics** - Image-based questions with sound effects and visual feedback
7. **Text-to-Speech** - Pronunciation support for Cebuano words
8. **Leaderboard** - Podium display and user rankings
9. **Module List** - 6 learning modules with progress tracking
10. **Profile** - User stats and achievements
11. **Admin Dashboard** - Full admin panel with analytics
12. **Responsive Design** - Desktop/mobile mode switcher
13. **Local Storage** - Data persistence
14. **Animations** - All custom animations (float, wiggle, wag, bounce, etc.)

### 🎨 Design Features

- **Color Scheme**: Primary Blue (#1A73E8), Accent Blue (#6BB6FF), Dark Grey (#1C1C1C)
- **Cow Mascot**: Fully animated with multiple poses (waving, celebrating, thinking, happy, encouraging)
- **Fredoka Font**: Gamified typography throughout
- **Smooth Gradients**: Blue gradients on primary buttons
- **Soft Shadows**: Depth and elevation
- **Rounded Design**: Consistent border-radius
- **Sparkle Effects**: Celebratory animations

## How to Run

### Option 1: Local Server (Recommended)

1. Make sure you have a local development server installed
2. Navigate to the project directory
3. Start a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js http-server
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```
4. Open your browser and go to `http://localhost:8000`

### Option 2: File Protocol

Simply open `index.html` in your web browser. Note: Some features like sound effects may not work properly due to browser security restrictions.

## Key Components

### Cow Mascot

The cow mascot is created using pure SVG and supports multiple poses:
- `default` - Normal standing pose
- `waving` - Waving hand
- `celebrating` - Both arms raised
- `thinking` - Hand to chin with thought bubble
- `encouraging` - Thumbs up
- `happy` - Happy expression with hearts

### State Management

The app uses a simple state management system:

```javascript
AppState = {
    currentScreen: 'main-menu',
    screenHistory: [],
    isMobile: window.innerWidth <= 768,
    userData: { ... },
    lessonData: { ... }
}
```

### Navigation System

Navigation is handled through two main functions:
- `navigateTo(screen)` - Navigate to a new screen
- `navigateBack()` - Go back to previous screen

### Local Storage

Data is automatically saved to localStorage:
- User data (name, XP, streak, level)
- View mode preference (mobile/desktop)
- Lesson progress

## Admin Access

To access the admin dashboard:
1. Click the shield icon in the top-right corner of the main menu
2. Use credentials: `admin` / `admin`

## Browser Compatibility

- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

## Responsive Design

The app supports two view modes:
- **Mobile Mode**: iPhone 16 Pro (393px × 852px)
- **Desktop Mode**: Wide layout (up to 1200px)

Toggle between modes using the monitor/smartphone icon in the top-left corner.

## Sound Effects

The app includes sound effects for:
- Correct answers
- Incorrect answers

These use basic Audio API with data URIs for maximum compatibility.

## Text-to-Speech

Cebuano pronunciation uses the Web Speech API with Filipino accent (`fil-PH`). Speaker icons appear next to words for pronunciation practice.

## Customization

### Colors

Edit the CSS variables in `/styles/globals.css`:
```css
--color-primary: #1A73E8;
--color-accent: #6BB6FF;
--color-cow: #D6B68A;
--color-background: #1C1C1C;
```

### Animations

All animations are defined in `/styles/globals.css` using CSS keyframes.

### Content

Quiz questions and lesson content can be modified in:
- `/scripts/screens/lessonGameplay.js` - Quiz questions
- `/scripts/screens/lessonReviewer.js` - Review vocabulary

## Performance

The app is optimized for performance:
- No external framework dependencies (except Lucide icons)
- Minimal DOM manipulation
- CSS animations for smooth performance
- LocalStorage for fast data access

## Known Limitations

1. **Images**: Quiz images use placeholder emojis. To use real images, integrate with Unsplash API or use local images.
2. **Sounds**: Basic sound effects are included as data URIs. For better quality, replace with actual audio files.
3. **TTS**: Web Speech API support varies by browser and requires internet connection.

## Future Enhancements

Potential improvements:
- [ ] Real image integration with Unsplash API
- [ ] Better sound effects
- [ ] More quiz question types
- [ ] Achievement notifications
- [ ] Streak reminders
- [ ] Social sharing
- [ ] Offline support with Service Workers

## Credits

- **Icons**: Lucide Icons
- **Font**: Google Fonts - Fredoka
- **Design**: Inspired by Duolingo
- **Language**: Cebuano (Bisaya)

## License

This is a demonstration project. All rights reserved.

---

**Note**: This is a pure HTML/CSS/JavaScript implementation with no build process required. Simply open `index.html` to run the app!
