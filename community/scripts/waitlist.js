window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('waitlistForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const waitingMessage = document.getElementById('waitingMessage');
    const contributorCheckbox = document.getElementById('contributorCheckbox');
    const contributorFields = document.getElementById('contributorFields');

    // Toggle contributor fields visibility
    contributorCheckbox.addEventListener('change', function () {
        if (this.checked) {
            contributorFields.classList.add('show');
        } else {
            contributorFields.classList.remove('show');
        }
    });

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        const submitBtn = document.getElementById('submitBtn');
        submitBtn.classList.add('disabled');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Processing...';
        const waitingTImer = setTimeout(() => {
            waitingMessage.classList.add('show');
        }, 5000);
        if (document.getElementById('hp').value) return;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const isContributor = contributorCheckbox.checked;

        const waitlistEntry = {
            name: name,
            email: email,
            phone: phone,
        };
        if (isContributor) {
            waitlistEntry.contributing = true;
            waitlistEntry.profession = document.getElementById('profession').value;
            waitlistEntry.content = document.getElementById('contentType').value;
        }

        try {
            const response = await fetch('https://api.aiforclin.com/circle-waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(waitlistEntry)
            })

            if (response.ok && response.status === 200) {
                form.style.display = 'none';
                waitingMessage.classList.remove('show');
                successMessage.classList.add('show');
                const addressEntered = document.getElementById('address-entered');
                addressEntered.textContent = email;
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.error('Error submitting waitlist entry:', error);
            waitingMessage.classList.remove('show');
            errorMessage.classList.add('show');
        } finally {
            clearTimeout(waitingTImer);
            submitBtn.classList.remove('disabled');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Join the Waitlist';
        }

    });
});