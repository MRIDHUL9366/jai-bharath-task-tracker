// js/app.js – Group Task Race  (auto-computed from data.js)
// You only need to edit data.js:
//   • Add tasks to TASKS[]
//   • Add completed task ids to each group''s completedTasks[]
// Everything below auto-reacts to those changes.

/* ─────────────────────────────────────────────
   Auto-derivation helpers
───────────────────────────────────────────── */

const $ = (id) => document.getElementById(id);

// Every task id from the TASKS array (all groups participate in all tasks)
function allTaskIds() {
  return TASKS.map((t) => t.id);
}

// Look up a task object by id
function getTask(id) {
  return TASKS.find((t) => t.id === id);
}

// Completion percentage for a group (completedTasks / total tasks)
function completionPct(group) {
  const total = TASKS.length;
  if (!total) return 0;
  return Math.round((group.completedTasks.length / total) * 100);
}

// Completed task count for a group
function completedCount(group) {
  return group.completedTasks.length;
}

// Groups sorted by tasks completed (descending)
function sortedGroups() {
  return [...GROUPS].sort(
    (a, b) => b.completedTasks.length - a.completedTasks.length
  );
}

// Pending tasks for a group (assigned but not completed)
function pendingTasks(group) {
  return allTaskIds().filter((id) => !group.completedTasks.includes(id));
}

/* ─────────────────────────────────────────────
   Navigation
───────────────────────────────────────────── */
const SECTIONS = ["dashboard", "groups", "tasks"];

function switchSection(target) {
  SECTIONS.forEach((s) => $(s).classList.toggle("hidden", s !== target));
  document.querySelectorAll(".nav-btn").forEach((btn) =>
    btn.classList.toggle("active", btn.dataset.section === target)
  );
}

document.querySelectorAll(".nav-btn").forEach((btn) =>
  btn.addEventListener("click", () => switchSection(btn.dataset.section))
);

/* ─────────────────────────────────────────────
   Dashboard – Summary Cards
   Auto-derives: group count, task count
───────────────────────────────────────────── */
function renderSummaryCards() {
  const groupsDone = GROUPS.filter((g) => g.completedTasks.length === TASKS.length).length;

  const cards = [
    { icon: "👥", value: GROUPS.length, label: "Groups" },
    { icon: "📋", value: TASKS.length, label: "Tasks" }
  ];

  $("summary-cards").innerHTML = cards
    .map(
      (c) => `
    <div class="summary-card">
      <div class="icon">${c.icon}</div>
      <div class="number">${c.value}</div>
      <div class="label">${c.label}</div>
    </div>`
    )
    .join("");
}

