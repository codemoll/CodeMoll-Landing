/* =====================================================
   CODEMOLL LANDING PAGE - PARTICLE EFFECTS
   Premium Cybersecurity & AI Company Website
   ===================================================== */

// =====================================================
// FLOATING PARTICLES SYSTEM
// =====================================================

class ParticleSystem {
    constructor(containerId, particleCount = 50) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.particles = [];
        this.particleCount = particleCount;
        this.mouseX = 0;
        this.mouseY = 0;
        this.interactionRadius = 150;
        this.gravity = 0.1;
        
        this.init();
        this.setupEventListeners();
        this.animate();
    }
    
    init() {
        for (let i = 0; i < this.particleCount; i++) {
            const particle = this.createParticle();
            this.particles.push(particle);
            this.container.appendChild(particle.element);
        }
    }
    
    createParticle() {
        const size = Math.random() * 4 + 2;
        const element = document.createElement('div');
        
        element.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: #00ff88;
            border-radius: 50%;
            pointer-events: none;
            box-shadow: 0 0 ${size * 2}px #00ff88;
            z-index: 2;
        `;
        
        return {
            element: element,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: size,
            opacity: Math.random() * 0.6 + 0.2,
            life: 1,
            maxLife: Math.random() * 100 + 50
        };
    }
    
    setupEventListeners() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
        
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }
    
    update() {
        this.particles.forEach((particle, index) => {
            // Apply velocity
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Apply gravity
            particle.vy += this.gravity * 0.1;
            
            // Mouse interaction
            const dx = this.mouseX - particle.x;
            const dy = this.mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < this.interactionRadius) {
                const angle = Math.atan2(dy, dx);
                const force = (this.interactionRadius - distance) / this.interactionRadius;
                
                particle.vx += Math.cos(angle) * force * 3;
                particle.vy += Math.sin(angle) * force * 3;
            }
            
            // Boundary wrapping
            if (particle.x < -10) particle.x = window.innerWidth + 10;
            if (particle.x > window.innerWidth + 10) particle.x = -10;
            if (particle.y < -10) particle.y = window.innerHeight + 10;
            if (particle.y > window.innerHeight + 10) particle.y = -10;
            
            // Friction
            particle.vx *= 0.99;
            particle.vy *= 0.99;
            
            // Update life
            particle.life--;
            if (particle.life <= 0) {
                const newParticle = this.createParticle();
                this.particles[index] = newParticle;
                particle.element.remove();
                particle = newParticle;
                this.container.appendChild(particle.element);
            }
            
            // Update opacity based on life
            const lifeRatio = particle.life / particle.maxLife;
            particle.opacity = Math.random() * 0.6 + 0.2;
            
            // Update element
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
            particle.element.style.opacity = particle.opacity * lifeRatio;
        });
    }
    
    animate() {
        this.update();
        requestAnimationFrame(() => this.animate());
    }
    
    handleResize() {
        // Particles will naturally wrap to new boundaries
    }
}

// Initialize particle system
const particleSystem = new ParticleSystem('particles-container', 60);

// =====================================================
// BURST PARTICLES (Click Effect)
// ===================================================== 

class BurstParticles {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.particles = [];
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Burst on button clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn')) {
                this.burst(e.clientX, e.clientY, 15);
            }
        });
    }
    
    burst(x, y, count) {
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const speed = Math.random() * 3 + 2;
            const particle = this.createBurstParticle(x, y, angle, speed);
            
            this.container.appendChild(particle.element);
            this.particles.push(particle);
        }
    }
    
    createBurstParticle(x, y, angle, speed) {
        const size = Math.random() * 6 + 2;
        const element = document.createElement('div');
        
        element.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: #00ff88;
            border-radius: 50%;
            pointer-events: none;
            box-shadow: 0 0 10px #00ff88;
            z-index: 2;
            left: ${x}px;
            top: ${y}px;
        `;
        
        return {
            element: element,
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 50,
            maxLife: 50,
            gravity: 0.2
        };
    }
    
    update() {
        this.particles = this.particles.filter(particle => {
            if (particle.life > 0) {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vy += particle.gravity;
                particle.life--;
                
                const opacity = particle.life / particle.maxLife;
                particle.element.style.opacity = opacity;
                particle.element.style.left = particle.x + 'px';
                particle.element.style.top = particle.y + 'px';
                
                return true;
            } else {
                particle.element.remove();
                return false;
            }
        });
        
        if (this.particles.length > 0) {
            requestAnimationFrame(() => this.update());
        }
    }
}

