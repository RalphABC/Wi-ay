// ===================================
// APP - JavaScript principal
// ===================================

class App {
    constructor() {
        this.header = null;
        this.navToggle = null;
        this.navMenu = null;
        this.contactForm = null;
    }

    async init() {
        // Esperar a que el DOM estÃ© completamente cargado
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            await this.setup();
        }
    }

    async setup() {
        // Inicializar elementos
        this.header = document.getElementById('header');
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.contactForm = document.getElementById('contact-form');

        // Cargar datos desde JSON

        // Inicializar componentes
        this.setupNavigation();
        this.setupContactForm();
        
        // Inicializar galerÃ­a y animaciones
        if (typeof gallery !== 'undefined' && gallery && typeof gallery.init === 'function') {
            gallery.init();
        }
        if (typeof animations !== 'undefined' && animations && typeof animations.init === 'function') {
            animations.init();
        }

        this.setCurrentYear();

        // AÃ±adir loading completo
        this.hideLoader();
    }

    // Configurar navegaciÃ³n mÃ³vil
    setupNavigation() {
        if (this.navToggle && this.navMenu) {
            const body = document.body;

            const closeMenu = () => {
                this.navMenu.classList.remove('active');
                this.navToggle.classList.remove('active');
                this.navToggle.setAttribute('aria-expanded', 'false');
                body.classList.remove('menu-open');
            };

            this.navToggle.addEventListener('click', () => {
                this.navMenu.classList.toggle('active');
                this.navToggle.classList.toggle('active');
                const isOpen = this.navMenu.classList.contains('active');
                this.navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
                body.classList.toggle('menu-open', isOpen);
            });

            const navLinks = document.querySelectorAll('.nav__link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    closeMenu();
                });
            });

            document.addEventListener('click', (e) => {
                if (!this.navMenu.contains(e.target) && !this.navToggle.contains(e.target)) {
                    closeMenu();
                }
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    closeMenu();
                }
            });
        }
    }

    // Crear botÃ³n de scroll to top
    createScrollTopButton() {
        const button = document.createElement('button');
        button.innerHTML = 'â†‘';
        button.className = 'scroll-to-top';
        button.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: white;
            border: none;
            cursor: pointer;
            font-size: 24px;
            box-shadow: var(--shadow-lg);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 99;
        `;

        document.body.appendChild(button);

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                button.style.opacity = '1';
                button.style.visibility = 'visible';
            } else {
                button.style.opacity = '0';
                button.style.visibility = 'hidden';
            }
        });

        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-5px)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    }

    // Configurar formulario de contacto
    setupContactForm() {
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(e);
            });
        }
    }

    async handleFormSubmit(e) {
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        // AquÃ­ puedes integrar con tu backend
        // Por ahora, solo simularemos el envÃ­o
        
        try {
            // SimulaciÃ³n de envÃ­o (reemplazar con tu API)
            await this.simulateFormSubmission(data);
            
            // Mostrar mensaje de Ã©xito
            this.showFormMessage('success', 'Â¡Mensaje enviado exitosamente! Nos pondremos en contacto pronto.');
            
            // Limpiar formulario
            e.target.reset();
            
        } catch (error) {
            // Mostrar mensaje de error
            this.showFormMessage('error', 'Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.');
        }
    }

    simulateFormSubmission(data) {
        return new Promise((resolve, reject) => {
            // Simular llamada a API
            console.log('Datos del formulario:', data);
            
            setTimeout(() => {
                // Simular Ã©xito (90% de las veces)
                if (Math.random() > 0.1) {
                    resolve();
                } else {
                    reject(new Error('Error simulado'));
                }
            }, 1000);
        });
    }

    showFormMessage(type, message) {
        // Crear elemento de mensaje si no existe
        let messageElement = this.contactForm.querySelector(`.form__${type}`);
        
        if (!messageElement) {
            messageElement = document.createElement('div');
            messageElement.className = `form__${type}`;
            this.contactForm.insertBefore(messageElement, this.contactForm.firstChild);
        }

        messageElement.textContent = message;
        messageElement.classList.add('active');

        // Ocultar despuÃ©s de 5 segundos
        setTimeout(() => {
            messageElement.classList.remove('active');
        }, 5000);
    }

    hideLoader() {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.display = 'none';
        }
    }

    setCurrentYear() {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = String(new Date().getFullYear());
        }
    }

    // Utilidades
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}
// ===================================
// HERO SLIDER
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('slider-track');
    const slides = document.querySelectorAll('.hero__slide');
    const dots = document.querySelectorAll('.hero__slider-dot');
    const prevBtn = document.querySelector('.hero__slider-arrow.prev');
    const nextBtn = document.querySelector('.hero__slider-arrow.next');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;
    
    // FunciÃ³n para ir a un slide especÃ­fico
    function goToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        
        currentSlide = index;
        const translateX = -(currentSlide * 20); // 20% por slide
        track.style.transform = `translateX(${translateX}%)`;
        
        // Actualizar dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }
    
    // Siguiente slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    // Slide anterior
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetAutoPlay();
        });
    });
    
    // Autoplay
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000); // Cambiar cada 5 segundos
    }
    
    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }
    
    // Iniciar autoplay
    startAutoPlay();
    
    // Pausar cuando el usuario estÃ¡ interactuando
    const sliderContainer = document.querySelector('.hero__slider-container');
    sliderContainer.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    sliderContainer.addEventListener('mouseleave', startAutoPlay);
});
// Inicializar aplicaciÃ³n
const app = new App();
app.init();

// Exportar para uso global (opcional)
window.app = app;



