// ==================== LOADING SCREEN FUNCTIONALITY ====================
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingText = document.getElementById('loadingText');
    const progressBar = document.getElementById('progressBar');
    const progressPercent = document.getElementById('progressPercent');
    
    const loadingMessages = [
        'Initializing Chemical Process...',
        'Preparing Solution...',
        'Analyzing Components...',
        'Configuring Laboratory...',
        'Loading Molecular Data...'
    ];
    
    let currentMessageIndex = 0;
    let progress = 0;
    const totalDuration = 3000; // 3 seconds total loading time
    const messageInterval = 600; // Change message every 600ms
    const progressInterval = 30; // Update progress every 30ms
    
    // Change loading text periodically
    const messageTimer = setInterval(() => {
        currentMessageIndex = (currentMessageIndex + 1) % loadingMessages.length;
        loadingText.style.opacity = '0';
        
        setTimeout(() => {
            loadingText.textContent = loadingMessages[currentMessageIndex];
            loadingText.style.opacity = '1';
        }, 150);
    }, messageInterval);
    
    // Smooth progress bar animation
    const progressTimer = setInterval(() => {
        progress += (100 / (totalDuration / progressInterval));
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressTimer);
            clearInterval(messageTimer);
            
            // Complete loading
            setTimeout(() => {
                loadingText.textContent = 'Ready!';
                setTimeout(() => {
                    loadingScreen.classList.add('fade-out');
                    
                    // Remove loading screen from DOM after fade completes
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                    }, 800);
                }, 300);
            }, 200);
        }
        
        progressBar.style.width = progress + '%';
        progressPercent.textContent = Math.floor(progress) + '%';
    }, progressInterval);
});

// Smooth scroll behavior for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Modal functionality for image expansion
function openModal(imgElement) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    modalImage.src = imgElement.src;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Animated process video panel
const processStages = [
    {
        icon: '🧪',
        title: 'Raw Materials Setup',
        text: 'Measured castor oil, distilled water, sodium sulphate, NaCl, and Na2CO3 are prepared.'
    },
    {
        icon: '🔀',
        title: 'Mixing Stage',
        text: 'All raw materials are blended in controlled proportions to form a homogeneous mixture.'
    },
    {
        icon: '🔥',
        title: 'Heating with Glycerol',
        text: 'The solution is heated gradually while glycerol is added for flow and stability improvement.'
    },
    {
        icon: '⚗️',
        title: 'Filtration Stage',
        text: 'The heated mixture passes through filtration to remove undissolved particles and impurities.'
    },
    {
        icon: '🧼',
        title: 'Final Liquid Detergent',
        text: 'A clear, stable detergent is obtained and prepared for storage or packaging.'
    }
];

let activeStageIndex = 0;

function animateProcessVideo() {
    const iconEl = document.getElementById('videoStageIcon');
    const titleEl = document.getElementById('videoStageTitle');
    const textEl = document.getElementById('videoStageText');
    const progressEl = document.getElementById('videoProgress');

    if (!iconEl || !titleEl || !textEl || !progressEl) {
        return;
    }

    const stage = processStages[activeStageIndex];
    iconEl.textContent = stage.icon;
    titleEl.textContent = stage.title;
    textEl.textContent = stage.text;

    const progressPercent = ((activeStageIndex + 1) / processStages.length) * 100;
    progressEl.style.width = `${progressPercent}%`;

    activeStageIndex = (activeStageIndex + 1) % processStages.length;
}

animateProcessVideo();
setInterval(animateProcessVideo, 2600);

// Close modal when pressing Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.intro-card, .material-card, .detail-card, .step-box, .team-card, .apparatus-card, .result-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Add scroll spy for navigation highlights
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active class styling
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #f1c40f !important;
        border-bottom: 2px solid #f1c40f;
    }
