// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.name || !data.email || !data.service) {
                alert('Täytä kaikki pakolliset kentät (*)');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Syötä kelvollinen sähköpostiosoite');
                return;
            }

            // Show success message (in a real app, you'd send this to a server)
            alert('Kiitos yhteydenotosta! Otamme sinuun yhteyttä pian.');
            
            // Reset form
            this.reset();
            
            // In a real implementation, you would send the data to your server:
            // fetch('/api/booking', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(data)
            // });
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.service-card, .testimonial-card, .about-text, .books-showcase').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Add hover effects to service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click tracking for analytics (placeholder)
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            console.log(`Button clicked: ${buttonText}`);
            
            // In a real implementation, you would send this to your analytics service:
            // gtag('event', 'click', {
            //     event_category: 'engagement',
            //     event_label: buttonText
            // });
        });
    });

    // Lazy loading for images (if you add images later)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Service card interactive features
    document.querySelectorAll('.service-card').forEach(card => {
        const features = card.querySelector('.service-features');
        const button = document.createElement('button');
        button.textContent = 'Lue lisää';
        button.className = 'btn-secondary';
        button.style.marginTop = '1rem';
        button.style.fontSize = '0.9rem';
        button.style.padding = '8px 16px';
        
        button.addEventListener('click', function() {
            if (features.style.display === 'none') {
                features.style.display = 'block';
                button.textContent = 'Piilota';
            } else {
                features.style.display = 'none';
                button.textContent = 'Lue lisää';
            }
        });
        
        // Initially hide features on mobile
        if (window.innerWidth <= 768) {
            features.style.display = 'none';
            card.appendChild(button);
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        // Close mobile menu on resize
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Additional utility functions
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