const burstParticles = new BurstParticles('particles-container');

// Trigger animation
setInterval(() => {
    if (burstParticles.particles.length === 0) {
        burstParticles.burst(
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight,
            0
        );
    }
}, 100);

// =====================================================
// SCROLL TRAIL PARTICLES
// ===================================================== 

class ScrollTrailParticles {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.particles = [];
        this.lastScrollY = 0;
        this.scrollVelocity = 0;
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            this.scrollVelocity = currentScrollY - this.lastScrollY;
            this.lastScrollY = currentScrollY;
            
            // Create trail particles on fast scroll
            if (Math.abs(this.scrollVelocity) > 5) {
                this.createTrail();
            }
        });
    }
    
    createTrail() {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * (window.innerHeight / 3) + window.innerHeight / 3;
        
        const element = document.createElement('div');
        element.style.cssText = `
            position: fixed;
            width: 2px;
            height: 2px;
            background: #00ff88;
            border-radius: 50%;
            pointer-events: none;
            z-index: 2;
            left: ${x}px;
            top: ${y}px;
            box-shadow: 0 0 5px #00ff88;
        `;
        
        this.container.appendChild(element);
        
        const particle = {
            element: element,
            x: x,
            y: y,
            opacity: 0.8,
            life: 100
        };
        
        this.particles.push(particle);
        
        // Remove after animation
        const animationInterval = setInterval(() => {
            particle.life--;
            particle.opacity -= 0.01;
            particle.element.style.opacity = particle.opacity;
            
            if (particle.life <= 0) {
                particle.element.remove();
                this.particles = this.particles.filter(p => p !== particle);
                clearInterval(animationInterval);
            }
        }, 20);
    }
}

const scrollTrailParticles = new ScrollTrailParticles('particles-container');

// =====================================================
// HOVER PARTICLE GENERATION
// ===================================================== 

class HoverParticles {
    constructor(containerId, selectorToTrack = '.glass-card, .btn, .service-card') {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.particles = [];
        this.elementsToTrack = document.querySelectorAll(selectorToTrack);
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        this.elementsToTrack.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.createHoverParticles(e);
            });
        });
    }
    
    createHoverParticles(event) {
        const rect = event.target.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        // Create 3-5 particles
        const count = Math.random() * 2 + 3;
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const speed = Math.random() * 2 + 1;
            
            const element = document.createElement('div');
            const size = Math.random() * 4 + 1;
            
            element.style.cssText = `
                position: fixed;
                width: ${size}px;
                height: ${size}px;
                background: #00ff88;
                border-radius: 50%;
                pointer-events: none;
                z-index: 2;
                left: ${x}px;
                top: ${y}px;
                box-shadow: 0 0 8px #00ff88;
            `;
            
            this.container.appendChild(element);
            
            const particle = {
                element: element,
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 60,
                maxLife: 60
            };
            
            this.particles.push(particle);
        }
        
        this.animate();
    }
    
    animate() {
        this.particles = this.particles.filter(particle => {
            if (particle.life > 0) {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vy += 0.1; // gravity
                particle.life--;
                
                const opacity = particle.life / particle.maxLife;
                particle.element.style.opacity = opacity;
                particle.element.style.left = particle.x + 'px';
                particle.element.style.top = particle.y + 'px';
                
                return true;
            } else {
                particle.element.remove();
                return false;
            }
        });
        
        if (this.particles.length > 0) {
            requestAnimationFrame(() => this.animate());
        }
    }
}

const hoverParticles = new HoverParticles('particles-container');

// =====================================================
// GRADIENT PARTICLE BACKGROUND
// ===================================================== 

