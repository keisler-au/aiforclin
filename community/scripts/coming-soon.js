window.addEventListener("DOMContentLoaded", function() {
        // Button click handler
        document.getElementById('feedbackBtn').addEventListener('click', function(e) {
            // Replace with your feedback form or discussion link
            console.log('Feedback button clicked');
        });

        // Add parallax effect to background pattern
        window.addEventListener('scroll', function() {
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

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.feature').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });
})