// ===================================
// NAVBAR Y HERO - Efectos adicionales
// ===================================

/* ========================================
   NAVBAR: Efecto al hacer scroll
   Agrega clase "scrolled" cuando el usuario
   hace scroll > 50px para cambiar el estilo
   ======================================== */
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    
    if (header) {
        // Agregar clase "scrolled" cuando scroll > 50px
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

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
        this.setupSmoothScroll();
        this.setupActiveNavigation();
        this.setupMethodology();
    }

  
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

    
    setupParallax() {
        const hero = document.querySelector('.hero');
        
        if (hero) {
            let ticking = false;
            
            window.addEventListener('scroll', () => {
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        const scrolled = window.pageYOffset;
                        
                        // Solo aplicar parallax si estamos en la sección hero
                        if (scrolled < window.innerHeight) {
                            const heroContent = hero.querySelector('.hero__content');
                            if (heroContent) {
                                // El contenido se mueve más lento que el scroll
                                heroContent.style.transform = `translateY(${scrolled * 0.25}px)`;
                                // Se desvanece gradualmente
                                heroContent.style.opacity = `${1 - (scrolled / (window.innerHeight * 1.2))}`;
                            }
                        }
                        
                        ticking = false;
                    });
                    
                    ticking = true;
                }
            });
        }
    }

   
    setupCounters() {
        const counters = document.querySelectorAll('.stat__number');
        const speed = 200;

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

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                
                // Ignorar links vacíos o solo "#"
                if (!href || href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 75;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

  
    setupActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav__link');

        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-100px 0px -66%'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }

   
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
    

setupMethodology() {
    this.setupMethodologyStats();
    this.setupMethodologyEntrance();
}


setupMethodologyStats() {
    const stats = document.querySelectorAll('.methodology__stat-number[data-target]');

    const animateStat = (el) => {
        const target = parseInt(el.getAttribute('data-target'), 10);
        const duration = 1400; // ms
        const start = performance.now();
        const initial = 0;

        const step = (timestamp) => {
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);
            // Easing: ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(initial + (target - initial) * eased);
            el.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target.toLocaleString();
            }
        };

        requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStat(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    stats.forEach(stat => observer.observe(stat));
}

setupMethodologyEntrance() {
    const items = document.querySelectorAll(
        '.phase__item, .focus__item'
    );

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        }
    );

    items.forEach(item => observer.observe(item));
}


}

// Instancia global de la clase Animations
const animations = new Animations();
