// ===================================
// DATA LOADER - Carga datos desde JSON
// ===================================

class DataLoader {
    constructor() {
        this.data = null;
    }

    async loadData() {
        try {
            const response = await fetch('assets/data/content.json');
            if (!response.ok) {
                throw new Error('Error al cargar los datos');
            }
            this.data = await response.json();
            return this.data;
        } catch (error) {
            console.error('Error cargando datos:', error);
            return null;
        }
    }

    // Renderizar sección Hero
    renderHero() {
        if (!this.data || !this.data.hero) return;

        const { title, subtitle, image } = this.data.hero;
        
        document.getElementById('hero-title').textContent = title;
        document.getElementById('hero-subtitle').textContent = subtitle;
        
        const heroImage = document.getElementById('hero-image');
        heroImage.src = image;
        heroImage.alt = title;
    }

    // Renderizar sección About
    renderAbout() {
        if (!this.data || !this.data.about) return;

        const { description, video, videoPoster, stats } = this.data.about;
        
        document.getElementById('about-description').textContent = description;
        
        // Video
        const videoElement = document.getElementById('about-video');
        videoElement.querySelector('source').src = video;
        videoElement.poster = videoPoster;
        videoElement.load();
        
        // Estadísticas
        const statsContainer = document.getElementById('about-stats');
        statsContainer.innerHTML = stats.map(stat => `
            <div class="stat">
                <span class="stat__number">${stat.number}</span>
                <span class="stat__label">${stat.label}</span>
            </div>
        `).join('');
    }

    // Renderizar sección Research
    renderResearch() {
        if (!this.data || !this.data.research) return;

        const researchGrid = document.getElementById('research-grid');
        researchGrid.innerHTML = this.data.research.map(item => `
            <div class="research__card">
                <div class="research__icon">${item.icon}</div>
                <h3 class="research__title">${item.title}</h3>
                <p class="research__description">${item.description}</p>
                ${item.points ? `
                    <ul class="research__list">
                        ${item.points.map(point => `<li>${point}</li>`).join('')}
                    </ul>
                ` : ''}
            </div>
        `).join('');
    }

    // Renderizar sección Gallery
    renderGallery() {
        if (!this.data || !this.data.gallery) return;

        const galleryGrid = document.getElementById('gallery-grid');
        galleryGrid.innerHTML = this.data.gallery.items.map((item, index) => {
            if (item.type === 'image') {
                return `
                    <div class="gallery__item" data-type="images" data-index="${index}">
                        <img src="${item.src}" alt="${item.title}">
                        <div class="gallery__overlay">
                            <div>
                                <h3>${item.title}</h3>
                                <p>${item.description}</p>
                            </div>
                        </div>
                    </div>
                `;
            } else if (item.type === 'video') {
                return `
                    <div class="gallery__item" data-type="videos" data-index="${index}">
                        <video poster="${item.poster}">
                            <source src="${item.src}" type="video/mp4">
                        </video>
                        <div class="gallery__play-icon">▶</div>
                        <div class="gallery__overlay">
                            <div>
                                <h3>${item.title}</h3>
                                <p>${item.description}</p>
                            </div>
                        </div>
                    </div>
                `;
            }
        }).join('');
    }

    // Renderizar sección Team
    renderTeam() {
        if (!this.data || !this.data.team) return;

        const teamGrid = document.getElementById('team-grid');
        teamGrid.innerHTML = this.data.team.map(member => `
            <div class="team__card">
                <div class="team__image-wrapper">
                    <img src="${member.image}" alt="${member.name}" class="team__image">
                    <div class="team__overlay">
                        <div class="team__social">
                            ${member.social.email ? `<a href="mailto:${member.social.email}" title="Email">✉️</a>` : ''}
                            ${member.social.linkedin ? `<a href="${member.social.linkedin}" title="LinkedIn" target="_blank">💼</a>` : ''}
                        </div>
                    </div>
                </div>
                <div class="team__info">
                    <h3 class="team__name">${member.name}</h3>
                    <p class="team__role">${member.role}</p>
                    <p class="team__bio">${member.bio}</p>
                    ${member.expertise ? `
                        <div class="team__expertise">
                            ${member.expertise.map(skill => `<span class="team__tag">${skill}</span>`).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }

    // Renderizar sección Contact
    renderContact() {
        if (!this.data || !this.data.contact) return;

        const contactInfo = document.getElementById('contact-info');
        const { address, phone, email, hours } = this.data.contact;
        
        contactInfo.innerHTML = `
            <h3>Información de Contacto</h3>
            ${this.createContactItem(address)}
            ${this.createContactItem(phone)}
            ${this.createContactItem(email)}
            ${this.createContactItem(hours)}
        `;
    }

    createContactItem(item) {
        if (!item) return '';
        
        const isEmail = item.content.includes('@');
        const isPhone = item.content.includes('+');
        
        let content = item.content;
        if (isEmail) {
            content = `<a href="mailto:${item.content}">${item.content}</a>`;
        } else if (isPhone) {
            content = `<a href="tel:${item.content.replace(/\s/g, '')}">${item.content}</a>`;
        }
        
        return `
            <div class="contact__item">
                <div class="contact__icon">${item.icon}</div>
                <div class="contact__details">
                    <h4>${item.title}</h4>
                    <p>${content}</p>
                </div>
            </div>
        `;
    }

    // Renderizar Footer
    renderFooter() {
        if (!this.data || !this.data.footer) return;

        document.getElementById('footer-description').textContent = this.data.footer.description;
        
        const socialContainer = document.getElementById('footer-social');
        socialContainer.innerHTML = this.data.footer.social.map(social => `
            <a href="${social.url}" title="${social.platform}" target="_blank" rel="noopener noreferrer">
                ${social.icon}
            </a>
        `).join('');
        
        // Año actual
        document.getElementById('current-year').textContent = new Date().getFullYear();
    }

    // Inicializar todo
    async init() {
        await this.loadData();
        
        if (this.data) {
            this.renderHero();
            this.renderAbout();
            this.renderResearch();
            this.renderGallery();
            this.renderTeam();
            this.renderContact();
            this.renderFooter();
        }
    }
}

// Instancia global
const dataLoader = new DataLoader();