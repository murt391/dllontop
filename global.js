// Global Settings & Effects Loader
(function() {
    // 1. Apply Dynamic Background
    const savedBg = localStorage.getItem('dll-bg-url');
    if (savedBg) {
        document.body.style.background = `url('${savedBg}') no-repeat center center fixed`;
        document.body.style.backgroundSize = 'cover';
    }

    // 2. Handle Top Bar Visibility
    const topBarEnabled = localStorage.getItem('dll-topbar-enabled') !== 'false';
    const topBar = document.querySelector('.top-header');
    if (topBar) {
        topBar.style.display = topBarEnabled ? 'flex' : 'none';
    }

    // 3. Falling Dots Effect
    const dotsEnabled = localStorage.getItem('dll-dots-enabled') === 'true';
    if (dotsEnabled) {
        const canvas = document.createElement('canvas');
        canvas.id = 'dotsCanvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '2'; // Higher than background layer (usually 1 or before)
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        let dots = [];
        const dotCount = 50;

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resize);
        resize();

        class Dot {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = -10;
                this.size = Math.random() * 3 + 1;
                this.speed = Math.random() * 1 + 0.5;
                this.opacity = 0;
                this.fadeSpeed = Math.random() * 0.02 + 0.01;
            }

            update() {
                this.y += this.speed;
                if (this.opacity < 0.6) this.opacity += this.fadeSpeed;
                
                if (this.y > canvas.height) {
                    this.reset();
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < dotCount; i++) {
            dots.push(new Dot());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            dots.forEach(dot => {
                dot.update();
                dot.draw();
            });
            requestAnimationFrame(animate);
        }

        animate();
    }
})();
