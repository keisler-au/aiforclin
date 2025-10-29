window.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const verifiedId = params.get("email-verified");

    if (verifiedId) {
        const modal = document.getElementById("email-verified-modal");
        closeBanner();
        if (modal) modal.style.display = "flex";
        const closeBtn = document.getElementById("close-email-verified-modal");
        if (closeBtn) closeBtn.addEventListener("click", () => modal.style.display = "none");

        fetch("https://api.aiforclin.com/email-verified?id=" + verifiedId)
            .then(res => res.json())
            .catch(err => console.error(err));
    }
});