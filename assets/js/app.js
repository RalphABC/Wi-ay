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
        // Esperar a que el DOM esté completamente cargado
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
        await dataLoader.init();

        // Inicializar componentes
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupContactForm();
        
        // Inicializar galería y animaciones
        gallery.init();
        animations.init();
        animations.setupSmoothScroll();
        animations.setupActiveNavigation();

        // Añadir loading completo
        this.hideLoader();
    }

    // Configurar navegación móvil
    setupNavigation() {
        if (this.navToggle && this.navMenu) {
            this.navToggle.addEventListener('click', () => {
                this.navMenu.classList.toggle('active');
                this.navToggle.classList.toggle('active');
            });

            // Cerrar menú al hacer clic en un enlace
            const navLinks = document.querySelectorAll('.nav__link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.navMenu.classList.remove('active');
                    this.navToggle.classList.remove('active');
                });
            });

            // Cerrar menú al hacer clic fuera
            document.addEventListener('click', (e) => {
                if (!this.navMenu.contains(e.target) && !this.navToggle.contains(e.target)) {
                    this.navMenu.classList.remove('active');
                    this.navToggle.classList.remove('active');
                }
            });
        }
    }

    // Efectos al hacer scroll
    setupScrollEffects() {
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            // Header con sombra al hacer scroll
            if (currentScroll > 50) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }

            // Ocultar/mostrar header al hacer scroll (opcional)
            // if (currentScroll > lastScroll && currentScroll > 100) {
            //     this.header.style.transform = 'translateY(-100%)';
            // } else {
            //     this.header.style.transform = 'translateY(0)';
            // }

            lastScroll = currentScroll;
        });

        // Botón de scroll to top (opcional)
        this.createScrollTopButton();
    }

    // Crear botón de scroll to top
    createScrollTopButton() {
        const button = document.createElement('button');
        button.innerHTML = '↑';
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

        // Aquí puedes integrar con tu backend
        // Por ahora, solo simularemos el envío
        
        try {
            // Simulación de envío (reemplazar con tu API)
            await this.simulateFormSubmission(data);
            
            // Mostrar mensaje de éxito
            this.showFormMessage('success', '¡Mensaje enviado exitosamente! Nos pondremos en contacto pronto.');
            
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
                // Simular éxito (90% de las veces)
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

        // Ocultar después de 5 segundos
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

// Inicializar aplicación
const app = new App();
app.init();

// Exportar para uso global (opcional)
window.app = app;