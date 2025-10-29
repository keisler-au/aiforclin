window.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const isVerified = params.get("email-verified");

    if (isVerified && isVerified.toLowerCase() === "true") {
        const modal = document.getElementById("email-verified-modal");
        closeBanner();
        if (modal) modal.style.display = "flex";

        const closeBtn = document.getElementById("close-email-verified-modal");
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                modal.style.display = "none";
            });
        }
    }
});