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

/* ========================================
   MENÚ HAMBURGUESA: Abrir/Cerrar
   Controla el menú móvil desplegable
   ======================================== */
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            // Alternar clase "active" para mostrar/ocultar menú
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    /* ========================================
       CERRAR MENÚ al hacer clic en un link
       Mejora UX en móviles
       ======================================== */
    const navLinks = document.querySelectorAll('.nav__link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Cerrar menú móvil
            if (navToggle && navMenu) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
            
            // Actualizar link activo
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    /* ========================================
       CERRAR MENÚ al hacer clic fuera
       Cierra el menú si se hace clic en el overlay
       ======================================== */
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu?.contains(event.target) || navToggle?.contains(event.target);
        
        if (!isClickInsideNav && navMenu?.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
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
        this.setupSmoothScroll(); // Activar scroll suave
        this.setupActiveNavigation(); // Activar navegación activa
    }

    /* ========================================
       ANIMACIONES AL HACER SCROLL
       Los elementos aparecen gradualmente
       cuando entran en el viewport
       ======================================== */
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

    /* ========================================
       EFECTO PARALLAX para HERO - MEJORADO
       Crea efecto de profundidad al hacer scroll
       con optimización de rendimiento
       ======================================== */
    setupParallax() {
        const hero = document.querySelector('.hero');
        
        if (hero) {
            let ticking = false; // Optimización de rendimiento
            
            window.addEventListener('scroll', () => {
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        const scrolled = window.pageYOffset;
                        
                        // Solo aplicar parallax si estamos en la sección hero
                        if (scrolled < window.innerHeight) {
                            // Efecto parallax sutil en el contenido
                            const heroContent = hero.querySelector('.hero__content');
                            if (heroContent) {
                                // El contenido se mueve más lento que el scroll
                                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                                // Se desvanece gradualmente
                                heroContent.style.opacity = `${1 - (scrolled / window.innerHeight)}`;
                            }
                        }
                        
                        ticking = false;
                    });
                    
                    ticking = true;
                }
            });
        }
    }

    /* ========================================
       CONTADOR ANIMADO para estadísticas
       Anima números de 0 hasta el valor final
       ======================================== */
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

    /* ========================================
       SMOOTH SCROLL para navegación - MEJORADO
       Scroll suave al hacer clic en enlaces internos
       ======================================== */
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                
                // Ignorar links vacíos o solo "#"
                if (!href || href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 70;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /* ========================================
       HIGHLIGHT de sección activa en navegación
       Marca el link del menú según la sección visible
       ======================================== */
    setupActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav__link');

        window.addEventListener('scroll', () => {
            let current = '';
            const scrollPosition = window.pageYOffset + 150; // Offset ajustado

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

    /* ========================================
       EFECTO DE TYPING (opcional)
       Simula escritura automática de texto
       ======================================== */
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

// Instancia global de la clase Animations
const animations = new Animations();