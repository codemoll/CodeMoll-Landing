/* =====================================================
   CODEMOLL LANDING PAGE - TERMINAL EFFECTS
   Premium Cybersecurity & AI Company Website
   ===================================================== */

// =====================================================
// TERMINAL TYPING EFFECT
// =====================================================

class TerminalTyper {
    constructor(elementId, speed = 50) {
        this.element = document.getElementById(elementId);
        if (!this.element) return;
        
        this.speed = speed;
        this.isTyping = false;
        this.currentIndex = 0;
        this.fullText = this.element.textContent;
        this.element.textContent = '';
        
        // Start typing animation
        this.startTyping();
    }
    
    startTyping() {
        this.isTyping = true;
        this.type();
    }
    
    type() {
        if (this.currentIndex < this.fullText.length) {
            const char = this.fullText.charAt(this.currentIndex);
            this.element.textContent += char;
            this.currentIndex++;
            
            // Vary typing speed for natural feel
            let delay = this.speed;
            if (char === '.' || char === ',' || char === '!') {
                delay = this.speed * 3;
            } else if (Math.random() > 0.9) {
                delay = this.speed * 0.5; // Speed burst
            }
            
            setTimeout(() => this.type(), delay);
        } else {
            this.isTyping = false;
        }
    }
    
    skip() {
        this.element.textContent = this.fullText;
        this.currentIndex = this.fullText.length;
        this.isTyping = false;
    }
}

// =====================================================
// TERMINAL EFFECT WITH CURSOR
// =====================================================

class TerminalEffect {
    constructor(elementId, lines = [], speed = 80) {
        this.element = document.getElementById(elementId);
        if (!this.element) return;
        
        this.lines = lines;
        this.speed = speed;
        this.currentLine = 0;
        this.currentChar = 0;
        this.isTyping = false;
        this.cursor = this.createCursor();
        
        this.element.innerHTML = '';
        this.element.appendChild(this.cursor);
        
        this.startTyping();
    }
    
    createCursor() {
        const cursor = document.createElement('span');
        cursor.className = 'terminal-cursor';
        cursor.style.cssText = `
            display: inline-block;
            width: 8px;
            height: 16px;
            background: #00ff88;
            margin: 0 2px;
            animation: blink 1s infinite;
        `;
        return cursor;
    }
    
    startTyping() {
        this.isTyping = true;
        this.typeNextLine();
    }
    
    typeNextLine() {
        if (this.currentLine < this.lines.length) {
            const lineDiv = document.createElement('div');
            lineDiv.className = 'terminal-line';
            
            const promptSpan = document.createElement('span');
            promptSpan.className = 'terminal-prompt';
            promptSpan.textContent = '$ ';
            promptSpan.style.color = '#00cc6a';
            
            lineDiv.appendChild(promptSpan);
            this.element.insertBefore(lineDiv, this.cursor);
            
            this.typeText(lineDiv, this.lines[this.currentLine]);
        } else {
            this.isTyping = false;
        }
    }
    
    typeText(lineDiv, text, index = 0) {
        if (index < text.length) {
            const char = text.charAt(index);
            
            // Create text span with syntax highlighting
            const charSpan = document.createElement('span');
            charSpan.textContent = char;
            charSpan.className = this.getSyntaxClass(char, text, index);
            
            // Remove cursor before adding char
            this.cursor.parentNode.removeChild(this.cursor);
            lineDiv.appendChild(charSpan);
            lineDiv.appendChild(this.cursor);
            
            setTimeout(() => {
                this.typeText(lineDiv, text, index + 1);
            }, this.speed);
        } else {
            // Move to next line after delay
            setTimeout(() => {
                this.currentLine++;
                this.typeNextLine();
            }, 1000);
        }
    }
    
    getSyntaxClass(char, text, index) {
        // Simple syntax highlighting
        if (char === '{' || char === '}' || char === '[' || char === ']') {
            return 'syntax-bracket';
        }
        if (char === '"' || char === "'") {
            return 'syntax-string';
        }
        if (char === '=') {
            return 'syntax-operator';
        }
        return '';
    }
}

// =====================================================
// HERO TERMINAL ANIMATION
// ===================================================== 

class HeroTerminal {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.lines = [
            'codemoll@cybersecurity:~$ sudo ./scan.sh',
            'Initializing deep scan protocol...',
            '[████████████████████░] 89%',
            'Threat detection: ACTIVE',
            'AI analysis: ONLINE',
            'Status: SECURE ✓'
        ];
        
        this.currentLine = 0;
        this.currentChar = 0;
        this.speed = 40;
        
