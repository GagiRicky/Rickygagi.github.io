// Theme Toggle Logic
document.addEventListener('DOMContentLoaded', () => {
    // Inject Button
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'theme-toggle';
    toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    toggleBtn.style.position = 'fixed';
    toggleBtn.style.bottom = '30px';
    toggleBtn.style.right = '30px';
    toggleBtn.style.padding = '15px';
    toggleBtn.style.borderRadius = '0';
    toggleBtn.style.border = '4px solid var(--primary-color)';
    toggleBtn.style.background = '#000';
    toggleBtn.style.color = 'var(--primary-color)';
    toggleBtn.style.cursor = 'pointer';
    toggleBtn.style.zIndex = '10000';
    toggleBtn.style.boxShadow = '4px 4px 0px var(--secondary-color)';
    toggleBtn.style.fontSize = '1.2rem';
    document.body.appendChild(toggleBtn);

    // Logo Click -> Reset Intro
    const logoLink = document.querySelector('.logo');
    if (logoLink) {
        logoLink.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.removeItem('introShown');
            window.location.href = 'index.html';
        });
    }

    // Check Preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
        toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        toggleBtn.style.background = '#fff';
    }

    // Click Handler
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');

        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
            toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            toggleBtn.style.background = '#fff';
        } else {
            localStorage.setItem('theme', 'dark');
            toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            toggleBtn.style.background = '#000';
        }
    });

    // Intro Typing Effect
    const splash = document.getElementById('splash-screen');
    const typeText = document.getElementById('typewriter-text');
    const pressStart = document.getElementById('press-start');

    // HTML-aware Typewriter
    function typeHtml(element, html, speed, callback) {
        let i = 0;
        let tagOpen = false;
        let currentHtml = '';

        function type() {
            if (i < html.length) {
                let char = html.charAt(i);

                if (char === '<') tagOpen = true;

                currentHtml += char;
                i++;

                if (tagOpen) {
                    if (char === '>') tagOpen = false;
                    type(); // Skip delay for tags
                } else {
                    element.innerHTML = currentHtml;
                    setTimeout(type, speed);
                }
            } else {
                if (callback) callback();
            }
        }
        type();
    }

    function startMainAnimations() {
        document.body.classList.add('animations-active'); // Triggers Image

        setTimeout(() => {
            const subtitle = document.getElementById('hero-subtitle');
            const title = document.getElementById('hero-title');
            const desc = document.getElementById('hero-desc');
            const sourceData = document.getElementById('typing-source');

            if (!subtitle || !sourceData) return;

            const text1 = sourceData.querySelector('[data-target="hero-subtitle"]').innerHTML;
            const text2 = sourceData.querySelector('[data-target="hero-title"]').innerHTML;
            const text3 = sourceData.querySelector('[data-target="hero-desc"]').innerHTML;

            // Faster typing speeds (Total ~3 seconds)
            typeHtml(subtitle, text1, 30, () => {
                typeHtml(title, text2, 40, () => { // Slightly emphasizing title
                    typeHtml(desc, text3, 10, () => { // Fast data stream
                        // Show Buttons
                        const cta = document.querySelector('.cta-group');
                        if (cta) {
                            cta.style.transition = 'opacity 1s ease';
                            cta.style.opacity = '1';
                        }
                    });
                });
            });
        }, 500);
    }

    // Intro Typing Effect
    if (splash && typeText && sessionStorage.getItem('introShown') !== 'true') {
        const text = "Hello.. I'am Ricky Gagi";
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                typeText.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                if (pressStart) {
                    pressStart.style.display = 'block';
                    pressStart.addEventListener('click', () => {
                        splash.classList.add('fade-out');
                        setTimeout(() => splash.style.display = 'none', 1000);
                        sessionStorage.setItem('introShown', 'true');
                        startMainAnimations();
                    });
                }
            }
        }

        // Start typing after short delay
        setTimeout(typeWriter, 1000);
    } else {
        if (splash) splash.style.display = 'none';
        startMainAnimations();
    }

    // Custom Cursor
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', function (e) {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Snappy retro cursor
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 0, fill: "forwards" });
        });
    }

    // Scroll Observers for reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const scrollElements = document.querySelectorAll('.reveal-scroll');
    scrollElements.forEach(el => observer.observe(el));

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.right = '2rem';
                navLinks.style.background = '#0a0a0a';
                navLinks.style.padding = '1rem';
                navLinks.style.borderRadius = '10px';
                navLinks.style.border = '1px solid #333';
            }
        });
    }

    // Snake Game Logic
    // Snake Game Logic
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas ? canvas.getContext("2d") : null;
    const startBtn = document.getElementById("startBtn");
    const scoreEl = document.getElementById("score");

    // Mobile Controls
    const upBtn = document.getElementById("upBtn");
    const downBtn = document.getElementById("downBtn");
    const leftBtn = document.getElementById("leftBtn");
    const rightBtn = document.getElementById("rightBtn");

    const box = 20; // grid size
    const canvasSize = 400; // Match HTML width/height
    const boxes = canvasSize / box;

    let snake = [];
    let food = {};
    let score = 0;
    let d;
    let game;
    let isGameRunning = false;

    function initGame(initialDirection) {
        snake = [];
        snake[0] = { x: 5 * box, y: 10 * box }; // Start bit more left
        generateFood();
        score = 0;
        d = initialDirection || "RIGHT";
        isGameRunning = true;
        if (scoreEl) scoreEl.innerText = score;

        clearInterval(game);
        game = setInterval(gameLoop, 100);

        if (startBtn) startBtn.style.display = "none";
        drawScene();
    }

    function generateFood() {
        food = {
            x: Math.floor(Math.random() * boxes) * box,
            y: Math.floor(Math.random() * boxes) * box
        };
        // Simple check to ensure food doesn't spawn on snake
        for (let part of snake) {
            if (part.x === food.x && part.y === food.y) generateFood();
        }
    }

    document.addEventListener("keydown", direction);

    function direction(event) {
        let key = event.keyCode;
        // Prevent scrolling with arrows
        if ([37, 38, 39, 40].indexOf(key) > -1) {
            event.preventDefault();

            // Start game if stopped
            if (!isGameRunning && startBtn && startBtn.style.display !== 'none') {
                if (key == 37) initGame("LEFT");
                else if (key == 38) initGame("UP");
                else if (key == 39) initGame("RIGHT");
                else if (key == 40) initGame("DOWN");
                return;
            }
        }

        if (key == 37 && d != "RIGHT") d = "LEFT";
        else if (key == 38 && d != "DOWN") d = "UP";
        else if (key == 39 && d != "LEFT") d = "RIGHT";
        else if (key == 40 && d != "UP") d = "DOWN";
    }

    // Mobile Control Listeners
    if (upBtn) upBtn.addEventListener('click', (e) => { e.preventDefault(); if (!isGameRunning) initGame("UP"); else if (d != "DOWN") d = "UP"; });
    if (downBtn) downBtn.addEventListener('click', (e) => { e.preventDefault(); if (!isGameRunning) initGame("DOWN"); else if (d != "UP") d = "DOWN"; });
    if (leftBtn) leftBtn.addEventListener('click', (e) => { e.preventDefault(); if (!isGameRunning) initGame("LEFT"); else if (d != "RIGHT") d = "LEFT"; });
    if (rightBtn) rightBtn.addEventListener('click', (e) => { e.preventDefault(); if (!isGameRunning) initGame("RIGHT"); else if (d != "LEFT") d = "RIGHT"; });

    function drawScene() {
        if (!ctx) return;

        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvasSize, canvasSize);

        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = (i == 0) ? "#55ff55" : "#00aa00";
            ctx.strokeStyle = "#000";
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
            ctx.strokeRect(snake[i].x, snake[i].y, box, box);
        }

        ctx.fillStyle = "#ff55ff";
        ctx.fillRect(food.x, food.y, box, box);
    }

    function gameLoop() {
        if (!isGameRunning) return;

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (d == "LEFT") snakeX -= box;
        if (d == "UP") snakeY -= box;
        if (d == "RIGHT") snakeX += box;
        if (d == "DOWN") snakeY += box;

        if (snakeX == food.x && snakeY == food.y) {
            score++;
            if (scoreEl) scoreEl.innerText = score;
            generateFood();
        } else {
            snake.pop();
        }

        let newHead = { x: snakeX, y: snakeY };

        // Game Over Limit
        if (snakeX < 0 || snakeX >= canvasSize || snakeY < 0 || snakeY >= canvasSize || collision(newHead, snake)) {
            clearInterval(game);
            isGameRunning = false;

            ctx.fillStyle = "white";
            ctx.font = "20px 'Press Start 2P'";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", canvasSize / 2, canvasSize / 2);

            if (startBtn) {
                startBtn.style.display = "inline-block";
                startBtn.innerText = "Restart";
            }
            return;
        }

        snake.unshift(newHead);
        drawScene();
    }

    function collision(head, array) {
        for (let i = 0; i < array.length; i++) {
            if (head.x == array[i].x && head.y == array[i].y) return true;
        }
        return false;
    }

    if (startBtn) {
        startBtn.addEventListener("click", () => {
            initGame("RIGHT");
        });
    }
});
