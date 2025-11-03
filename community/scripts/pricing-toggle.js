document.addEventListener('DOMContentLoaded', function () {
    const pricingToggles = document.querySelectorAll('.pricingToggle');
    const priceValues = document.querySelectorAll('.price-value');
    const pricePeriods = document.querySelectorAll('.price-period-annually');

    const updatePrices = (isAnnual) => {
        priceValues.forEach(price => {
            price.textContent = isAnnual ? price.getAttribute('data-annually') : price.getAttribute('data-monthly');
        });
        pricePeriods.forEach(period => {
            period.textContent = isAnnual ? 'per year' : 'per month';
        });
    };

    const syncToggles = (isChecked) => {
        pricingToggles.forEach(toggle => {
            if (toggle.checked !== isChecked) {
                toggle.checked = isChecked;
            }
        });
    };

    pricingToggles.forEach(toggle => {
        toggle.addEventListener('change', function (event) {
            const isChecked = event.target.checked;
            syncToggles(isChecked);
            updatePrices(isChecked);
        });
    });
});
