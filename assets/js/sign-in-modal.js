(function () {
  const MODAL_DELAY_MS = 10000;
  const containerId = "sign-in-modal-container";
  const deadlineStorageKey = "signInModalDeadlineAt";
  const shownStorageKey = "signInModalShown";

  function getModalElements() {
    const container = document.getElementById(containerId);
    if (!container) return null;
 
    return {
      container,
      closeButton: container.querySelector(".modal-close-btn"),
    };
  }

  function openSignInModal() {
    const modal = getModalElements();
    if (!modal) return;

    modal.container.classList.add("is-open");
    document.body.style.overflow = "hidden";
    sessionStorage.setItem(shownStorageKey, "1");
  }

  function closeSignInModal() {
    const modal = getModalElements();
    if (!modal) return;

    modal.container.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  function setupSignInModal() {
    const modal = getModalElements();
    if (!modal || sessionStorage.getItem(shownStorageKey) === "1") return;

    modal.closeButton?.addEventListener("click", closeSignInModal);

    modal.container.addEventListener("click", (event) => {
      if (event.target === modal.container) {
        closeSignInModal();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal.container.classList.contains("is-open")) {
        closeSignInModal();
      }
    });

    const now = Date.now();
    let deadline = Number(sessionStorage.getItem(deadlineStorageKey));

    if (!Number.isFinite(deadline) || deadline <= 0) {
      deadline = now + MODAL_DELAY_MS;
      sessionStorage.setItem(deadlineStorageKey, String(deadline));
    }

    const remaining = Math.max(0, deadline - now);
    window.setTimeout(openSignInModal, remaining);
  }

  window.openSignInModal = openSignInModal;
  window.closeSignInModal = closeSignInModal;
  document.addEventListener("DOMContentLoaded", setupSignInModal);
})();
