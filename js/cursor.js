/* =====================================================
   CODEMOLL LANDING PAGE - CUSTOM CURSOR EFFECTS
   Premium Cybersecurity & AI Company Website
   ===================================================== */

// =====================================================
// CUSTOM CURSOR WITH GLOW
// =====================================================

class CustomCursor {
    constructor() {
        this.cursor = this.createCursor();
        this.cursorTrail = this.createTrail();
        this.mouseX = 0;
        this.mouseY = 0;
        this.trailX = [];
        this.trailY = [];
        this.trailLength = 15;
        this.isMoving = false;
        this.hideTimeout = null;
        
        this.setupEventListeners();
        this.hideBrowserCursor();
    }
    
    createCursor() {
        const cursor = document.createElement('div');
        cursor.id = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid #00ff88;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transform: translate(-50%, -50%);
            box-shadow: 0 0 10px #00ff88, inset 0 0 10px rgba(0, 255, 136, 0.3);
            display: none;
        `;
        document.body.appendChild(cursor);
        return cursor;
    }
    
    createTrail() {
        const trail = document.createElement('div');
        trail.id = 'cursor-trail';
        trail.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9997;
        `;
        document.body.appendChild(trail);
        return trail;
    }
    
    createTrailDot(x, y) {
        const dot = document.createElement('div');
        dot.className = 'trail-dot';
        dot.style.cssText = `
            position: absolute;
            width: 6px;
            height: 6px;
            background: #00ff88;
            border-radius: 50%;
            pointer-events: none;
            box-shadow: 0 0 8px #00ff88;
            left: ${x}px;
            top: ${y}px;
            opacity: 0.8;
        `;
        
        this.cursorTrail.appendChild(dot);
        
        // Fade out animation
        let opacity = 0.8;
        const fadeInterval = setInterval(() => {
            opacity -= 0.1;
            dot.style.opacity = opacity;
            
            if (opacity <= 0) {
                dot.remove();
                clearInterval(fadeInterval);
            }
        }, 50);
    }
    
    hideBrowserCursor() {
        document.body.style.cursor = 'none';
    }
    
    setupEventListeners() {
        document.addEventListener('mousemove', (e) => this.updatePosition(e));
        document.addEventListener('mouseenter', () => this.showCursor());
        document.addEventListener('mouseleave', () => this.hideCursor());
        document.addEventListener('mousedown', () => this.onMouseDown());
        document.addEventListener('mouseup', () => this.onMouseUp());
    }
    
    updatePosition(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        
        this.cursor.style.left = this.mouseX + 'px';
        this.cursor.style.top = this.mouseY + 'px';
        
        // Create trail
        this.trailX.unshift(this.mouseX);
        this.trailY.unshift(this.mouseY);
        
        if (this.trailX.length > this.trailLength) {
            this.trailX.pop();
            this.trailY.pop();
        }
        
        // Create trail dots
        if (Math.random() > 0.7) {
            this.createTrailDot(this.mouseX, this.mouseY);
        }
        
        this.cursor.style.display = 'block';
        
        // Clear hide timeout
        clearTimeout(this.hideTimeout);
    }
    
    showCursor() {
        this.cursor.style.display = 'block';
    }
    
    hideCursor() {
        this.cursor.style.display = 'none';
    }
    
    onMouseDown() {
        this.cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
        this.cursor.style.boxShadow = '0 0 20px #00ff88, inset 0 0 20px rgba(0, 255, 136, 0.5)';
    }
    
    onMouseUp() {
        this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        this.cursor.style.boxShadow = '0 0 10px #00ff88, inset 0 0 10px rgba(0, 255, 136, 0.3)';
    }
}

// Initialize custom cursor for non-touch devices
if (!('ontouchstart' in window)) {
    const customCursor = new CustomCursor();
}

// =====================================================
// HOVER STATE DETECTION
// =====================================================

