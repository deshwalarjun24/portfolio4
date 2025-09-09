// Generate placeholder images for portfolio
function generatePortfolioImages() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    if (!portfolioGrid) return;
    
    // Portfolio items data
    const portfolioItems = [
        { id: 1, title: 'Brand Identity', category: 'branding', desc: 'Modern logo and brand guidelines' },
        { id: 2, title: 'Mobile App UI', category: 'ui', desc: 'Fitness tracking application' },
        { id: 3, title: 'Web Design', category: 'ui', desc: 'E-commerce website' },
        { id: 4, title: 'Packaging Design', category: 'graphic', desc: 'Product packaging' },
        { id: 5, title: 'Social Media', category: 'graphic', desc: 'Social media campaign' },
        { id: 6, title: 'Logo Design', category: 'branding', desc: 'Minimalist logo' },
        { id: 7, title: 'Animation', category: 'motion', desc: 'Product animation' },
        { id: 8, title: 'Illustration', category: 'graphic', desc: 'Digital artwork' },
        { id: 9, title: 'UI/UX Design', category: 'ui', desc: 'Dashboard interface' }
    ];
    
    // Generate portfolio items
    portfolioItems.forEach(item => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = `portfolio-item ${item.category} animate-on-scroll`;
        portfolioItem.setAttribute('data-category', item.category);
        
        const colors = [
            '6c63ff', 'ff6584', '20c997', 'ff9f43', '5f27cd', 
            '00d2d3', 'ff9ff3', 'feca57', '1dd1a1', 'ff6b6b'
        ];
        
        const color1 = colors[Math.floor(Math.random() * colors.length)];
        let color2 = colors[Math.floor(Math.random() * colors.length)];
        
        // Ensure we get two different colors
        while (color2 === color1) {
            color2 = colors[Math.floor(Math.random() * colors.length)];
        }
        
        portfolioItem.innerHTML = `
            <div class="portfolio-img">
                <img src="https://via.placeholder.com/600x400/${color1}/${color2}?text=${encodeURIComponent(item.title)}" alt="${item.title}">
                <div class="portfolio-overlay">
                    <h3>${item.title}</h3>
                    <p>${item.desc}</p>
                    <a href="#" class="view-project"><i class="fas fa-search-plus"></i></a>
                </div>
            </div>
        `;
        
        portfolioGrid.appendChild(portfolioItem);
    });
    
    // Initialize lightbox after adding items
    initLightbox();
}

// Initialize lightbox for portfolio items
function initLightbox() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="close-lightbox">&times;</span>
            <img src="" alt="Portfolio Item" class="lightbox-img">
            <div class="lightbox-caption"></div>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
    portfolioItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const imgSrc = item.querySelector('img').src;
            const imgAlt = item.querySelector('img').alt;
            const title = item.querySelector('h3').textContent;
            const desc = item.querySelector('p').textContent;
            
            lightbox.querySelector('.lightbox-img').src = imgSrc;
            lightbox.querySelector('.lightbox-caption').innerHTML = `
                <h3>${title}</h3>
                <p>${desc}</p>
            `;
            
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox
    lightbox.querySelector('.close-lightbox').addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'visible';
    });
    
    // Close when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'visible';
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'visible';
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    generatePortfolioImages();
});
