// js/performer.js – Performer / Important Notice Popup Modal
//
// ⚙️ HOW TO CONFIGURE / UPDATE:
//  - enabled: set to true to show popup, false to hide/remove it.

const PERFORMER_OF_THE_DAY = {
  enabled: true, // 💡 Set to false to disable/remove the popup entirely!
  badge: "⚠️ ATTENDANCE & SUBMISSION ALERT ⚠️",
  tag: "MANDATORY DEADLINE",
  headline: "Submit All Tasks Before Monday!",
  alertMessage: "Complete and submit all assigned tasks on time before Monday. Failure to submit before the deadline will result in your attendance being marked as ABSENT.",
  reminderPoints: [
    "📅 Complete all pending group tasks on time",
    "⏰ Final cutoff: Before Monday session starts",
    "❌ Late or missing submissions will lead to Absent attendance mark",
    "🚀 Coordinate with your teammates to wrap up early!"
  ],
  buttonText: "I UNDERSTAND & WILL SUBMIT 👍"
};

// ─── Modal Popup Logic ────────────────────────────────────────────────────────
(function initPerformerPopup() {
  if (!PERFORMER_OF_THE_DAY || !PERFORMER_OF_THE_DAY.enabled) {
    return; // Do nothing if disabled
  }

  // Ensure DOM is loaded
  function renderPopup() {
    // Avoid duplicate injections
    if (document.getElementById('performer-modal-overlay')) return;

    // Create modal DOM elements
    const overlay = document.createElement('div');
    overlay.id = 'performer-modal-overlay';
    overlay.className = 'genz-popup-overlay alert-mode';

    const pointsHtml = PERFORMER_OF_THE_DAY.reminderPoints
      .map(point => `<li class="alert-point-item"><span class="point-text">${point}</span></li>`)
      .join('');

    overlay.innerHTML = `
      <div class="genz-popup-card alert-card">
        <!-- Close Button -->
        <button class="genz-close-btn" id="close-performer-modal" aria-label="Close">✕</button>

        <!-- Floating decorative icons -->
        <div class="genz-floating-emoji emoji-1">⚠️</div>
        <div class="genz-floating-emoji emoji-2">⏰</div>
        <div class="genz-floating-emoji emoji-3">📝</div>
        <div class="genz-floating-emoji emoji-4">🚨</div>

        <!-- Alert Badge / Tag -->
        <div class="alert-top-badge">
          <span class="alert-pulse-dot"></span>
          ${PERFORMER_OF_THE_DAY.tag}
        </div>

        <div class="genz-badge alert-header-badge">${PERFORMER_OF_THE_DAY.badge}</div>

        <!-- Headline -->
        <div class="alert-headline-box">
          <h2 class="alert-main-title">${PERFORMER_OF_THE_DAY.headline}</h2>
        </div>

        <!-- Urgent Message Card -->
        <div class="alert-warning-box">
          <div class="alert-warning-icon">📢</div>
          <div class="alert-warning-text">
            <strong>Important Notice:</strong> ${PERFORMER_OF_THE_DAY.alertMessage}
          </div>
        </div>

        <!-- Action points checklist -->
        <div class="alert-points-section">
          <div class="alert-points-label">📌 Submission Guidelines:</div>
          <ul class="alert-points-list">
            ${pointsHtml}
          </ul>
        </div>

        <!-- Action Button -->
        <button class="genz-action-btn alert-confirm-btn" id="hype-performer-modal">
          ${PERFORMER_OF_THE_DAY.buttonText}
        </button>
      </div>
    `;

    document.body.appendChild(overlay);

    // Animation trigger
    requestAnimationFrame(() => {
      overlay.classList.add('active');
    });

    // Close logic
    const closeBtn = document.getElementById('close-performer-modal');
    const hypeBtn = document.getElementById('hype-performer-modal');

    function closeModal() {
      overlay.classList.remove('active');
      setTimeout(() => {
        if (overlay && overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
      }, 350);
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (hypeBtn) hypeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderPopup);
  } else {
    renderPopup();
  }
})();
