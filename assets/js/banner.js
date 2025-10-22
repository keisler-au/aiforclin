function closeBanner() {
    const banner = document.getElementById('waitlistBanner');
    banner.style.opacity = '0';
    banner.style.transform = 'translateX(-50%) translateY(20px)';
    banner.style.transition = 'all 0.3s ease';
    setTimeout(() => {
        banner.style.display = 'none';
    }, 300);
}