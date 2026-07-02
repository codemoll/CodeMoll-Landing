/* =====================================================
   CODEMOLL LANDING PAGE - MATRIX RAIN EFFECT
   Premium Cybersecurity & AI Company Website
   ===================================================== */

// Matrix Rain Canvas Animation
class MatrixRain {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        
        // Matrix characters
        this.chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        this.charArray = this.chars.split('');
        
        // Columns setup
        this.fontSize = 14;
        this.columns = Math.floor(this.width / this.fontSize);
        this.drops = [];
        
        // Initialize drops
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.random() * this.height;
        }
        
        // Color settings
        this.primaryColor = '#00ff88';
        this.secondaryColor = '#00cc6a';
        this.trailColor = 'rgba(0, 255, 136, 0.1)';
        
        // Animation settings
        this.speed = 0.8;
        this.opacity = 0.2;
        
        this.animate();
        
        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());
    }
    
    draw() {
        // Semi-transparent background for trail effect
        this.ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Set text properties
        this.ctx.font = `bold ${this.fontSize}px 'JetBrains Mono'`;
        this.ctx.globalAlpha = this.opacity;
        
        for (let i = 0; i < this.columns; i++) {
            // Random character
            const char = this.charArray[Math.floor(Math.random() * this.charArray.length)];
            
            // Color variation
            if (Math.random() > 0.95) {
                this.ctx.fillStyle = this.primaryColor;
            } else if (Math.random() > 0.5) {
                this.ctx.fillStyle = this.secondaryColor;
            } else {
                this.ctx.fillStyle = this.trailColor;
            }
            
            // Draw character
            this.ctx.fillText(char, i * this.fontSize, this.drops[i] * this.fontSize);
            
            // Random drop reset
            if (this.drops[i] * this.fontSize > this.height && Math.random() > 0.99) {
                this.drops[i] = 0;
            }
            
            // Increment drop position
            this.drops[i] += this.speed;
        }
        
        this.ctx.globalAlpha = 1;
    }
    
    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
    
    handleResize() {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        
        // Recalculate columns
        const newColumns = Math.floor(this.width / this.fontSize);
        if (newColumns !== this.columns) {
            this.columns = newColumns;
            this.drops = [];
            for (let i = 0; i < this.columns; i++) {
                this.drops[i] = Math.random() * this.height;
            }
        }
    }
    
    setSpeed(speed) {
        this.speed = speed;
    }
    
    setOpacity(opacity) {
        this.opacity = opacity;
    }
    
    setPrimaryColor(color) {
        this.primaryColor = color;
    }
}

// Initialize Matrix Rain
const matrixRain = new MatrixRain('matrix-canvas');

// Pause matrix rain during hero section to reduce performance impact
document.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        const currentScroll = window.scrollY;
        
        if (currentScroll > heroBottom) {
            // Reduce opacity when scrolled past hero
            matrixRain.setOpacity(0.1);
        } else {
            // Restore opacity
            matrixRain.setOpacity(0.2);
        }
    }
});

// =====================================================
// CODE RAIN EFFECT (Alternative to Matrix)
// =====================================================

class CodeRain {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        
        // Code snippets
        this.codeChars = ['<', '>', '{', '}', '[', ']', '(', ')', ';', ':', '=', '+', '-', '*', '/', '|', '&', '$', '@', '#'];
        this.fontSize = 16;
        this.columns = Math.floor(this.width / this.fontSize);
        this.drops = [];
        
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.random() * this.height;
        }
        
        this.animate();
    }
    
    draw() {
        this.ctx.fillStyle = 'rgba(5, 5, 5, 0.08)';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        this.ctx.font = `bold ${this.fontSize}px 'JetBrains Mono'`;
        
        for (let i = 0; i < this.columns; i++) {
            const char = this.codeChars[Math.floor(Math.random() * this.codeChars.length)];
            
            if (Math.random() > 0.9) {
                this.ctx.fillStyle = '#00ff88';
                this.ctx.globalAlpha = 0.8;
            } else {
                this.ctx.fillStyle = 'rgba(0, 255, 136, 0.3)';
                this.ctx.globalAlpha = 0.3;
            }
            
            this.ctx.fillText(char, i * this.fontSize, this.drops[i] * this.fontSize);
            
            if (this.drops[i] * this.fontSize > this.height && Math.random() > 0.99) {
                this.drops[i] = 0;
            }
            
            this.drops[i] += 0.7;
        }
        
        this.ctx.globalAlpha = 1;
    }
    
    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// =====================================================
