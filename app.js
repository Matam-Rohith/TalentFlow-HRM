/**
 * ==========================================================================
 * TALENTFLOW HRM — IMPROVED APPLICATION ENGINE
 * New: Dark/Light mode, CSV export, Analytics charts, Sorting,
 *      Bulk select, Confirm dialog, Activity feed, Funnel view
 * ==========================================================================
 */

let state = {
    candidates: [],
    currentView: 'dashboard',
    filters: { searchQuery: '', status: 'All', sort: 'newest' },
    pendingDeleteId: null
};

const STAGES = ['Applied', 'Screening', 'Interview', 'Offered', 'Hired', 'Rejected'];

const STAGE_COLORS = {
    Applied: '#3b82f6', Screening: '#a855f7', Interview: '#eab308',
    Offered: '#06b6d4', Hired: '#10b981', Rejected: '#ef4444'
};

const SEED_DATA = [
    { id:"c1", fullName:"Arjun Mehta", email:"arjun.mehta@devmail.io", phone:"+91 98450 12345", roleApplied:"Senior Frontend Architect", recruiterName:"Matam Rohith", status:"Interview", experience:"6", interviewDate:"2026-06-10", notes:"Deep technical skill in functional JavaScript.", createdAt: Date.now() - 86400000*3 },
    { id:"c2", fullName:"Priya Sharma", email:"priya.s@techcorp.com", phone:"+91 91100 54321", roleApplied:"UI/UX Engineer", recruiterName:"Matam Rohith", status:"Offered", experience:"4", interviewDate:"2026-06-05", notes:"Outstanding portfolio with enterprise SaaS layouts.", createdAt: Date.now() - 86400000*2 },
    { id:"c3", fullName:"Kiran Kumar", email:"kiran.k@cloudnet.in", phone:"+91 88990 11223", roleApplied:"Full Stack Developer", recruiterName:"Ananya Rao", status:"Hired", experience:"3", interviewDate:"2026-05-28", notes:"Cleared all system design rounds. Node.js expert.", createdAt: Date.now() - 86400000*5 },
    { id:"c4", fullName:"Sneha Reddy", email:"sneha.reddy@infotech.com", phone:"+91 77665 44332", roleApplied:"Product Designer", recruiterName:"Matam Rohith", status:"Screening", experience:"2", interviewDate:"", notes:"Reviewing Figma documentation profiles.", createdAt: Date.now() - 86400000*1 },
    { id:"c5", fullName:"Rahul Verma", email:"rahul.v@startup.io", phone:"+91 99001 22334", roleApplied:"Backend Engineer", recruiterName:"Ananya Rao", status:"Applied", experience:"5", interviewDate:"", notes:"Strong Go and Kubernetes background.", createdAt: Date.now() - 86400000*0.5 },
    { id:"c6", fullName:"Meera Nair", email:"meera.n@corp.com", phone:"+91 81234 56789", roleApplied:"Data Scientist", recruiterName:"Matam Rohith", status:"Rejected", experience:"4", interviewDate:"2026-05-20", notes:"Good ML skills but salary expectation mismatch.", createdAt: Date.now() - 86400000*7 }
];

// Charts references
let statusChartInstance = null;
let expChartInstance = null;

// ─── INIT ──────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    initStorage();
    registerEvents();
    setCurrentDate();
    renderAll();
});

function initStorage() {
    const stored = localStorage.getItem('talentflow_v2');
    state.candidates = stored ? JSON.parse(stored) : [...SEED_DATA];
    if (!stored) syncStorage();
}

function syncStorage() {
    localStorage.setItem('talentflow_v2', JSON.stringify(state.candidates));
}

// ─── EVENTS ────────────────────────────────────────────────────────────────

