// ===================================
// ANIMATIONS - Animaciones y efectos
// ===================================

class Animations {
    constructor() {
        this.scrollElements = [];
    }

    init() {
        this.setupScrollAnimations();
        this.setupParallax();
        this.setupCounters();
    }

    // Animaciones al hacer scroll
    setupScrollAnimations() {
        const elements = document.querySelectorAll(
            '.research__card, .team__card, .gallery__item, .about__content, .contact__content'
        );

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }

    // Efecto parallax para hero
    setupParallax() {
        const hero = document.querySelector('.hero');
        
        if (hero) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallaxSpeed = 0.5;
                
                if (scrolled < window.innerHeight) {
                    hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
                }
            });
        }
    }

    // Contador animado para estadísticas
    setupCounters() {
        const counters = document.querySelectorAll('.stat__number');
        const speed = 200; // Velocidad de animación

        const animateCounter = (counter) => {
            const target = counter.textContent.replace(/\+/g, '');
            const isNumber = !isNaN(target);
            
            if (!isNumber) return;

            const updateCount = () => {
                const current = +counter.innerText.replace(/\+/g, '');
                const increment = Math.ceil(+target / speed);

                if (current < +target) {
                    counter.innerText = current + increment;
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target + '+';
                }
            };

            counter.innerText = '0';
            updateCount();
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        counters.forEach(counter => observer.observe(counter));
    }

    // Smooth scroll para navegación
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Highlight de sección activa en navegación
    setupActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav__link');

        window.addEventListener('scroll', () => {
            let current = '';
            const scrollPosition = window.pageYOffset + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
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
    }

    // Efecto de typing (opcional)
    typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        
        type();
    }
}

// Instancia global
const animations = new Animations();