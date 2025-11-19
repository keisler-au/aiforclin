document.addEventListener('DOMContentLoaded', function () {
    const pricingToggles = document.querySelectorAll('.pricingToggle');
    const priceValues = document.querySelectorAll('.c-feature.featured .price-value, .c-feature.disabled .price-value');
    const priceOriginals = document.querySelectorAll('.price-original');
    // const pricePeriods = document.querySelectorAll('.price-period-annually');
    const toggleContainers = document.querySelectorAll('.c-toggle-container');

    const updatePrices = (isAnnual) => {
        priceOriginals.forEach(original => {
            original.textContent = isAnnual ? original.getAttribute('data-annually') : original.getAttribute('data-monthly');
        });
        priceValues.forEach(price => {
            price.textContent = isAnnual ? price.getAttribute('data-annually') : price.getAttribute('data-monthly');
        });
        // pricePeriods.forEach(period => {
        //     period.textContent = isAnnual ? 'per year' : 'per month';
        // });
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

    // Initialize to default state on page load
    const isInitiallyAnnual = pricingToggles.length > 0 ? pricingToggles[0].checked : false;
    updatePrices(isInitiallyAnnual);
    updateLabels(isInitiallyAnnual);

    pricingToggles.forEach(toggle => {
        toggle.addEventListener('change', function (event) {
            const isChecked = event.target.checked;
            syncToggles(isChecked);
            updatePrices(isChecked);
            updateLabels(isChecked);
        });
    });
});
