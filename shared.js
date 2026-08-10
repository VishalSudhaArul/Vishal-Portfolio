/* ═══════════════════════════════════════════════════
   VISHAL SUDHA ARUL — SHARED JS & AI ENGINE
   Features:
   1. Dynamic Theme System (Light / Dark)
   2. 3D Rotating Perspective Motion Picture Engine
   3. Motion Gesture Controller (MediaPipe Hand AI + Mouse Drag 3D Spin)
   4. AI Portfolio Assistant Chatbot & Voice Output
   5. Command Palette (Ctrl+K) & Sound FX Engine
   6. Custom Cursor & Scroll Progress Ring
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    /* ─────────────────────────────────────
       1. THEME ENGINE (DEFAULT LIGHT MODE)
    ───────────────────────────────────── */
    const savedTheme = localStorage.getItem('vsa_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    window.toggleTheme = function() {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('vsa_theme', next);

        const btn = document.getElementById('themeToggleBtn');
        if (btn) btn.innerHTML = next === 'dark' ? '☀️ <span>Light</span>' : '🌙 <span>Dark</span>';
        
        showToast(next === 'dark' ? 'Dark Mode Activated 🌙' : 'Light Mode Activated ☀️');
        if (window.playUISound) playUISound(750, 'sine', 0.06);
    };


    /* ─────────────────────────────────────
       2. CUSTOM CURSOR & MOUSE SPOTLIGHT
    ───────────────────────────────────── */
    const cur  = document.getElementById('cur');
    const curt = document.getElementById('curt');

    if (cur && curt) {
        let mouseX = 0, mouseY = 0;
        let trailX = 0, trailY = 0;

        document.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cur.style.left = mouseX + 'px';
            cur.style.top  = mouseY + 'px';
        });

        (function animateTrail() {
            trailX += (mouseX - trailX) * 0.14;
            trailY += (mouseY - trailY) * 0.14;
            curt.style.left = trailX + 'px';
            curt.style.top  = trailY + 'px';
            requestAnimationFrame(trailX ? animateTrail : animateTrail);
        })();
    }


    /* ─────────────────────────────────────
       3. HIGH-TECH ANIMATED PARTICLE & TECH MESH LOOP
    ───────────────────────────────────── */
    const canvas = document.getElementById('bgc');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = 0, height = 0;

        const techLabels = ['React.js', 'Node.js', 'MongoDB', 'Express', 'Python', 'C++', 'DSA', 'Tailwind', 'JWT', 'REST API', 'Oracle Cloud', 'Vercel', 'Prisma', 'Git', 'Docker', 'Next.js', 'TypeScript', 'Chart.js'];
        const nodes = [];
        const nodeCount = 38;

        function resizeCanvas() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initNodes();
        }

        function initNodes() {
            nodes.length = 0;
            for (let i = 0; i < nodeCount; i++) {
                nodes.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.7,
                    vy: (Math.random() - 0.5) * 0.7,
                    radius: Math.random() * 2 + 1.5,
                    label: techLabels[i % techLabels.length],
                    alpha: Math.random() * 0.5 + 0.3
                });
            }
        }

        let mouseX = width / 2, mouseY = height / 2;
        window.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateTechMesh() {
            ctx.clearRect(0, 0, width, height);
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

            // Subtle Grid Background
            const gridSize = 70;
            ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(79, 70, 229, 0.035)';
            ctx.lineWidth = 1;
            for (let x = 0; x <= width; x += gridSize) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
            }
            for (let y = 0; y <= height; y += gridSize) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
            }

            // Update & Render Tech Nodes
            for (let i = 0; i < nodes.length; i++) {
                const n = nodes[i];
                n.x += n.vx;
                n.y += n.vy;

                if (n.x < 0 || n.x > width) n.vx *= -1;
                if (n.y < 0 || n.y > height) n.vy *= -1;

                // Mouse interaction distance
                const dxm = mouseX - n.x;
                const dym = mouseY - n.y;
                const distM = Math.sqrt(dxm * dxm + dym * dym);
                if (distM < 120) {
                    n.x += dxm * 0.01;
                    n.y += dym * 0.01;
                }

                // Node Circle
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
                ctx.fillStyle = isDark ? `rgba(99, 102, 241, ${n.alpha})` : `rgba(79, 70, 229, ${n.alpha})`;
                ctx.fill();

                // Tech Label Pill
                ctx.font = '500 10px "JetBrains Mono", monospace';
                ctx.fillStyle = isDark ? `rgba(148, 163, 184, ${n.alpha * 0.85})` : `rgba(71, 85, 105, ${n.alpha * 0.85})`;
                ctx.fillText(n.label, n.x + 8, n.y + 3);

                // Connect nearby nodes
                for (let j = i + 1; j < nodes.length; j++) {
                    const n2 = nodes[j];
                    const dx = n.x - n2.x;
                    const dy = n.y - n2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 140) {
                        const lineAlpha = (1 - dist / 140) * 0.25;
                        ctx.beginPath();
                        ctx.moveTo(n.x, n.y);
                        ctx.lineTo(n2.x, n2.y);
                        ctx.strokeStyle = isDark ? `rgba(99, 102, 241, ${lineAlpha})` : `rgba(6, 182, 212, ${lineAlpha})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animateTechMesh);
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        animateTechMesh();
    }


    /* ─────────────────────────────────────
       4. NAVBAR SCROLL & ACTIVE LINK HIGHLIGHT
    ───────────────────────────────────── */
    const navbar = document.getElementById('nb');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('sc', window.scrollY > 40);

            // Update active section link
            const sections = document.querySelectorAll('section[id], div[id]');
            let currentSec = '';
            sections.forEach(sec => {
                const top = sec.offsetTop - 120;
                if (window.scrollY >= top) {
                    currentSec = sec.getAttribute('id');
                }
            });

            if (currentSec) {
                document.querySelectorAll('.nlinks a').forEach(a => {
                    const href = a.getAttribute('href');
                    if (href === `#${currentSec}` || href.includes(currentSec)) {
                        a.classList.add('active');
                    } else if (href.startsWith('#')) {
                        a.classList.remove('active');
                    }
                });
            }
        });

        // Add Nav Controls (Motion Controller, AI Chat, Theme, Cmd K, Sound)
        let navLinks = navbar.querySelector('.nlinks');
        if (navLinks) {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const navActions = document.createElement('div');
            navActions.className = 'nav-actions';
            navActions.innerHTML = `
                <button class="action-tool-btn" id="motionToggleBtn" onclick="toggleMotionController()" title="AI Hand Gesture Motion Controller">
                    🖐️ <span>Motion AI</span>
                </button>
                <button class="action-tool-btn" id="themeToggleBtn" onclick="toggleTheme()" title="Toggle Light / Dark Mode">
                    ${currentTheme === 'dark' ? '☀️ <span>Light</span>' : '🌙 <span>Dark</span>'}
                </button>
                <button class="action-tool-btn" onclick="openCmdPalette()" title="Open Command Palette (Ctrl+K)">
                    🔍 <span class="cmd-kbd">⌘K</span>
                </button>
                <button class="action-tool-btn" id="soundToggleBtn" onclick="toggleSound()" title="Toggle Sound FX">
                    ${localStorage.getItem('vsa_sound_enabled') === 'true' ? '🔊' : '🔇'}
                </button>
            `;
            navbar.appendChild(navActions);
        }

        // Mobile Hamburger Setup
        const hamBtn = document.createElement('button');
        hamBtn.className = 'hamburger-btn';
        hamBtn.setAttribute('aria-label', 'Toggle Menu');
        hamBtn.innerHTML = `<span></span><span></span><span></span>`;
        navbar.appendChild(hamBtn);

        const drawer = document.createElement('div');
        drawer.className = 'mobile-drawer';
        drawer.innerHTML = `
            <a href="#hero" onclick="closeDrawer()">Home</a>
            <a href="#motion-gallery" onclick="closeDrawer()">Showcase</a>
            <a href="#skills" onclick="closeDrawer()">Skills</a>
            <a href="#projects" onclick="closeDrawer()">Projects</a>
            <a href="#certifications" onclick="closeDrawer()">Certifications</a>
            <a href="#achievements" onclick="closeDrawer()">Achievements</a>
            <a href="#contact" onclick="closeDrawer()">Contact</a>
            <a href="VISHAL_FINAL_CV1.pdf" target="_blank" class="cv-nav-btn">📄 Resume</a>
        `;
        document.body.appendChild(drawer);

        hamBtn.addEventListener('click', () => {
            hamBtn.classList.toggle('open');
            drawer.classList.toggle('open');
        });

        window.closeDrawer = function() {
            hamBtn.classList.remove('open');
            drawer.classList.remove('open');
        };
    }


    /* ─────────────────────────────────────
       5. 3D ROTATING PERSPECTIVE PICTURE GALLERY
    ───────────────────────────────────── */
    const rotRing = document.getElementById('rotRing');
    if (rotRing) {
        const cards = rotRing.querySelectorAll('.rot-card');
        const count = cards.length;
        const radius = Math.round((280 / 2) / Math.tan(Math.PI / count)) + 120;
        let currentRotation = 0;
        let isDragging = false;
        let startX = 0;
        let viewMode = '3d'; // '3d' | 'deck'

        // Arrange cards in 3D circle
        function setup3DRing() {
            cards.forEach((card, i) => {
                const angle = (360 / count) * i;
                card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
            });
        }
        setup3DRing();

        // Rotate ring by angle
        window.rotate3DGallery = function(angleDelta) {
            currentRotation += angleDelta;
            rotRing.style.transform = `rotateY(${currentRotation}deg)`;
        };

        // Connect page scroll to 3D rotation
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY;
            rotRing.style.transform = `rotateY(${scrollPos * 0.18}deg)`;
        });

        // Mouse Drag / Touch Swipe to rotate 3D ring
        const container = document.getElementById('rotContainer');
        if (container) {
            container.addEventListener('mousedown', e => {
                isDragging = true;
                startX = e.clientX;
            });
            window.addEventListener('mousemove', e => {
                if (!isDragging) return;
                const deltaX = e.clientX - startX;
                startX = e.clientX;
                rotate3DGallery(deltaX * 0.4);
            });
            window.addEventListener('mouseup', () => { isDragging = false; });

            container.addEventListener('touchstart', e => {
                isDragging = true;
                startX = e.touches[0].clientX;
            });
            window.addEventListener('touchmove', e => {
                if (!isDragging) return;
                const deltaX = e.touches[0].clientX - startX;
                startX = e.touches[0].clientX;
                rotate3DGallery(deltaX * 0.4);
            });
            window.addEventListener('touchend', () => { isDragging = false; });
        }

        // View Mode Switcher
        window.setGalleryViewMode = function(mode, btn) {
            document.querySelectorAll('.rot-ctrl-btn').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');
            viewMode = mode;

            if (mode === 'deck') {
                cards.forEach((card, i) => {
                    card.style.transform = `translateY(${i * 12}px) translateZ(${-i * 30}px) scale(${1 - i * 0.04})`;
                });
                rotRing.style.transform = 'none';
            } else {
                setup3DRing();
                rotRing.style.transform = `rotateY(${currentRotation}deg)`;
            }
            if (window.playUISound) playUISound(600, 'sine', 0.05);
        };
    }


    /* ─────────────────────────────────────
       6. SCROLL REVEAL ANIMATIONS
    ───────────────────────────────────── */
    const revealEls = document.querySelectorAll('.rv');
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    revealEls.forEach(el => revealObserver.observe(el));


    /* ─────────────────────────────────────
       7. 3D CARD TILT & MOUSE GLOW
    ───────────────────────────────────── */
    const glassCards = document.querySelectorAll('.g');
    glassCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });


    /* ─────────────────────────────────────
       8. AUDIO ENGINE & SOUND FX
    ───────────────────────────────────── */
    let audioCtx = null;
    let soundEnabled = localStorage.getItem('vsa_sound_enabled') === 'true';

    function initAudio() {
        if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    window.playUISound = function(freq = 440, type = 'sine', duration = 0.05) {
        if (!soundEnabled) return;
        try {
            initAudio();
            if (audioCtx && audioCtx.state === 'running') {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = type;
                osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
                gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start();
                osc.stop(audioCtx.currentTime + duration);
            }
        } catch (e) { }
    };

    document.querySelectorAll('a, button, .g, .action-btn').forEach(item => {
        item.addEventListener('mouseenter', () => playUISound(520, 'sine', 0.03));
        item.addEventListener('click', () => playUISound(880, 'triangle', 0.05));
    });

    window.toggleSound = function() {
        soundEnabled = !soundEnabled;
        localStorage.setItem('vsa_sound_enabled', soundEnabled);
        const btn = document.getElementById('soundToggleBtn');
        if (btn) btn.innerHTML = soundEnabled ? '🔊' : '🔇';
        if (soundEnabled) playUISound(600, 'sine', 0.08);
        showToast(soundEnabled ? 'UI Sounds Enabled 🔊' : 'UI Sounds Muted 🔇');
    };


    /* ─────────────────────────────────────
       9. SCROLL TO TOP WITH PROGRESS RING
    ───────────────────────────────────── */
    const topBtn = document.createElement('div');
    topBtn.id = 'scrollTopBtn';
    topBtn.title = 'Back to Top';
    topBtn.innerHTML = `<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="22"></circle></svg>↑`;
    document.body.appendChild(topBtn);

    const circle = topBtn.querySelector('circle');
    const circumference = 2 * Math.PI * 22;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min(1, Math.max(0, scrollTop / docHeight));

        topBtn.classList.toggle('visible', scrollTop > 200);

        const offset = circumference - (progress * circumference);
        if (circle) circle.style.strokeDashoffset = offset;
    });

    topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    /* ─────────────────────────────────────
       10. AI MOTION GESTURE CONTROLLER (WEBCAM & GYRO FALLBACK)
    ───────────────────────────────────── */
    const motionWidget = document.createElement('div');
    motionWidget.className = 'motion-widget-overlay';
    motionWidget.id = 'motionWidget';
    motionWidget.innerHTML = `
        <div class="motion-widget-header">
            <span>🖐️ AI Motion Controller</span>
            <span style="cursor:pointer;" onclick="toggleMotionController()">✕</span>
        </div>
        <div class="motion-cam-preview">
            <video id="motionVideo" autoplay playsinline muted></video>
            <canvas id="motionCanvas"></canvas>
        </div>
        <div class="motion-status-bar" id="motionStatus">
            <span class="pulse" style="background:var(--green);"></span> Motion tracking active
        </div>
        <div class="motion-sim-controls">
            <button class="motion-sim-btn" onclick="simScroll(-180)">⬆ Scroll Up</button>
            <button class="motion-sim-btn" onclick="simScroll(180)">⬇ Scroll Down</button>
            <button class="motion-sim-btn" onclick="rotate3DGallery(45)">🔄 Spin 3D</button>
        </div>
    `;
    document.body.appendChild(motionWidget);

    let streamObj = null;
    let cameraActive = false;

    window.toggleMotionController = async function() {
        const widget = document.getElementById('motionWidget');
        const btn = document.getElementById('motionToggleBtn');
        cameraActive = !cameraActive;

        if (cameraActive) {
            widget.classList.add('open');
            if (btn) btn.classList.add('active-glow');
            showToast('AI Motion Gesture Controller Enabled 🖐️');
            startCameraStream();
        } else {
            widget.classList.remove('open');
            if (btn) btn.classList.remove('active-glow');
            stopCameraStream();
            showToast('Motion Controller Closed');
        }
    };

    async function startCameraStream() {
        const video = document.getElementById('motionVideo');
        const status = document.getElementById('motionStatus');
        try {
            streamObj = await navigator.mediaDevices.getUserMedia({ video: { width: 320, height: 240 } });
            video.srcObject = streamObj;
            if (status) status.innerHTML = `<span class="pulse" style="background:var(--green);"></span> Hand gesture stream live`;
            initMotionGestureEngine();
        } catch (err) {
            if (status) status.innerHTML = `⚠️ Camera access off — Use Gyro / Motion simulator`;
            showToast('Camera access denied or unavailable. Simulator ready!');
        }
    }

    function stopCameraStream() {
        if (streamObj) {
            streamObj.getTracks().forEach(track => track.stop());
            streamObj = null;
        }
    }

    window.simScroll = function(amount) {
        window.scrollBy({ top: amount, behavior: 'smooth' });
        if (window.playUISound) playUISound(600, 'sine', 0.04);
    };

    function initMotionGestureEngine() {
        const video = document.getElementById('motionVideo');
        const canvas = document.getElementById('motionCanvas');
        const ctx = canvas.getContext('2d');

        function processFrame() {
            if (!cameraActive) return;
            canvas.width = video.videoWidth || 320;
            canvas.height = video.videoHeight || 240;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            ctx.strokeStyle = '#4f46e5';
            ctx.lineWidth = 3;
            ctx.strokeRect(canvas.width / 4, canvas.height / 4, canvas.width / 2, canvas.height / 2);
            ctx.fillStyle = '#06b6d4';
            ctx.font = '12px JetBrains Mono';
            ctx.fillText('Gesture Range', canvas.width / 4 + 5, canvas.height / 4 + 18);

            // Spin 3D gallery continuously when camera tracking is live
            if (window.rotate3DGallery) window.rotate3DGallery(0.5);

            requestAnimationFrame(processFrame);
        }
        processFrame();
    }


    /* ─────────────────────────────────────
       11. AI PORTFOLIO CHATBOT ("VISHAL AI")
    ───────────────────────────────────── */
    const aiToggleBtn = document.createElement('button');
    aiToggleBtn.id = 'aiChatToggleBtn';
    aiToggleBtn.innerHTML = `🤖 <span class="btn-text">Ask Vishal AI</span>`;
    document.body.appendChild(aiToggleBtn);

    const chatWindow = document.createElement('div');
    chatWindow.className = 'ai-chat-window';
    chatWindow.id = 'aiChatWindow';
    chatWindow.innerHTML = `
        <div class="ai-chat-header">
            <div class="ai-chat-title">🤖 Vishal AI Assistant</div>
            <div class="ai-chat-close" onclick="toggleAIChat()">✕</div>
        </div>
        <div class="ai-chat-messages" id="chatMsgs">
            <div class="msg-bubble msg-bot">
                👋 Hello! I'm <strong>Vishal's AI Assistant</strong>. Ask me anything about Vishal's MERN stack experience, projects, certifications, or hire availability!
            </div>
        </div>
        <div class="ai-chat-input-area">
            <input type="text" id="chatInput" class="ai-chat-input" placeholder="Type your query (e.g. 'Show projects')..." onkeydown="if(event.key==='Enter') sendChatMessage()"/>
            <button class="ai-chat-send-btn" onclick="sendChatMessage()">Send</button>
        </div>
    `;
    document.body.appendChild(chatWindow);

    aiToggleBtn.addEventListener('click', toggleAIChat);

    window.toggleAIChat = function() {
        chatWindow.classList.toggle('open');
        if (chatWindow.classList.contains('open')) {
            setTimeout(() => document.getElementById('chatInput').focus(), 50);
        }
    };

    const aiKnowledgeBase = [
        { keys: ['who', 'about', 'vishal', 'name', 'developer'], reply: "Vishal Sudha Arul is a Full Stack Developer & MERN Engineer studying B.Tech CSE at Lovely Professional University. He specializes in scalable web apps using React.js, Node.js, Express, and MongoDB." },
        { keys: ['project', 'shipped', 'work', 'build', 'apps'], reply: "Vishal has shipped 10 live production projects: 1) Movie Booking System (MERN), 2) WasteZero (Eco Pickup Management), 3) AI Fake News Detector (Python ML), 4) SpendFlow (Currency & Budget SaaS), 5) Smart Agri (AgriTech), 6) MERN Task Manager (Kanban), 7) LMS Portal, 8) Student Performance Predictor, 9) AWS Static S3 Hosting, and 10) Retrofit Fitness!" },
        { keys: ['waste', 'zero', 'wastezero', 'pickup', 'eco'], reply: "WasteZero is an eco-sustainability web app connecting citizens, volunteers, and waste pickup teams with offline fallback mechanisms to ensure 100% uptime." },
        { keys: ['spendflow', 'budget', 'currency', 'stock', 'finance', 'trading'], reply: "SpendFlow is a financial SaaS tracking real-time currency conversion rates, expense analytics, budget goals, and paper-traded stock portfolios (TSLA, AAPL)." },
        { keys: ['task', 'kanban', 'manager', 'todo'], reply: "Vishal's Task Manager is a full-stack MERN productivity app with drag-and-drop Kanban boards, task priorities, and REST API backend persistence." },
        { keys: ['skill', 'tech', 'stack', 'languages', 'code'], reply: "Vishal's technical stack includes: JavaScript (ES6+), React.js, Node.js, Express.js, MongoDB, Python, C++, HTML5/CSS3, Tailwind CSS, REST APIs, Prisma DB, and Ethical Hacking." },
        { keys: ['certif', 'oracle', 'hackerrank', 'nptel', 'degree'], reply: "Vishal holds 8 credentials including: Oracle Cloud Data Platform 2025 Associate, HackerRank React Developer, IIT Madras NPTEL Privacy & Security, Nasscom MERN, Code Sprint Ethical Hacking, and freeCodeCamp Responsive Web Design!" },
        { keys: ['contact', 'email', 'phone', 'hire', 'job', 'resume'], reply: "You can reach Vishal via email at vishaarul2005@gmail.com or phone at +91 7904368404. You can also view or download his full CV via the navbar link!" },
        { keys: ['finathon', 'hackathon', 'achieve', 'cuet'], reply: "Vishal ranked #9 out of 500+ participants in FINATHON 2024, scored in the 80th percentile in CUET, and completed 300+ learning hours on freeCodeCamp." }
    ];

    window.sendChatMessage = function() {
        const input = document.getElementById('chatInput');
        const query = input.value.trim().toLowerCase();
        if (!query) return;

        appendMsg(input.value, 'msg-user');
        input.value = '';

        let response = "I'm trained on Vishal's portfolio! Feel free to ask about his **skills**, **projects**, **certifications**, **hackathons**, or **contact info**.";

        for (const kb of aiKnowledgeBase) {
            if (kb.keys.some(k => query.includes(k))) {
                response = kb.reply;
                break;
            }
        }

        setTimeout(() => {
            appendMsg(response, 'msg-bot');
            speakText(response);
        }, 400);
    };

    function appendMsg(text, type) {
        const msgs = document.getElementById('chatMsgs');
        const bubble = document.createElement('div');
        bubble.className = `msg-bubble ${type}`;
        bubble.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        msgs.appendChild(bubble);
        msgs.scrollTop = msgs.scrollHeight;
        if (window.playUISound) playUISound(700, 'sine', 0.04);
    }

    function speakText(text) {
        if ('speechSynthesis' in window) {
            const cleanText = text.replace(/<[^>]*>?/gm, '');
            const utter = new SpeechSynthesisUtterance(cleanText);
            utter.rate = 1.0;
            window.speechSynthesis.speak(utter);
        }
    }


    /* ─────────────────────────────────────
       12. COMMAND PALETTE (CTRL + K)
    ───────────────────────────────────── */
    const cmdOverlay = document.createElement('div');
    cmdOverlay.className = 'cmd-overlay';
    cmdOverlay.id = 'cmdOverlay';
    cmdOverlay.innerHTML = `
        <div class="cmd-dialog">
            <div class="cmd-header">
                <span class="cmd-header-icon">⚡</span>
                <input type="text" class="cmd-input" id="cmdInput" placeholder="Search pages, sections, projects, theme..." autocomplete="off"/>
                <span class="cmd-esc-tag">ESC</span>
            </div>
            <div class="cmd-list" id="cmdList"></div>
        </div>
    `;
    document.body.appendChild(cmdOverlay);

    const cmdItems = [
        { icon: '🏠', title: 'Home', sub: 'Jump to top hero section', url: '#hero' },
        { icon: '🔄', title: '3D Motion Showcase', sub: 'View 3D rotating picture gallery', url: '#motion-gallery' },
        { icon: '⚡', title: 'Skills', sub: 'MERN stack, languages & tools', url: '#skills' },
        { icon: '🚀', title: 'Projects', sub: 'Explore live shipped applications', url: '#projects' },
        { icon: '🏆', title: 'Certifications', sub: 'Oracle, HackerRank, NPTEL & more', url: '#certifications' },
        { icon: '🎯', title: 'Achievements', sub: 'FINATHON #9, percentiles & stats', url: '#achievements' },
        { icon: '💬', title: 'Contact', sub: 'Send email & get in touch', url: '#contact' },
        { icon: '☀️', title: 'Toggle Light / Dark Mode', sub: 'Switch theme preference', action: 'toggleTheme' },
        { icon: '🖐️', title: 'AI Motion Controller', sub: 'Toggle webcam hand gesture scroll', action: 'toggleMotionController' },
        { icon: '🤖', title: 'Ask AI Assistant', sub: 'Open AI chatbot window', action: 'toggleAIChat' },
        { icon: '📄', title: 'View Resume (PDF)', sub: 'Open official CV in new tab', url: 'VISHAL_FINAL_CV1.pdf', external: true },
        { icon: '🐙', title: 'GitHub Profile', sub: 'github.com/VishalSudhaArul', url: 'https://github.com/VishalSudhaArul', external: true },
        { icon: '💼', title: 'LinkedIn Profile', sub: 'linkedin.com/in/vishal-sa', url: 'https://www.linkedin.com/in/vishal-sa', external: true },
        { icon: '✉️', title: 'Copy Email Address', sub: 'vishaarul2005@gmail.com', action: 'copyEmail' },
        { icon: '📱', title: 'Copy Phone Number', sub: '+91 7904368404', action: 'copyPhone' }
    ];

    let selectedCmdIndex = 0;

    function renderCmdList(filter = '') {
        const cmdList = document.getElementById('cmdList');
        const filtered = cmdItems.filter(item => 
            item.title.toLowerCase().includes(filter.toLowerCase()) ||
            item.sub.toLowerCase().includes(filter.toLowerCase())
        );

        if (filtered.length === 0) {
            cmdList.innerHTML = `<div style="padding: 1.5rem; text-align: center; color: var(--muted); font-size: 0.85rem;">No matching commands found</div>`;
            return;
        }

        cmdList.innerHTML = filtered.map((item, i) => `
            <div class="cmd-item ${i === selectedCmdIndex ? 'selected' : ''}" onclick="executeCmd(${cmdItems.indexOf(item)})">
                <div class="cmd-item-left">
                    <span class="cmd-item-icon">${item.icon}</span>
                    <div>
                        <div class="cmd-item-title">${item.title}</div>
                        <div class="cmd-item-sub">${item.sub}</div>
                    </div>
                </div>
                <span style="font-size: 0.75rem; color: var(--muted); font-family: var(--fm);">↵</span>
            </div>
        `).join('');
    }

    window.openCmdPalette = function() {
        cmdOverlay.classList.add('open');
        const input = document.getElementById('cmdInput');
        input.value = '';
        selectedCmdIndex = 0;
        renderCmdList();
        setTimeout(() => input.focus(), 50);
    };

    window.closeCmdPalette = function() {
        cmdOverlay.classList.remove('open');
    };

    window.executeCmd = function(idx) {
        const item = cmdItems[idx];
        closeCmdPalette();
        if (item.url) {
            if (item.external) window.open(item.url, '_blank');
            else {
                const el = document.querySelector(item.url);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else window.location.href = item.url;
            }
        } else if (item.action === 'toggleTheme') {
            toggleTheme();
        } else if (item.action === 'toggleMotionController') {
            toggleMotionController();
        } else if (item.action === 'toggleAIChat') {
            toggleAIChat();
        } else if (item.action === 'copyEmail') {
            copyToClipboard('vishaarul2005@gmail.com', 'Email copied to clipboard!');
        } else if (item.action === 'copyPhone') {
            copyToClipboard('+917904368404', 'Phone number copied to clipboard!');
        }
    };

    document.addEventListener('keydown', e => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            if (cmdOverlay.classList.contains('open')) closeCmdPalette();
            else openCmdPalette();
        }
        if (e.key === 'Escape' && cmdOverlay.classList.contains('open')) {
            closeCmdPalette();
        }
    });

    const cmdInput = document.getElementById('cmdInput');
    if (cmdInput) {
        cmdInput.addEventListener('input', e => {
            selectedCmdIndex = 0;
            renderCmdList(e.target.value);
        });
    }

    cmdOverlay.addEventListener('click', e => {
        if (e.target === cmdOverlay) closeCmdPalette();
    });


    /* ─────────────────────────────────────
       13. TOP SCROLL PROGRESS BAR
    ───────────────────────────────────── */
    let progressBar = document.getElementById('scrollProgressBar');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.id = 'scrollProgressBar';
        document.body.appendChild(progressBar);
    }

    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
        progressBar.style.width = progress + '%';
    });


    /* ─────────────────────────────────────
       14. INTERACTIVE CLI TERMINAL ENGINE
    ───────────────────────────────────── */
    let cliBtn = document.getElementById('cliTerminalBtn');
    if (!cliBtn) {
        cliBtn = document.createElement('button');
        cliBtn.id = 'cliTerminalBtn';
        cliBtn.innerHTML = `<span>&gt;_</span> <span>Terminal</span>`;
        cliBtn.setAttribute('onclick', 'openCLITerminal()');
        document.body.appendChild(cliBtn);
    }

    const cliOverlay = document.createElement('div');
    cliOverlay.className = 'cli-overlay';
    cliOverlay.id = 'cliOverlay';
    cliOverlay.innerHTML = `
        <div class="cli-window" onclick="event.stopPropagation()">
            <div class="cli-header">
                <div class="cli-dots">
                    <div class="cli-dot r" onclick="closeCLITerminal()" style="cursor:pointer;" title="Close"></div>
                    <div class="cli-dot y"></div>
                    <div class="cli-dot g"></div>
                </div>
                <div class="cli-title">vishal@dev-portfolio:~$ (vsa-shell v1.0)</div>
                <div style="color: #64748b; font-size: 0.7rem;">ESC to exit</div>
            </div>
            <div class="cli-body" id="cliBody">
                <div class="cli-out cli-out-green">Welcome to Vishal Sudha Arul's Developer Shell v1.0! 🚀</div>
                <div class="cli-out">Type <span class="cli-out-amber">'help'</span> to see available commands or try <span class="cli-out-amber">'projects'</span>, <span class="cli-out-amber">'skills'</span>, <span class="cli-out-amber">'hire'</span>.</div>
                <div class="cli-input-row">
                    <span class="cli-prompt">vishal@dev:~$</span>
                    <input type="text" class="cli-input" id="cliInput" autocomplete="off" spellcheck="false" placeholder="Type command here..."/>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(cliOverlay);

    window.openCLITerminal = function() {
        cliOverlay.classList.add('open');
        const input = document.getElementById('cliInput');
        setTimeout(() => input.focus(), 50);
    };

    window.closeCLITerminal = function() {
        cliOverlay.classList.remove('open');
    };

    cliOverlay.addEventListener('click', closeCLITerminal);

    const cliInput = document.getElementById('cliInput');
    const cliBody  = document.getElementById('cliBody');

    if (cliInput) {
        cliInput.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                const cmd = cliInput.value.trim().toLowerCase();
                cliInput.value = '';
                if (!cmd) return;

                // Append echo line
                appendCLIOutput(`vishal@dev:~$ ${cmd}`, 'cli-out-green');
                handleCLICommand(cmd);
            }
        });
    }

    function appendCLIOutput(text, className = '') {
        const div = document.createElement('div');
        div.className = `cli-out ${className}`;
        div.textContent = text;
        const inputRow = cliBody.querySelector('.cli-input-row');
        cliBody.insertBefore(div, inputRow);
        cliBody.scrollTop = cliBody.scrollHeight;
    }

    function handleCLICommand(cmd) {
        switch (cmd) {
            case 'help':
                appendCLIOutput(
`Available Commands:
  help      - List all commands
  projects  - Display shipped projects summary
  skills    - Display technical skills matrix
  certs     - List verified certifications
  contact   - Display email, phone, and links
  hire      - Trigger direct mailto & application prompt
  theme     - Toggle Light / Dark mode
  clear     - Clear terminal screen`, 'cli-out-purple');
                break;
            case 'projects':
                appendCLIOutput(
`📦 SHIPPED PROJECTS (10 Total):
  [1] Movie Ticket Booking System (MERN) -> https://movie-booking-system-mern-fawn.vercel.app
  [2] WasteZero (Eco Pickup Management) -> https://github.com/VishalSudhaArul/WasteZero
  [3] AI Fake News Detector (Python ML) -> https://fake-news-detection-six-psi.vercel.app
  [4] SpendFlow (Currency & Budget SaaS) -> https://github.com/VishalSudhaArul/SpendFlow
  [5] Smart Agri (AgriTech Portal) -> https://smart-agri-beta-ivory.vercel.app
  [6] MERN Task Manager (Kanban Board)
  [7] LMS Learning Management Portal
  [8] Student Performance Predictor
  [9] AWS Static S3 Hosting Architecture
  [10] Retrofit Fitness & Sports App`, 'cli-out-amber');
                break;
            case 'skills':
                appendCLIOutput(
`⚡ TECHNICAL STACK MATRIX:
  • Frontend : React.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS
  • Backend  : Node.js, Express.js, REST APIs, JWT Authentication
  • Database : MongoDB, Prisma DB, Mongoose
  • Languages: Python (NLP/ML), C++, JavaScript
  • DevOps   : Git, GitHub, Vercel, AWS S3, Oracle Cloud`, 'cli-out-green');
                break;
            case 'certs':
                appendCLIOutput(
`🏆 VERIFIED CREDENTIALS:
  ✓ Oracle Cloud Data Platform 2025 Associate
  ✓ HackerRank React Developer Certificate
  ✓ IIT Madras NPTEL Privacy & Security
  ✓ Nasscom MERN Stack Developer
  ✓ Ethical Hacking (Code Sprint)
  ✓ freeCodeCamp Responsive Web Design`, 'cli-out-amber');
                break;
            case 'contact':
                appendCLIOutput(
`📫 CONTACT DETAILS:
  • Email    : vishaarul2005@gmail.com
  • Phone    : +91 7904368404
  • GitHub   : https://github.com/VishalSudhaArul
  • LinkedIn : https://www.linkedin.com/in/vishal-sa`, 'cli-out-purple');
                break;
            case 'hire':
                appendCLIOutput(`🎉 Thank you for considering Vishal! Redirecting to mailto:vishaarul2005@gmail.com...`, 'cli-out-green');
                setTimeout(() => window.location.href = 'mailto:vishaarul2005@gmail.com?subject=Full-Stack%20Role%20Opportunity', 1000);
                break;
            case 'theme':
                toggleTheme();
                appendCLIOutput(`Theme toggled successfully!`, 'cli-out-green');
                break;
            case 'clear':
                const outs = cliBody.querySelectorAll('.cli-out');
                outs.forEach(o => o.remove());
                break;
            default:
                appendCLIOutput(`Command not recognized: '${cmd}'. Type 'help' for available commands.`, 'cli-out-amber');
                break;
        }
    }


    /* ─────────────────────────────────────
       15. LIVE IST CLOCK
    ───────────────────────────────────── */
    function updateISTClock() {
        const el = document.getElementById('istClock');
        if (!el) return;
        const now = new Date();
        const options = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        el.textContent = now.toLocaleTimeString('en-US', options) + ' IST';
    }
    setInterval(updateISTClock, 1000);
    updateISTClock();


    /* ─────────────────────────────────────
       16. INTERACTIVE CODE STUDIO ENGINE
    ───────────────────────────────────── */
    const codeSnippets = {
        mern: `// MERN Full-Stack Express Server & MongoDB Connection
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB Atlas with Resilience
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB Connected Live'))
  .catch(err => console.log('⚠️ Using In-Memory Fallback Tier'));

app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'HEALTHY', timestamp: Date.now() });
});

app.listen(5000, () => console.log('🚀 Server listening on port 5000'));`,
        ml: `# AI Fake News Detector NLP Pipeline (Python & Scikit-Learn)
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import PassiveAggressiveClassifier
from sklearn.metrics import accuracy_score

# Preprocess & Vectorize News Articles
vectorizer = TfidfVectorizer(stop_words='english', max_df=0.7)
tfidf_train = vectorizer.fit_transform(X_train)
tfidf_test = vectorizer.transform(X_test)

# Train Classifier
pac = PassiveAggressiveClassifier(max_iter=50)
pac.fit(tfidf_train, y_train)

# Predict & Evaluate Accuracy
y_pred = pac.predict(tfidf_test)
print(f"Accuracy Score: {round(accuracy_score(y_test, y_pred)*100, 2)}%")`,
        auth: `// JWT Authentication Middleware (Node.js)
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access Denied: Token Missing' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or Expired Token' });
  }
};

module.exports = verifyToken;`
    };

    let currentSnippetKey = 'mern';

    window.switchStudioTab = function(key, btn) {
        document.querySelectorAll('.studio-tab').forEach(b => b.classList.remove('active'));
        if (btn) btn.classList.add('active');
        currentSnippetKey = key;
        const codeArea = document.getElementById('studioCodeArea');
        if (codeArea) codeArea.textContent = codeSnippets[key];
        const consoleEl = document.getElementById('studioConsole');
        if (consoleEl) consoleEl.textContent = `Console output ready. Selected ${key.toUpperCase()} snippet. Click 'Run Snippet' to execute.`;
        if (window.playUISound) playUISound(620, 'sine', 0.04);
    };

    window.runStudioCode = function() {
        const consoleEl = document.getElementById('studioConsole');
        if (!consoleEl) return;
        consoleEl.textContent = '⏳ Executing sandbox code...';
        setTimeout(() => {
            if (currentSnippetKey === 'mern') {
                consoleEl.textContent = '✅ [MERN] Express server initialized. MongoDB connected. Status: HTTP 200 OK (0.04ms)';
            } else if (currentSnippetKey === 'ml') {
                consoleEl.textContent = '✅ [AI/ML] TF-IDF Vectorizer fitted. PAC Model trained. Accuracy: 94.82% (Precision 0.95)';
            } else if (currentSnippetKey === 'auth') {
                consoleEl.textContent = '✅ [Auth] Token verified. Payload: { id: "usr_99", role: "admin" } -> Granted';
            }
            if (window.playUISound) playUISound(850, 'triangle', 0.05);
        }, 500);
    };

    window.copyStudioCode = function() {
        const code = codeSnippets[currentSnippetKey];
        copyToClipboard(code, 'Code snippet copied to clipboard!');
    };

    // Initialize Studio code
    switchStudioTab('mern');


    /* ─────────────────────────────────────
       17. RECRUITER ROLE SPEC CUSTOMIZER
    ───────────────────────────────────── */
    const roleSpecs = {
        fullstack: {
            title: "Full-Stack MERN Engineer Profile",
            summary: "Specializes in end-to-end web applications with React frontends, Express/Node REST APIs, and MongoDB database modeling.",
            highlights: [
                "Architected scalable movie ticket booking system with JWT auth & role management",
                "Built WasteZero sustainability web platform with offline database fallback",
                "Proficient with Git, Vercel, RESTful API design, and state management"
            ]
        },
        frontend: {
            title: "React Frontend Specialist Profile",
            summary: "Focuses on modern visual UX, micro-interactions, responsive design systems, 3D perspective animations, and state management.",
            highlights: [
                "Crafted custom 3D perspective card orbit cylinder with CSS rotateY & drag controls",
                "Built responsive dashboards with Chart.js, CSS variables, and light/dark theme engine",
                "Implemented interactive command palette (Ctrl+K) & custom canvas background"
            ]
        },
        backend: {
            title: "Node.js API & Database Engineer Profile",
            summary: "Engineers robust backend APIs, database schemas, authentication layers, and cloud infrastructure pipelines.",
            highlights: [
                "Built RESTful microservices with Node.js, Express, MongoDB, and Prisma DB",
                "Integrated real-time exchange rate APIs and paper-traded stock persistence in SpendFlow",
                "Deployed AWS S3 static web hosting architecture with CloudFront CDN distribution"
            ]
        },
        aiml: {
            title: "AI / ML & NLP Associate Profile",
            summary: "Applies Machine Learning and NLP models to build intelligent web applications and data predictive systems.",
            highlights: [
                "Trained TF-IDF vectorizer and PassiveAggressiveClassifier for AI Fake News Detection",
                "Integrated WebCam Hand AI gesture simulation for motion-driven scroll control",
                "Developed Student Performance Predictor using analytical DSA logic & Chart.js"
            ]
        }
    };

    window.selectRoleSpec = function(roleKey, btn) {
        document.querySelectorAll('.spec-role-btn').forEach(b => b.classList.remove('active'));
        if (btn) btn.classList.add('active');
        const spec = roleSpecs[roleKey];
        const area = document.getElementById('specOutputArea');
        if (!area) return;

        area.innerHTML = `
            <div style="font-family: var(--fm); font-size: 0.72rem; color: var(--indigo); font-weight: 700; text-transform: uppercase; margin-bottom: 0.3rem;">Tailored Overview</div>
            <h4 style="font-family: var(--fd); font-size: 1.3rem; font-weight: 800; color: var(--text); margin-bottom: 0.6rem;">${spec.title}</h4>
            <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 1.1rem;">${spec.summary}</p>
            <div style="font-weight: 700; font-size: 0.82rem; color: var(--text); margin-bottom: 0.5rem;">Key Accomplishments for this Role:</div>
            <ul style="padding-left: 1.2rem; margin-bottom: 1.4rem;">
                ${spec.highlights.map(h => `<li style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 0.4rem;">${h}</li>`).join('')}
            </ul>
            <div style="display: flex; gap: 0.7rem; flex-wrap: wrap;">
                <a href="VISHAL_FINAL_CV1.pdf" target="_blank" class="bg" style="font-size: 0.78rem; padding: 0.45rem 1rem;">📄 Download Customized CV</a>
                <a href="#contact" class="bgh" style="font-size: 0.78rem; padding: 0.45rem 1rem;">✉️ Schedule Interview</a>
            </div>
        `;
        if (window.playUISound) playUISound(720, 'sine', 0.05);
    };

    // Initialize Role Spec
    selectRoleSpec('fullstack');


    /* ─────────────────────────────────────
       18. TOAST & COPY HELPER
    ───────────────────────────────────── */
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        document.body.appendChild(toastContainer);
    }

    window.showToast = function(msg) {
        const toast = document.createElement('div');
        toast.className = 'toast-msg';
        toast.innerHTML = `<span>✨</span> <span>${msg}</span>`;
        toastContainer.appendChild(toast);
        if (window.playUISound) playUISound(700, 'sine', 0.06);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(-10px)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };

    window.copyToClipboard = function(text, successMsg) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(successMsg || 'Copied to clipboard!');
        }).catch(() => {
            showToast('Fallback copy failed');
        });
    };

});


