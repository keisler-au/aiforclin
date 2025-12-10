document.addEventListener('DOMContentLoaded', function () {
	document.addEventListener('click', function (event) {
		var link = event.target.closest('a[href="#memberships"]');
		if (!link) return;

		var targetId = link.getAttribute('href');
		if (!targetId || targetId.charAt(0) !== '#') return;

		var target = document.querySelector(targetId);
		if (!target) return;

		event.preventDefault();
		if (typeof target.scrollIntoView === 'function') {
			target.scrollIntoView({ behavior: 'smooth' });
		} else {
			// Fallback: jump to anchor if smooth scrolling is not supported
			window.location.hash = targetId;
		}
	});
});
