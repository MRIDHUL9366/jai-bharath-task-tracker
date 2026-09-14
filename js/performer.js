// js/performer.js – Performer / Important Notice Popup Modal
//
// ⚙️ HOW TO CONFIGURE / UPDATE:
//  - enabled: set to true to show popup, false to hide/remove it.

const PERFORMER_OF_THE_DAY = {
  enabled: true, // 💡 Set to false to disable/remove the popup entirely!
  tag: "🚨 0 TASK • 0 ATTENDANCE ALERT",
  alertMessage: "We are sorry to inform that the following groups have not completed even a single task. Therefore, attendance for the last 4 days classes will not be marked.",
  // Affected groups:
  targetGroups: [
    "Group 5",
    "Group 6",
    "Group 7",
    "Group 8",
    "Group 9",
    "Group 10"
  ],
  reminderPoints: [
    "❌ 0 Tasks Completed across the last 4 classes",
    "📅 0 Attendance granted for the last 4 class days",
    "⚡ Complete and submit all tasks to recover attendance"
  ],
  buttonText: "I UNDERSTAND & WILL SUBMIT"
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
    overlay.className = 'genz-popup-overlay alert-mode red-alert-theme';

    const pointsHtml = PERFORMER_OF_THE_DAY.reminderPoints
      .map(point => `<li class="alert-point-item"><span class="point-text">${point}</span></li>`)
      .join('');

    const groupsHtml = (PERFORMER_OF_THE_DAY.targetGroups || [])
      .map(group => `<span class="alert-group-tag">${group}</span>`)
      .join('');

    overlay.innerHTML = `
      <div class="genz-popup-card alert-card red-alert-card">
        <!-- Close Button -->
        <button class="genz-close-btn" id="close-performer-modal" aria-label="Close">✕</button>

        <!-- Alert Badge / Tag -->
        <div class="alert-top-badge red-pulse-badge">
          <span class="alert-pulse-dot"></span>
          ${PERFORMER_OF_THE_DAY.tag}
        </div>

        <!-- Alert Message Box -->
        <div class="alert-warning-box red-warning-box">
          <div class="alert-warning-text">
            ${PERFORMER_OF_THE_DAY.alertMessage}
          </div>
        </div>

        <!-- Affected Groups List -->
        <div class="alert-affected-groups-section">
          <div class="alert-groups-label">⚠️ AFFECTED GROUPS:</div>
          <div class="alert-groups-tags-container">
            ${groupsHtml}
          </div>
        </div>

        <!-- Action points checklist -->
        <div class="alert-points-section">
          <ul class="alert-points-list">
            ${pointsHtml}
          </ul>
        </div>

        <!-- Action Button -->
        <button class="genz-action-btn alert-confirm-btn red-action-btn" id="hype-performer-modal">
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
