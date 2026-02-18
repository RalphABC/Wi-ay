/**
 * DATA LOADER - Proyecto WIÑAY
 * Carga y renderiza contenido dinámico desde data.json
 */

// Cargar datos al iniciar la página
document.addEventListener('DOMContentLoaded', function() {
    loadProjectData();
});

async function loadProjectData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        
        // Cargar cada sección
        loadAboutSection(data.proyecto);
        loadResearchSection(data.investigacion);
        loadTeamSection(data.equipo);
        loadGallerySection(data.galeria);
        loadContactSection(data.contacto);
        loadFooter(data.proyecto, data.contacto);
        
    } catch (error) {
        console.error('Error cargando datos:', error);
        showErrorMessage();
    }
}

// ========================================
// SECCIÓN SOBRE EL PROYECTO
// ========================================
function loadAboutSection(proyecto) {
    // Título
    const title = document.getElementById('about-title');
    if (title) {
        title.textContent = 'Nuestra Misión';
    }
    
    // Descripción
    const description = document.getElementById('about-description');
    if (description) {
        description.innerHTML = `
            <p><strong>${proyecto.nombre}</strong> es una iniciativa de investigación innovadora que explora la compleja relación entre la malnutrición, la microbiota intestinal y el Trastorno del Espectro Autista (TEA) en niños ecuatorianos.</p>
            <p>${proyecto.mision}</p>
            <br>
            <p><strong>Nuestra Visión:</strong> ${proyecto.vision}</p>
        `;
    }
    
    // Estadísticas
    const statsContainer = document.getElementById('about-stats');
    if (statsContainer && proyecto.estadisticas) {
        statsContainer.innerHTML = proyecto.estadisticas.map(stat => `
            <div class="stat">
                <div class="stat__number">${stat.numero}</div>
                <div class="stat__text">${stat.texto}</div>
            </div>
        `).join('');
    }
    
    // Imagen principal (reemplaza al video)
    const aboutImage = document.getElementById('about-image');
    if (aboutImage) {
        aboutImage.src = 'assets/images/primeraimagen.jpg';
        aboutImage.alt = 'Proyecto WIÑAY - Investigación en autismo Ecuador';
    }
}

// ========================================
// SECCIÓN INVESTIGACIÓN
// ========================================
function loadResearchSection(investigacion) {
    const grid = document.getElementById('research-grid');
    if (!grid || !investigacion.areas) return;
    
    grid.innerHTML = investigacion.areas.map(area => `
        <div class="research__card" data-area="${area.id}">
            <div class="research__icon">${area.icono}</div>
            <h3 class="research__title">${area.titulo}</h3>
            <p class="research__description">${area.descripcion}</p>
            <div class="research__details">
                <p><strong>Metodología:</strong> ${area.metodologia}</p>
                <p><strong>Impacto esperado:</strong> ${area.impacto}</p>
            </div>
            <button class="btn btn--secondary" onclick="showAreaDetails(${area.id})">
                Ver más detalles
            </button>
        </div>
    `).join('');
}

// Mostrar detalles de área de investigación (modal o expansión)
function showAreaDetails(areaId) {
    // Aquí puedes implementar un modal con más información
    console.log('Mostrando detalles del área:', areaId);
    // Por ahora, hacer scroll suave
    const card = document.querySelector(`[data-area="${areaId}"]`);
    if (card) {
        const details = card.querySelector('.research__details');
        details.style.display = details.style.display === 'none' ? 'block' : 'none';
    }
}

// ========================================
// SECCIÓN EQUIPO
// ========================================
function loadTeamSection(equipo) {
    const grid = document.getElementById('team-grid');
    if (!grid || !equipo) return;
    
    grid.innerHTML = equipo.map(miembro => `
        <div class="team__card">
            <div class="team__image">
                <img src="${miembro.foto}" alt="${miembro.nombre}" 
                     onerror="this.src='assets/images/team/default-avatar.jpg'">
            </div>
            <div class="team__content">
                <h3 class="team__name">${miembro.nombre}</h3>
                <p class="team__role">${miembro.cargo}</p>
                <p class="team__specialty">${miembro.especialidad}</p>
                <p class="team__institution">${miembro.institucion}</p>
                <p class="team__bio">${miembro.descripcion}</p>
                <a href="mailto:${miembro.email}" class="team__email">
                    ✉ ${miembro.email}
                </a>
            </div>
        </div>
    `).join('');
}

