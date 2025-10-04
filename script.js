// Nexus Protocol Website JavaScript
// Modern, immersive sci-fi website with 3D animations and interactive elements

// Terminal Intro Animation Class
class TerminalIntro {
    constructor() {
        this.typingSpeed = 50; // ms per character
        this.lineDelay = 800; // ms between lines
        this.currentLine = 0;
        this.lines = [];
        this.isTyping = false;
        this.audioContext = null;
        this.soundEnabled = true;
        
        this.init();
    }

    init() {
        this.lines = document.querySelectorAll('.terminal-line');
        this.setupAudio();
        this.setupSkipButton();
    }

    setupAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
            this.soundEnabled = false;
        }
    }

    setupSkipButton() {
        const skipBtn = document.getElementById('skip-intro-btn');
        if (skipBtn) {
            skipBtn.addEventListener('click', () => {
                this.skipIntro();
            });
        }
    }

    playKeySound() {
        // Sound effects removed as requested
        return;
    }

    async start() {
        this.isTyping = true;
        await this.delay(1000); // Initial delay
        
        for (let i = 0; i < this.lines.length; i++) {
            if (this.isTyping) {
                await this.typeLine(this.lines[i], i);
                await this.delay(this.lineDelay);
            }
        }
        
        if (this.isTyping) {
            await this.delay(2000); // Final delay
            await this.zoomIntoWebsite();
            await this.showWelcomeSequence();
        }
    }

    async typeLine(lineElement, lineIndex) {
        const commandElement = lineElement.querySelector('.command');
        const cursorElement = lineElement.querySelector('.cursor');
        const text = commandElement.getAttribute('data-text');
        
        // Show the line
        lineElement.classList.add('visible');
        lineElement.classList.add('typing');
        
        // Type each character
        for (let i = 0; i <= text.length; i++) {
            if (this.isTyping) {
                commandElement.textContent = text.substring(0, i);
                await this.delay(this.typingSpeed);
            }
        }
        
        // Remove typing class and cursor
        lineElement.classList.remove('typing');
        cursorElement.style.display = 'none';
        
        // Trigger UI element reveal based on line
        this.revealUIElement(lineIndex);
    }

    revealUIElement(lineIndex) {
        const uiElements = [
            null, // "Initializing system..." - no UI element
            null, // "Verifying credentials..." - no UI element
            null, // "Access granted." - no UI element
            null, // "Building interface..." - no UI element
            '.navbar', // "Loading header..."
            '.navbar', // "Constructing navigation bar..."
            '.cta-button', // "Injecting Discord link..."
            '.gallery-container', // "Spawning media gallery..."
            null // "System ready." - no UI element
        ];
        
        const selector = uiElements[lineIndex];
        if (selector) {
            const element = document.querySelector(selector);
            if (element) {
                gsap.from(element, {
                    duration: 0.8,
                    opacity: 0,
                    y: 20,
                    ease: 'power2.out'
                });
            }
        }
    }

    async zoomIntoWebsite() {
        const terminalIntro = document.getElementById('terminal-intro');
        const terminalContainer = document.querySelector('.terminal-container');
        
        if (terminalIntro && terminalContainer) {
            // Create zoom effect
            gsap.to(terminalContainer, {
                duration: 2,
                scale: 0.1,
                opacity: 0,
                ease: 'power3.inOut',
                onComplete: () => {
                    // Hide terminal and show website
                    terminalIntro.style.display = 'none';
                }
            });
            
            // Zoom in the website content
            const websiteContent = document.querySelector('body > *:not(#terminal-intro)');
            if (websiteContent) {
                gsap.from(websiteContent, {
                    duration: 2,
                    scale: 0.8,
                    opacity: 0,
                    ease: 'power3.out'
                });
            }
            
            await this.delay(2000);
        }
    }

    async showWelcomeSequence() {
        // Create welcome terminal overlay
        const welcomeTerminal = this.createWelcomeTerminal();
        document.body.appendChild(welcomeTerminal);
        
        // Show welcome message
        await this.typeWelcomeMessage(welcomeTerminal);
        
        // Show developer credits
        await this.typeDeveloperCredits(welcomeTerminal);
        
        // Fade out welcome terminal
        await this.fadeOutWelcomeTerminal(welcomeTerminal);
        
        // Create persistent navigation panel
        this.createPersistentNavigationPanel();
    }

    createWelcomeTerminal() {
        const terminal = document.createElement('div');
        terminal.className = 'welcome-terminal';
        terminal.innerHTML = `
            <div class="welcome-terminal-container">
                <div class="welcome-terminal-header">
                    <div class="welcome-terminal-title">NEXUS PROTOCOL - WELCOME</div>
                </div>
                <div class="welcome-terminal-body">
                    <div class="welcome-terminal-content">
                        <div class="welcome-line">
                            <span class="welcome-prompt">></span>
                            <span class="welcome-command" data-text="Hello, User!"></span>
                            <span class="welcome-cursor">_</span>
                        </div>
                        <div class="welcome-line">
                            <span class="welcome-prompt">></span>
                            <span class="welcome-command" data-text="This game was developed by:"></span>
                            <span class="welcome-cursor">_</span>
                        </div>
                        <div class="welcome-line">
                            <span class="welcome-prompt">></span>
                            <span class="welcome-command" data-text="- Spring"></span>
                            <span class="welcome-cursor">_</span>
                        </div>
                        <div class="welcome-line">
                            <span class="welcome-prompt">></span>
                            <span class="welcome-command" data-text="- Chez"></span>
                            <span class="welcome-cursor">_</span>
                        </div>
                        <div class="welcome-line">
                            <span class="welcome-prompt">></span>
                            <span class="welcome-command" data-text="- Rei"></span>
                            <span class="welcome-cursor">_</span>
                        </div>
                        <div class="welcome-line">
                            <span class="welcome-prompt">></span>
                            <span class="welcome-command" data-text="- The Candy Man"></span>
                            <span class="welcome-cursor">_</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        return terminal;
    }

    async typeWelcomeMessage(terminal) {
        const welcomeLine = terminal.querySelector('.welcome-line');
        const commandElement = welcomeLine.querySelector('.welcome-command');
        const cursorElement = welcomeLine.querySelector('.welcome-cursor');
        const text = commandElement.getAttribute('data-text');
        
        // Show the line
        welcomeLine.classList.add('visible');
        welcomeLine.classList.add('typing');
        
        // Type each character
        for (let i = 0; i <= text.length; i++) {
            if (this.isTyping) {
                commandElement.textContent = text.substring(0, i);
                await this.delay(this.typingSpeed);
            }
        }
        
        // Remove typing class and cursor
        welcomeLine.classList.remove('typing');
        cursorElement.style.display = 'none';
        
        await this.delay(1500);
    }

    async typeDeveloperCredits(terminal) {
        const creditLines = terminal.querySelectorAll('.welcome-line:not(:first-child)');
        
        for (let i = 0; i < creditLines.length; i++) {
            const line = creditLines[i];
            const commandElement = line.querySelector('.welcome-command');
            const cursorElement = line.querySelector('.welcome-cursor');
            const text = commandElement.getAttribute('data-text');
            
            // Show the line
            line.classList.add('visible');
            line.classList.add('typing');
            
            // Type each character
            for (let j = 0; j <= text.length; j++) {
                if (this.isTyping) {
                    commandElement.textContent = text.substring(0, j);
                    await this.delay(this.typingSpeed);
                }
            }
            
            // Remove typing class and cursor
            line.classList.remove('typing');
            cursorElement.style.display = 'none';
            
            await this.delay(this.lineDelay);
        }
        
        await this.delay(2000);
    }

    async fadeOutWelcomeTerminal(terminal) {
        gsap.to(terminal, {
            duration: 1.5,
            opacity: 0,
            scale: 0.8,
            ease: 'power3.inOut',
            onComplete: () => {
                terminal.remove();
            }
        });
        
        await this.delay(1500);
    }

    async showInteractiveTerminal() {
        // Create interactive terminal overlay
        const interactiveTerminal = this.createInteractiveTerminal();
        document.body.appendChild(interactiveTerminal);
        
        // Show navigation message
        await this.typeNavigationMessage(interactiveTerminal);
        
        // Show navigation options
        await this.typeNavigationOptions(interactiveTerminal);
        
        // Setup interactive functionality
        this.setupInteractiveNavigation(interactiveTerminal);
    }

    createInteractiveTerminal() {
        const terminal = document.createElement('div');
        terminal.className = 'interactive-terminal';
        terminal.innerHTML = `
            <div class="interactive-terminal-container">
                <div class="interactive-terminal-header">
                    <div class="interactive-terminal-title">NEXUS PROTOCOL - NAVIGATION</div>
                    <div class="terminal-controls">
                        <span class="control-btn minimize"></span>
                        <span class="control-btn maximize"></span>
                        <span class="control-btn close" id="close-interactive-terminal"></span>
                    </div>
                </div>
                <div class="interactive-terminal-body">
                    <div class="interactive-terminal-content">
                        <div class="interactive-line">
                            <span class="interactive-prompt">></span>
                            <span class="interactive-command" data-text="Would you like to visit one of the following categories?"></span>
                            <span class="interactive-cursor">_</span>
                        </div>
                        <div class="interactive-line">
                            <span class="interactive-prompt">></span>
                            <span class="interactive-command" data-text="- About the Game"></span>
                            <span class="interactive-cursor">_</span>
                        </div>
                        <div class="interactive-line">
                            <span class="interactive-prompt">></span>
                            <span class="interactive-command" data-text="- Worlds & Lore"></span>
                            <span class="interactive-cursor">_</span>
                        </div>
                        <div class="interactive-line">
                            <span class="interactive-prompt">></span>
                            <span class="interactive-command" data-text="- Community Hub"></span>
                            <span class="interactive-cursor">_</span>
                        </div>
                    </div>
                </div>
                <div class="interactive-terminal-footer">
                    <div class="terminal-status">
                        <span class="status-indicator"></span>
                        <span class="status-text">Awaiting selection...</span>
                    </div>
                </div>
            </div>
        `;
        return terminal;
    }

    async typeNavigationMessage(terminal) {
        const messageLine = terminal.querySelector('.interactive-line');
        const commandElement = messageLine.querySelector('.interactive-command');
        const cursorElement = messageLine.querySelector('.interactive-cursor');
        const text = commandElement.getAttribute('data-text');
        
        // Show the line
        messageLine.classList.add('visible');
        messageLine.classList.add('typing');
        
        // Type each character
        for (let i = 0; i <= text.length; i++) {
            if (this.isTyping) {
                commandElement.textContent = text.substring(0, i);
                await this.delay(this.typingSpeed);
            }
        }
        
        // Remove typing class and cursor
        messageLine.classList.remove('typing');
        cursorElement.style.display = 'none';
        
        await this.delay(1500);
    }

    async typeNavigationOptions(terminal) {
        const optionLines = terminal.querySelectorAll('.interactive-line:not(:first-child)');
        
        for (let i = 0; i < optionLines.length; i++) {
            const line = optionLines[i];
            const commandElement = line.querySelector('.interactive-command');
            const cursorElement = line.querySelector('.interactive-cursor');
            const text = commandElement.getAttribute('data-text');
            
            // Show the line
            line.classList.add('visible');
            line.classList.add('typing');
            
            // Type each character
            for (let j = 0; j <= text.length; j++) {
                if (this.isTyping) {
                    commandElement.textContent = text.substring(0, j);
                    await this.delay(this.typingSpeed);
                }
            }
            
            // Remove typing class and cursor
            line.classList.remove('typing');
            cursorElement.style.display = 'none';
            
            // Make the line clickable
            line.classList.add('clickable');
            line.setAttribute('data-section', this.getSectionId(text));
            
            await this.delay(this.lineDelay);
        }
        
        // Update status
        const statusText = terminal.querySelector('.status-text');
        if (statusText) {
            statusText.textContent = 'Ready for selection';
        }
    }

    getSectionId(text) {
        const sectionMap = {
            '- About the Game': 'about',
            '- Worlds & Lore': 'worlds',
            '- Community Hub': 'community'
        };
        return sectionMap[text] || '';
    }

    setupInteractiveNavigation(terminal) {
        const clickableLines = terminal.querySelectorAll('.clickable');
        const closeBtn = terminal.querySelector('#close-interactive-terminal');
        
        // Add click handlers for navigation options
        clickableLines.forEach(line => {
            line.addEventListener('mouseenter', () => {
                line.style.color = '#00FFFF';
                line.style.textShadow = '0 0 10px rgba(0, 255, 255, 0.8)';
                line.style.transform = 'translateX(10px)';
            });
            
            line.addEventListener('mouseleave', () => {
                line.style.color = '#00FF00';
                line.style.textShadow = '0 0 5px rgba(0, 255, 0, 0.3)';
                line.style.transform = 'translateX(0)';
            });
            
            line.addEventListener('click', () => {
                const sectionId = line.getAttribute('data-section');
                this.navigateToSection(sectionId, terminal);
            });
        });
        
        // Add close button handler
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeInteractiveTerminal(terminal);
            });
        }
        
        // Add escape key handler
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && terminal.parentNode) {
                this.closeInteractiveTerminal(terminal);
            }
        });
    }

    navigateToSection(sectionId, terminal) {
        // Update status
        const statusText = terminal.querySelector('.status-text');
        if (statusText) {
            statusText.textContent = 'Navigating...';
        }
        
        // Add navigation effect
        const commandElement = terminal.querySelector(`[data-section="${sectionId}"] .interactive-command`);
        if (commandElement) {
            commandElement.style.color = '#00FFFF';
            commandElement.style.textShadow = '0 0 15px rgba(0, 255, 255, 1)';
        }
        
        // Close terminal and navigate
        setTimeout(() => {
            this.closeInteractiveTerminal(terminal);
            
            // Scroll to section
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }, 1000);
    }

    closeInteractiveTerminal(terminal) {
        gsap.to(terminal, {
            duration: 1,
            opacity: 0,
            scale: 0.8,
            ease: 'power3.inOut',
            onComplete: () => {
                terminal.remove();
            }
        });
    }

    createPersistentNavigationPanel() {
        // Create persistent navigation panel
        const navPanel = document.createElement('div');
        navPanel.className = 'persistent-nav-panel';
        navPanel.innerHTML = `
            <div class="nav-panel-container">
                <div class="nav-panel-header">
                    <div class="nav-panel-title">NAVIGATION</div>
                    <div class="nav-panel-controls">
                        <span class="nav-control-btn minimize" id="minimize-nav-panel"></span>
                        <span class="nav-control-btn close" id="close-nav-panel"></span>
                    </div>
                </div>
                <div class="nav-panel-body">
                    <div class="nav-panel-content">
                        <div class="nav-panel-line">
                            <span class="nav-prompt">></span>
                            <span class="nav-command" data-text="Would you like to visit one of the following categories?"></span>
                        </div>
                        <div class="nav-panel-line clickable" data-section="about">
                            <span class="nav-prompt">></span>
                            <span class="nav-command" data-text="- About the Game"></span>
                        </div>
                        <div class="nav-panel-line clickable" data-section="worlds">
                            <span class="nav-prompt">></span>
                            <span class="nav-command" data-text="- Worlds & Lore"></span>
                        </div>
                        <div class="nav-panel-line clickable" data-section="community">
                            <span class="nav-prompt">></span>
                            <span class="nav-command" data-text="- Community Hub"></span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(navPanel);
        
        // Animate the panel entrance
        gsap.from(navPanel, {
            duration: 1,
            x: 300,
            opacity: 0,
            ease: 'power3.out'
        });
        
        // Setup panel functionality
        this.setupPersistentNavigation(navPanel);
        
        // Type the content
        this.typePersistentNavigationContent(navPanel);
    }

    async typePersistentNavigationContent(panel) {
        const lines = panel.querySelectorAll('.nav-panel-line');
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const commandElement = line.querySelector('.nav-command');
            const text = commandElement.getAttribute('data-text');
            
            // Show the line
            line.classList.add('visible');
            
            // Type each character
            for (let j = 0; j <= text.length; j++) {
                commandElement.textContent = text.substring(0, j);
                await this.delay(this.typingSpeed);
            }
            
            await this.delay(this.lineDelay);
        }
    }

    setupPersistentNavigation(panel) {
        const clickableLines = panel.querySelectorAll('.clickable');
        const minimizeBtn = panel.querySelector('#minimize-nav-panel');
        const closeBtn = panel.querySelector('#close-nav-panel');
        
        // Add click handlers for navigation options
        clickableLines.forEach(line => {
            line.addEventListener('mouseenter', () => {
                line.style.color = '#00FFFF';
                line.style.textShadow = '0 0 10px rgba(0, 255, 255, 0.8)';
                line.style.transform = 'translateX(5px)';
            });
            
            line.addEventListener('mouseleave', () => {
                line.style.color = '#00FF00';
                line.style.textShadow = '0 0 5px rgba(0, 255, 0, 0.3)';
                line.style.transform = 'translateX(0)';
            });
            
            line.addEventListener('click', () => {
                const sectionId = line.getAttribute('data-section');
                this.navigateToSectionFromPanel(sectionId, line);
            });
        });
        
        // Add minimize button handler
        if (minimizeBtn) {
            minimizeBtn.addEventListener('click', () => {
                this.minimizeNavigationPanel(panel);
            });
        }
        
        // Add close button handler
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeNavigationPanel(panel);
            });
        }
    }

    navigateToSectionFromPanel(sectionId, clickedLine) {
        // Add navigation effect
        const commandElement = clickedLine.querySelector('.nav-command');
        if (commandElement) {
            commandElement.style.color = '#00FFFF';
            commandElement.style.textShadow = '0 0 15px rgba(0, 255, 255, 1)';
        }
        
        // Smooth scroll to section
        this.smoothScrollToSection(sectionId);
        
        // Reset the effect after a delay
        setTimeout(() => {
            if (commandElement) {
                commandElement.style.color = '#00FF00';
                commandElement.style.textShadow = '0 0 5px rgba(0, 255, 0, 0.3)';
            }
        }, 1000);
    }

    showNavigationMessage(sectionName) {
        // Create navigation message terminal
        const navMessage = document.createElement('div');
        navMessage.className = 'nav-message-terminal';
        navMessage.innerHTML = `
            <div class="nav-message-container">
                <div class="nav-message-content">
                    <span class="nav-message-prompt">></span>
                    <span class="nav-message-text">Navigating to ${sectionName}...</span>
                    <span class="nav-message-cursor">_</span>
                </div>
            </div>
        `;
        
        document.body.appendChild(navMessage);
        
        // Animate entrance
        gsap.from(navMessage, {
            duration: 0.5,
            y: -50,
            opacity: 0,
            ease: 'power3.out'
        });
        
        // Type the message
        this.typeNavigationMessage(navMessage, sectionName);
        
        // Remove after completion
        setTimeout(() => {
            gsap.to(navMessage, {
                duration: 0.5,
                y: -50,
                opacity: 0,
                ease: 'power3.in',
                onComplete: () => {
                    navMessage.remove();
                }
            });
        }, 3000);
    }

    async typeNavigationMessage(container, sectionName) {
        const textElement = container.querySelector('.nav-message-text');
        const cursorElement = container.querySelector('.nav-message-cursor');
        const fullText = `Navigating to ${sectionName}...`;
        
        // Show cursor
        cursorElement.style.animation = 'blink 1s infinite';
        
        // Type each character
        for (let i = 0; i <= fullText.length; i++) {
            textElement.textContent = fullText.substring(0, i);
            await this.delay(30); // Faster typing for navigation message
        }
        
        // Hide cursor
        cursorElement.style.animation = 'none';
        cursorElement.style.opacity = '0';
    }

    smoothScrollToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (!targetSection) return;
        
        const offsetTop = targetSection.offsetTop - 70; // Account for navbar
        
        // Use native smooth scrolling
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }

    addScrollFeedback(targetSection) {
        // Create scroll feedback effect
        const feedback = document.createElement('div');
        feedback.className = 'scroll-feedback';
        feedback.innerHTML = `
            <div class="scroll-feedback-content">
                <div class="scroll-feedback-line"></div>
                <div class="scroll-feedback-text">${targetSection.id.toUpperCase()}</div>
            </div>
        `;
        
        document.body.appendChild(feedback);
        
        // Animate feedback
        gsap.from(feedback, {
            duration: 0.5,
            scale: 0,
            opacity: 0,
            ease: 'back.out(1.7)'
        });
        
        // Remove feedback
        setTimeout(() => {
            gsap.to(feedback, {
                duration: 0.5,
                scale: 0,
                opacity: 0,
                ease: 'power3.in',
                onComplete: () => {
                    feedback.remove();
                }
            });
        }, 2000);
    }

    minimizeNavigationPanel(panel) {
        const container = panel.querySelector('.nav-panel-container');
        const isMinimized = container.classList.contains('minimized');
        
        if (isMinimized) {
            // Expand
            container.classList.remove('minimized');
            gsap.to(container, {
                duration: 0.3,
                height: 'auto',
                ease: 'power2.out'
            });
        } else {
            // Minimize
            container.classList.add('minimized');
            gsap.to(container, {
                duration: 0.3,
                height: '40px',
                ease: 'power2.out'
            });
        }
    }

    closeNavigationPanel(panel) {
        gsap.to(panel, {
            duration: 0.5,
            x: 300,
            opacity: 0,
            ease: 'power3.inOut',
            onComplete: () => {
                panel.remove();
            }
        });
    }

    completeIntro() {
        // This method is now called after the welcome sequence
        // Update status
        const statusText = document.querySelector('.status-text');
        if (statusText) {
            statusText.textContent = 'Connected';
        }
    }

    skipIntro() {
        this.isTyping = false;
        
        // Show all lines instantly
        this.lines.forEach((line, index) => {
            const commandElement = line.querySelector('.command');
            const cursorElement = line.querySelector('.cursor');
            const text = commandElement.getAttribute('data-text');
            
            line.classList.add('visible');
            commandElement.textContent = text;
            cursorElement.style.display = 'none';
            
            // Reveal all UI elements
            this.revealUIElement(index);
        });
        
        // Skip to website immediately
        setTimeout(() => {
            const terminalIntro = document.getElementById('terminal-intro');
            if (terminalIntro) {
                terminalIntro.style.display = 'none';
            }
        }, 500);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

class NexusWebsite {
    constructor() {
        this.init();
        this.setupTerminalIntro();
        this.setupEventListeners();
        this.setupAnimations();
        this.setupParticles();
        this.setupScrollEffects();
    }

    init() {
        // Initialize GSAP ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);
        
        // Set initial states
        this.currentGalleryIndex = 0;
        this.isMenuOpen = false;
        this.particles = [];
        this.animationFrame = null;
        this.terminalIntro = null;
        this.isIntroSkipped = false;
        
        // Performance optimization
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        // Page reset - always start at top
        this.resetPagePosition();
        
        console.log('Nexus Protocol Website initialized');
    }

    resetPagePosition() {
        // Ensure page starts at the very top
        window.scrollTo(0, 0);
        
        // Prevent any scroll restoration
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        
        // Additional reset for any potential scroll issues
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        // Force scroll to top after a short delay to ensure it sticks
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);
    }

    setupTerminalIntro() {
        // Always show terminal intro on every visit
        this.terminalIntro = new TerminalIntro();
        this.terminalIntro.start();
    }

    hideTerminalIntro() {
        const terminalIntro = document.getElementById('terminal-intro');
        if (terminalIntro) {
            terminalIntro.style.display = 'none';
        }
        this.isIntroSkipped = true;
    }

    setupEventListeners() {
        // Navigation
        this.setupNavigation();
        
        // Gallery carousel
        this.setupGallery();
        
        // FAQ accordion
        this.setupFAQ();
        
        // Lore expansion
        this.setupLoreExpansion();
        
        // Smooth scrolling for anchor links
        this.setupSmoothScrolling();
        
        // Window resize handling
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));
        
        // Performance monitoring
        this.setupPerformanceMonitoring();
        
        // Terminal intro skip functionality
        this.setupTerminalSkip();
    }

    setupTerminalSkip() {
        // Allow skipping with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.isIntroSkipped) {
                const skipBtn = document.getElementById('skip-intro-btn');
                if (skipBtn) {
                    skipBtn.click();
                }
            }
        });
    }

    setupNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Mobile menu toggle
        hamburger.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Close mobile menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.isMenuOpen) {
                    this.toggleMobileMenu();
                }
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', this.throttle(() => {
            this.handleNavbarScroll();
        }, 100));
    }

    toggleMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        this.isMenuOpen = !this.isMenuOpen;
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Animate hamburger bars
        const bars = hamburger.querySelectorAll('.bar');
        if (this.isMenuOpen) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    }

    handleNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    }

    setupGallery() {
        const carouselTrack = document.querySelector('.carousel-track');
        const thumbnails = document.querySelectorAll('.thumbnail');
        const prevBtn = document.querySelector('.carousel-btn.prev');
        const nextBtn = document.querySelector('.carousel-btn.next');
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        // Thumbnail navigation
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                this.goToGallerySlide(index);
            });
        });
        
        // Button navigation
        prevBtn.addEventListener('click', () => {
            this.previousGallerySlide();
        });
        
        nextBtn.addEventListener('click', () => {
            this.nextGallerySlide();
        });
        
        // Auto-play (optional)
        if (!this.isReducedMotion) {
            this.startGalleryAutoPlay();
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.previousGallerySlide();
            } else if (e.key === 'ArrowRight') {
                this.nextGallerySlide();
            }
        });
    }

    goToGallerySlide(index) {
        const carouselTrack = document.querySelector('.carousel-track');
        const thumbnails = document.querySelectorAll('.thumbnail');
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        // Update current index
        this.currentGalleryIndex = index;
        
        // Move carousel
        carouselTrack.style.transform = `translateX(-${index * 100}%)`;
        
        // Update active states
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
        
        galleryItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        
        // Add transition effect
        carouselTrack.style.transition = 'transform 0.5s ease';
        
        setTimeout(() => {
            carouselTrack.style.transition = '';
        }, 500);
    }

    nextGallerySlide() {
        const totalSlides = document.querySelectorAll('.gallery-item').length;
        const nextIndex = (this.currentGalleryIndex + 1) % totalSlides;
        this.goToGallerySlide(nextIndex);
    }

    previousGallerySlide() {
        const totalSlides = document.querySelectorAll('.gallery-item').length;
        const prevIndex = (this.currentGalleryIndex - 1 + totalSlides) % totalSlides;
        this.goToGallerySlide(prevIndex);
    }

    startGalleryAutoPlay() {
        setInterval(() => {
            if (document.visibilityState === 'visible') {
                this.nextGallerySlide();
            }
        }, 5000);
    }

    setupFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-answer').classList.remove('active');
                    }
                });
                
                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                    answer.classList.add('active');
                } else {
                    item.classList.remove('active');
                    answer.classList.remove('active');
                }
            });
        });
    }

    setupLoreExpansion() {
        const expandButtons = document.querySelectorAll('.expand-btn');
        
        expandButtons.forEach(button => {
            button.addEventListener('click', () => {
                const loreDetails = button.nextElementSibling;
                const isExpanded = loreDetails.classList.contains('active');
                
                // Close all other lore details
                document.querySelectorAll('.lore-details').forEach(details => {
                    if (details !== loreDetails) {
                        details.classList.remove('active');
                    }
                });
                
                // Toggle current lore details
                if (!isExpanded) {
                    loreDetails.classList.add('active');
                    button.textContent = 'Show Less';
                } else {
                    loreDetails.classList.remove('active');
                    button.textContent = 'Read More';
                }
            });
        });
    }

    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupAnimations() {
        if (this.isReducedMotion) return;
        
        // Landing page animations
        this.setupLandingAnimations();
        
        // Scroll-triggered animations
        this.setupScrollAnimations();
        
        // Hover effects
        this.setupHoverEffects();
        
    }

    setupLandingAnimations() {
        // Enhanced title entrance animation with 3D effects
        gsap.timeline()
            .from('.title-main', {
                duration: 2,
                y: 100,
                opacity: 0,
                rotationX: 90,
                ease: 'power3.out'
            })
            .from('.title-ring', {
                duration: 1.5,
                scale: 0,
                opacity: 0,
                rotationY: 180,
                ease: 'back.out(1.7)'
            }, '-=1')
            .from('.title-sub', {
                duration: 1.2,
                y: 50,
                opacity: 0,
                rotationX: -45,
                ease: 'power3.out'
            }, '-=0.8')
            .from('.title-tagline', {
                duration: 1,
                y: 30,
                opacity: 0,
                ease: 'power2.out'
            }, '-=0.5')
            .from('.cta-button', {
                duration: 1,
                scale: 0,
                opacity: 0,
                rotationY: 180,
                ease: 'back.out(1.7)'
            }, '-=0.3');
        
        // Continuous floating animation for title
        gsap.to('.title-main', {
            duration: 6,
            y: -10,
            rotationX: 5,
            ease: 'power1.inOut',
            repeat: -1,
            yoyo: true
        });
        
        gsap.to('.title-sub', {
            duration: 8,
            y: -5,
            rotationX: -3,
            ease: 'power1.inOut',
            repeat: -1,
            yoyo: true
        });
        
        // CTA button enhanced hover animation
        const ctaButton = document.querySelector('.cta-button');
        ctaButton.addEventListener('mouseenter', () => {
            gsap.to(ctaButton, {
                duration: 0.4,
                scale: 1.05,
                rotationY: 5,
                ease: 'power2.out'
            });
        });
        
        ctaButton.addEventListener('mouseleave', () => {
            gsap.to(ctaButton, {
                duration: 0.4,
                scale: 1,
                rotationY: 0,
                ease: 'power2.out'
            });
        });
    }

    setupScrollAnimations() {
        // Enhanced feature cards animation with 3D effects
        gsap.utils.toArray('.feature-card').forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                duration: 1.2,
                y: 80,
                opacity: 0,
                rotationX: 45,
                ease: 'power3.out',
                delay: index * 0.15
            });
            
            // Continuous floating animation for cards
            gsap.to(card, {
                duration: 8 + index * 2,
                y: -5,
                rotationX: 2,
                ease: 'power1.inOut',
                repeat: -1,
                yoyo: true,
                delay: index * 0.5
            });
        });
        
        // Enhanced timeline items animation
        gsap.utils.toArray('.timeline-item').forEach((item, index) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                duration: 1.5,
                x: index % 2 === 0 ? -150 : 150,
                opacity: 0,
                rotationY: index % 2 === 0 ? -30 : 30,
                ease: 'power3.out'
            });
            
            // Continuous subtle movement
            gsap.to(item, {
                duration: 12 + index * 3,
                x: index % 2 === 0 ? -3 : 3,
                ease: 'power1.inOut',
                repeat: -1,
                yoyo: true,
                delay: index * 1
            });
        });
        
        // Enhanced section titles animation
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                duration: 1.5,
                y: 80,
                opacity: 0,
                rotationX: 30,
                ease: 'power3.out'
            });
            
            // Continuous floating animation
            gsap.to(title, {
                duration: 10,
                y: -3,
                rotationX: 1,
                ease: 'power1.inOut',
                repeat: -1,
                yoyo: true
            });
        });
    }

    setupHoverEffects() {
        // Enhanced feature cards hover effect with 3D
        document.querySelectorAll('.feature-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    duration: 0.5,
                    y: -15,
                    rotationX: 5,
                    rotationY: 2,
                    scale: 1.02,
                    ease: 'power2.out'
                });
                
                // Animate the panel glow
                gsap.to(card.querySelector('.panel-glow'), {
                    duration: 0.3,
                    opacity: 0.6,
                    ease: 'power2.out'
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    duration: 0.5,
                    y: 0,
                    rotationX: 0,
                    rotationY: 0,
                    scale: 1,
                    ease: 'power2.out'
                });
                
                gsap.to(card.querySelector('.panel-glow'), {
                    duration: 0.3,
                    opacity: 0,
                    ease: 'power2.out'
                });
            });
        });
        
        // Enhanced gallery items hover effect
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                gsap.to(item, {
                    duration: 0.4,
                    scale: 1.05,
                    rotationY: 2,
                    ease: 'power2.out'
                });
                
                gsap.to(item.querySelector('.gallery-overlay'), {
                    duration: 0.4,
                    y: 0,
                    ease: 'power2.out'
                });
            });
            
            item.addEventListener('mouseleave', () => {
                gsap.to(item, {
                    duration: 0.4,
                    scale: 1,
                    rotationY: 0,
                    ease: 'power2.out'
                });
                
                gsap.to(item.querySelector('.gallery-overlay'), {
                    duration: 0.4,
                    y: '100%',
                    ease: 'power2.out'
                });
            });
        });
        
        // Enhanced navigation hover effects
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(link, {
                    duration: 0.3,
                    y: -2,
                    ease: 'power2.out'
                });
            });
            
            link.addEventListener('mouseleave', () => {
                gsap.to(link, {
                    duration: 0.3,
                    y: 0,
                    ease: 'power2.out'
                });
            });
        });
    }


    setupParticles() {
        if (this.isReducedMotion) return;
        
        const container = document.getElementById('particles-container');
        if (!container) return;
        
        // Create particle system
        this.createParticleSystem(container);
        
        // Create floating elements
        this.createFloatingElements();
        
        // Start animation loop
        this.animateParticles();
        this.animateFloatingElements();
    }

    createParticleSystem(container) {
        const particleCount = 150;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const size = Math.random() * 3 + 1;
            const speed = Math.random() * 20 + 15;
            const delay = Math.random() * 5;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: #00FFFF;
                border-radius: 50%;
                opacity: ${Math.random() * 0.4 + 0.1};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${speed}s infinite linear;
                animation-delay: ${delay}s;
                box-shadow: 0 0 ${size * 2}px #00FFFF;
            `;
            
            container.appendChild(particle);
            this.particles.push(particle);
        }
        
        // Add CSS animation
        if (!document.querySelector('#particle-styles')) {
            const style = document.createElement('style');
            style.id = 'particle-styles';
            style.textContent = `
                @keyframes float {
                    0% { 
                        transform: translateY(100vh) rotate(0deg) scale(0); 
                        opacity: 0; 
                    }
                    10% { 
                        opacity: 1; 
                        transform: translateY(90vh) rotate(36deg) scale(1);
                    }
                    90% { 
                        opacity: 1; 
                        transform: translateY(10vh) rotate(324deg) scale(1);
                    }
                    100% { 
                        transform: translateY(-100px) rotate(360deg) scale(0); 
                        opacity: 0; 
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    createFloatingElements() {
        const container = document.getElementById('floating-elements');
        if (!container) return;
        
        this.floatingElements = [];
        
        // Create floating geometric shapes
        for (let i = 0; i < 8; i++) {
            const element = document.createElement('div');
            element.className = 'floating-shape';
            
            const shapes = ['circle', 'square', 'triangle', 'diamond'];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            const size = Math.random() * 20 + 10;
            const opacity = Math.random() * 0.3 + 0.1;
            
            element.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                opacity: ${opacity};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatShape ${Math.random() * 15 + 20}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            
            // Create different shapes
            switch (shape) {
                case 'circle':
                    element.style.borderRadius = '50%';
                    element.style.border = '1px solid #00FFFF';
                    break;
                case 'square':
                    element.style.border = '1px solid #0080FF';
                    element.style.transform = 'rotate(45deg)';
                    break;
                case 'triangle':
                    element.style.width = '0';
                    element.style.height = '0';
                    element.style.borderLeft = `${size/2}px solid transparent`;
                    element.style.borderRight = `${size/2}px solid transparent`;
                    element.style.borderBottom = `${size}px solid #00FF80`;
                    element.style.background = 'transparent';
                    break;
                case 'diamond':
                    element.style.border = '1px solid #00FFFF';
                    element.style.transform = 'rotate(45deg)';
                    break;
            }
            
            container.appendChild(element);
            this.floatingElements.push(element);
        }
        
        // Add floating shape animation
        if (!document.querySelector('#floating-styles')) {
            const style = document.createElement('style');
            style.id = 'floating-styles';
            style.textContent = `
                @keyframes floatShape {
                    0%, 100% { 
                        transform: translateY(0px) translateX(0px) rotate(0deg); 
                    }
                    25% { 
                        transform: translateY(-20px) translateX(10px) rotate(90deg); 
                    }
                    50% { 
                        transform: translateY(-40px) translateX(-5px) rotate(180deg); 
                    }
                    75% { 
                        transform: translateY(-20px) translateX(-10px) rotate(270deg); 
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    animateParticles() {
        if (this.isReducedMotion) return;
        
        this.particles.forEach((particle, index) => {
            const time = Date.now() * 0.001;
            const speed = Math.random() * 0.3 + 0.2;
            const x = Math.sin(time * speed + index) * 30;
            const y = Math.cos(time * speed + index) * 20;
            const rotation = time * 10 + index;
            
            particle.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
        });
        
        this.animationFrame = requestAnimationFrame(() => this.animateParticles());
    }

    animateFloatingElements() {
        if (this.isReducedMotion) return;
        
        this.floatingElements.forEach((element, index) => {
            const time = Date.now() * 0.0005;
            const speed = Math.random() * 0.2 + 0.1;
            const x = Math.sin(time * speed + index) * 40;
            const y = Math.cos(time * speed + index) * 25;
            const rotation = time * 5 + index;
            const scale = 1 + Math.sin(time * speed + index) * 0.1;
            
            element.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`;
        });
        
        requestAnimationFrame(() => this.animateFloatingElements());
    }

    setupScrollEffects() {
        // Enhanced parallax effect for landing section
        window.addEventListener('scroll', this.throttle(() => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.landing');
            const grid = document.getElementById('holographic-grid');
            
            if (parallax) {
                parallax.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
            
            if (grid) {
                grid.style.transform = `translateY(${scrolled * 0.1}px) scale(${1 + scrolled * 0.0001})`;
            }
        }, 16));
        
        // Mouse movement parallax
        document.addEventListener('mousemove', this.throttle((e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            // Move floating elements based on mouse position
            if (this.floatingElements) {
                this.floatingElements.forEach((element, index) => {
                    const speed = (index + 1) * 0.5;
                    const x = (mouseX - 0.5) * speed * 20;
                    const y = (mouseY - 0.5) * speed * 20;
                    
                    element.style.transform += ` translate(${x}px, ${y}px)`;
                });
            }
            
            // Move particles based on mouse position
            if (this.particles) {
                this.particles.forEach((particle, index) => {
                    const speed = (index % 10) * 0.1;
                    const x = (mouseX - 0.5) * speed * 10;
                    const y = (mouseY - 0.5) * speed * 10;
                    
                    particle.style.transform += ` translate(${x}px, ${y}px)`;
                });
            }
        }, 50));
        
        // Scroll indicator
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    scrollIndicator.style.opacity = '0';
                } else {
                    scrollIndicator.style.opacity = '1';
                }
            });
        }
    }

    setupPerformanceMonitoring() {
        // Monitor performance and adjust animations if needed
        if ('performance' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.entryType === 'measure' && entry.duration > 16) {
                        console.warn('Performance issue detected:', entry.name, entry.duration);
                        // Could implement performance degradation here
                    }
                }
            });
            
            observer.observe({ entryTypes: ['measure'] });
        }
    }

    handleResize() {
        // Recalculate animations on resize
        ScrollTrigger.refresh();
        
        // Adjust particle system
        if (this.particles.length > 0) {
            this.particles.forEach(particle => {
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
            });
        }
    }

    // Utility functions
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Cleanup method
    destroy() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        
        // Remove event listeners
        window.removeEventListener('resize', this.handleResize);
        window.removeEventListener('scroll', this.handleNavbarScroll);
    }
}

// Initialize website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const website = new NexusWebsite();
    
    // Expose to global scope for debugging
    window.nexusWebsite = website;
    
    // Handle page visibility changes
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
            // Pause animations when tab is not visible
            gsap.globalTimeline.pause();
        } else {
            // Resume animations when tab becomes visible
            gsap.globalTimeline.resume();
        }
    });
    
    // Preload critical resources
    const preloadLinks = [
        'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&family=Exo:wght@300;400;500;600;700&display=swap'
    ];
    
    preloadLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });
    
    console.log('Nexus Protocol Website loaded successfully');
});

// Service Worker registration for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('Website error:', e.error);
    // Could implement error reporting here
});

// Unhandled promise rejection handling
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // Could implement error reporting here
});