        this.initialize();
        this.startAnimation();
    }
    
    initialize() {
        this.container.innerHTML = '';
        
        this.lines.forEach((line, index) => {
            const lineDiv = document.createElement('div');
            lineDiv.className = 'terminal-line';
            lineDiv.style.opacity = '0';
            lineDiv.style.animation = `fadeInUp 0.5s ease forwards`;
            lineDiv.style.animationDelay = `${index * 0.1}s`;
            
            // Add prompt
            if (index === 0) {
                const prompt = document.createElement('span');
                prompt.className = 'terminal-prompt';
                prompt.textContent = '> ';
                prompt.style.color = '#00ff88';
                lineDiv.appendChild(prompt);
            } else if (index === 2) {
                // Progress bar
                const progressSpan = document.createElement('span');
                progressSpan.textContent = line;
                progressSpan.style.fontFamily = 'monospace';
                lineDiv.appendChild(progressSpan);
                lineDiv.classList.add('terminal-progress');
            } else {
                const textSpan = document.createElement('span');
                textSpan.textContent = line;
                lineDiv.appendChild(textSpan);
            }
            
            this.container.appendChild(lineDiv);
        });
    }
    
    startAnimation() {
        // Animate progress bar
        const progressLine = this.container.querySelector('.terminal-progress');
        if (progressLine) {
            this.animateProgressBar(progressLine);
        }
        
        // Pulse status indicator
        const statusLine = Array.from(this.container.querySelectorAll('.terminal-line')).pop();
        if (statusLine) {
            this.pulseStatus(statusLine);
        }
    }
    
    animateProgressBar(element) {
        let progress = 0;
        const interval = setInterval(() => {
            progress++;
            const filled = '█'.repeat(Math.floor(progress / 10));
            const empty = '░'.repeat(10 - Math.floor(progress / 10));
            
            element.textContent = `[${filled}${empty}] ${progress}%`;
            
            if (progress >= 100) {
                clearInterval(interval);
            }
        }, 30);
    }
    
    pulseStatus(element) {
        element.style.animation = 'glowPulse 2s ease-in-out infinite';
    }
}

// Initialize hero terminal
const heroTerminal = new HeroTerminal('terminal-body');

// =====================================================
// CODE SYNTAX HIGHLIGHTER
// ===================================================== 

class CodeHighlighter {
    constructor() {
        this.keywords = ['function', 'const', 'let', 'var', 'return', 'if', 'else', 'for', 'while', 'import', 'export', 'async', 'await'];
        this.strings = ['"', "'"];
        this.operators = ['=', '+', '-', '*', '/', '%', '||', '&&', '!'];
    }
    
    highlight(code) {
        let highlighted = code;
        
        // Highlight keywords
        this.keywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            highlighted = highlighted.replace(regex, `<span class="syntax-keyword">${keyword}</span>`);
        });
        
        // Highlight strings
        highlighted = highlighted.replace(/"[^"]*"/g, match => `<span class="syntax-string">${match}</span>`);
        highlighted = highlighted.replace(/'[^']*'/g, match => `<span class="syntax-string">${match}</span>`);
        
        // Highlight operators
        this.operators.forEach(op => {
            const escapedOp = op.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(escapedOp, 'g');
            highlighted = highlighted.replace(regex, `<span class="syntax-operator">${op}</span>`);
        });
        
        return highlighted;
    }
}

const codeHighlighter = new CodeHighlighter();

// =====================================================
// TYPING ANIMATION
// ===================================================== 

class TypingAnimation {
    constructor(elementSelector, words = [], speed = 100, delayBetweenWords = 2000) {
        this.elements = document.querySelectorAll(elementSelector);
        this.words = words;
        this.speed = speed;
        this.delayBetweenWords = delayBetweenWords;
        this.currentWordIndex = 0;
        
        if (this.elements.length > 0 && this.words.length > 0) {
            this.startAnimation();
        }
    }
    
    startAnimation() {
        this.typeWord();
    }
    
    typeWord() {
        const element = this.elements[0];
        const word = this.words[this.currentWordIndex];
        
        element.innerHTML = '';
        let index = 0;
        
        const typeInterval = setInterval(() => {
            if (index < word.length) {
                element.textContent += word.charAt(index);
                index++;
            } else {
                clearInterval(typeInterval);
                
                // Delete word after delay
                setTimeout(() => {
                    this.deleteWord();
                }, this.delayBetweenWords);
            }
        }, this.speed);
    }
    
    deleteWord() {
        const element = this.elements[0];
        let text = element.textContent;
        
        const deleteInterval = setInterval(() => {
            if (text.length > 0) {
                text = text.slice(0, -1);
                element.textContent = text;
            } else {
                clearInterval(deleteInterval);
                
                // Move to next word
                this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
                
                setTimeout(() => {
                    this.typeWord();
                }, 500);
            }
        }, this.speed / 2);
    }
}

// Initialize typing animation for hero section
const heroTyping = new TypingAnimation('.typing-container', [
    'Cybersecurity Solutions',
    'AI-Powered Detection',
    'Enterprise Protection',
    'Real-Time Monitoring'
], 80, 2500);

// =====================================================
// COMMAND LINE INTERFACE EFFECT
// ===================================================== 

class CLIEffect {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.commands = [
            { cmd: 'scan --all', output: 'Scanning system... Done ✓' },
            { cmd: 'analyze --threats', output: 'Analyzing threats... 0 found ✓' },
            { cmd: 'status --report', output: 'System Status: SECURE' }
        ];
        