// ========================================
// SECCIÓN GALERÍA
// ========================================
function loadGallerySection(galeria) {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;
    
    let items = [];
    
    // Agregar imágenes
    if (galeria.imagenes) {
        items = items.concat(galeria.imagenes.map(img => ({
            type: 'image',
            url: img.url,
            titulo: img.titulo,
            descripcion: img.descripcion,
            categoria: img.categoria
        })));
    }
    
    // Agregar videos
    if (galeria.videos) {
        items = items.concat(galeria.videos.map(video => ({
            type: 'video',
            url: video.url,
            thumbnail: video.thumbnail,
            titulo: video.titulo,
            descripcion: video.descripcion,
            duracion: video.duracion
        })));
    }
    
    // Renderizar items
    grid.innerHTML = items.map((item, index) => {
        if (item.type === 'image') {
            return `
                <div class="gallery__item" data-category="images" data-index="${index}">
                    <img src="${item.url}" alt="${item.titulo}" 
                         onerror="this.src='assets/images/gallery/placeholder.jpg'">
                    <div class="gallery__overlay">
                        <h4>${item.titulo}</h4>
                        <p>${item.descripcion}</p>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="gallery__item gallery__item--video" data-category="videos" data-index="${index}">
                    <img src="${item.thumbnail}" alt="${item.titulo}"
                         onerror="this.src='assets/images/gallery/video-placeholder.jpg'">
                    <div class="gallery__play-btn">▶</div>
                    <div class="gallery__overlay">
                        <h4>${item.titulo}</h4>
                        <p>${item.descripcion}</p>
                        <span class="gallery__duration">${item.duracion}</span>
                    </div>
                </div>
            `;
        }
    }).join('');
}

// ========================================
// SECCIÓN CONTACTO
// ========================================
function loadContactSection(contacto) {
    const infoContainer = document.getElementById('contact-info');
    if (!infoContainer) return;
    
    infoContainer.innerHTML = `
        <div class="contact__info-item">
            <div class="contact__icon">📧</div>
            <div class="contact__details">
                <h4>Correo Electrónico</h4>
                <a href="mailto:${contacto.email}">${contacto.email}</a>
            </div>
        </div>
        
        <div class="contact__info-item">
            <div class="contact__icon">📞</div>
            <div class="contact__details">
                <h4>Teléfono</h4>
                <a href="tel:${contacto.telefono.replace(/\s/g, '')}">${contacto.telefono}</a>
            </div>
        </div>
        
        <div class="contact__info-item">
            <div class="contact__icon">📍</div>
            <div class="contact__details">
                <h4>Dirección</h4>
                <p>${contacto.direccion}</p>
            </div>
        </div>
        
        <div class="contact__info-item">
            <div class="contact__icon">🕐</div>
            <div class="contact__details">
                <h4>Horario de Atención</h4>
                <p>${contacto.horario}</p>
            </div>
        </div>
    `;
}

// ========================================
// FOOTER
// ========================================
function loadFooter(proyecto, contacto) {
    // Descripción del footer
    const footerDesc = document.getElementById('footer-description');
    if (footerDesc) {
        footerDesc.textContent = proyecto.descripcion.substring(0, 200) + '...';
    }
    
    // Redes sociales
    const socialContainer = document.getElementById('footer-social');
    if (socialContainer && contacto.redesSociales) {
        const redes = contacto.redesSociales;
        socialContainer.innerHTML = `
            <a href="${redes.facebook}" target="_blank" aria-label="Facebook">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
            </a>
            <a href="${redes.twitter}" target="_blank" aria-label="Twitter">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
            </a>
            <a href="${redes.instagram}" target="_blank" aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                </svg>
            </a>
            <a href="${redes.youtube}" target="_blank" aria-label="YouTube">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
            </a>
        `;
    }
    
    // Año actual
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// ========================================
// UTILIDADES
// ========================================
function showErrorMessage() {
    const sections = ['about-description', 'research-grid', 'team-grid', 'gallery-grid'];
    sections.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.innerHTML = `
                <div class="error-message">
                    <p></p>
                </div>
            `;
        }
    });
}