/**
 * EXTENDED DATA LOADER - Proyecto WIÑAY
 * Funciones adicionales para cargar Objetivos, Metodología, FAQ, etc.
 * Agregar estas funciones al archivo data-loader.js existente
 */

// ========================================
// SECCIÓN OBJETIVOS
// ========================================
function loadObjectivesSection(objetivos) {
    // Objetivo General
    const generalEl = document.getElementById('objetivo-general');
    if (generalEl && objetivos.general) {
        generalEl.textContent = objetivos.general;
    }
    
    // Objetivos Específicos
    const specificContainer = document.getElementById('objetivos-especificos');
    if (specificContainer && objetivos.especificos) {
        specificContainer.innerHTML = objetivos.especificos.map((objetivo, index) => `
            <div class="objective__item">
                <div class="objective__number">${index + 1}</div>
                <p>${objetivo}</p>
            </div>
        `).join('');
    }
}

// ========================================
// SECCIÓN METODOLOGÍA
// ========================================
function loadMethodologySection(metodologia) {
    // Overview cards
    const fields = {
        'method-design': metodologia.diseno,
        'method-population': metodologia.poblacion,
        'method-sample': metodologia.muestra,
        'method-duration': metodologia.duracion
    };
    
    Object.entries(fields).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    });
    
    // Fases del proyecto
    const phasesTimeline = document.getElementById('phases-timeline');
    if (phasesTimeline && metodologia.fases) {
        phasesTimeline.innerHTML = metodologia.fases.map((fase, index) => `
            <div class="phase__item" data-phase="${index + 1}">
                <div class="phase__header">
                    <div class="phase__number">${index + 1}</div>
                    <div class="phase__info">
                        <h4>${fase.fase}</h4>
                        <span class="phase__duration">${fase.duracion}</span>
                    </div>
                </div>
                <div class="phase__content">
                    <ul class="phase__activities">
                        ${fase.actividades.map(actividad => `
                            <li>${actividad}</li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `).join('');
        
        // Agregar interactividad a las fases
        addPhaseInteractivity();
    }
    
    // Locaciones
    const locationsGrid = document.getElementById('locations-grid');
    if (locationsGrid && metodologia.locaciones) {
        locationsGrid.innerHTML = metodologia.locaciones.map(location => `
            <div class="location__card">
                <div class="location__icon">📍</div>
                <p>${location}</p>
            </div>
        `).join('');
    }
}

// Interactividad para fases (expandir/colapsar)
function addPhaseInteractivity() {
    const phaseItems = document.querySelectorAll('.phase__item');
    phaseItems.forEach(item => {
        const header = item.querySelector('.phase__header');
        const content = item.querySelector('.phase__content');
        
        // Inicialmente ocultar contenido
        content.style.maxHeight = '0';
        content.style.overflow = 'hidden';
        content.style.transition = 'max-height 0.3s ease';
        
        header.style.cursor = 'pointer';
        header.addEventListener('click', () => {
            const isOpen = content.style.maxHeight !== '0px';
            
            if (isOpen) {
                content.style.maxHeight = '0';
                item.classList.remove('active');
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                item.classList.add('active');
            }
        });
    });
}

// ========================================
// SECCIÓN COLABORADORES
// ========================================
function loadPartnersSection(colaboradores) {
    const partnersGrid = document.getElementById('partners-grid');
    if (!partnersGrid || !colaboradores) return;
    
    partnersGrid.innerHTML = colaboradores.map(partner => `
        <div class="partner__card" data-type="${partner.tipo}">
            <img src="${partner.logo}" alt="${partner.nombre}"
                 onerror="this.src='assets/images/partners/placeholder.png'">
            <p class="partner__name">${partner.nombre}</p>
            <span class="partner__type">${capitalizeFirst(partner.tipo)}</span>
        </div>
    `).join('');
}

// ========================================
// SECCIÓN PUBLICACIONES
// ========================================
function loadPublicationsSection(publicaciones) {
    const publicationsList = document.getElementById('publications-list');
    if (!publicationsList || !publicaciones) return;
    
    publicationsList.innerHTML = publicaciones.map(pub => `
        <div class="publication__item">
            <h4 class="publication__title">${pub.titulo}</h4>
            <p class="publication__authors">${pub.autores}</p>
            <p class="publication__journal">
                <em>${pub.revista}</em> (${pub.año})
            </p>
            ${pub.enlace !== '#' ? `
                <a href="${pub.enlace}" target="_blank" class="btn btn--small">
                    Leer publicación
                </a>
            ` : '<span class="publication__status">En preparación</span>'}
        </div>
    `).join('');
}

// ========================================
// SECCIÓN FAQ
// ========================================
function loadFAQSection(faqs) {
    const faqContainer = document.getElementById('faq-container');
    if (!faqContainer || !faqs) return;
    
    faqContainer.innerHTML = faqs.map((faq, index) => `
        <div class="faq__item" data-faq="${index}">
            <button class="faq__question">
                <span>${faq.pregunta}</span>
                <span class="faq__icon">+</span>
            </button>
            <div class="faq__answer">
                <p>${faq.respuesta}</p>
            </div>
        </div>
    `).join('');
    
    // Agregar interactividad
    addFAQInteractivity();
}

// Interactividad para FAQ (acordeón)
function addFAQInteractivity() {
    const faqItems = document.querySelectorAll('.faq__item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');
        const answer = item.querySelector('.faq__answer');
        const icon = item.querySelector('.faq__icon');
        
        // Inicialmente ocultar respuesta
        answer.style.maxHeight = '0';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.3s ease';
        
        question.addEventListener('click', () => {
            const isOpen = answer.style.maxHeight !== '0px';
            
            // Cerrar todos los demás FAQ
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq__answer').style.maxHeight = '0';
                    otherItem.querySelector('.faq__icon').textContent = '+';
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle el actual
            if (isOpen) {
                answer.style.maxHeight = '0';
                icon.textContent = '+';
                item.classList.remove('active');
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.textContent = '−';
                item.classList.add('active');
            }
        });
    });
}

// ========================================
// FUNCIÓN PRINCIPAL ACTUALIZADA
// Agregar estas llamadas a la función loadProjectData() existente
// ========================================
async function loadProjectDataExtended() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        
        // Cargar secciones originales
        loadAboutSection(data.proyecto);
        loadResearchSection(data.investigacion);
        loadTeamSection(data.equipo);
        loadGallerySection(data.galeria);
        loadContactSection(data.contacto);
        loadFooter(data.proyecto, data.contacto);
        
        // Cargar nuevas secciones
        if (data.objetivos) loadObjectivesSection(data.objetivos);
        if (data.metodologia) loadMethodologySection(data.metodologia);
        if (data.colaboradores) loadPartnersSection(data.colaboradores);
        if (data.publicaciones) loadPublicationsSection(data.publicaciones);
        if (data.faqs) loadFAQSection(data.faqs);
        
    } catch (error) {
        console.error('Error cargando datos:', error);
        showErrorMessage();
    }
}

// ========================================
// UTILIDADES
// ========================================
function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Smooth scroll para navegación
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', function() {
    loadProjectDataExtended();
    initSmoothScroll();
});