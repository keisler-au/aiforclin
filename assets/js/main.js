function openBookingForm(service, type) {
    selectedService = service;
    selectedType = type;
    
    const serviceNames = {
        'speaking': {
            'general': 'Speaking Engagement (Pricing varies by group size)'
        },
        'consulting': {
            'general': 'AI Consultation (Individual or Duo)'
        },
        'company': {
            'product-review': 'Product Review ($770 Inc GST)',
            'ongoing-assistance': 'Ongoing Assistance ($1,000-2,000/month)'
        }
    };
    
    document.getElementById('selected-service').value = serviceNames[service][type];
    document.getElementById('booking-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Reset form
    currentStep = 1;
    showStep(1);
    
    // Adjust form based on service type
    const groupSizeGroup = document.getElementById('group-size-group');
    if (service === 'consulting' && type === 'individual') {
        groupSizeGroup.style.display = 'none';
    } else if (service === 'consulting' && type === 'duo') {
        groupSizeGroup.style.display = 'none';
    } else {
        groupSizeGroup.style.display = 'block';
    }
}

function closeBookingForm() {
    document.getElementById('booking-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showStep(step) {
    document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
    document.getElementById('step-' + step).classList.add('active');
    currentStep = step;
}

function nextStep() {
    if (currentStep < 4) {
        // Basic validation
        if (currentStep === 1) {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            if (!name || !email) {
                alert('Please fill in all required fields.');
                return;
            }
        }
        
        showStep(currentStep + 1);
    }
}

function prevStep() {
    if (currentStep > 1) {
        showStep(currentStep - 1);
    }
}

function submitForm() {
    // Collect form data
    const formData = {
        service: document.getElementById('selected-service').value,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        organization: document.getElementById('organization').value,
        role: document.getElementById('role').value,
        groupSize: document.getElementById('group-size').value,
        preferredDate: document.getElementById('preferred-date').value,
        budget: document.getElementById('budget').value,
        location: document.getElementById('location').value,
        specificTopics: document.getElementById('specific-topics').value,
        additionalInfo: document.getElementById('additional-info').value
    };
    
    // Here you would normally send the data to your backend
    // For now, we'll create a mailto link
    const subject = encodeURIComponent(`Booking Request: ${formData.service}`);
    const body = encodeURIComponent(`
        Name: ${formData.name}
        Email: ${formData.email}
        Organization: ${formData.organization}
        Role: ${formData.role}
        Group Size: ${formData.groupSize}
        Preferred Date(s): ${formData.preferredDate}
        Budget Range: ${formData.budget}
        Location/Format: ${formData.location}
        Specific Topics: ${formData.specificTopics}
        Additional Information: ${formData.additionalInfo}

        Service Requested: ${formData.service}
    `);
    
    window.location.href = `mailto:david@aiforclin.com?subject=${subject}&body=${body}`;
    
    // Close modal
    closeBookingForm();
    
    // Show success message
    alert('Thank you for your booking request! Your email client should open with a pre-filled message. Please send it to complete your booking request.');
}

// Close modal when clicking outside (guard if element not present)
const bookingModalEl = document.getElementById('booking-modal');
if (bookingModalEl) {
    bookingModalEl.addEventListener('click', function(e) {
        if (e.target === this) {
            closeBookingForm();
        }
    });
}

    // Contact form handler
const handleContactForm = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get('name') || '';
    const email = formData.get('email') || '';
    const organization = formData.get('organization') || '';
    const message = formData.get('message') || '';
    
    const subject = encodeURIComponent('Contact Form: ' + name + ' from ' + organization);
    const body = encodeURIComponent(
        'Name: ' + name + 
        '\nEmail: ' + email + 
        '\nOrganization: ' + organization + 
        '\n\nMessage:\n' + message
    );
    
    window.open('mailto:david@psychologysquared.com.au?subject=' + subject + '&body=' + body, '_blank');
};

// Setup mobile hamburger menu
const setupMobileMenu = () => {
    const menuButton = document.getElementById('mobile-menu-button');
    const primaryNav = document.getElementById('primary-nav');
    if (!menuButton || !primaryNav) return;

    // Toggle on button click
    menuButton.addEventListener('click', () => {
        const expanded = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', String(!expanded));
        primaryNav.hidden = expanded;
    });

    // Close menu on link click (mobile only)
    primaryNav.querySelectorAll('a.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                primaryNav.hidden = true;
                menuButton.setAttribute('aria-expanded', 'false');
            }
        });
    });
};

