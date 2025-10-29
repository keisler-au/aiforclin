window.addEventListener('DOMContentLoaded', () => {
    // Pricing data
    const pricing = {
        early: {
            annual: 9,
            monthly: 14
        },
        standard: {
            annual: 14,
            monthly: 19
        }
    };

    let currentPricing = 'early';
    let currentBilling = 'annual';

    // Toggle between Early Adopter and Standard pricing
    const toggle = document.getElementById('pricingToggle');
    const deadlineNotice = document.getElementById('deadlineNotice');
    const planTitle = document.getElementById('memberPlanTitle');
    const planBadgeText = document.getElementById('planBadgeText');
    const planBadgeIcon = document.getElementById('planBadgeIcon');

    toggle.addEventListener('click', function () {
        toggle.classList.toggle('standard');

        if (toggle.classList.contains('standard')) {
            currentPricing = 'standard';
            deadlineNotice.style.display = 'none';
            planTitle.textContent = 'Standard';
            planBadgeText.textContent = 'Most Popular';
            planBadgeIcon.textContent = '⭐';
            document.getElementById('planBadge').style.display = 'flex';
        } else {
            currentPricing = 'early';
            deadlineNotice.style.display = 'block';
            planTitle.textContent = 'Early Adopter';
            planBadgeText.textContent = 'Limited Time';
            planBadgeIcon.textContent = '🌟';
            document.getElementById('planBadge').style.display = 'flex';
        }

        updatePrice();
    });

    // Handle billing toggle (Annual/Monthly)
    const billingOptions = document.querySelectorAll('.billing-option');
    billingOptions.forEach(option => {
        option.addEventListener('click', function () {
            billingOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            currentBilling = this.dataset.billing;
            updatePrice();
        });
    });

    // Update price display
    function updatePrice() {
        const priceValue = document.getElementById('priceValue');
        const pricePeriod = document.getElementById('pricePeriod');

        const price = pricing[currentPricing][currentBilling];
        priceValue.textContent = price;
    }

    // Button handlers
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const buttonText = this.textContent;
            console.log(`Button clicked: ${buttonText}`);
            // Add your Circle.so integration here
        });
    });
})