function registerEvents() {
    // Modal
    document.getElementById('openModalBtn').addEventListener('click', () => openModal());
    document.getElementById('closeModalBtn').addEventListener('click', closeModal);
    document.getElementById('cancelModalBtn').addEventListener('click', closeModal);
    document.getElementById('candidateModal').addEventListener('click', e => { if (e.target === document.getElementById('candidateModal')) closeModal(); });
    document.getElementById('candidateForm').addEventListener('submit', handleSubmit);

    // Search
    document.getElementById('globalSearch').addEventListener('input', e => {
        state.filters.searchQuery = e.target.value.toLowerCase().trim();
        renderAll();
    });

    // Filters
    document.getElementById('statusFilter').addEventListener('change', e => { state.filters.status = e.target.value; renderAll(); });
    document.getElementById('sortFilter').addEventListener('change', e => { state.filters.sort = e.target.value; renderAll(); });

    // Nav
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', e => {
            e.preventDefault();
            const view = item.getAttribute('data-view');
            if (view) switchView(view);
        });
    });

    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('darkModeToggle').addEventListener('change', e => {
        document.documentElement.setAttribute('data-theme', e.target.checked ? 'dark' : 'light');
        updateThemeIcon();
    });

    // Export
    document.getElementById('exportBtn').addEventListener('click', exportCSV);
    document.getElementById('exportSettingsBtn')?.addEventListener('click', exportCSV);

    // Select all
    document.getElementById('selectAll').addEventListener('change', e => {
        document.querySelectorAll('.row-checkbox').forEach(cb => cb.checked = e.target.checked);
    });

    // Confirm dialog
    document.getElementById('confirmCancel').addEventListener('click', () => {
        document.getElementById('confirmOverlay').classList.add('hidden');
        state.pendingDeleteId = null;
    });
    document.getElementById('confirmDelete').addEventListener('click', () => {
        if (state.pendingDeleteId) {
            state.candidates = state.candidates.filter(c => c.id !== state.pendingDeleteId);
            syncStorage();
            showToast('Candidate removed from pool.', 'danger');
            renderAll();
        }
        document.getElementById('confirmOverlay').classList.add('hidden');
        state.pendingDeleteId = null;
    });

    // Sidebar toggle (mobile)
    document.getElementById('sidebarToggle').addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('open');
    });
}

// ─── THEME ────────────────────────────────────────────────────────────────

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    document.getElementById('darkModeToggle').checked = next === 'dark';
    updateThemeIcon();
}

function updateThemeIcon() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.getElementById('themeToggle').innerHTML = isDark ? '<i class="ri-sun-line"></i>' : '<i class="ri-moon-line"></i>';
}

// ─── ROUTING ──────────────────────────────────────────────────────────────

function switchView(viewName) {
    state.currentView = viewName;
    document.querySelectorAll('.menu-item').forEach(i => {
        i.classList.toggle('active', i.getAttribute('data-view') === viewName);
    });
    document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active-view'));
    document.getElementById(`view-${viewName}`)?.classList.add('active-view');
    renderAll();

    // Close sidebar on mobile
    if (window.innerWidth < 900) document.getElementById('sidebar').classList.remove('open');
}

// ─── RENDER ───────────────────────────────────────────────────────────────

function renderAll() {
    const filtered = getFiltered();
    renderMetrics();
    renderBadges();
    renderTable(filtered);
    renderPipeline();
    renderInterviews();
    renderActivity();
    renderAnalytics();
    updateTableFooter(filtered);
}

function setCurrentDate() {
    const el = document.getElementById('currentDate');
    if (el) el.textContent = new Date().toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
}

// ─── FILTERS ──────────────────────────────────────────────────────────────

function getFiltered() {
    let list = state.candidates.filter(c => {
        const matchStatus = state.filters.status === 'All' || c.status === state.filters.status;
        const q = state.filters.searchQuery;
        const matchSearch = !q || c.fullName.toLowerCase().includes(q) || c.roleApplied.toLowerCase().includes(q) || c.recruiterName.toLowerCase().includes(q);
        return matchStatus && matchSearch;
    });

    if (state.filters.sort === 'name') list.sort((a,b) => a.fullName.localeCompare(b.fullName));
    else if (state.filters.sort === 'experience') list.sort((a,b) => parseInt(b.experience) - parseInt(a.experience));
    else list.sort((a,b) => (b.createdAt || 0) - (a.createdAt || 0));

    return list;
}

// ─── METRICS ──────────────────────────────────────────────────────────────

function renderMetrics() {
    const d = state.candidates;
    animateCount('statTotal', d.length);
    animateCount('statInterview', d.filter(c => c.status === 'Interview').length);
    animateCount('statOffered', d.filter(c => c.status === 'Offered').length);
    animateCount('statHired', d.filter(c => c.status === 'Hired').length);
}

