/* ----------------------------------------------------
   MOBILE NAVIGATION TOGGLE
   ---------------------------------------------------- */
const mobileToggle = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu');

if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        mobileToggle.classList.toggle('active');
    });
}

// Close mobile menu when a nav link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
            navMenu.classList.remove('open');
            mobileToggle.classList.remove('active');
        }
    });
});

/* ----------------------------------------------------
   NAVBAR SHOW/HIDE ON SCROLL
   ---------------------------------------------------- */
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > 150) {
        // Scroll down
        navbar.classList.add('scroll-down');
        navbar.classList.remove('scroll-up');
    } else {
        // Scroll up
        navbar.classList.add('scroll-up');
        navbar.classList.remove('scroll-down');
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
});

/* ----------------------------------------------------
   INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
   ---------------------------------------------------- */
const fadeElems = document.querySelectorAll('.scroll-fade');

const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        appearOnScroll.unobserve(entry.target);
    });
}, appearOptions);

fadeElems.forEach(elem => {
    appearOnScroll.observe(elem);
});

// Update active navigation link on scroll
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

/* ----------------------------------------------------
   PROJECT FILTERS
   ---------------------------------------------------- */
const filterTabs = document.querySelectorAll('.filter-tab');
const projectCards = document.querySelectorAll('.project-card');

filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Set active tab class
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filterValue = tab.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filterValue === 'all') {
                card.classList.remove('hidden');
            } else {
                const category = card.getAttribute('data-category');
                if (category === filterValue) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            }
        });
    });
});

/* ----------------------------------------------------
   INTERACTIVE TERMINAL CONSOLE
   ---------------------------------------------------- */
const terminalInput = document.getElementById('terminal-input');
const terminalScreen = document.getElementById('terminal-screen');
const activeLine = document.querySelector('.active-line');
const inputCursor = document.querySelector('.input-cursor');

// Focus input whenever terminal is clicked
const terminalWidget = document.getElementById('interactive-terminal');
if (terminalWidget && terminalInput) {
    terminalWidget.addEventListener('click', () => {
        terminalInput.focus();
    });
    
    // Auto align custom cursor to typing input content length
    terminalInput.addEventListener('input', () => {
        updateCursorPosition();
    });
    
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = terminalInput.value.trim().toLowerCase();
            executeTerminalCommand(command);
            terminalInput.value = '';
            updateCursorPosition();
        }
    });
}

function updateCursorPosition() {
    const textLength = terminalInput.value.length;
    // Estimate character width in pixels (roughly 8.2px for font size 0.85rem mono)
    const cursorOffset = textLength * 8.2;
    inputCursor.style.left = `${cursorOffset}px`;
}

function printToTerminal(text, type = '') {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    if (type) {
        line.classList.add(type);
    }
    line.innerHTML = text;
    terminalScreen.insertBefore(line, activeLine);
    terminalScreen.scrollTop = terminalScreen.scrollHeight;
}

