function closeBanner() {
    const banner = document.getElementById("waitlistBanner");
    if (banner) {
        banner.style.display = "none";
        localStorage.setItem("bannerClosed", "true");
    }
}