function animateCount(id, target) {
    const el = document.getElementById(id);
    if (!el) return;
    const current = parseInt(el.textContent) || 0;
    if (current === target) return;
    const step = target > current ? 1 : -1;
    let val = current;
    const t = setInterval(() => {
        val += step;
        el.textContent = val;
        if (val === target) clearInterval(t);
    }, 30);
}

function renderBadges() {
    const totalBadge = document.getElementById('totalBadge');
    const intBadge = document.getElementById('interviewBadge');
    if (totalBadge) totalBadge.textContent = state.candidates.length;
    if (intBadge) intBadge.textContent = state.candidates.filter(c => c.status === 'Interview').length;
}

// ─── TABLE ────────────────────────────────────────────────────────────────

function renderTable(list) {
    const tbody = document.getElementById('candidateTableBody');
    const emptyState = document.getElementById('emptyState');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (list.length === 0) {
        emptyState?.classList.remove('hidden');
        return;
    }
    emptyState?.classList.add('hidden');

    list.forEach(c => {
        const tr = document.createElement('tr');
        const initials = c.fullName.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();
        tr.innerHTML = `
            <td><input type="checkbox" class="row-checkbox" data-id="${c.id}"></td>
            <td>
                <div class="candidate-profile-cell">
                    <div class="candidate-initials">${initials}</div>
                    <div>
                        <div class="candidate-meta-name">${esc(c.fullName)}</div>
                        <div class="candidate-meta-email">${esc(c.email)}</div>
                    </div>
                </div>
            </td>
            <td><span style="font-weight:500;">${esc(c.roleApplied)}</span></td>
            <td>${c.experience} yrs</td>
            <td><span style="color:var(--color-text-muted);font-size:0.85rem;">${esc(c.recruiterName)}</span></td>
            <td>${c.interviewDate ? formatDate(c.interviewDate) : '<span style="color:var(--color-text-darker)">—</span>'}</td>
            <td><span class="status-pill ${c.status.toLowerCase()}">${c.status}</span></td>
            <td>
                <div class="actions-cell-wrapper">
                    <button class="action-btn edit" onclick="openModal('${c.id}')" title="Edit"><i class="ri-pencil-line"></i></button>
                    <button class="action-btn delete" onclick="confirmDelete('${c.id}')" title="Delete"><i class="ri-delete-bin-line"></i></button>
                </div>
            </td>`;
        tbody.appendChild(tr);
    });
}

function updateTableFooter(filtered) {
    const el = document.getElementById('tableFooter');
    if (el) el.textContent = `Showing ${filtered.length} of ${state.candidates.length} candidates`;
}

// ─── PIPELINE ─────────────────────────────────────────────────────────────

function renderPipeline() {
    const container = document.getElementById('pipelineStages');
    if (!container) return;
    container.innerHTML = '';

    STAGES.forEach(stage => {
        const count = state.candidates.filter(c => c.status === stage).length;
        const card = document.createElement('div');
        card.className = 'pipeline-stage-card';
        card.style.setProperty('--stage-color', STAGE_COLORS[stage]);
        card.innerHTML = `<div class="pipeline-stage-name">${stage}</div><div class="pipeline-stage-count">${count}</div>`;
        container.appendChild(card);
    });

    // Funnel
    const funnelEl = document.getElementById('funnelBars');
    if (!funnelEl) return;
    funnelEl.innerHTML = '';
    const total = state.candidates.length || 1;
    STAGES.forEach(stage => {
        const count = state.candidates.filter(c => c.status === stage).length;
        const pct = Math.round((count / total) * 100);
        funnelEl.innerHTML += `
            <div class="funnel-row">
                <div class="funnel-label">${stage}</div>
                <div class="funnel-bar-track">
                    <div class="funnel-bar-fill" style="width:${pct}%;background:${STAGE_COLORS[stage]};">${count > 0 ? count : ''}</div>
                </div>
                <div class="funnel-count">${count}</div>
            </div>`;
    });
}

// ─── INTERVIEWS ───────────────────────────────────────────────────────────