function executeTerminalCommand(cmd) {
    // Print executed prompt line
    printToTerminal(`<span class="text-prompt">dharanesh@portfolio:~$</span> <span>${cmd}</span>`);

    if (cmd === '') return;

    switch (cmd) {
        case 'help':
            printToTerminal(`
                <div class="command-help-grid" style="margin-top: 8px;">
                    <span>about</span> <span>- Quick summary of background and career goals.</span>
                    <span>skills</span> <span>- Display core AI, ML, & engineering competencies.</span>
                    <span>experience</span> <span>- Inspect professional Research Internship.</span>
                    <span>projects</span> <span>- View selected machine learning project specs.</span>
                    <span>publications</span> <span>- Read details on peer-reviewed papers (IEEE / ICAAN).</span>
                    <span>education</span> <span>- Display B.Tech & M.Tech academic records.</span>
                    <span>clear</span> <span>- Clear the output logs.</span>
                </div>
            `);
            break;

        case 'about':
            printToTerminal(`<strong>Dharaneshwar K</strong><br>
                Candidate for M.Tech in Artificial Intelligence Engineering.<br>
                B.Tech Graduate in AI & Data Science (CGPA: 7.72/10).<br>
                Specialization: Time-series Anomaly Detection, Advanced Survival Models, Vision Transformers.<br>
                Targeting: High-scale Machine Learning Engineer and AI Research roles at FAANG / Tier 1 companies.`, 'text-comment');
            break;

        case 'skills':
            printToTerminal(`
                <span style="color: var(--accent-cyan);">=============================================</span><br>
                <strong>Languages:</strong> Python, Java, SQL<br>
                <strong>Frameworks:</strong> PyTorch, TensorFlow, Scikit-learn, OpenCV, Keras, Pandas, NumPy<br>
                <strong>Concepts:</strong> Deep Learning, Transformers, Computer Vision, Time-series Anomaly Detection<br>
                <strong>Tools:</strong> AWS, Git, Google Colab, Jupyter Notebook, VS Code<br>
                <span style="color: var(--accent-cyan);">=============================================</span>
            `);
            break;

        case 'experience':
            printToTerminal(`
                <strong>Machine Learning Research Intern</strong><br>
                National Institute of Technology (NIT), Trichy | Jun 2025 - Sept 2025<br>
                - Conducted predictive research on workforce analytics and survival analysis under faculty guidance.<br>
                - Designed end-to-end pipelines incorporating Canonical Correlation Analysis (CCA) and SMOTE.<br>
                - Modeled retention curves using Random Survival Forest (RSF), Cox Proportional Hazards (CoxPH), and XGBoost.
            `, 'text-comment');
            break;

        case 'projects':
            printToTerminal(`
                <strong>1. Hybrid Survival Ensemble Model</strong><br>
                Developed a hybrid survival ensemble model integrating RSF, CoxPH, XGBoost, CCA, and SMOTE for attrition prediction.<br><br>
                <strong>2. Satellite Telemetry Anomaly Detection</strong><br>
                Built a PyTorch anomaly detection system for ESA GOCE telemetry data using TranAD (Transformer-based) with POT thresholding.<br><br>
                <strong>3. Face-Guardian Security Hub</strong><br>
                Engineered a real-time face recognition smart security model using OpenCV, Alert logs, and edge deployment scripts.<br><br>
                <strong>4. Autonomous Waste Classifier</strong><br>
                Implemented a Convolutional Neural Network (CNN) pipeline with Transfer Learning yielding 94%+ classification accuracy.
            `);
            break;

        case 'publications':
            printToTerminal(`
                <strong>[1] Hybrid Survival Ensemble Model for Employee Attrition Prediction</strong><br>
                Published in the 2026 IEEE International Conference on Innovative Trends in Information Technology (ICITIIT), IIIT Kottayam.<br>
                DOI: 10.1109/ICITIIT68860.2026.11499599<br><br>
                <strong>[2] Markerless Autonomous UAV Landing Using Vision Transformers...</strong><br>
                Abstract Published in the ICAAN Conference Proceedings (2026).
            `);
            break;

        case 'education':
            printToTerminal(`
                <strong>Amrita Vishwa Vidyapeetham, Coimbatore</strong><br>
                M.Tech in Artificial Intelligence Engineering (Jul 2026 - May 2028 Expected)<br><br>
                <strong>Saranathan College of Engineering, Trichy</strong><br>
                B.Tech in Artificial Intelligence and Data Science (Sep 2022 - Apr 2026 | CGPA: 7.72/10)
            `, 'text-comment');
            break;

        case 'theme':
            printToTerminal(`
                Available console themes:<br>
                - <strong>theme default</strong> (Cyan/Indigo glow)<br>
                - <strong>theme purple</strong> (Purple glow)<br>
                - <strong>theme matrix</strong> (Green/Retro terminal matrix)<br>
                Usage: <em>theme purple</em>
            `);
            break;

        case 'theme default':
            terminalWidget.className = 'terminal-widget';
            stopMatrixRain();
            printToTerminal('System theme set to default.', 'text-comment');
            break;

        case 'theme purple':
            terminalWidget.className = 'terminal-widget theme-purple';
            stopMatrixRain();
            printToTerminal('System theme set to purple.', 'text-comment');
            break;

        case 'theme matrix':
        case 'matrix':
            terminalWidget.className = 'terminal-widget theme-matrix';
            startMatrixRain();
            printToTerminal('System loaded: DIGITAL CODESPACE ENCRYPTED...', 'text-prompt');
            break;

        case 'clear':
            // Clear all terminal lines except active input line
            const lines = Array.from(terminalScreen.children);
            lines.forEach(line => {
                if (line !== activeLine) {
                    terminalScreen.removeChild(line);
                }
            });
            stopMatrixRain();
            break;

        default:
            printToTerminal(`bash: command not found: ${cmd}. Type 'help' to see available options.`, 'error');
            break;
    }
}