/* ─────────────────────────────────────────────
   Dashboard – Leaderboard
   Auto-derives: rank, task counts, completion %
───────────────────────────────────────────── */
function renderLeaderboard() {
  const ranked = sortedGroups();
  const medals = ["🥇", "🥈", "🥉"];

  const rows = ranked
    .map(
      (g, i) => `
    <tr>
      <td class="col-rank">${medals[i] || (i + 1)}</td>
      <td class="col-group">
        <div class="group-cell">
          <span class="group-color-dot" style="background:${g.color};"></span>
          <span class="group-name-text">${g.name}</span>
        </div>
      </td>
      <td class="col-completion">${completionPct(g)}%</td>
    </tr>`
    )
    .join("");

  $("leaderboard").innerHTML = `
    <div class="card">
      <p class="section-heading">🏆 Batch Standings & Rankings</p>
      <table class="leaderboard-table">
        <thead>
          <tr>
            <th class="col-rank">#</th>
            <th class="col-group">Group</th>
            <th class="col-completion">Completion</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

/* ─────────────────────────────────────────────
   Dashboard – Progress Bars
   Auto-derives: bar width from completionPct
───────────────────────────────────────────── */
function renderProgressBars() {
  const bars = GROUPS.map(
    (g) => `
    <div class="progress-item">
      <div class="progress-label">
        <span>${g.avatar} ${g.name}</span>
        <span>${g.completedTasks.length} / ${TASKS.length}</span>
      </div>
      <div class="progress-bar">
        <div class="progress-bar-inner"
             data-width="${completionPct(g)}"
             style="background:${g.color};"></div>
      </div>
    </div>`
  ).join("");

  $("progress-bars").innerHTML = `
    <div class="card">
      <p class="section-heading">📊 Task Completion Progress</p>
      ${bars}
    </div>`;

  requestAnimationFrame(() => {
    document.querySelectorAll(".progress-bar-inner").forEach((el) => {
      el.style.width = el.dataset.width + "%";
    });
  });
}

/* ─────────────────────────────────────────────
   Groups Section
   Auto-derives: completion status, task counts
───────────────────────────────────────────── */
function renderGroupCards(filter = "") {
  const filtered = GROUPS.filter(
    (g) =>
      g.name.toLowerCase().includes(filter.toLowerCase()) ||
      g.members.some((m) => m.toLowerCase().includes(filter.toLowerCase()))
  );

  if (!filtered.length) {
    $("group-cards").innerHTML = `<p style="color:var(--muted);grid-column:1/-1;">No groups match your search.</p>`;
    return;
  }

  $("group-cards").innerHTML = filtered
    .map((g) => {
      const pct = completionPct(g);
      const done = g.completedTasks.length;
      const total = TASKS.length;
      const statusColor = pct === 100 ? "#10b981" : done > 0 ? "#f59e0b" : "#e63946";
      const statusLabel = pct === 100 ? "✅ All Done" : done > 0 ? `🔄 ${done}/${total}` : "⏳ Pending";
      const memberList = g.members.map((m) => `<li>${m}</li>`).join("");

      return `
      <div class="card group-card" style="border-top:4px solid ${g.color};">
        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;gap:0.5rem;">
            <h3>${g.avatar} ${g.name}</h3>
            <span style="background:${statusColor}20;color:${statusColor};border:1px solid ${statusColor}55;
                         font-size:0.72rem;font-weight:700;padding:2px 8px;border-radius:50px;white-space:nowrap;">
              ${statusLabel}
            </span>
          </div>
          <p style="font-size:0.82rem;color:var(--muted);margin:0.3rem 0;">${g.members.length} members</p>
          <div class="progress-bar" style="margin:0.6rem 0;">
            <div class="progress-bar-inner" style="background:${g.color};width:${pct}%;transition:none;"></div>
          </div>
          <p style="font-size:0.78rem;color:var(--primary);">${pct}% tasks completed (${done}/${total})</p>
          <ul>${memberList}</ul>
        </div>
        <button class="details-btn" data-group-id="${g.id}">View Details</button>
      </div>`;
    })
    .join("");

  document.querySelectorAll(".details-btn").forEach((btn) =>
    btn.addEventListener("click", () => openModal(Number(btn.dataset.groupId)))
  );
}

$("group-search").addEventListener("input", (e) => renderGroupCards(e.target.value));

/* ─────────────────────────────────────────────
   Tasks Section – Unique Task Cards
   Shows task number, date, title, and centered download button (Task 7 onwards)
───────────────────────────────────────────── */
function renderTaskList() {
  const headerHtml = `
    <div class="task-timeline-header">
      <h2 class="task-timeline-title">📋 Task Timeline</h2>
      <p class="task-timeline-subtitle">Django Full Stack Development — Daily Task Progress</p>
    </div>`;

  const cardsHtml = TASKS.map((t, index) => {
    const dueDate = new Date(t.dueDate);
    const dayNum = dueDate.toLocaleDateString("en-IN", { day: "2-digit" });
    const monthName = dueDate.toLocaleDateString("en-IN", { month: "short" });
    const yearNum = dueDate.toLocaleDateString("en-IN", { year: "numeric" });
    const dateFormatted = `${dayNum} ${monthName} ${yearNum}`;

    const taskNum = String(t.id).padStart(2, '0');

    // Download button: ONLY for tasks with a non-empty downloadUrl string (Task 7 onwards)
    const hasDownloadUrl = typeof t.downloadUrl === 'string' && t.downloadUrl.trim().length > 0;
    
    const downloadBtnHtml = hasDownloadUrl ? `
      <div class="task-card-action-center">
        <button class="task-download-btn-centered"
          onclick="window.open('${t.downloadUrl}', '_blank')"
          title="Download Task ${t.id} Word File (.docx)">
          <span class="download-icon">📥</span>
          <span class="download-text">Download Task ${t.id} Plan (.docx)</span>
        </button>
      </div>` : '';

    return `
      <div class="task-card" style="--card-delay: ${index * 0.07}s">
        <div class="task-card-accent"></div>
        <div class="task-card-inner">
          <div class="task-card-header">
            <span class="task-number-badge">Task ${taskNum}</span>
            <span class="task-date-badge">📅 ${dateFormatted}</span>
          </div>
          <h3 class="task-card-title">${t.title}</h3>
          ${downloadBtnHtml}
        </div>
      </div>`;
  }).join("");

  $("task-list").innerHTML = headerHtml + cardsHtml;
}

/* ─────────────────────────────────────────────
   Group Detail Modal
   Auto-derives: all tasks, which are done/pending
───────────────────────────────────────────── */
function openModal(groupId) {
  const g = GROUPS.find((gr) => gr.id === groupId);
  if (!g) return;

  const taskRows = TASKS.map((t) => {
    const done = g.completedTasks.includes(t.id);
    const due = new Date(t.dueDate).toLocaleDateString("en-IN", {
      day: "2-digit", month: "short", year: "numeric"
    });
    return `
      <tr>
        <td>${done ? "✅" : "⏳"}</td>
        <td>${t.title}</td>
        <td>${due}</td>
      </tr>`;
  }).join("");

  const memberPills = g.members
    .map(
      (m) =>
        `<span style="display:inline-block;background:#edf6f9;border:1px solid var(--secondary);
                      color:var(--primary-d);padding:3px 10px;border-radius:50px;
                      margin:2px;font-size:0.82rem;">👤 ${m}</span>`
    )
    .join("");

  $("modal-content").innerHTML = `
    <div style="border-top:4px solid ${g.color};padding-top:1.2rem;">
      <h2 style="font-size:1.5rem;font-weight:800;color:var(--primary-d);margin-bottom:0.3rem;">${g.avatar} ${g.name}</h2>
      <p style="color:var(--muted);margin-bottom:1.2rem;font-size:0.88rem;">
        ${g.members.length} members &nbsp;•&nbsp;
        ${g.completedTasks.length} / ${TASKS.length} tasks done &nbsp;•&nbsp;
        ${completionPct(g)}% complete
      </p>

      <p style="font-size:0.72rem;color:var(--primary);text-transform:uppercase;
                letter-spacing:0.08em;font-weight:700;margin-bottom:0.6rem;">👥 Members</p>
      <div style="margin-bottom:1.2rem;display:flex;flex-wrap:wrap;gap:0.4rem;">${memberPills}</div>

      <p style="font-size:0.72rem;color:var(--primary);text-transform:uppercase;
                letter-spacing:0.08em;font-weight:700;margin-bottom:0.6rem;">📋 All Tasks</p>
      <table class="leaderboard-table">
        <thead><tr><th>Status</th><th>Task</th><th>Due Date</th></tr></thead>
        <tbody>${taskRows}</tbody>
      </table>

      <div style="margin-top:1.2rem;">
        <div class="progress-bar" style="height:10px;">
          <div class="progress-bar-inner"
               style="background:${g.color};width:${completionPct(g)}%;transition:width 0.7s ease;"></div>
        </div>
        <p style="font-size:0.8rem;color:var(--muted);margin-top:0.4rem;">
          ${g.completedTasks.length} of ${TASKS.length} tasks completed
        </p>
      </div>
    </div>`;

  $("modal-overlay").classList.remove("hidden");
}

function closeModal() {
  $("modal-overlay").classList.add("hidden");
}

$("modal-close").addEventListener("click", closeModal);
$("modal-overlay").addEventListener("click", (e) => {
  if (e.target === $("modal-overlay")) closeModal();
});

/* ─────────────────────────────────────────────
   Boot
───────────────────────────────────────────── */
function init() {
  renderSummaryCards();
  renderLeaderboard();
  renderProgressBars();
  renderGroupCards();
  renderTaskList();
}

document.addEventListener("DOMContentLoaded", init);