function renderInterviews() {
    const timeline = document.getElementById('interviewTimelineList');
    if (!timeline) return;
    timeline.innerHTML = '';

    const scheduled = state.candidates
        .filter(c => c.interviewDate)
        .sort((a,b) => new Date(a.interviewDate) - new Date(b.interviewDate));

    if (scheduled.length === 0) {
        timeline.innerHTML = `<li style="color:var(--color-text-muted);padding:1rem;font-size:0.9rem;">No interviews scheduled yet.</li>`;
        return;
    }

    const today = new Date(); today.setHours(0,0,0,0);
    scheduled.forEach(c => {
        const d = new Date(c.interviewDate);
        const isPast = d < today;
        const li = document.createElement('li');
        li.className = `interview-item${isPast ? ' past' : ''}`;
        li.innerHTML = `
            <div>
                <div class="interview-name">${esc(c.fullName)}</div>
                <div class="interview-role">${esc(c.roleApplied)}</div>
                <div class="interview-recruiter">Recruiter: ${esc(c.recruiterName)}</div>
            </div>
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:0.5rem;">
                <span class="status-pill interview"><i class="ri-calendar-line"></i> ${formatDate(c.interviewDate)}</span>
                ${isPast ? '<span style="font-size:0.75rem;color:var(--color-text-darker);">Completed</span>' : '<span style="font-size:0.75rem;color:var(--status-hired);">Upcoming</span>'}
            </div>`;
        timeline.appendChild(li);
    });
}

// ─── ACTIVITY FEED ────────────────────────────────────────────────────────

function renderActivity() {
    const list = document.getElementById('activityList');
    if (!list) return;
    list.innerHTML = '';

    const recent = [...state.candidates]
        .sort((a,b) => (b.createdAt||0) - (a.createdAt||0))
        .slice(0, 5);

    if (recent.length === 0) {
        list.innerHTML = '<li style="color:var(--color-text-muted);font-size:0.875rem;">No recent activity.</li>';
        return;
    }

    recent.forEach(c => {
        const li = document.createElement('li');
        li.className = 'activity-item';
        const ago = timeAgo(c.createdAt);
        li.innerHTML = `
            <div class="activity-dot ${c.status.toLowerCase()}"></div>
            <span><strong>${esc(c.fullName)}</strong> — ${esc(c.roleApplied)} marked as <strong>${c.status}</strong></span>
            <span class="activity-time">${ago}</span>`;
        list.appendChild(li);
    });
}

// ─── ANALYTICS ────────────────────────────────────────────────────────────

function renderAnalytics() {
    if (state.currentView !== 'analytics') return;

    // Status doughnut chart
    const ctx1 = document.getElementById('statusChart');
    if (ctx1) {
        const labels = STAGES;
        const data = STAGES.map(s => state.candidates.filter(c => c.status === s).length);
        if (statusChartInstance) statusChartInstance.destroy();
        statusChartInstance = new Chart(ctx1, {
            type: 'doughnut',
            data: {
                labels,
                datasets: [{ data, backgroundColor: Object.values(STAGE_COLORS), borderWidth: 0, hoverOffset: 6 }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'right', labels: { color: getComputedStyle(document.documentElement).getPropertyValue('--color-text-muted').trim(), font: { size: 12 }, boxWidth: 12 } }
                }
            }
        });
    }

    // Experience bar chart
    const ctx2 = document.getElementById('expChart');
    if (ctx2) {
        const buckets = {'0–2 yrs':0, '3–5 yrs':0, '6–10 yrs':0, '10+ yrs':0};
        state.candidates.forEach(c => {
            const e = parseInt(c.experience)||0;
            if (e <= 2) buckets['0–2 yrs']++;
            else if (e <= 5) buckets['3–5 yrs']++;
            else if (e <= 10) buckets['6–10 yrs']++;
            else buckets['10+ yrs']++;
        });
        if (expChartInstance) expChartInstance.destroy();
        expChartInstance = new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: Object.keys(buckets),
                datasets: [{ label: 'Candidates', data: Object.values(buckets), backgroundColor: 'rgba(99,102,241,0.7)', borderRadius: 8, borderSkipped: false }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { ticks: { color: '#9ca3af' }, grid: { display: false } },
                    y: { ticks: { color: '#9ca3af', stepSize: 1 }, grid: { color: 'rgba(255,255,255,0.05)' } }
                }
            }
        });
    }

    // Recruiter leaderboard
    const leaderboard = document.getElementById('recruiterLeaderboard');
    if (leaderboard) {
        const counts = {};
        state.candidates.forEach(c => { counts[c.recruiterName] = (counts[c.recruiterName]||0)+1; });
        const sorted = Object.entries(counts).sort((a,b)=>b[1]-a[1]);
        const max = sorted[0]?.[1] || 1;
        leaderboard.innerHTML = sorted.map(([name, count]) => `
            <div class="recruiter-row">
                <span class="recruiter-name">${esc(name)}</span>
                <div class="recruiter-bar"><div class="recruiter-bar-fill" style="width:${(count/max)*100}%"></div></div>
                <span class="recruiter-count">${count}</span>
            </div>`).join('');
    }
}