/* ----------------------------------------------------
   COPY EMAIL CLIPBOARD FUNCTION
   ---------------------------------------------------- */
function copyEmailToClipboard() {
    const emailStr = "dharaneshwar.pchi@gmail.com";
    navigator.clipboard.writeText(emailStr).then(() => {
        const toast = document.getElementById('copy-toast');
        if (toast) {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 2500);
        }
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

/* ----------------------------------------------------
   CONTACT FORM SUBMISSION SIMULATION
   ---------------------------------------------------- */
function handleFormSubmit(event) {
    event.preventDefault();
    
    const statusDiv = document.getElementById('form-status');
    const sendButton = document.getElementById('btn-send-message');
    const form = document.getElementById('contact-form');
    
    if (statusDiv && sendButton && form) {
        // Check if user has updated placeholder key
        const accessKeyInput = form.querySelector('input[name="access_key"]');
        if (accessKeyInput && accessKeyInput.value === 'YOUR_ACCESS_KEY_HERE') {
            statusDiv.className = 'form-status error';
            statusDiv.innerHTML = '✗ Setup required: Please replace "YOUR_ACCESS_KEY_HERE" in index.html with a valid Web3Forms Key.';
            return;
        }
        
        sendButton.disabled = true;
        const originalText = sendButton.innerHTML;
        sendButton.innerHTML = '<span>Sending Message...</span>';
        statusDiv.className = 'form-status';
        statusDiv.innerHTML = '';
        
        const formData = new FormData(form);
        
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                statusDiv.className = 'form-status success';
                statusDiv.innerHTML = '✓ Message sent successfully! I will receive it in my inbox shortly.';
                form.reset();
            } else {
                console.error(response);
                statusDiv.className = 'form-status error';
                statusDiv.innerHTML = '✗ ' + (json.message || 'Submission failed.');
            }
        })
        .catch(error => {
            console.error(error);
            statusDiv.className = 'form-status error';
            statusDiv.innerHTML = '✗ Connection error. Please copy my email address instead.';
        })
        .then(() => {
            sendButton.innerHTML = originalText;
            sendButton.disabled = false;
        });
    }
}

/* ----------------------------------------------------
   MOUSE GLOW ACCENT TRACKING FOR CARDS
   ---------------------------------------------------- */
const cardsList = document.querySelectorAll('.project-card, .playground-card');
cardsList.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

/* ----------------------------------------------------
   INTERACTIVE CANVAS NEURAL-NETWORK PARTICLES BG
   ---------------------------------------------------- */
