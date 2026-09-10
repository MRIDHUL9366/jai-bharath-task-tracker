// js/performer.js – Performer of the Day Configuration & Popup Modal
//
// ⚙️ HOW TO CONFIGURE / UPDATE DAILY:
//  - enabled: set to true to show popup, false to hide/remove it.
//  - groupName: The winning / highlight group (e.g. "Group 3")
//  - title: Gen-Z badge / title
//  - members: List of member names
//  - shoutout: Gen-Z hype message / tagline
//  - date: Date string for the celebration

const PERFORMER_OF_THE_DAY = {
  enabled: true, // 💡 Set to false to disable/remove the popup entirely!
  batch: "Batch 2",
  groupName: "Group 2",
  badge: "⚡ UNSTOPPABLE CHAMPIONS ⚡",
  subtitle: "Top Performer Spotlight",
  date: "Today's Feature",
  members: ["Amos", "Akshay K", "Abhinav Krishna KV", "Abiprasad", "Nandhana", "Sanjay ps"],
  shoutout: "Pure dominance! 🚀🔥 Crushing milestones with unmatched teamwork and lightning speed! Keep setting the bar high! 🌟💯"
};

// ─── Gen-Z Performer Popup Logic ─────────────────────────────────────────────
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
    overlay.className = 'genz-popup-overlay';

    const memberTagsHtml = PERFORMER_OF_THE_DAY.members
      .map((name, i) => `<span class="genz-member-tag" style="animation-delay: ${0.08 * (i + 1)}s">✨ ${name}</span>`)
      .join('');

    overlay.innerHTML = `
      <div class="genz-popup-card">
        <!-- Close Button -->
        <button class="genz-close-btn" id="close-performer-modal" aria-label="Close">✕</button>

        <!-- Floating decorative emojis -->
        <div class="genz-floating-emoji emoji-1">⚡</div>
        <div class="genz-floating-emoji emoji-2">👑</div>
        <div class="genz-floating-emoji emoji-3">✨</div>
        <div class="genz-floating-emoji emoji-4">🔥</div>

        <!-- Batch Mention -->
        <div class="genz-batch-badge">🎓 ${PERFORMER_OF_THE_DAY.batch}</div>

        <!-- Banner Header -->
        <div class="genz-badge">${PERFORMER_OF_THE_DAY.badge}</div>
        <div class="genz-subhead">${PERFORMER_OF_THE_DAY.subtitle} • ${PERFORMER_OF_THE_DAY.date}</div>

        <!-- Group Champion Title -->
        <div class="genz-group-spotlight">
          <h2 class="genz-group-title">${PERFORMER_OF_THE_DAY.groupName}</h2>
        </div>

        <!-- Members Grid -->
        <div class="genz-members-section">
          <div class="genz-members-label">🏆 THE SQUAD:</div>
          <div class="genz-members-list">
            ${memberTagsHtml}
          </div>
        </div>

        <!-- Shoutout / Vibe -->
        <div class="genz-shoutout-box">
          "${PERFORMER_OF_THE_DAY.shoutout}"
        </div>

        <!-- Action Button -->
        <button class="genz-action-btn" id="hype-performer-modal">
          LET'S GOOO! 🔥
        </button>
      </div>
    `;

    document.body.appendChild(overlay);

    // Animation trigger
    requestAnimationFrame(() => {
      overlay.classList.add('active');
      triggerConfetti();
    });

    // Optional lightweight Gen-Z celebratory confetti burst
    function triggerConfetti() {
      const colors = ['#ff007f', '#7928ca', '#00f2fe', '#ffd166', '#ff4b2b'];
      for (let i = 0; i < 28; i++) {
        const conf = document.createElement('div');
        conf.className = 'genz-confetti-particle';
        conf.style.left = Math.random() * 90 + 5 + '%';
        conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        conf.style.animationDuration = (Math.random() * 1.5 + 1.2) + 's';
        conf.style.animationDelay = (Math.random() * 0.3) + 's';
        overlay.appendChild(conf);
      }
    }

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