`;
document.head.appendChild(style);
// ==================== PROCESS ANIMATION CONTROLLER ====================

class ProcessAnimationController {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 5;
        this.isPlaying = true;
        this.animationSpeed = 1;
        this.stepDuration = 3000; // 3 seconds per step
        this.animationTimer = null;
        
        this.init();
    }
    
    init() {
        this.cacheElements();
        this.attachEventListeners();
        this.startAnimation();
    }
    
    cacheElements() {
        // Control elements
        this.playPauseBtn = document.getElementById('playPauseBtn');
        this.speedButtons = document.querySelectorAll('.speed-btn');
        this.currentStepDisplay = document.getElementById('currentStep');
        
        // Process elements
        this.processSteps = document.querySelectorAll('.process-step');
        this.flowArrows = document.querySelectorAll('.flow-arrow');
        this.timelineProgress = document.getElementById('timelineProgress');
        this.timelineMarkers = document.querySelectorAll('.marker');
        
        // Info panels
        this.infoPanels = document.querySelectorAll('.info-panel');
    }
    
    attachEventListeners() {
        // Play/Pause button
        this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        
        // Speed control buttons
        this.speedButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const speed = parseFloat(e.target.dataset.speed);
                this.setSpeed(speed);
            });
        });
        
        // Click on step cards to jump to that step
        this.processSteps.forEach((step, index) => {
            step.addEventListener('click', () => {
                this.jumpToStep(index + 1);
            });
        });
        
        // Click on timeline markers
        this.timelineMarkers.forEach((marker, index) => {
            marker.addEventListener('click', () => {
                this.jumpToStep(index + 1);
            });
        });
        
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case ' ':
                    e.preventDefault();
                    this.togglePlayPause();
                    break;
                case 'ArrowRight':
                    this.nextStep();
                    break;
                case 'ArrowLeft':
                    this.previousStep();
                    break;
            }
        });
        
        // Close info panels when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.process-step')) {
                this.hideAllInfoPanels();
            }
        });
    }
    
    startAnimation() {
        if (this.isPlaying) {
            this.updateStep(this.currentStep);
            this.scheduleNextStep();
        }
    }
    
    scheduleNextStep() {
        if (this.animationTimer) {
            clearTimeout(this.animationTimer);
        }
        
        const adjustedDuration = this.stepDuration / this.animationSpeed;
        
        this.animationTimer = setTimeout(() => {
            if (this.isPlaying) {
                this.currentStep = (this.currentStep % this.totalSteps) + 1;
                this.updateStep(this.currentStep);
                this.scheduleNextStep();
            }
        }, adjustedDuration);
    }
    
    updateStep(stepNumber) {
        // Update current step display
        this.currentStepDisplay.textContent = stepNumber;
        
        // Remove active class from all elements
        this.processSteps.forEach(step => step.classList.remove('active'));
        this.flowArrows.forEach(arrow => arrow.classList.remove('active'));
        this.timelineMarkers.forEach(marker => marker.classList.remove('active'));
        
        // Add active class to current step
        const currentStepElement = document.querySelector(`[data-step="${stepNumber}"]`);
        if (currentStepElement) {
            currentStepElement.classList.add('active');
        }
        
        // Activate arrows up to current step
        for (let i = 1; i < stepNumber; i++) {
            const arrow = document.querySelector(`[data-arrow="${i}"]`);
            if (arrow) {
                arrow.classList.add('active');
            }
        }
        
        // Update timeline
        this.updateTimeline(stepNumber);
        
        // Update marker
        const currentMarker = document.querySelector(`[data-marker="${stepNumber}"]`);
        if (currentMarker) {
            currentMarker.classList.add('active');
        }
        
        // Play sound effect (if enabled)
        this.playStepSound(stepNumber);
        
        // Trigger step animation
        this.triggerStepAnimation(stepNumber);
    }
    
    updateTimeline(stepNumber) {
        const progress = ((stepNumber - 1) / (this.totalSteps - 1)) * 100;
        this.timelineProgress.style.width = `${progress}%`;
    }
    
    triggerStepAnimation(stepNumber) {
        // Add specific animations or effects when a step becomes active
        const stepElement = document.querySelector(`[data-step="${stepNumber}"]`);
        if (stepElement) {
            // Trigger entrance animation
            stepElement.style.animation = 'none';
            setTimeout(() => {
                stepElement.style.animation = '';
            }, 10);
        }
    }
    
    togglePlayPause() {
        this.isPlaying = !this.isPlaying;
        
        const icon = this.playPauseBtn.querySelector('.icon');
        const label = this.playPauseBtn.querySelector('.label');
        
        if (this.isPlaying) {
            icon.textContent = '⏸';
            label.textContent = 'Pause';
            this.startAnimation();
        } else {
            icon.textContent = '▶';
            label.textContent = 'Play';
            if (this.animationTimer) {
                clearTimeout(this.animationTimer);
            }
        }
    }
    
    setSpeed(speed) {
        this.animationSpeed = speed;
        
        // Update active button
        this.speedButtons.forEach(btn => {
            btn.classList.remove('active');
            if (parseFloat(btn.dataset.speed) === speed) {
                btn.classList.add('active');
            }
        });
        
        // Update animation speed for CSS animations
        this.updateCSSAnimationSpeed(speed);
        
        // Restart animation with new speed
        if (this.isPlaying) {
            this.scheduleNextStep();
        }
    }
    
    updateCSSAnimationSpeed(speed) {
        // Update CSS animation durations based on speed
        const root = document.documentElement;
        root.style.setProperty('--animation-speed', speed);
        
        // Update all animated elements
        document.querySelectorAll('.process-step.active [class*="animation"]').forEach(element => {
            const computedStyle = window.getComputedStyle(element);
            const animationDuration = computedStyle.animationDuration;
            if (animationDuration && animationDuration !== '0s') {
                const duration = parseFloat(animationDuration);
                element.style.animationDuration = `${duration / speed}s`;
            }
        });
    }
    
    jumpToStep(stepNumber) {
        if (stepNumber < 1 || stepNumber > this.totalSteps) return;
        
        this.currentStep = stepNumber;
        this.updateStep(stepNumber);
        
        if (this.isPlaying) {
            this.scheduleNextStep();
        }
    }
    
    nextStep() {
        this.currentStep = (this.currentStep % this.totalSteps) + 1;
        this.jumpToStep(this.currentStep);
    }
    
    previousStep() {
        this.currentStep = this.currentStep - 1;
        if (this.currentStep < 1) {
            this.currentStep = this.totalSteps;
        }
        this.jumpToStep(this.currentStep);
    }
    
    hideAllInfoPanels() {
        this.infoPanels.forEach(panel => {
            panel.style.opacity = '0';
            panel.style.visibility = 'hidden';
        });
    }
    
    playStepSound(stepNumber) {
        // Optional: Add subtle sound effects
        // This is a placeholder for sound implementation
        // You can use Web Audio API or <audio> elements
        
        // Example:
        // const audio = new Audio(`sounds/step-${stepNumber}.mp3`);
        // audio.volume = 0.3;
        // audio.play().catch(() => {});
    }
}

// ==================== ADDITIONAL INTERACTIVE FEATURES ====================

// Particle effects on hover
function createParticleEffect(element) {
    const rect = element.getBoundingClientRect();
    const particle = document.createElement('div');
    particle.className = 'hover-particle';
    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: white;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${rect.left + Math.random() * rect.width}px;
        top: ${rect.top + Math.random() * rect.height}px;
        animation: particle-float 1s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 1000);
}

// Add particle animation styles
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes particle-float {
        0% {
            opacity: 1;
            transform: translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateY(-50px);
        }
    }
`;
document.head.appendChild(particleStyles);