const bgCanvas = document.getElementById('particle-canvas');
if (bgCanvas) {
    const ctx = bgCanvas.getContext('2d');
    let particles = [];
    const maxParticles = 75;
    
    let mouse = { x: null, y: null, radius: 180 };
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    
    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });
    
    window.addEventListener('resize', resizeBgCanvas);
    
    function resizeBgCanvas() {
        bgCanvas.width = window.innerWidth;
        bgCanvas.height = window.innerHeight;
    }
    
    class NetworkParticle {
        constructor() {
            this.x = Math.random() * window.innerWidth;
            this.y = Math.random() * window.innerHeight;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2.5 + 1.2;
            this.color = Math.random() > 0.5 ? 'rgba(6, 182, 212, 0.4)' : 'rgba(99, 102, 241, 0.4)';
            this.baseColorHex = Math.random() > 0.5 ? '#06b6d4' : '#6366f1';
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Boundary checks
            if (this.x < 0) { this.x = 0; this.vx *= -1; }
            if (this.x > bgCanvas.width) { this.x = bgCanvas.width; this.vx *= -1; }
            if (this.y < 0) { this.y = 0; this.vy *= -1; }
            if (this.y > bgCanvas.height) { this.y = bgCanvas.height; this.vy *= -1; }
            
            // Mouse gravity swarm
            if (mouse.x !== null && mouse.y !== null) {
                let dx = this.x - mouse.x;
                let dy = this.y - mouse.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    let pullStrength = (mouse.radius - dist) * 0.00015;
                    this.vx -= dx * pullStrength;
                    this.vy -= dy * pullStrength;
                }
            }
            
            // Speed limits and friction
            const maxSpeed = 1.6;
            let speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            if (speed > maxSpeed) {
                this.vx = (this.vx / speed) * maxSpeed;
                this.vy = (this.vy / speed) * maxSpeed;
            }
            this.vx *= 0.99;
            this.vy *= 0.99;
            
            // Drift force
            this.vx += (Math.random() - 0.5) * 0.02;
            this.vy += (Math.random() - 0.5) * 0.02;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
    
    // Page click ripple shockwave
    window.addEventListener('click', (e) => {
        const clickX = e.clientX;
        const clickY = e.clientY;
        
        particles.forEach(p => {
            let dx = p.x - clickX;
            let dy = p.y - clickY;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 250) {
                let pushForce = (250 - dist) * 0.035;
                p.vx += (dx / dist) * pushForce;
                p.vy += (dy / dist) * pushForce;
            }
        });
    });
    
    function initBgParticles() {
        resizeBgCanvas();
        particles = [];
        for (let i = 0; i < maxParticles; i++) {
            particles.push(new NetworkParticle());
        }
    }
    
    function animateBgParticles() {
        ctx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
        
        // Draw connection lines
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            for (let j = i + 1; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 130) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    
                    let alpha = 0.18 * (1 - dist / 130);
                    ctx.strokeStyle = particles[i].baseColorHex === particles[j].baseColorHex 
                        ? `rgba(${particles[i].baseColorHex === '#06b6d4' ? '6, 182, 212' : '99, 102, 241'}, ${alpha})`
                        : `rgba(99, 102, 241, ${alpha})`;
                        
                    ctx.lineWidth = 0.7;
                    ctx.stroke();
                }
            }
            
            // Connect to mouse cursor
            if (mouse.x !== null && mouse.y !== null) {
                let dx = particles[i].x - mouse.x;
                let dy = particles[i].y - mouse.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    
                    let alpha = 0.35 * (1 - dist / mouse.radius);
                    ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
                    ctx.lineWidth = 1.0;
                    ctx.stroke();
                }
            }
        }
        
        // Draw mouse glowing orb
        if (mouse.x !== null && mouse.y !== null) {
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#06b6d4';
            ctx.shadowBlur = 12;
            ctx.shadowColor = '#06b6d4';
            ctx.fill();
            ctx.shadowBlur = 0;
            
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, 45, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(6, 182, 212, 0.05)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
        
        requestAnimationFrame(animateBgParticles);
    }
    
    initBgParticles();
    animateBgParticles();
}

/* ----------------------------------------------------
   TERMINAL MATRIX RAIN CODE ANIMATION
   ---------------------------------------------------- */
let matrixInterval = null;
function startMatrixRain() {
    stopMatrixRain(); // Ensure reset
    
    const matrixCanvas = document.createElement('canvas');
    matrixCanvas.id = 'matrix-rain-canvas';
    matrixCanvas.style.position = 'absolute';
    matrixCanvas.style.top = '0';
    matrixCanvas.style.left = '0';
    matrixCanvas.style.width = '100%';
    matrixCanvas.style.height = '100%';
    matrixCanvas.style.opacity = '0.12';
    matrixCanvas.style.pointerEvents = 'none';
    matrixCanvas.style.zIndex = '0';
    
    const body = document.querySelector('.terminal-body');
    body.style.position = 'relative';
    body.appendChild(matrixCanvas);
    
    const ctx = matrixCanvas.getContext('2d');
    matrixCanvas.width = body.clientWidth;
    matrixCanvas.height = body.clientHeight;
    
    const katakana = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEF';
    const alphabet = katakana.split('');
    
    const fontSize = 10;
    const columns = matrixCanvas.width / fontSize;
    
    const rainDrops = [];
    for (let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
    }
    
    function drawRain() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        
        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet[Math.floor(Math.random() * alphabet.length)];
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
            
            if (rainDrops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    }
    
    matrixInterval = setInterval(drawRain, 30);
}