        this.currentCommand = 0;
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Execute commands on interaction
        if (this.container) {
            this.container.addEventListener('click', () => {
                this.executeNextCommand();
            });
        }
    }
    
    executeNextCommand() {
        if (this.currentCommand < this.commands.length) {
            const { cmd, output } = this.commands[this.currentCommand];
            this.displayCommand(cmd, output);
            this.currentCommand++;
        }
    }
    
    displayCommand(cmd, output) {
        const lineDiv = document.createElement('div');
        lineDiv.className = 'cli-line';
        
        const prompt = document.createElement('span');
        prompt.className = 'cli-prompt';
        prompt.textContent = '$ ';
        
        const cmdSpan = document.createElement('span');
        cmdSpan.textContent = cmd;
        
        lineDiv.appendChild(prompt);
        lineDiv.appendChild(cmdSpan);
        
        this.container.appendChild(lineDiv);
        
        // Add output
        setTimeout(() => {
            const outputDiv = document.createElement('div');
            outputDiv.className = 'cli-output';
            outputDiv.textContent = output;
            this.container.appendChild(outputDiv);
        }, 500);
    }
}

// =====================================================
// LIVE CODE EDITOR EFFECT
// ===================================================== 

class LiveCodeEditor {
    constructor(elementId, code = '') {
        this.element = document.getElementById(elementId);
        if (!this.element) return;
        
        this.code = code;
        this.lineNumber = 1;
        this.displayCode();
    }
    
    displayCode() {
        const codeContainer = document.createElement('pre');
        const codeBlock = document.createElement('code');
        
        codeBlock.className = 'language-javascript';
        codeBlock.textContent = this.code;
        
        codeContainer.appendChild(codeBlock);
        this.element.appendChild(codeContainer);
    }
    
    updateCode(newCode) {
        this.code = newCode;
        this.element.innerHTML = '';
        this.displayCode();
    }
    
    highlightLine(lineNum) {
        const lines = this.element.querySelectorAll('code');
        if (lines[lineNum - 1]) {
            lines[lineNum - 1].classList.add('highlight');
        }
    }
}

// =====================================================
// REAL-TIME LOG SIMULATOR
// ===================================================== 

class LogSimulator {
    constructor(elementId) {
        this.element = document.getElementById(elementId);
        if (!this.element) return;
        
        this.logs = [
            { time: '10:23:45', level: 'INFO', message: 'System initialized' },
            { time: '10:23:46', level: 'DEBUG', message: 'Loading modules...' },
            { time: '10:23:47', level: 'INFO', message: 'Security module loaded' },
            { time: '10:23:48', level: 'SUCCESS', message: 'All systems operational' }
        ];
        
        this.simulateLogs();
    }
    
    simulateLogs() {
        this.logs.forEach((log, index) => {
            setTimeout(() => {
                this.addLog(log);
            }, index * 500);
        });
    }
    
    addLog(log) {
        const logLine = document.createElement('div');
        logLine.className = `log-line log-${log.level.toLowerCase()}`;
        
        const time = document.createElement('span');
        time.className = 'log-time';
        time.textContent = `[${log.time}]`;
        
        const level = document.createElement('span');
        level.className = `log-level log-level-${log.level.toLowerCase()}`;
        level.textContent = log.level;
        
        const message = document.createElement('span');
        message.className = 'log-message';
        message.textContent = log.message;
        
        logLine.appendChild(time);
        logLine.appendChild(level);
        logLine.appendChild(message);
        
        this.element.appendChild(logLine);
        
        // Auto-scroll
        this.element.scrollTop = this.element.scrollHeight;
    }
}

// =====================================================
// MATRIX TEXT EFFECT
// ===================================================== 

class MatrixText {
    constructor(elementId) {
        this.element = document.getElementById(elementId);
        if (!this.element) return;
        
        this.text = this.element.textContent;
        this.chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        this.charArray = this.chars.split('');
        this.element.addEventListener('mouseenter', () => this.startEffect());
    }
    
    startEffect() {
        const originalText = this.text;
        let isAnimating = true;
        let progress = 0;
        
        const animate = () => {
            if (isAnimating && progress < 100) {
                let glitchedText = '';
                
                for (let i = 0; i < originalText.length; i++) {
                    if (Math.random() > (progress / 100)) {
                        glitchedText += this.charArray[Math.floor(Math.random() * this.charArray.length)];
                    } else {
                        glitchedText += originalText[i];
                    }
                }
                
                this.element.textContent = glitchedText;
                progress += 10;
                
                requestAnimationFrame(animate);
            } else {
                this.element.textContent = originalText;
                isAnimating = false;
            }
        };
        
        animate();
    }
}

// =====================================================
// INITIALIZE ALL TERMINAL EFFECTS
// ===================================================== 

function initTerminalEffects() {
    // Find all terminal elements and apply effects
    const typingElements = document.querySelectorAll('[data-typing]');
    typingElements.forEach(element => {
        new TerminalTyper(element.id, 50);
    });
    
    // Initialize Matrix text effects
    const matrixElements = document.querySelectorAll('[data-matrix]');
    matrixElements.forEach(element => {
        new MatrixText(element.id);
    });
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', initTerminalEffects);

// =====================================================
// END OF TERMINAL EFFECTS
// ===================================================== 
