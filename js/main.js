// DOM Elements
const preloader = document.querySelector('.preloader');
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLink = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const backToTop = document.querySelector('.back-to-top');
const yearElement = document.getElementById('year');

// Preloader
window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.classList.add('fade-out');
        document.body.style.overflow = 'visible';
    }, 1500);
});

// Custom Cursor
if (window.innerWidth > 992) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.display = 'block';
        cursorFollower.style.display = 'block';
        
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX - 15 + 'px';
            cursorFollower.style.top = e.clientY - 15 + 'px';
        }, 100);
    });
    
    // Hide cursor when not in viewport
    document.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
    });
    
    // Add hover effect on links
    const hoverElements = ['a', 'button', '.cta-button', '.filter-btn', '.service-card', '.portfolio-item', '.testimonial-nav button', '.back-to-top'];
    
    hoverElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
                cursorFollower.classList.add('cursor-follower-hover');
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
                cursorFollower.classList.remove('cursor-follower-hover');
            });
        });
    });
}

// Mobile Navigation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'visible';
});

// Close mobile menu when clicking on a nav link
navLink.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = 'visible';
    });
});

// Sticky Navigation
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
    
    // Active section in navigation
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 300) {
            current = section.getAttribute('id');
        }
    });
    
    navLink.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
    
    // Back to top button
    if (window.pageYOffset > 500) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

// Back to top
backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Typing Effect
const typedTextSpan = document.querySelector('.typing-text .text');
const cursorSpan = document.querySelector('.typing-text .cursor-blink');
const textArray = ['Graphic Designer', 'UI/UX Designer', 'Brand Designer', 'Creative Thinker'];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        cursorSpan.classList.remove('typing');
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        cursorSpan.classList.remove('typing');
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

// Start the typing effect
if (typedTextSpan) {
    setTimeout(type, newTextDelay + 250);
}

// Portfolio Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s forwards';
                } else {
                    item.style.animation = 'fadeOut 0.5s forwards';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 500);
                }
            });
        });
    });
}

// Portfolio Lightbox
const portfolioImages = document.querySelectorAll('.portfolio-item');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxCaption = document.querySelector('.lightbox-caption');
const closeLightbox = document.querySelector('.close-lightbox');

if (portfolioImages.length > 0) {
    portfolioImages.forEach((item, index) => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            const imgAlt = item.querySelector('img').alt;
            
            lightboxImg.src = imgSrc;
            lightboxCaption.textContent = imgAlt || 'Portfolio Item ' + (index + 1);
            
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'visible';
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'visible';
        }
    });
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'visible';
        }
    });
}

// Testimonial Slider
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const prevTestimonial = document.querySelector('.prev-testimonial');
const nextTestimonial = document.querySelector('.next-testimonial');
const testimonialDots = document.querySelector('.testimonial-dots');
let currentSlide = 0;

// Create dots
if (testimonialSlides.length > 0) {
    testimonialSlides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('testimonial-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        testimonialDots.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.testimonial-dot');
    
    function updateDots() {
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    function goToSlide(n) {
        testimonialSlides[currentSlide].classList.remove('active');
        currentSlide = (n + testimonialSlides.length) % testimonialSlides.length;
        testimonialSlides[currentSlide].classList.add('active');
        updateDots();
    }
    
    // Next slide
    if (nextTestimonial) {
        nextTestimonial.addEventListener('click', () => {
            goToSlide(currentSlide + 1);
        });
    }
    
    // Previous slide
    if (prevTestimonial) {
        prevTestimonial.addEventListener('click', () => {
            goToSlide(currentSlide - 1);
        });
    }
    
    // Auto slide
    let slideInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 5000);
    
    // Pause on hover
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        testimonialSlider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                goToSlide(currentSlide + 1);
            }, 5000);
        });
    }
}

// Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Here you would typically send the form data to a server
        // For this example, we'll just show a success message
        alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon!`);
        contactForm.reset();
    });
}

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Here you would typically send the email to a server
        // For this example, we'll just show a success message
        alert(`Thank you for subscribing with ${email}! You'll hear from us soon.`);
        newsletterForm.reset();
    });
}

// Set current year in footer
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Scroll Reveal Animation
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 1000,
    delay: 200,
    reset: false
});

sr.reveal('.about-img, .about-text', { origin: 'left' });
sr.reveal('.skill-card, .service-card, .portfolio-item, .contact-info, .contact-form', { 
    interval: 200 
});

// Animate on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animated');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to elements
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Initial check for elements in viewport
    animateOnScroll();
    
    // Add animation to hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 500);
    }
    
    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth - e.pageX * 0.5) / 100;
            const y = (window.innerHeight - e.pageY * 0.5) / 100;
            
            hero.style.backgroundPosition = `${x}px ${y}px`;
        });
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 's'
            });
        }
    });
});

// Add animation to section titles
const sectionTitles = document.querySelectorAll('.section-title');
sectionTitles.forEach(title => {
    const text = title.textContent;
    title.innerHTML = '';
    
    for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.textContent = text[i];
        span.style.opacity = '0';
        span.style.display = 'inline-block';
        span.style.transform = 'translateY(20px)';
        span.style.transition = `opacity 0.3s ${i * 0.05}s, transform 0.3s ${i * 0.05}s`;
        
        if (text[i] === ' ') {
            span.style.padding = '0 5px';
        }
        
        title.appendChild(span);
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const spans = entry.target.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.opacity = '1';
                    span.style.transform = 'translateY(0)';
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(title);
});

// Add animation to skill cards
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.5s ${index * 0.1}s, transform 0.5s ${index * 0.1}s`;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    observer.observe(card);
});

// Add animation to service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.5s ${index * 0.1}s, transform 0.5s ${index * 0.1}s`;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    observer.observe(card);
});

// Add animation to portfolio items
const portfolioItemsAnimate = document.querySelectorAll('.portfolio-item');
portfolioItemsAnimate.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'scale(0.9)';
    item.style.transition = `opacity 0.5s ${index * 0.1}s, transform 0.5s ${index * 0.1}s`;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    observer.observe(item);
});
