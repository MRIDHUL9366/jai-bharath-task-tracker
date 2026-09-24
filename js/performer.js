// js/performer.js – Daily Task Announcement Modal
//
// ⚙️ DAILY ANNOUNCEMENT CONFIGURATION:
// ═══════════════════════════════════════════════════════════════════════════════════════
//  - enabled: set to true to show popup, false to hide it.
//  - tag: Announcement badge header text
//  - title: Task title
//  - taskBadge: Date / release badge
//  - message: Announcement message text HTML
//  - highlights: Key bullet points
//  - buttonText: Action button label (closes modal)
// ═══════════════════════════════════════════════════════════════════════════════════════

const DAILY_ANNOUNCEMENT = {
  enabled: true, // 💡 Set to false to disable/hide popup completely!
  tag: "📢 IMPORTANT TASK ANNOUNCEMENT",
  title: "Task 7 & Task 8 Deadline Notice",
  taskBadge: "📅 Due Date: Saturday (26th)",
  message: "Dear Students, please complete <strong>Task 7 and Task 8</strong> before <strong>Saturday (26th)</strong>. Kindly check Google Drive for reference videos and check the Task Console to get your Task Word document.",
  highlights: [
    "⏳ Complete Task 7 & Task 8 before Saturday (26th)",
    "🎥 Check Google Drive for reference videos",
    "📄 Check Task Console to get the Task Word document"
  ],
  buttonText: "Got It! I'll Complete 🚀"
};

// ─── Modal Popup Logic ────────────────────────────────────────────────────────
(function initDailyTaskPopup() {
  if (!DAILY_ANNOUNCEMENT || !DAILY_ANNOUNCEMENT.enabled) {
    return; // Do nothing if disabled
  }

  function renderPopup() {
    if (document.getElementById('task-modal-overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'task-modal-overlay';
    overlay.className = 'genz-popup-overlay';

    const highlightsHtml = (DAILY_ANNOUNCEMENT.highlights || [])
      .map(item => `<li class="alert-point-item"><span class="point-text">${item}</span></li>`)
      .join('');

    overlay.innerHTML = `
      <div class="genz-popup-card champion-popup-card">
        <!-- Floating Emojis -->
        <span class="genz-floating-emoji emoji-1">📋</span>
        <span class="genz-floating-emoji emoji-2">🚀</span>
        <span class="genz-floating-emoji emoji-3">⚡</span>
        <span class="genz-floating-emoji emoji-4">✨</span>

        <!-- Close Button -->
        <button class="genz-close-btn" id="close-task-modal" aria-label="Close">✕</button>

        <!-- Top Badge -->
        <div class="alert-top-badge champion-pulse-badge">
          <span class="alert-pulse-dot"></span>
          ${DAILY_ANNOUNCEMENT.tag}
        </div>

        <!-- Task Title Section -->
        <div class="champion-title-section" style="text-align: center; margin: 0.6rem 0;">
          <h2 style="font-size: 1.25rem; font-weight: 800; color: var(--primary-d); margin: 0 0 0.4rem 0;">
            ${DAILY_ANNOUNCEMENT.title}
          </h2>
          <div>
            <span class="champion-task-badge">${DAILY_ANNOUNCEMENT.taskBadge}</span>
          </div>
        </div>

        <!-- Announcement Message -->
        <div class="champion-highlight-box" style="margin: 0.8rem 0;">
          <div class="champion-highlight-text" style="font-size: 0.88rem; line-height: 1.5; color: var(--text);">
            ${DAILY_ANNOUNCEMENT.message}
          </div>
        </div>

        <!-- Key Highlights -->
        <div class="alert-points-section">
          <ul class="alert-points-list champion-points-list">
            ${highlightsHtml}
          </ul>
        </div>

        <!-- Action Button -->
        <button class="genz-action-btn alert-confirm-btn champion-action-btn" id="confirm-task-modal" style="margin-top: 0.8rem;">
          ${DAILY_ANNOUNCEMENT.buttonText}
        </button>
      </div>
    `;

    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      overlay.classList.add('active');
    });

    const closeBtn = document.getElementById('close-task-modal');
    const confirmBtn = document.getElementById('confirm-task-modal');

    function closeModal() {
      overlay.classList.remove('active');
      setTimeout(() => {
        if (overlay && overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
      }, 350);
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (confirmBtn) confirmBtn.addEventListener('click', closeModal);

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