// GLITCH EFFECT
// ===================================================== 

class GlitchEffect {
    constructor(elementSelector) {
        this.elements = document.querySelectorAll(elementSelector);
        this.glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    }
    
    trigger(element) {
        if (!element) return;
        
        const originalText = element.textContent;
        const glitchDuration = 150; // milliseconds
        const glitchIntervals = 5;
        
        for (let i = 0; i < glitchIntervals; i++) {
            setTimeout(() => {
                let glitchedText = '';
                for (let j = 0; j < originalText.length; j++) {
                    if (Math.random() > 0.7) {
                        glitchedText += this.glitchChars[Math.floor(Math.random() * this.glitchChars.length)];
                    } else {
                        glitchedText += originalText[j];
                    }
                }
                element.textContent = glitchedText;
            }, i * (glitchDuration / glitchIntervals));
        }
        
        // Restore original text
        setTimeout(() => {
            element.textContent = originalText;
        }, glitchDuration);
    }
    
    addGlitchOnHover() {
        this.elements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.trigger(element);
            });
        });
    }
    
    randomGlitch(interval = 5000) {
        setInterval(() => {
            const randomElement = this.elements[Math.floor(Math.random() * this.elements.length)];
            if (randomElement) {
                this.trigger(randomElement);
            }
        }, interval);
    }
}

// Initialize glitch effect for titles
const glitch = new GlitchEffect('.section-title');
glitch.randomGlitch(8000);

// =====================================================
// ANIMATED BACKGROUND LINES
// ===================================================== 

class AnimatedLines {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        
        this.lines = [];
        this.generateLines();
        
        window.addEventListener('resize', () => this.handleResize());
        this.animate();
    }
    
    generateLines() {
        this.lines = [];
        const lineCount = Math.floor(Math.random() * 5) + 3;
        
        for (let i = 0; i < lineCount; i++) {
            this.lines.push({
                x1: Math.random() * this.width,
                y1: Math.random() * this.height,
                x2: Math.random() * this.width,
                y2: Math.random() * this.height,
                opacity: Math.random() * 0.3,
                speed: Math.random() * 0.5 + 0.1
            });
        }
    }
    
    draw() {
        this.ctx.fillStyle = 'rgba(5, 5, 5, 0.02)';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        this.lines.forEach(line => {
            this.ctx.strokeStyle = `rgba(0, 255, 136, ${line.opacity})`;
            this.ctx.lineWidth = 1;
            
            this.ctx.beginPath();
            this.ctx.moveTo(line.x1, line.y1);
            this.ctx.lineTo(line.x2, line.y2);
            this.ctx.stroke();
            
            // Update line positions
            line.x1 += line.speed;
            line.y1 += line.speed * 0.5;
            line.x2 += line.speed;
            line.y2 += line.speed * 0.5;
            
            // Reset if off-screen
            if (line.x1 > this.width || line.y1 > this.height) {
                line.x1 = -10;
                line.y1 = -10;
            }
        });
    }
    
    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
    
    handleResize() {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
    }
}

// =====================================================
// SCAN LINE EFFECT
// ===================================================== 

