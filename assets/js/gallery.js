// ===================================
// GALLERY - Funcionalidad de galería
// ===================================

class Gallery {
    constructor() {
        this.modal = null;
        this.modalImage = null;
        this.modalCaption = null;
        this.filters = null;
        this.items = null;
    }

    init() {
        // Esperar a que los elementos estén disponibles
        setTimeout(() => {
            this.modal = document.getElementById('gallery-modal');
            this.modalImage = document.getElementById('modal-image');
            this.modalCaption = document.getElementById('modal-caption');
            this.filters = document.querySelectorAll('.gallery__filter');
            this.items = document.querySelectorAll('.gallery__item');
            
            this.setupEventListeners();
        }, 500);
    }

    setupEventListeners() {
        // Filtros
        this.filters.forEach(filter => {
            filter.addEventListener('click', (e) => this.handleFilter(e));
        });

        // Items de galería
        this.items.forEach(item => {
            item.addEventListener('click', (e) => this.openModal(e.currentTarget));
        });

        // Cerrar modal
        const closeBtn = document.querySelector('.gallery__close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }

        // Cerrar modal al hacer clic fuera de la imagen
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });
        }

        // Cerrar modal con tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    handleFilter(e) {
        const filter = e.target.dataset.filter;
        
        // Actualizar botón activo
        this.filters.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        // Filtrar items
        this.items.forEach(item => {
            const itemType = item.dataset.type;
            
            if (filter === 'all' || itemType === filter) {
                item.classList.remove('hidden');
                item.style.animation = 'fadeIn 0.5s ease-out';
            } else {
                item.classList.add('hidden');
            }
        });
    }

    openModal(item) {
        const img = item.querySelector('img');
        const video = item.querySelector('video');
        
        if (img) {
            this.modalImage.src = img.src;
            const overlay = item.querySelector('.gallery__overlay h3');
            this.modalCaption.textContent = overlay ? overlay.textContent : '';
            this.modal.classList.add('active');
        } else if (video) {
            // Para videos, podrías abrir el video en el modal
            // Por ahora, solo mostraremos el poster
            this.modalImage.src = video.poster;
            const overlay = item.querySelector('.gallery__overlay h3');
            this.modalCaption.textContent = overlay ? overlay.textContent : '';
            this.modal.classList.add('active');
        }

        // Prevenir scroll del body
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        if (this.modal) {
            this.modal.classList.remove('active');
            // Restaurar scroll del body
            document.body.style.overflow = 'auto';
        }
    }

    // Navegación con teclado (opcional - para mejorar UX)
    nextImage() {
        // Implementar navegación a siguiente imagen
    }

    prevImage() {
        // Implementar navegación a imagen anterior
    }
}

// Instancia global
const gallery = new Gallery();