// ─── MODAL ────────────────────────────────────────────────────────────────

window.openModal = function(id = null) {
    const modal = document.getElementById('candidateModal');
    document.getElementById('candidateForm').reset();

    if (id) {
        document.getElementById('modalTitle').textContent = 'Edit Candidate';
        const c = state.candidates.find(x => x.id === id);
        if (c) {
            document.getElementById('candidateId').value = c.id;
            document.getElementById('fullName').value = c.fullName;
            document.getElementById('email').value = c.email;
            document.getElementById('phone').value = c.phone;
            document.getElementById('roleApplied').value = c.roleApplied;
            document.getElementById('experience').value = c.experience;
            document.getElementById('recruiterName').value = c.recruiterName;
            document.getElementById('status').value = c.status;
            document.getElementById('interviewDate').value = c.interviewDate;
            document.getElementById('notes').value = c.notes;
        }
    } else {
        document.getElementById('modalTitle').textContent = 'Add New Candidate';
        document.getElementById('candidateId').value = '';
    }
    modal.classList.add('open');
};

function closeModal() { document.getElementById('candidateModal').classList.remove('open'); }

function handleSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('candidateId').value;
    const data = {
        fullName: document.getElementById('fullName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        roleApplied: document.getElementById('roleApplied').value.trim(),
        experience: document.getElementById('experience').value.trim(),
        recruiterName: document.getElementById('recruiterName').value.trim(),
        status: document.getElementById('status').value,
        interviewDate: document.getElementById('interviewDate').value,
        notes: document.getElementById('notes').value.trim(),
    };

    if (!data.fullName || !data.email || !data.phone || !data.roleApplied || !data.experience || !data.recruiterName) {
        showToast('Please fill all required fields.', 'danger'); return;
    }

    if (id) {
        const idx = state.candidates.findIndex(c => c.id === id);
        if (idx !== -1) state.candidates[idx] = { ...state.candidates[idx], ...data };
        showToast('Candidate updated successfully.');
    } else {
        state.candidates.unshift({ id: 'id_' + Date.now(), ...data, createdAt: Date.now() });
        showToast('New candidate added to pool.');
    }

    syncStorage();
    closeModal();
    renderAll();
}

// ─── DELETE ───────────────────────────────────────────────────────────────

window.confirmDelete = function(id) {
    state.pendingDeleteId = id;
    document.getElementById('confirmOverlay').classList.remove('hidden');
};

// ─── EXPORT CSV ───────────────────────────────────────────────────────────

function exportCSV() {
    const headers = ['Name','Email','Phone','Role','Experience','Recruiter','Status','Interview Date','Notes'];
    const rows = state.candidates.map(c => [
        c.fullName, c.email, c.phone, c.roleApplied,
        c.experience + ' yrs', c.recruiterName, c.status,
        c.interviewDate || '', c.notes || ''
    ].map(v => `"${String(v).replace(/"/g,'""')}"`).join(','));
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'talentflow_candidates.csv'; a.click();
    URL.revokeObjectURL(url);
    showToast('Exported to CSV!', 'info');
}

// ─── TOAST ────────────────────────────────────────────────────────────────

function showToast(msg, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icon = type === 'danger' ? 'ri-error-warning-fill' : type === 'info' ? 'ri-information-fill' : 'ri-checkbox-circle-fill';
    toast.innerHTML = `<i class="${icon}"></i><span>${msg}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 50);
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 400); }, 4000);
}

// ─── UTILS ────────────────────────────────────────────────────────────────

function esc(str = '') {
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function formatDate(ds) {
    if (!ds) return '';
    return new Date(ds).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' });
}

function timeAgo(ts) {
    if (!ts) return '';
    const diff = Date.now() - ts;
    const m = Math.floor(diff / 60000);
    if (m < 1) return 'just now';
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h/24)}d ago`;
}