// Add hover particle effects to step cards
document.querySelectorAll('.step-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => createParticleEffect(this), i * 100);
        }
    });
});

// ==================== SCROLL REVEAL ANIMATIONS ====================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll reveal
document.querySelectorAll('.process-step, .control-panel, .timeline-container').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==================== TOOLTIP SYSTEM ====================

class TooltipManager {
    constructor() {
        this.tooltip = this.createTooltip();
    }
    
    createTooltip() {
        const tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.style.cssText = `
            position: fixed;
            background: rgba(30, 41, 59, 0.95);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-size: 0.85rem;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.2s ease;
            z-index: 10000;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        `;
        document.body.appendChild(tooltip);
        return tooltip;
    }
    
    show(text, x, y) {
        this.tooltip.textContent = text;
        this.tooltip.style.left = `${x}px`;
        this.tooltip.style.top = `${y - 40}px`;
        this.tooltip.style.opacity = '1';
    }
    
    hide() {
        this.tooltip.style.opacity = '0';
    }
}

const tooltipManager = new TooltipManager();

// Add tooltips to control buttons
document.querySelectorAll('.control-btn, .speed-btn').forEach(btn => {
    btn.addEventListener('mouseenter', (e) => {
        const tooltipText = btn.getAttribute('title') || btn.textContent;
        tooltipManager.show(tooltipText, e.clientX, e.clientY);
    });
    
    btn.addEventListener('mousemove', (e) => {
        tooltipManager.show(btn.getAttribute('title') || btn.textContent, e.clientX, e.clientY);
    });
    
    btn.addEventListener('mouseleave', () => {
        tooltipManager.hide();
    });
});

// ==================== PERFORMANCE MONITORING ====================

// Monitor and optimize animation performance
let lastFrameTime = performance.now();
let fps = 60;

function measurePerformance() {
    const currentTime = performance.now();
    const delta = currentTime - lastFrameTime;
    fps = Math.round(1000 / delta);
    lastFrameTime = currentTime;
    
    // Reduce animation complexity if FPS drops below 30
    if (fps < 30) {
        document.body.classList.add('reduce-motion');
    } else {
        document.body.classList.remove('reduce-motion');
    }
    
    requestAnimationFrame(measurePerformance);
}

measurePerformance();

// Add reduced motion styles
const performanceStyles = document.createElement('style');
performanceStyles.textContent = `
    .reduce-motion * {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
`;
document.head.appendChild(performanceStyles);

// ==================== INITIALIZE APPLICATION ====================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the process animation controller
    window.processController = new ProcessAnimationController();
    
    // Add loading complete class for entrance animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // Log initialization
    console.log('🧪 ChemLab Process Animation initialized');
    console.log('⌨️  Keyboard shortcuts:');
    console.log('   Space: Play/Pause');
    console.log('   Arrow Right: Next Step');
    console.log('   Arrow Left: Previous Step');
});

// ==================== EXPORT FOR EXTERNAL USE ====================

// Make controller available globally for debugging or external control
window.ChemLabProcess = {
    controller: null,
    
    // Public API methods
    play() {
        if (this.controller && !this.controller.isPlaying) {
            this.controller.togglePlayPause();
        }
    },
    
    pause() {
        if (this.controller && this.controller.isPlaying) {
            this.controller.togglePlayPause();
        }
    },
    
    goToStep(stepNumber) {
        if (this.controller) {
            this.controller.jumpToStep(stepNumber);
        }
    },
    
    setSpeed(speed) {
        if (this.controller) {
            this.controller.setSpeed(speed);
        }
    },
    
    getCurrentStep() {
        return this.controller ? this.controller.currentStep : null;
    }
};

// Set controller reference after initialization
setTimeout(() => {
    window.ChemLabProcess.controller = window.processController;
}, 500);