class HoverStateManager {
    constructor() {
        this.isHovering = false;
        this.hoveredElement = null;
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        const interactiveElements = document.querySelectorAll('a, button, .glass-card, .service-card, input, textarea');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => this.onHoverStart(e));
            element.addEventListener('mouseleave', (e) => this.onHoverEnd(e));
        });
    }
    
    onHoverStart(e) {
        this.isHovering = true;
        this.hoveredElement = e.target;
        
        const cursor = document.getElementById('custom-cursor');
        if (cursor) {
            cursor.style.width = '30px';
            cursor.style.height = '30px';
            cursor.style.borderWidth = '3px';
            cursor.style.boxShadow = '0 0 20px #00ff88, inset 0 0 15px rgba(0, 255, 136, 0.5)';
        }
        
        // Change body class for CSS detection
        document.body.classList.add('hovering-interactive');
    }
    
    onHoverEnd(e) {
        this.isHovering = false;
        this.hoveredElement = null;
        
        const cursor = document.getElementById('custom-cursor');
        if (cursor) {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.borderWidth = '2px';
            cursor.style.boxShadow = '0 0 10px #00ff88, inset 0 0 10px rgba(0, 255, 136, 0.3)';
        }
        
        document.body.classList.remove('hovering-interactive');
    }
}

// Initialize hover state manager
const hoverStateManager = new HoverStateManager();

// =====================================================
// MAGNETIC BUTTONS
// =====================================================

class MagneticButton {
    constructor(selector = '.btn') {
        this.buttons = document.querySelectorAll(selector);
        this.mouseX = 0;
        this.mouseY = 0;
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.updateButtons();
        });
    }
    
    updateButtons() {
        this.buttons.forEach(button => {
            const rect = button.getBoundingClientRect();
            const buttonCenterX = rect.left + rect.width / 2;
            const buttonCenterY = rect.top + rect.height / 2;
            
            const distance = Math.sqrt(
                Math.pow(this.mouseX - buttonCenterX, 2) +
                Math.pow(this.mouseY - buttonCenterY, 2)
            );
            
            const magnetRadius = 100;
            
            if (distance < magnetRadius) {
                const angle = Math.atan2(this.mouseY - buttonCenterY, this.mouseX - buttonCenterX);
                const force = (magnetRadius - distance) / magnetRadius;
                
                const moveX = Math.cos(angle) * force * 15;
                const moveY = Math.sin(angle) * force * 15;
                
                button.style.transform = `translate(${moveX}px, ${moveY}px)`;
            } else {
                button.style.transform = 'translate(0, 0)';
            }
        });
    }
}

// Initialize magnetic buttons
const magneticButtons = new MagneticButton('.btn');

// =====================================================
// CURSOR SPOTLIGHT
// =====================================================

class CursorSpotlight {
    constructor() {
        this.spotlightRadius = 300;
        this.mouseX = window.innerWidth / 2;
        this.mouseY = window.innerHeight / 2;
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.updateSpotlight();
        });
    }
    
    updateSpotlight() {
        const spotlight = document.getElementById('mouse-spotlight');
        if (spotlight) {
            spotlight.style.left = (this.mouseX - this.spotlightRadius / 2) + 'px';
            spotlight.style.top = (this.mouseY - this.spotlightRadius / 2) + 'px';
        }
    }
}

// Initialize cursor spotlight
const cursorSpotlight = new CursorSpotlight();

// =====================================================
// CURSOR PARALLAX
// ===================================================== 

class CursorParallax {
    constructor(selector = '[data-cursor-parallax]') {
        this.elements = document.querySelectorAll(selector);
        this.mouseX = 0;
        this.mouseY = 0;
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.updateElements();
        });
    }
    
    updateElements() {
        this.elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const elementCenterX = rect.left + rect.width / 2;
            const elementCenterY = rect.top + rect.height / 2;
            
            const moveX = (this.mouseX - elementCenterX) * 0.1;
            const moveY = (this.mouseY - elementCenterY) * 0.1;
            
            element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }
}

// Initialize cursor parallax
const cursorParallax = new CursorParallax();

// =====================================================
// CURSOR TEXT FOLLOW
// ===================================================== 

