const EMAIL_API_URL_PROD = "https://api.aiforclin.com/contact"
const EMAIL_API_URL_DEV = "http://localhost:10000/contact"
const EMAIL_API_URL = ["localhost", "127.0.0.1", "127.0.0.0", "0.0.0.0"].includes(window.location.hostname) ? EMAIL_API_URL_DEV : EMAIL_API_URL_PROD;

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
    document.getElementById('booking-modal-container').style.display = 'flex';
    if (service === 'consulting') {
        document.getElementById('booking-modal-cliniko-1hr').style.display = 'block';
        document.getElementById('booking-modal-form').style.display = 'none';
    } else {
        document.getElementById('booking-modal-form').style.display = 'block';
        document.getElementById('booking-modal-cliniko-1hr').style.display = 'none';
    }
    document.body.style.overflow = 'hidden';
    // Remove any previous status message
    const prevStatus = document.getElementById('email-status');
    if (prevStatus) prevStatus.textContent = '';
    
    // Reset form
    currentStep = 1;
    showStep(1);
    
    // Adjust form based on service type
    // const groupSizeGroup = document.getElementById('group-size-group');
    // if (service === 'consulting' && type === 'individual') {
    //     groupSizeGroup.style.display = 'none';
    // } else if (service === 'consulting' && type === 'duo') {
    //     groupSizeGroup.style.display = 'none';
    // } else {
    //     groupSizeGroup.style.display = 'block';
    // }
}

function closeBookingForm() {
    document.getElementById('booking-modal-container').style.display = 'none';
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

function showSendStatus(type, message) {
    const status = document.getElementById('email-status');
    if (!status) return;
    status.textContent = message;
    status.style.color = type === 'success' ? '#48bb78' : '#f56565';
}

async function submitForm(formOrigin) {
    const formData = new FormData();
    formData.append("email_address", document.getElementById('email').value);
    formData.append("name", document.getElementById('name').value);
    if (formOrigin === 'contactPage') {
        formData.append("message", JSON.stringify({
            message: document.getElementById('message').value,
            organization: document.getElementById('organization').value
        }));
    } else if (formOrigin === 'bookingPage') {
        formData.append("message", JSON.stringify({
            service: document.getElementById('selected-service').value,
            organization: document.getElementById('organization').value,
            role: document.getElementById('role').value,
            groupSize: document.getElementById('group-size').value,
            preferredDate: document.getElementById('preferred-date').value,
            budget: document.getElementById('budget').value,
            location: document.getElementById('location').value,
            specificTopics: document.getElementById('specific-topics').value,
            additionalInfo: document.getElementById('additional-info').value
        }));
    }
    // Find and disable submit button
    const submitBtn = document.querySelector('#step-4 .form-navigation button.btn:not(.btn-secondary)');
    const originalBtnText = submitBtn ? submitBtn.textContent : '';
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
    }
    
    try {
        // const res = await fetch(EMAIL_API_URL, {
        //     method: 'POST',
        //     body: formData,
        // });

        if (!res.ok) {
            const errorText = await res.text().catch(() => '');
            throw new Error(errorText || `Request failed (${res.status})`);
        }

        showSendStatus('success', 'Thank you! Your booking request was submitted successfully. We\'ll be in touch shortly.');
    } catch (err) {
        console.error('Booking submission error:', err);
        showSendStatus('error', 'Sorry, there was a problem submitting your request. Please try again later or email david@psychologysquared.com.au');
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText || 'Submit Request';
        }
    }
}

// Close modal when clicking outside (guard if element not present)
const bookingModalEl = document.getElementById('booking-modal-container');
if (bookingModalEl) {
    bookingModalEl.addEventListener('click', function(e) {
        if (e.target === this) {
            closeBookingForm();
        }
    });
}

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

    const linkButtons = document.querySelectorAll('.link-button');
    linkButtons.forEach(button => {
        button.addEventListener('click', (e) => addRippleEffect(button, e), { passive: true });
    });
    
    document.addEventListener('keydown', handleKeyNavigation);
});