function stopMatrixRain() {
    if (matrixInterval) {
        clearInterval(matrixInterval);
        matrixInterval = null;
    }
    const canvas = document.getElementById('matrix-rain-canvas');
    if (canvas) {
        canvas.remove();
    }
}

/* ----------------------------------------------------
   TIME-SERIES ANOMALY DETECTION CHART LAB
   ---------------------------------------------------- */
const telemetryCanvas = document.getElementById('telemetry-chart');
if (telemetryCanvas) {
    const ctx = telemetryCanvas.getContext('2d');
    let points = [];
    const maxPoints = 120;
    let offset = 0;
    
    // Sliders
    const paramSensitivity = document.getElementById('param-sensitivity');
    const paramNoise = document.getElementById('param-noise');
    const paramInject = document.getElementById('param-inject-anomaly');
    
    const valSensitivity = document.getElementById('val-sensitivity');
    const valNoise = document.getElementById('val-noise');
    const alertBanner = document.getElementById('anomaly-alert-banner');
    const alertText = document.getElementById('alert-banner-text');
    
    // Update metric indicators
    paramSensitivity.addEventListener('input', () => valSensitivity.innerText = paramSensitivity.value);
    paramNoise.addEventListener('input', () => valNoise.innerText = `${paramNoise.value}%`);
    
    function resizeTelemetryCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const rect = telemetryCanvas.getBoundingClientRect();
        telemetryCanvas.width = rect.width * dpr;
        telemetryCanvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
    }
    
    window.addEventListener('resize', resizeTelemetryCanvas);
    resizeTelemetryCanvas();
    
    // Initialize wave data points
    for (let i = 0; i < maxPoints; i++) {
        points.push(generateTelemetryPoint(i));
    }
    
    function generateTelemetryPoint(xIndex) {
        // Base sine wave
        let base = Math.sin(xIndex * 0.15) * 20 + 50;
        // High frequency harmonic
        base += Math.sin(xIndex * 0.5) * 6;
        return base;
    }
    
    function drawTelemetryChart() {
        if (!telemetryCanvas.offsetParent) {
            // Invisible, skip draw
            requestAnimationFrame(drawTelemetryChart);
            return;
        }
        
        ctx.clearRect(0, 0, telemetryCanvas.clientWidth, telemetryCanvas.clientHeight);
        
        // Draw grid
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 0.5;
        for (let y = 10; y < telemetryCanvas.clientHeight; y += 30) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(telemetryCanvas.clientWidth, y);
            ctx.stroke();
        }
        
        // Compute current metrics
        const thresholdLimit = 100 - (paramSensitivity.value * 15);
        const noiseFactor = parseInt(paramNoise.value) / 10;
        const injectAnomaly = paramInject.checked;
        
        // Push new point and shift array
        offset++;
        let newBase = generateTelemetryPoint(offset);
        
        // Apply slider noise
        newBase += (Math.random() - 0.5) * noiseFactor * 10;
        
        // Apply anomaly injection spike
        if (injectAnomaly) {
            newBase += Math.sin(offset * 0.8) * 45 + 30;
        }
        
        points.push(newBase);
        if (points.length > maxPoints) {
            points.shift();
        }
        
        // Draw Threshold Line
        ctx.beginPath();
        ctx.setLineDash([4, 4]);
        ctx.moveTo(0, thresholdLimit);
        ctx.lineTo(telemetryCanvas.clientWidth, thresholdLimit);
        ctx.strokeStyle = '#ff5f56';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Draw signal curve
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#06b6d4';
        
        const segmentWidth = telemetryCanvas.clientWidth / (maxPoints - 1);
        
        let anomalyDetected = false;
        
        for (let i = 0; i < points.length; i++) {
            const px = i * segmentWidth;
            const py = telemetryCanvas.clientHeight - points[i] * 1.2;
            
            // Check if point crosses threshold
            if (points[i] > (telemetryCanvas.clientHeight - thresholdLimit) / 1.2) {
                anomalyDetected = true;
            }
            
            if (i === 0) {
                ctx.moveTo(px, py);
            } else {
                ctx.lineTo(px, py);
            }
        }
        ctx.stroke();
        
        // Update alert banner states
        if (anomalyDetected) {
            alertBanner.classList.add('danger');
            alertText.innerText = 'WARNING: SENSOR FAULT DETECTED (TranAD POT Alert: 98.4% Confidence)';
        } else {
            alertBanner.classList.remove('danger');
            alertText.innerText = 'SYSTEM STATUS: NORMAL (Time-Series Anomaly Rate: 0.02%)';
        }
        
        requestAnimationFrame(drawTelemetryChart);
    }
    
    // Start loop
    drawTelemetryChart();
}