class ScanLineEffect {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'scan-lines';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            mix-blend-mode: overlay;
            opacity: 0.03;
        `;
        
        document.body.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        
        this.draw();
        window.addEventListener('resize', () => this.handleResize());
    }
    
    draw() {
        const lineHeight = 2;
        
        for (let i = 0; i < this.height; i += lineHeight) {
            this.ctx.fillStyle = 'rgba(0, 255, 136, 0.03)';
            this.ctx.fillRect(0, i, this.width, 1);
        }
    }
    
    handleResize() {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        this.draw();
    }
}

// Initialize scan line effect
const scanLines = new ScanLineEffect();

// =====================================================
// NEON GLOW CURSOR
// ===================================================== 

class NeonCursor {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            pointer-events: none;
            z-index: 9999;
        `;
        
        document.body.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        
        this.mouseX = 0;
        this.mouseY = 0;
        this.trailX = [];
        this.trailY = [];
        this.trailLength = 20;
        
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        window.addEventListener('resize', () => this.handleResize());
        
        this.animate();
    }
    
    handleMouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        
        this.trailX.unshift(this.mouseX);
        this.trailY.unshift(this.mouseY);
        
        if (this.trailX.length > this.trailLength) {
            this.trailX.pop();
            this.trailY.pop();
        }
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Draw trail
        for (let i = 0; i < this.trailX.length; i++) {
            const opacity = (i / this.trailLength) * 0.3;
            const size = (i / this.trailLength) * 8;
            
            this.ctx.fillStyle = `rgba(0, 255, 136, ${opacity})`;
            this.ctx.beginPath();
            this.ctx.arc(this.trailX[i], this.trailY[i], size, 0, Math.PI * 2);
            this.ctx.fill();
        }
        
        // Draw main cursor
        this.ctx.fillStyle = 'rgba(0, 255, 136, 0.8)';
        this.ctx.beginPath();
        this.ctx.arc(this.mouseX, this.mouseY, 5, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Draw outer glow
        this.ctx.strokeStyle = 'rgba(0, 255, 136, 0.4)';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(this.mouseX, this.mouseY, 15, 0, Math.PI * 2);
        this.ctx.stroke();
    }
    
    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
    
    handleResize() {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
    }
}

// Initialize neon cursor if not on mobile
if (window.innerWidth > 768) {
    const neonCursor = new NeonCursor();
}

// =====================================================
// FLOATING PARTICLES WITH MOUSE INTERACTION
// ===================================================== 

class InteractiveParticles {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.mouseRadius = 100;
        
        this.generateParticles();
        document.addEventListener('mousemove', (e) => this.updateMouse(e));
        this.animate();
    }
    
    generateParticles() {
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 3px;
                height: 3px;
                background: #00ff88;
                border-radius: 50%;
                left: ${Math.random() * window.innerWidth}px;
                top: ${Math.random() * window.innerHeight}px;
                opacity: ${Math.random() * 0.5 + 0.3};
            `;
            
            this.container.appendChild(particle);
            
            this.particles.push({
                element: particle,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 1,
                vy: (Math.random() - 0.5) * 1,
                opacity: Math.random() * 0.5 + 0.3
            });
        }
    }
    
    updateMouse(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    }
    
    animate() {
        this.particles.forEach(particle => {
            // Movement
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Boundary check
            if (particle.x < 0) particle.x = window.innerWidth;
            if (particle.x > window.innerWidth) particle.x = 0;
            if (particle.y < 0) particle.y = window.innerHeight;
            if (particle.y > window.innerHeight) particle.y = 0;
            
            // Mouse interaction
            const dx = particle.x - this.mouseX;
            const dy = particle.y - this.mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < this.mouseRadius) {
                const angle = Math.atan2(dy, dx);
                const force = (this.mouseRadius - distance) / this.mouseRadius;
                
                particle.vx += Math.cos(angle) * force * 0.5;
                particle.vy += Math.sin(angle) * force * 0.5;
            }
            
            // Update position
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize interactive particles
const interactiveParticles = new InteractiveParticles('particles-container');

// =====================================================
// END OF MATRIX & EFFECTS
// ===================================================== 