class CursorTextFollow {
    constructor() {
        this.textCanvas = document.createElement('canvas');
        this.textCanvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            pointer-events: none;
            z-index: 9996;
        `;
        
        this.textCanvas.width = window.innerWidth;
        this.textCanvas.height = window.innerHeight;
        document.body.appendChild(this.textCanvas);
        
        this.ctx = this.textCanvas.getContext('2d');
        this.mouseX = 0;
        this.mouseY = 0;
        this.followText = '>';
        this.particles = [];
        
        this.setupEventListeners();
        this.animate();
    }
    
    setupEventListeners() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            
            // Create text particle
            if (Math.random() > 0.8) {
                this.createTextParticle();
            }
        });
        
        window.addEventListener('resize', () => {
            this.textCanvas.width = window.innerWidth;
            this.textCanvas.height = window.innerHeight;
        });
    }
    
    createTextParticle() {
        this.particles.push({
            x: this.mouseX,
            y: this.mouseY,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2 - 1,
            opacity: 0.6,
            life: 100
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.textCanvas.width, this.textCanvas.height);
        
        this.particles = this.particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.1; // gravity
            particle.life--;
            
            const opacity = (particle.life / 100) * particle.opacity;
            
            this.ctx.font = 'bold 14px "JetBrains Mono"';
            this.ctx.fillStyle = `rgba(0, 255, 136, ${opacity})`;
            this.ctx.fillText(this.followText, particle.x, particle.y);
            
            return particle.life > 0;
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize cursor text follow
const cursorTextFollow = new CursorTextFollow();

// =====================================================
// RADIAL MENU ON CURSOR
// ===================================================== 

class RadialCursorMenu {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            pointer-events: none;
            z-index: 9996;
        `;
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        document.body.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        this.mouseX = 0;
        this.mouseY = 0;
        this.rotation = 0;
        this.showMenu = false;
        
        this.setupEventListeners();
        this.animate();
    }
    
    setupEventListeners() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.rotation += 2;
        });
        
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });
    }
    
    drawRadialMenu() {
        const centerX = this.mouseX;
        const centerY = this.mouseY;
        const radius = 40;
        const segments = 6;
        
        for (let i = 0; i < segments; i++) {
            const angle = (Math.PI * 2 * i) / segments + (this.rotation * Math.PI / 180);
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            // Draw segment circle
            this.ctx.fillStyle = `rgba(0, 255, 136, 0.3)`;
            this.ctx.beginPath();
            this.ctx.arc(x, y, 8, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Draw line from center
            this.ctx.strokeStyle = `rgba(0, 255, 136, 0.2)`;
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY);
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw subtle radial menu
        this.drawRadialMenu();
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize radial cursor menu
const radialCursorMenu = new RadialCursorMenu();

// =====================================================
// CURSOR CLICK WAVE
// ===================================================== 

class CursorClickWave {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            pointer-events: none;
            z-index: 9995;
        `;
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        document.body.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        this.waves = [];
        
        this.setupEventListeners();
        this.animate();
    }
    
    setupEventListeners() {
        document.addEventListener('click', (e) => {
            this.createWave(e.clientX, e.clientY);
        });
        
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });
    }
    
    createWave(x, y) {
        this.waves.push({
            x: x,
            y: y,
            radius: 0,
            maxRadius: 100,
            opacity: 0.8,
            life: 100
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.waves = this.waves.filter(wave => {
            wave.radius += 3;
            wave.life--;
            
            const opacity = (wave.life / 100) * wave.opacity;
            
            this.ctx.strokeStyle = `rgba(0, 255, 136, ${opacity})`;
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
            this.ctx.stroke();
            
            return wave.life > 0;
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize cursor click wave
const cursorClickWave = new CursorClickWave();

// =====================================================
// CURSOR FEEDBACK SYSTEM
// ===================================================== 

class CursorFeedback {
    constructor() {
        this.feedback = document.createElement('div');
        this.feedback.id = 'cursor-feedback';
        this.feedback.style.cssText = `
            position: fixed;
            pointer-events: none;
            z-index: 9994;
            font-family: 'JetBrains Mono', monospace;
            font-size: 12px;
            color: #00ff88;
            text-shadow: 0 0 10px #00ff88;
            display: none;
        `;
        
        document.body.appendChild(this.feedback);
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        const clickableElements = document.querySelectorAll('a, button, [role="button"]');
        
        clickableElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.showFeedback(e.target, 'Clickable');
            });
            
            element.addEventListener('mouseleave', () => {
                this.hideFeedback();
            });
        });
        
        document.addEventListener('mousemove', (e) => {
            this.feedback.style.left = (e.clientX + 15) + 'px';
            this.feedback.style.top = (e.clientY + 15) + 'px';
        });
    }
    
    showFeedback(element, text) {
        this.feedback.textContent = `[${text}]`;
        this.feedback.style.display = 'block';
        this.feedback.style.animation = 'fadeIn 0.2s ease';
    }
    
    hideFeedback() {
        this.feedback.style.display = 'none';
    }
}

// Initialize cursor feedback
const cursorFeedback = new CursorFeedback();

// =====================================================
// END OF CURSOR EFFECTS
// ===================================================== 