/* ----------------------------------------------------
   EMPLOYEE RETENTION SURVIVAL GRAPH SIMULATOR
   ---------------------------------------------------- */
const satisfactionSlider = document.getElementById('param-satisfaction');
const overtimeSlider = document.getElementById('param-overtime');
const yearsSlider = document.getElementById('param-years');

if (satisfactionSlider && overtimeSlider && yearsSlider) {
    const valSatisfaction = document.getElementById('val-satisfaction');
    const valOvertime = document.getElementById('val-overtime');
    const valYears = document.getElementById('val-years');
    const survivalCurvePath = document.getElementById('survival-curve-path');
    const scoreVal = document.getElementById('retention-score-value');
    
    function updateSurvivalPredictor() {
        const sat = parseInt(satisfactionSlider.value);
        const ot = parseInt(overtimeSlider.value);
        const yrs = parseInt(yearsSlider.value);
        
        valSatisfaction.innerText = sat;
        valOvertime.innerText = `${ot} hrs`;
        valYears.innerText = `${yrs} yrs`;
        
        // Calculate dynamic hazard rates
        // Satisfaction (1 to 10) increases survival, overtime decreases it, years in role shifts baseline stability
        const baselineDecay = 0.12; 
        const satisfactionMultiplier = Math.exp(-0.15 * (sat - 5)); // Higher satisfaction -> lower decay multiplier
        const overtimeMultiplier = Math.exp(0.08 * ot); // Higher overtime -> higher decay multiplier
        const yearsFactor = 1 - (yrs * 0.04); // Higher years in current role -> slightly more stable retention baseline
        
        const lambda = baselineDecay * satisfactionMultiplier * overtimeMultiplier * yearsFactor;
        
        // Generate SVG Path coordinates for CoxPH Curve S(t) = exp(-lambda * t)
        // Chart bounding box is X: [40, 380], Y: [20, 170]
        const startX = 40;
        const endX = 380;
        const startY = 20; // S(0) = 1.0 (top)
        const endY = 170; // S(t) = 0.0 (bottom)
        const height = endY - startY;
        
        let pathD = `M ${startX} ${startY}`;
        
        // Evaluate curve at 10 intervals (years)
        let finalRate = 1.0;
        for (let t = 0.5; t <= 10; t += 0.5) {
            const retentionRate = Math.exp(-lambda * t);
            if (t === 10) finalRate = retentionRate;
            
            const px = startX + (t / 10) * (endX - startX);
            const py = startY + (1 - retentionRate) * height;
            pathD += ` L ${px} ${py}`;
        }
        
        survivalCurvePath.setAttribute('d', pathD);
        scoreVal.innerText = `${(finalRate * 100).toFixed(1)}%`;
    }
    
    // Hook slider events
    satisfactionSlider.addEventListener('input', updateSurvivalPredictor);
    overtimeSlider.addEventListener('input', updateSurvivalPredictor);
    yearsSlider.addEventListener('input', updateSurvivalPredictor);
    
    // Initial run
    updateSurvivalPredictor();
}