// (removed legacy toggleMobileMenu)

// Close mobile menu on resize
const handleResize = () => {
    const primaryNav = document.getElementById('primary-nav');
    const menuButton = document.getElementById('mobile-menu-button');
    if (!primaryNav || !menuButton) return;

    if (window.innerWidth >= 768) {
        // Ensure desktop state
        primaryNav.hidden = false;
        menuButton.setAttribute('aria-expanded', 'true');
    } else {
        // Ensure mobile collapsed state by default
        primaryNav.hidden = true;
        menuButton.setAttribute('aria-expanded', 'false');
    }
};

let currentStep = 1;
let selectedService = '';
let selectedType = '';

function toggleSection(sectionId) {
    const content = document.getElementById(sectionId + '-content');
    const icon = document.getElementById(sectionId + '-icon');
    
    if (content.classList.contains('expanded')) {
        content.classList.remove('expanded');
        icon.textContent = '▼';
    } else {
        // Close all other sections
        document.querySelectorAll('.service-content').forEach(section => {
            section.classList.remove('expanded');
        });
        document.querySelectorAll('.expand-icon').forEach(icon => {
            icon.textContent = '▼';
        });
        
        // Open selected section
        content.classList.add('expanded');
        icon.textContent = '▲';
    }
}



// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeBookingForm();
    }
});

const addPassiveEventListener = (element, event, handler) => {
    element.addEventListener(event, handler, { passive: true });
};

const handleIframeResize = () => {
    const iframe = document.getElementById('comparisonTable');
    if (!iframe) return;

    const messageHandler = (event) => {                
        if (event.data && event.data.type === 'resize' && typeof event.data.height === 'number') {
            const height = Math.min(Math.max(event.data.height, 400), 2000); // Clamp height
            iframe.style.height = `${height}px`;
        }
    };

    window.addEventListener('message', messageHandler);
    
    return () => window.removeEventListener('message', messageHandler);
};

const handleIframeError = () => {
    const iframe = document.getElementById('comparisonTable');
    if (!iframe) return;

    iframe.addEventListener('error', () => {
        const container = iframe.parentElement;
        const errorMsg = document.createElement('div');
        errorMsg.innerHTML = `
            <p style="color: #666; text-align: center; padding: 2rem;">
                Unable to load comparison table. Please <a href="table.html" style="color: var(--primary-color);">view it directly</a>.
            </p>
        `;
        container.replaceChild(errorMsg, iframe);
    });
};

const enhanceFocusManagement = () => {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });

    addPassiveEventListener(document, 'mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });
};

const init = () => {
    handleIframeResize();
    handleIframeError();
    enhanceFocusManagement();
    setupMobileMenu();
    handleResize();
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

const handleKeyNavigation = (event) => {
    const links = Array.from(document.querySelectorAll('.link-button'));
    const currentIndex = links.indexOf(document.activeElement);
    
    switch(event.key) {
        case 'ArrowDown':
            if (currentIndex < links.length - 1) {
                event.preventDefault();
                links[currentIndex + 1].focus();
            }
            break;
        case 'ArrowUp':
            if (currentIndex > 0) {
                event.preventDefault();
                links[currentIndex - 1].focus();
            }
            break;
        case 'Enter':
        case ' ':
            if (document.activeElement.classList.contains('link-button')) {
                event.preventDefault();
                document.activeElement.click();
            }
            break;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('resize', handleResize);
    
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    const linkButtons = document.querySelectorAll('.link-button');
    linkButtons.forEach(button => {
        button.addEventListener('click', (e) => addRippleEffect(button, e), { passive: true });
    });
    
    document.addEventListener('keydown', handleKeyNavigation);
    // Initialize responsive state after content is ready
    handleResize();
});

