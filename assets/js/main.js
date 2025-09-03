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
        document.getElementById('form').style.display = 'none';
    } else {
        document.getElementById('form').style.display = 'block';
        document.getElementById('booking-modal-cliniko-1hr').style.display = 'none';
    }
    document.body.style.overflow = 'hidden';
    // Remove any previous status message
    const prevStatus = document.getElementById('email-status');
    if (prevStatus) prevStatus.textContent = '';
    
    // Reset form
    currentStep = 1;
    showStep(1);
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

async function submitForm(token, formData, originalBtnText) {
    formData.append("cf-turnstile-response", token);
    formData.append("email_address", document.getElementById('email').value);
    formData.append("name", document.getElementById('name').value);
    
    try {
        const res = await fetch(EMAIL_API_URL, {
            method: 'POST',
            body: formData,
        });
        if (!res.ok) {
            const errorText = await res.text().catch(() => '');
            throw new Error(errorText || `Request failed (${res.status})`);
        }

        showSendStatus('success', 'Thank you! Your booking request was submitted successfully. We\'ll be in touch shortly.');
    } catch (err) {
        console.error("Error: ", err)
        showSendStatus('error', 'Sorry, there was a problem submitting your request. Please try again later or email david@psychologysquared.com.au');
    } finally {
        const submitBtn = document.getElementById('submit-btn');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText || 'Submit Request';
            document.getElementById("form").reset();
        }
    }
}

function renderTurnstile(formData, originalBtnText) {
    turnstile.remove("#cf-turnstile");
    turnstile.render('#cf-turnstile', {
        sitekey: '0x4AAAAAABx7osAcNS_e9_7w',
        size: 'normal',
        theme: "auto",
        callback: async function (token) {
            await submitForm(token, formData, originalBtnText);
        },
    });
}

async function submitFormContact() {
    const honeypotField = document.getElementById('website');
    if (honeypotField.value) {
        showSendStatus('success', 'Thank you! Your message was submitted successfully. We\'ll be in touch shortly.');
        return;
    }

    const formData = new FormData();
    formData.append("message", JSON.stringify({
        message: document.getElementById('message').value,
        organization: document.getElementById('organization').value
    }));
    
    const submitBtn = document.getElementById('submit-btn');
    let originalBtnText;
    if (submitBtn) {
        submitBtn.disabled = true;
        originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
    }
    renderTurnstile(formData, originalBtnText);
}

async function submitFormBooking() {
    const formData = new FormData();
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
    renderTurnstile(formData);
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
    const linkButtons = document.querySelectorAll('.link-button');
    linkButtons.forEach(button => {
        button.addEventListener('click', (e) => addRippleEffect(button, e), { passive: true });
    });
    
    document.addEventListener('keydown', handleKeyNavigation);
    setupMobileMenu();
});

