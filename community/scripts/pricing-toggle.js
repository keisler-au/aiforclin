document.addEventListener('DOMContentLoaded', function () {
    const pricingToggles = document.querySelectorAll('.pricingToggle');
    const priceValues = document.querySelectorAll('.price-value');
    const pricePeriods = document.querySelectorAll('.price-period-annually');
    const toggleContainers = document.querySelectorAll('.c-toggle-container');

    const updatePrices = (isAnnual) => {
        priceValues.forEach(price => {
            price.textContent = isAnnual ? price.getAttribute('data-annually') : price.getAttribute('data-monthly');
        });
        pricePeriods.forEach(period => {
            period.textContent = isAnnual ? 'per year' : 'per month';
        });
    };

    const updateLabels = (isAnnual) => {
        toggleContainers.forEach(container => {
            const labels = container.querySelectorAll('.c-toggle-label');
            if (labels.length >= 2) {
                // First label is "Monthly", second is "Annually"
                labels[0].classList.toggle('active', !isAnnual);
                labels[1].classList.toggle('active', isAnnual);
            }
        });
    };

    const syncToggles = (isChecked) => {
        pricingToggles.forEach(toggle => {
            if (toggle.checked !== isChecked) {
                toggle.checked = isChecked;
            }
        });
    };

    // Initialize labels on page load
    updateLabels(false);

    pricingToggles.forEach(toggle => {
        toggle.addEventListener('change', function (event) {
            const isChecked = event.target.checked;
            syncToggles(isChecked);
            updatePrices(isChecked);
            updateLabels(isChecked);
        });
    });
});
