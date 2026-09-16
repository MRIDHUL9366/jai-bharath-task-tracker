// js/performer.js – Star Performer of the Day Modal (Group 12)
//
// ⚙️ HOW TO CONFIGURE / UPDATE:
//  - enabled: set to true to show popup, false to hide/remove it.

const PERFORMER_OF_THE_DAY = {
  enabled: true, // 💡 Set to false to disable/remove the popup entirely!
  tag: "👑 STAR PERFORMER OF THE DAY",
  groupName: "Group 12",
  taskBadge: "🔥 5 / 5 TASKS COMPLETED (100%)",
  members: ["Ranjusha", "Reniya", "Linsa"],
  message: "Huge congratulations to <strong>Group 12</strong>! They have completed all 5 tasks and captured the <strong>#1 Champion Rank</strong> on the leaderboard with 100% completion rate!",
  highlights: [
    "🏆 5 of 5 Tasks Finished",
    "🥇 Rank #1 Leaderboard Champion",
    "⚡ 100% On-Time Completion Record"
  ],
  buttonText: "🎉 HYPE UP GROUP 12 🚀"
};

// ─── Modal Popup & Confetti Logic ─────────────────────────────────────────────
(function initPerformerPopup() {
  if (!PERFORMER_OF_THE_DAY || !PERFORMER_OF_THE_DAY.enabled) {
    return; // Do nothing if disabled
  }

  // Simple Confetti Generator
  function fireConfetti() {
    const colors = ['#f59e0b', '#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#fbbf24'];
    const count = 40;
    for (let i = 0; i < count; i++) {
      const conf = document.createElement('div');
      conf.style.position = 'fixed';
      conf.style.zIndex = '10000';
      conf.style.width = Math.random() * 8 + 6 + 'px';
      conf.style.height = Math.random() * 8 + 6 + 'px';
      conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      conf.style.left = Math.random() * 100 + 'vw';
      conf.style.top = '-20px';
      conf.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      conf.style.opacity = '1';
      conf.style.pointerEvents = 'none';
      conf.style.transform = `rotate(${Math.random() * 360}deg)`;
      conf.style.transition = `top ${Math.random() * 1.5 + 1.2}s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 1.5s ease, transform 1.5s ease`;
      
      document.body.appendChild(conf);

      requestAnimationFrame(() => {
        conf.style.top = Math.random() * 80 + 20 + 'vh';
        conf.style.opacity = '0';
        conf.style.transform = `rotate(${Math.random() * 720}deg) translateX(${Math.random() * 60 - 30}px)`;
      });

      setTimeout(() => {
        if (conf && conf.parentNode) conf.parentNode.removeChild(conf);
      }, 2500);
    }
  }

  function renderPopup() {
    // Avoid duplicate injections
    if (document.getElementById('performer-modal-overlay')) return;

    // Create modal DOM elements
    const overlay = document.createElement('div');
    overlay.id = 'performer-modal-overlay';
    overlay.className = 'genz-popup-overlay';

    const membersHtml = (PERFORMER_OF_THE_DAY.members || [])
      .map(member => `<span class="champion-member-tag">👤 ${member}</span>`)
      .join('');

    const highlightsHtml = (PERFORMER_OF_THE_DAY.highlights || [])
      .map(item => `<li class="alert-point-item"><span class="point-text">${item}</span></li>`)
      .join('');

    overlay.innerHTML = `
      <div class="genz-popup-card champion-popup-card">
        <!-- Floating Emojis -->
        <span class="genz-floating-emoji emoji-1">👑</span>
        <span class="genz-floating-emoji emoji-2">⭐</span>
        <span class="genz-floating-emoji emoji-3">🔥</span>
        <span class="genz-floating-emoji emoji-4">🏆</span>

        <!-- Close Button -->
        <button class="genz-close-btn" id="close-performer-modal" aria-label="Close">✕</button>

        <!-- Top Badge -->
        <div class="alert-top-badge champion-pulse-badge">
          <span class="alert-pulse-dot"></span>
          ${PERFORMER_OF_THE_DAY.tag}
        </div>

        <!-- Group Title & Achievement Badge -->
        <div class="champion-title-section">
          <div class="champion-group-name">${PERFORMER_OF_THE_DAY.groupName}</div>
          <div>
            <span class="champion-task-badge">${PERFORMER_OF_THE_DAY.taskBadge}</span>
          </div>
        </div>

        <!-- Members Section -->
        <div class="champion-members-section">
          <div class="champion-members-label">🌟 GROUP MEMBERS:</div>
          <div class="champion-members-tags">
            ${membersHtml}
          </div>
        </div>

        <!-- Congratulatory Message -->
        <div class="champion-highlight-box">
          <div class="champion-highlight-text">
            ${PERFORMER_OF_THE_DAY.message}
          </div>
        </div>

        <!-- Key Highlights -->
        <div class="alert-points-section">
          <ul class="alert-points-list champion-points-list">
            ${highlightsHtml}
          </ul>
        </div>

        <!-- Action Button -->
        <button class="genz-action-btn alert-confirm-btn champion-action-btn" id="hype-performer-modal">
          ${PERFORMER_OF_THE_DAY.buttonText}
        </button>
      </div>
    `;

    document.body.appendChild(overlay);

    // Animation trigger
    requestAnimationFrame(() => {
      overlay.classList.add('active');
      fireConfetti();
    });

    // Close logic & hype celebration
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
    if (hypeBtn) {
      hypeBtn.addEventListener('click', () => {
        fireConfetti();
        setTimeout(closeModal, 400);
      });
    }

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
