window.addEventListener('DOMContentLoaded', function () {
    // Smooth scroll for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Button click handlers (customize these URLs for your Circle.so community)
    document.getElementById('joinBtn').addEventListener('click', function (e) {
        // Replace with your Circle.so community join URL
        // e.preventDefault();
        // window.location.href = 'https://your-community.circle.so/join';
        console.log('Join button clicked');
    });

    document.getElementById('learnMoreBtn').addEventListener('click', function (e) {
        // Replace with your Circle.so community about page or main site
        // e.preventDefault();
        // window.location.href = 'https://your-community.circle.so/about';
        console.log('Learn more button clicked');
    });

    // Add parallax effect to background pattern
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const pattern = document.querySelector('.background-pattern');
        if (pattern) {
            pattern.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature, .benefit-item').forEach(el => {
        observer.observe(el);
    });
})