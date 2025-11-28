// Initialize Lucide Icons
lucide.createIcons();

// Mobile Menu Toggle
const burger = document.querySelector('.header__burger');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav__link');

if (burger) {
    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        
        // Change icon based on state (optional visual flair)
        const icon = nav.classList.contains('active') ? 'x' : 'menu';
        // Note: Lucide replaces <i data-lucide> with <svg>, so we need to re-render or just handle class toggle simple way
        // Ideally, we would re-run createIcons, but for simple toggle, CSS animation is often better. 
        // For now, let's keep it simple.
    });
}

// Close menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

// Sticky Header Effect (Optional polish)
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
    } else {
        header.style.boxShadow = 'none';
    }
});
/* --- Hero Canvas Animation (Digital Wave) --- */
const canvas = document.getElementById('hero-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    
    // Настройки волны
    const waveSettings = {
        y: canvas.height / 2, // Центр по вертикали
        length: 0.01,         // Длина волны
        amplitude: 100,       // Высота волны
        frequency: 0.01       // Скорость колебания
    };

    let increment = 0;

    class WaveParticle {
        constructor(i, yOffset, color) {
            this.x = Math.random() * canvas.width;
            this.y = 0;
            this.i = i; // Индекс для смещения фазы
            this.yOffset = yOffset; // Смещение по высоте (чтобы было несколько линий)
            this.size = Math.random() * 2 + 1;
            this.color = color;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            // Движение по синусоиде
            // y = центр + синус(время + позицияХ * длина) * амплитуда
            this.y = (canvas.height / 2 + this.yOffset) + 
                     Math.sin(increment + this.x * waveSettings.length + this.i) * waveSettings.amplitude;
            
            // Легкое движение частиц вправо
            this.x += 0.5;
            
            // Если частица ушла за правый край, возвращаем влево
            if (this.x > canvas.width) {
                this.x = 0;
            }

            this.draw();
        }
    }

    function init() {
        particlesArray = [];
        const particleCount = 200; // Количество частиц
        
        // Создаем 3 слоя волн
        for (let i = 0; i < particleCount; i++) {
            // Слой 1: Фиолетовый
            particlesArray.push(new WaveParticle(i, 0, 'rgba(139, 92, 246, 0.8)')); 
            // Слой 2: Циан (со смещением)
            particlesArray.push(new WaveParticle(i + 100, 50, 'rgba(6, 182, 212, 0.5)')); 
             // Слой 3: Мелкие детали (широкий разброс)
            particlesArray.push(new WaveParticle(i + 200, -50, 'rgba(255, 255, 255, 0.3)'));
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        // Полупрозрачный фон для эффекта "шлейфа" (motion trail)
        ctx.fillStyle = 'rgba(11, 17, 32, 0.1)'; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        increment += waveSettings.frequency;

        particlesArray.forEach(particle => {
            particle.update();
        });
    }

    init();
    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });
}
/* --- Contact Form Logic --- */
const leadForm = document.getElementById('leadForm');
const successMessage = document.getElementById('successMessage');

if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Зупиняємо перезавантаження

        const btn = leadForm.querySelector('.form-btn');
        const captchaInput = document.getElementById('captcha');
        const originalText = btn.innerHTML;

        // 1. Перевірка капчі (3 + 5 = 8)
        if (captchaInput.value !== '8') {
            alert('Ошибка капчи! Решите пример правильно (3 + 5).');
            captchaInput.focus();
            captchaInput.style.borderColor = 'red';
            return;
        }

        // 2. Імітація відправки
        btn.disabled = true;
        btn.innerHTML = 'Отправка...';

        setTimeout(() => {
            // Успіх
            leadForm.style.display = 'none'; // Ховаємо форму
            successMessage.style.display = 'block'; // Показуємо повідомлення
            
            // Скидаємо форму на випадок перезавантаження
            leadForm.reset();
        }, 1500); // 1.5 секунди затримки
    });
    
    // Скидання червоної рамки при вводі
    document.getElementById('captcha').addEventListener('input', function() {
        this.style.borderColor = 'var(--color-border)';
    });
}

/* --- Cookie Pop-up Logic --- */
const cookiePopup = document.getElementById('cookiePopup');
const acceptCookie = document.getElementById('acceptCookie');

if (cookiePopup && acceptCookie) {
    // Перевіряємо, чи був вже клік
    if (!localStorage.getItem('cookiesAccepted')) {
        // Якщо ні — показуємо з затримкою
        setTimeout(() => {
            cookiePopup.classList.add('show');
        }, 2000);
    }

    acceptCookie.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookiePopup.classList.remove('show');
    });
}