class GradientParticles {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.particles = [];
        this.createGradientField();
    }
    
    createGradientField() {
        const fieldWidth = Math.ceil(window.innerWidth / 100);
        const fieldHeight = Math.ceil(window.innerHeight / 100);
        
        for (let x = 0; x < fieldWidth; x++) {
            for (let y = 0; y < fieldHeight; y++) {
                if (Math.random() > 0.7) { // Only 30% density
                    const element = document.createElement('div');
                    const opacity = Math.random() * 0.3 + 0.1;
                    
                    element.style.cssText = `
                        position: fixed;
                        width: 1px;
                        height: 1px;
                        background: #00ff88;
                        pointer-events: none;
                        z-index: 1;
                        left: ${x * 100 + Math.random() * 50}px;
                        top: ${y * 100 + Math.random() * 50}px;
                        opacity: ${opacity};
                        box-shadow: 0 0 3px #00ff88;
                    `;
                    
                    this.container.appendChild(element);
                    
                    this.particles.push({
                        element: element,
                        x: x * 100,
                        y: y * 100,
                        opacity: opacity,
                        phase: Math.random() * Math.PI * 2
                    });
                }
            }
        }
        
        this.animate();
    }
    
    animate() {
        this.particles.forEach(particle => {
            particle.phase += 0.01;
            const newOpacity = particle.opacity + Math.sin(particle.phase) * 0.1;
            particle.element.style.opacity = Math.max(0, Math.min(1, newOpacity));
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

const gradientParticles = new GradientParticles('particles-container');

// =====================================================
// CONSTELLATION PARTICLES
// ===================================================== 

class ConstellationParticles {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        
        this.container.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        
        this.stars = [];
        this.createStars();
        
        window.addEventListener('resize', () => this.handleResize());
        this.animate();
    }
    
    createStars() {
        const starCount = Math.floor(this.width / 50);
        
        for (let i = 0; i < starCount; i++) {
            this.stars.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                radius: Math.random() * 1.5,
                opacity: Math.random() * 0.5 + 0.3,
                twinkleSpeed: Math.random() * 0.02 + 0.01
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        this.stars.forEach((star, index) => {
            // Twinkle effect
            star.opacity += star.twinkleSpeed;
            if (star.opacity > 1 || star.opacity < 0.2) {
                star.twinkleSpeed *= -1;
            }
            
            // Draw star
            this.ctx.fillStyle = `rgba(0, 255, 136, ${star.opacity})`;
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Draw connections
            if (index < this.stars.length - 1) {
                const nextStar = this.stars[index + 1];
                const dx = nextStar.x - star.x;
                const dy = nextStar.y - star.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 200) {
                    this.ctx.strokeStyle = `rgba(0, 255, 136, ${(1 - distance / 200) * 0.2})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.beginPath();
                    this.ctx.moveTo(star.x, star.y);
                    this.ctx.lineTo(nextStar.x, nextStar.y);
                    this.ctx.stroke();
                }
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
    
    handleResize() {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        this.stars = [];
        this.createStars();
    }
}

// Initialize constellation particles
const constellationParticles = new ConstellationParticles('particles-container');

// =====================================================
// AMBIENT PARTICLE EMITTER
// ===================================================== 

class AmbientEmitter {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.emitters = [];
        this.setupEmitters();
    }
    
    setupEmitters() {
        // Create emitters at random positions
        const emitterCount = 3;
        
        for (let i = 0; i < emitterCount; i++) {
            const emitter = {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                emitRate: Math.random() * 2 + 1
            };
            
            this.emitters.push(emitter);
        }
        
        this.emit();
    }
    
    emit() {
        this.emitters.forEach(emitter => {
            // Move emitter
            emitter.x += emitter.vx;
            emitter.y += emitter.vy;
            
            // Bounce off walls
            if (emitter.x < 0 || emitter.x > window.innerWidth) emitter.vx *= -1;
            if (emitter.y < 0 || emitter.y > window.innerHeight) emitter.vy *= -1;
            
            // Emit particles
            for (let i = 0; i < emitter.emitRate; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 1 + 0.5;
                
                const element = document.createElement('div');
                const size = Math.random() * 2 + 1;
                
                element.style.cssText = `
                    position: fixed;
                    width: ${size}px;
                    height: ${size}px;
                    background: #00ff88;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 2;
                    left: ${emitter.x}px;
                    top: ${emitter.y}px;
                    opacity: 0.6;
                    box-shadow: 0 0 5px #00ff88;
                `;
                
                this.container.appendChild(element);
                
                let life = 60;
                const updateParticle = () => {
                    life--;
                    const opacity = 0.6 * (life / 60);
                    element.style.opacity = opacity;
                    
                    const currentX = parseFloat(element.style.left);
                    const currentY = parseFloat(element.style.top);
                    
                    element.style.left = (currentX + Math.cos(angle) * speed) + 'px';
                    element.style.top = (currentY + Math.sin(angle) * speed) + 'px';
                    
                    if (life > 0) {
                        requestAnimationFrame(updateParticle);
                    } else {
                        element.remove();
                    }
                };
                
                updateParticle();
            }
        });
        
        requestAnimationFrame(() => this.emit());
    }
}

// Initialize ambient emitter
const ambientEmitter = new AmbientEmitter('particles-container');

// =====================================================
// END OF PARTICLE EFFECTS
// ===================================================== 
