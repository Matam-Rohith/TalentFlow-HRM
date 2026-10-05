/**
 * ==========================================================================
 * TALENTFLOW HRMS & ATS — CORE APPLICATION ENGINE
 * Enterprise-grade recruitment workflow, Kanban board, assessment scheduler,
 * analytics engine, and applicant tracking.
 * ==========================================================================
 */

// Application State
const state = {
    candidates: [],
    currentView: 'dashboard',
    pipelineMode: 'kanban',
    interviewTab: 'all',
    filters: {
        searchQuery: '',
        department: 'All',
        status: 'All',
        sort: 'newest',
        sortColumn: 'createdAt',
        sortDirection: 'desc',
        page: 1,
        pageSize: 10
    },
    selectedIds: new Set(),
    workspace: {
        recruiterName: 'Matam Rohith',
        recruiterRole: 'Senior Recruiter',
        companyName: 'TalentFlow Enterprise'
    },
    notifications: [],
    activeDrawerCandidateId: null,
    pendingConfirm: null
};

const STAGES = ['Applied', 'Screening', 'Interview', 'Offered', 'Hired', 'Rejected'];

const STAGE_COLORS = {
    Applied: '#3b82f6',
    Screening: '#8b5cf6',
    Interview: '#f59e0b',
    Offered: '#06b6d4',
    Hired: '#10b981',
    Rejected: '#f43f5e'
};

const DEPARTMENTS = ['Engineering', 'Design', 'Product', 'Data', 'Operations', 'Marketing'];

// Seed Data with realistic enterprise applicant profiles
const SEED_DATA = [
    {
        id: "c-101",
        fullName: "Arjun Mehta",
        email: "arjun.mehta@devmail.io",
        phone: "+91 98450 12345",
        roleApplied: "Senior Frontend Architect",
        department: "Engineering",
        recruiterName: "Matam Rohith",
        status: "Interview",
        experience: 6,
        interviewDate: "2026-10-08",
        interviewTime: "14:30",
        interviewType: "System Architecture",
        interviewLink: "https://meet.google.com/xyt-qopz-abc",
        notes: "Deep technical skill in React, TypeScript, and micro-frontends. Clear communicator.",
        createdAt: Date.now() - 86400000 * 2,
        history: [
            { date: Date.now() - 86400000 * 2, text: "Application submitted for Senior Frontend Architect" },
            { date: Date.now() - 86400000 * 1.5, text: "Passed HR resume screening" },
            { date: Date.now() - 86400000 * 0.5, text: "Scheduled System Architecture interview for Oct 8" }
        ]
    },
    {
        id: "c-102",
        fullName: "Priya Sharma",
        email: "priya.s@techcorp.com",
        phone: "+91 91100 54321",
        roleApplied: "Staff UI/UX Designer",
        department: "Design",
        recruiterName: "Matam Rohith",
        status: "Offered",
        experience: 5,
        interviewDate: "2026-09-28",
        interviewTime: "11:00",
        interviewType: "Final Offer Discussion",
        interviewLink: "https://meet.google.com/des-port-xyz",
        notes: "Outstanding design systems portfolio. Strong cross-functional alignment with engineering.",
        createdAt: Date.now() - 86400000 * 8,
        history: [
            { date: Date.now() - 86400000 * 8, text: "Application submitted" },
            { date: Date.now() - 86400000 * 5, text: "Design portfolio review passed" },
            { date: Date.now() - 86400000 * 1, text: "Formal offer package extended" }
        ]
    },
    {
        id: "c-103",
        fullName: "Kiran Kumar",
        email: "kiran.k@cloudnet.in",
        phone: "+91 88990 11223",
        roleApplied: "Full Stack Engineer",
        department: "Engineering",
        recruiterName: "Ananya Rao",
        status: "Hired",
        experience: 4,
        interviewDate: "2026-09-20",
        interviewTime: "15:00",
        interviewType: "Leadership Review",
        interviewLink: "",
        notes: "Cleared all technical rounds with high ratings. Accepted offer, joining next month.",
        createdAt: Date.now() - 86400000 * 15,
        history: [
            { date: Date.now() - 86400000 * 15, text: "Application received" },
            { date: Date.now() - 86400000 * 7, text: "Offer letter generated" },
            { date: Date.now() - 86400000 * 2, text: "Offer accepted. Candidate marked as Hired." }
        ]
    },
    {
        id: "c-104",
        fullName: "Sneha Reddy",
        email: "sneha.reddy@infotech.com",
        phone: "+91 77665 44332",
        roleApplied: "Lead Product Designer",
        department: "Design",
        recruiterName: "Matam Rohith",
        status: "Screening",
        experience: 3,
        interviewDate: "",
        interviewTime: "",
        interviewType: "",
        interviewLink: "",
        notes: "Evaluating candidate design samples and experience with enterprise SaaS dashboards.",
        createdAt: Date.now() - 86400000 * 1.2,
        history: [
            { date: Date.now() - 86400000 * 1.2, text: "Application received via career portal" },
            { date: Date.now() - 86400000 * 0.4, text: "Assigned to Matam Rohith for initial screening" }
        ]
    },
    {
        id: "c-105",
        fullName: "Rahul Verma",
        email: "rahul.v@startup.io",
        phone: "+91 99001 22334",
        roleApplied: "Backend Platform Engineer",
        department: "Engineering",
        recruiterName: "Ananya Rao",
        status: "Applied",
        experience: 5,
        interviewDate: "",
        interviewTime: "",
        interviewType: "",
        interviewLink: "",
        notes: "Strong Go, PostgreSQL, and Kubernetes background from cloud infrastructure startup.",
        createdAt: Date.now() - 86400000 * 0.6,
        history: [
            { date: Date.now() - 86400000 * 0.6, text: "Submitted application for Backend Platform Engineer" }
        ]
    },
    {
        id: "c-106",
        fullName: "Meera Nair",
        email: "meera.n@corp.com",
        phone: "+91 81234 56789",
        roleApplied: "Senior Data Scientist",
        department: "Data",
        recruiterName: "Matam Rohith",
        status: "Interview",
        experience: 4,
        interviewDate: "2026-10-09",
        interviewTime: "16:00",
        interviewType: "Technical Assessment",
        interviewLink: "https://meet.google.com/dat-scie-rnd",
        notes: "Strong ML modeling and statistical background. Preparing technical case interview.",
        createdAt: Date.now() - 86400000 * 4,
        history: [
            { date: Date.now() - 86400000 * 4, text: "Application received" },
            { date: Date.now() - 86400000 * 2, text: "Scheduled Technical Assessment interview" }
        ]
    },
    {
        id: "c-107",
        fullName: "Vikram Malhotra",
        email: "vikram.m@fintech.co",
        phone: "+91 97654 32109",
        roleApplied: "Group Product Manager",
        department: "Product",
        recruiterName: "Matam Rohith",
        status: "Screening",
        experience: 7,
        interviewDate: "",
        interviewTime: "",
        interviewType: "",
        interviewLink: "",
        notes: "Experienced PM with payments and checkout optimization track record.",
        createdAt: Date.now() - 86400000 * 3.5,
        history: [
            { date: Date.now() - 86400000 * 3.5, text: "Application submitted" }
        ]
    },
    {
        id: "c-108",
        fullName: "Ayesha Siddiqui",
        email: "ayesha.s@cloudops.net",
        phone: "+91 93456 78901",
        roleApplied: "Site Reliability Engineer",
        department: "Operations",
        recruiterName: "Ananya Rao",
        status: "Applied",
        experience: 3,
        interviewDate: "",
        interviewTime: "",
        interviewType: "",
        interviewLink: "",
        notes: "Experience managing multi-region AWS and Terraform infrastructure.",
        createdAt: Date.now() - 86400000 * 1,
        history: [
            { date: Date.now() - 86400000 * 1, text: "Application received" }
        ]
    },
    {
        id: "c-109",
        fullName: "Devraj Sengupta",
        email: "devraj.s@analytica.io",
        phone: "+91 92345 67890",
        roleApplied: "Data Engineer",
        department: "Data",
        recruiterName: "Matam Rohith",
        status: "Rejected",
        experience: 2,
        interviewDate: "2026-09-15",
        interviewTime: "10:00",
        interviewType: "Initial Screening",
        interviewLink: "",
        notes: "Candidate has strong potential but position requires distributed streaming experience.",
        createdAt: Date.now() - 86400000 * 12,
        history: [
            { date: Date.now() - 86400000 * 12, text: "Application submitted" },
            { date: Date.now() - 86400000 * 9, text: "Status updated to Rejected (Experience criteria)" }
        ]
    }
];

// Active Chart.js instances
let statusChartInstance = null;
let expChartInstance = null;
let deptChartInstance = null;

// ─── INITIALIZATION ────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initStorage();
    registerEventHandlers();
    setCurrentDate();
    renderAll();
});

function initTheme() {
    const savedTheme = localStorage.getItem('talentflow_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const darkToggle = document.getElementById('darkModeToggle');
    if (darkToggle) darkToggle.checked = savedTheme === 'dark';
    updateThemeIcon();
}

function initStorage() {
    try {
        const storedCandidates = localStorage.getItem('talentflow_candidates_v3');
        if (storedCandidates) {
            state.candidates = JSON.parse(storedCandidates);
        } else {
            // Seed defaults
            state.candidates = [...SEED_DATA];
            syncStorage();
        }

        const storedWorkspace = localStorage.getItem('talentflow_workspace');
        if (storedWorkspace) {
            state.workspace = JSON.parse(storedWorkspace);
        }

        // Apply workspace details to UI
        updateWorkspaceUI();

        // Seed initial notifications
        initNotifications();
    } catch (e) {
        console.error('Storage initialization failed, resetting to seed data:', e);
        state.candidates = [...SEED_DATA];
        syncStorage();
    }
}

function syncStorage() {
    try {
        localStorage.setItem('talentflow_candidates_v3', JSON.stringify(state.candidates));
        localStorage.setItem('talentflow_workspace', JSON.stringify(state.workspace));
    } catch (e) {
        console.warn('LocalStorage quota or access issue:', e);
    }
}

function updateWorkspaceUI() {
    const nameEl = document.getElementById('sidebarUserName');
    const roleEl = document.getElementById('sidebarUserRole');
    const avatarEl = document.getElementById('sidebarAvatar');
    const inputName = document.getElementById('settingsRecruiterName');
    const inputRole = document.getElementById('settingsRecruiterRole');
    const inputCompany = document.getElementById('settingsCompanyName');

    if (nameEl) nameEl.textContent = state.workspace.recruiterName;
    if (roleEl) roleEl.textContent = state.workspace.recruiterRole;
    if (avatarEl) {
        avatarEl.textContent = state.workspace.recruiterName
            .split(' ')
            .map(n => n[0])
            .join('')
            .substring(0, 2)
            .toUpperCase() || 'TF';
    }

    if (inputName) inputName.value = state.workspace.recruiterName;
    if (inputRole) inputRole.value = state.workspace.recruiterRole;
    if (inputCompany) inputCompany.value = state.workspace.companyName;
}

function initNotifications() {
    state.notifications = [
        { id: "n1", text: "New application received from Rahul Verma (Backend Platform Engineer)", time: Date.now() - 3600000 * 2 },
        { id: "n2", text: "Interview confirmed with Arjun Mehta for System Architecture", time: Date.now() - 3600000 * 5 },
        { id: "n3", text: "Offer letter sent to Priya Sharma", time: Date.now() - 86400000 }
    ];
    renderNotifications();
}

// ─── EVENT HANDLERS & EVENT BUS ───────────────────────────────────────────

function registerEventHandlers() {
    // Top Nav Search
    const searchInput = document.getElementById('globalSearch');
    const clearBtn = document.getElementById('searchClearBtn');

    searchInput.addEventListener('input', e => {
        state.filters.searchQuery = e.target.value.toLowerCase().trim();
        state.filters.page = 1;
        clearBtn.classList.toggle('hidden', !state.filters.searchQuery);
        renderCandidatesTable();
        renderBadges();
    });

    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        state.filters.searchQuery = '';
        clearBtn.classList.add('hidden');
        renderCandidatesTable();
    });

    // Keyboard Shortcuts: ⌘K or Ctrl+K to search, Esc to close modals/drawers
    window.addEventListener('keydown', e => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            searchInput.focus();
            searchInput.select();
        } else if (e.key === 'Escape') {
            closeCandidateModal();
            closeScheduleModal();
            closeCandidateDrawer();
            closeConfirmDialog();
            closeNotificationsPopover();
        }
    });

    // Navigation Menu
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', e => {
            e.preventDefault();
            const view = item.getAttribute('data-view');
            if (view) switchView(view);
        });
    });

    // Theme Toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', e => {
            setTheme(e.target.checked ? 'dark' : 'light');
        });
    }

    // Notifications Popover
    const notifBtn = document.getElementById('notifBtn');
    const notifPopover = document.getElementById('notifPopover');
    notifBtn.addEventListener('click', e => {
        e.stopPropagation();
        notifPopover.classList.toggle('hidden');
    });

    document.addEventListener('click', e => {
        if (notifPopover && !notifPopover.contains(e.target) && e.target !== notifBtn) {
            notifPopover.classList.add('hidden');
        }
    });

    document.getElementById('clearNotifsBtn')?.addEventListener('click', () => {
        state.notifications = [];
        renderNotifications();
    });

    // Mobile Sidebar Toggle
    document.getElementById('sidebarToggle').addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('open');
    });

    // Quick Action Buttons on Dashboard
    document.getElementById('quickAddBtn')?.addEventListener('click', () => openCandidateModal());
    document.getElementById('quickScheduleBtn')?.addEventListener('click', () => openScheduleModal());
    document.getElementById('quickPipelineBtn')?.addEventListener('click', () => switchView('pipeline'));
    document.getElementById('quickExportBtn')?.addEventListener('click', exportCSV);
    document.getElementById('viewAllInterviewsBtn')?.addEventListener('click', () => switchView('interviews'));

    // Candidate Add / Edit Modal
    document.getElementById('openModalBtn').addEventListener('click', () => openCandidateModal());
    document.getElementById('closeModalBtn').addEventListener('click', closeCandidateModal);
    document.getElementById('cancelModalBtn').addEventListener('click', closeCandidateModal);
    document.getElementById('candidateModal').addEventListener('click', e => {
        if (e.target === document.getElementById('candidateModal')) closeCandidateModal();
    });
    document.getElementById('candidateForm').addEventListener('submit', handleCandidateSubmit);

    // Schedule Interview Modal
    document.getElementById('openScheduleInterviewBtn')?.addEventListener('click', () => openScheduleModal());
    document.getElementById('closeScheduleModalBtn')?.addEventListener('click', closeScheduleModal);
    document.getElementById('cancelScheduleModalBtn')?.addEventListener('click', closeScheduleModal);
    document.getElementById('scheduleModal')?.addEventListener('click', e => {
        if (e.target === document.getElementById('scheduleModal')) closeScheduleModal();
    });
    document.getElementById('scheduleForm')?.addEventListener('submit', handleScheduleSubmit);

    // Candidate Detail Drawer
    document.getElementById('closeDrawerBtn')?.addEventListener('click', closeCandidateDrawer);
    document.getElementById('candidateDrawerOverlay')?.addEventListener('click', e => {
        if (e.target === document.getElementById('candidateDrawerOverlay')) closeCandidateDrawer();
    });
    document.getElementById('drawerEditBtn')?.addEventListener('click', () => {
        if (state.activeDrawerCandidateId) {
            const id = state.activeDrawerCandidateId;
            closeCandidateDrawer();
            openCandidateModal(id);
        }
    });
    document.getElementById('drawerDeleteBtn')?.addEventListener('click', () => {
        if (state.activeDrawerCandidateId) {
            const id = state.activeDrawerCandidateId;
            const c = state.candidates.find(x => x.id === id);
            confirmAction({
                title: "Remove Candidate?",
                message: `Are you sure you want to remove ${c ? c.fullName : 'this candidate'} from the applicant pool?`,
                onConfirm: () => {
                    deleteCandidate(id);
                    closeCandidateDrawer();
                }
            });
        }
    });
    document.getElementById('drawerScheduleBtn')?.addEventListener('click', () => {
        if (state.activeDrawerCandidateId) {
            const id = state.activeDrawerCandidateId;
            openScheduleModal(id);
        }
    });

    // Candidates Filters
    document.getElementById('statusFilter').addEventListener('change', e => {
        state.filters.status = e.target.value;
        state.filters.page = 1;
        renderCandidatesTable();
    });

    document.getElementById('deptFilter').addEventListener('change', e => {
        state.filters.department = e.target.value;
        state.filters.page = 1;
        renderCandidatesTable();
    });

    document.getElementById('sortFilter').addEventListener('change', e => {
        state.filters.sort = e.target.value;
        renderCandidatesTable();
    });

    document.getElementById('resetFiltersBtn')?.addEventListener('click', resetFilters);
    document.getElementById('emptyClearFiltersBtn')?.addEventListener('click', resetFilters);
    document.getElementById('emptyAddBtn')?.addEventListener('click', () => openCandidateModal());

    // Sortable Table Headers
    document.querySelectorAll('.sortable-th').forEach(th => {
        th.addEventListener('click', () => {
            const sortKey = th.getAttribute('data-sort');
            if (state.filters.sortColumn === sortKey) {
                state.filters.sortDirection = state.filters.sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                state.filters.sortColumn = sortKey;
                state.filters.sortDirection = 'asc';
            }
            state.filters.sort = 'custom';
            renderCandidatesTable();
        });
    });

    // Pagination
    document.getElementById('prevPageBtn')?.addEventListener('click', () => {
        if (state.filters.page > 1) {
            state.filters.page--;
            renderCandidatesTable();
        }
    });

    document.getElementById('nextPageBtn')?.addEventListener('click', () => {
        const total = getFilteredCandidates().length;
        const maxPage = Math.ceil(total / state.filters.pageSize) || 1;
        if (state.filters.page < maxPage) {
            state.filters.page++;
            renderCandidatesTable();
        }
    });

    document.getElementById('pageSizeSelect')?.addEventListener('change', e => {
        state.filters.pageSize = parseInt(e.target.value, 10);
        state.filters.page = 1;
        renderCandidatesTable();
    });

    // Bulk Actions
    const selectAllCheckbox = document.getElementById('selectAll');
    selectAllCheckbox.addEventListener('change', e => {
        const visibleList = getPaginatedCandidates();
        if (e.target.checked) {
            visibleList.forEach(c => state.selectedIds.add(c.id));
        } else {
            visibleList.forEach(c => state.selectedIds.delete(c.id));
        }
        updateBulkActionBar();
        renderTableRowsOnly();
    });

    document.getElementById('bulkClearBtn')?.addEventListener('click', () => {
        state.selectedIds.clear();
        selectAllCheckbox.checked = false;
        updateBulkActionBar();
        renderTableRowsOnly();
    });

    document.getElementById('bulkStatusSelect')?.addEventListener('change', e => {
        const newStatus = e.target.value;
        if (!newStatus || state.selectedIds.size === 0) return;

        const count = state.selectedIds.size;
        confirmAction({
            title: `Update Status for ${count} Candidates?`,
            message: `Change stage to "${newStatus}" for all ${count} selected candidates?`,
            onConfirm: () => {
                state.candidates.forEach(c => {
                    if (state.selectedIds.has(c.id)) {
                        c.status = newStatus;
                        c.history = c.history || [];
                        c.history.unshift({ date: Date.now(), text: `Stage bulk-updated to ${newStatus}` });
                    }
                });
                state.selectedIds.clear();
                syncStorage();
                showToast(`Updated ${count} candidates to ${newStatus}.`, 'success');
                renderAll();
            }
        });
        e.target.value = '';
    });

    document.getElementById('bulkDeleteBtn')?.addEventListener('click', () => {
        const count = state.selectedIds.size;
        if (count === 0) return;
        confirmAction({
            title: `Remove ${count} Candidates?`,
            message: `This will permanently remove the ${count} selected applicants from your database.`,
            onConfirm: () => {
                state.candidates = state.candidates.filter(c => !state.selectedIds.has(c.id));
                state.selectedIds.clear();
                syncStorage();
                showToast(`Deleted ${count} candidates.`, 'danger');
                renderAll();
            }
        });
    });

    document.getElementById('bulkExportBtn')?.addEventListener('click', () => {
        if (state.selectedIds.size === 0) return;
        const selectedCandidates = state.candidates.filter(c => state.selectedIds.has(c.id));
        exportToCSV(selectedCandidates, `talentflow_selected_${state.selectedIds.size}_candidates.csv`);
    });

    // Pipeline Board Toggles
    document.getElementById('pipelineKanbanToggle')?.addEventListener('click', () => setPipelineMode('kanban'));
    document.getElementById('pipelineFunnelToggle')?.addEventListener('click', () => setPipelineMode('funnel'));

    // Interviews Tab Filter
    document.querySelectorAll('#interviewTabs .tab-pill').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#interviewTabs .tab-pill').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.interviewTab = btn.getAttribute('data-tab');
            renderInterviewsView();
        });
    });

    document.getElementById('emptyScheduleBtn')?.addEventListener('click', () => openScheduleModal());

    // Export CSV Actions
    document.getElementById('exportBtn').addEventListener('click', exportCSV);
    document.getElementById('exportSettingsBtn')?.addEventListener('click', exportCSV);

    // CSV File Import
    const csvFileInput = document.getElementById('csvFileInput');
    csvFileInput?.addEventListener('change', handleCSVImport);

    // Settings Profile Form
    document.getElementById('recruiterProfileForm')?.addEventListener('submit', e => {
        e.preventDefault();
        state.workspace.recruiterName = document.getElementById('settingsRecruiterName').value.trim() || 'Recruiter';
        state.workspace.recruiterRole = document.getElementById('settingsRecruiterRole').value.trim() || 'HR';
        state.workspace.companyName = document.getElementById('settingsCompanyName').value.trim() || 'Enterprise';
        syncStorage();
        updateWorkspaceUI();
        showToast('Workspace profile saved successfully.', 'success');
    });

    // Danger Zone Settings
    document.getElementById('resetSeedDataBtn')?.addEventListener('click', () => {
        confirmAction({
            title: "Reset to Sample Candidates?",
            message: "This will overwrite your existing pool with the default 9 sample candidates.",
            onConfirm: () => {
                state.candidates = [...SEED_DATA];
                syncStorage();
                showToast('Reset applicant database to sample pool.', 'info');
                renderAll();
            }
        });
    });

    document.getElementById('clearAllDataBtn')?.addEventListener('click', () => {
        confirmAction({
            title: "Clear Entire Candidate Pool?",
            message: "Warning: This action will permanently delete all candidate records from your local storage.",
            onConfirm: () => {
                state.candidates = [];
                state.selectedIds.clear();
                syncStorage();
                showToast('All candidates cleared.', 'danger');
                renderAll();
            }
        });
    });

    // Confirmation Modal Actions
    document.getElementById('confirmCancel')?.addEventListener('click', closeConfirmDialog);
    document.getElementById('confirmDelete')?.addEventListener('click', () => {
        if (state.pendingConfirm && typeof state.pendingConfirm.onConfirm === 'function') {
            state.pendingConfirm.onConfirm();
        }
        closeConfirmDialog();
    });
}

function resetFilters() {
    state.filters.searchQuery = '';
    state.filters.department = 'All';
    state.filters.status = 'All';
    state.filters.sort = 'newest';
    state.filters.page = 1;

    document.getElementById('globalSearch').value = '';
    document.getElementById('searchClearBtn').classList.add('hidden');
    document.getElementById('statusFilter').value = 'All';
    document.getElementById('deptFilter').value = 'All';
    document.getElementById('sortFilter').value = 'newest';

    renderCandidatesTable();
}

function closeNotificationsPopover() {
    document.getElementById('notifPopover')?.classList.add('hidden');
}

// ─── THEME ENGINE ──────────────────────────────────────────────────────────

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('talentflow_theme', theme);
    const darkToggle = document.getElementById('darkModeToggle');
    if (darkToggle) darkToggle.checked = theme === 'dark';
    updateThemeIcon();

    // Re-render charts with appropriate theme colors
    if (state.currentView === 'analytics') {
        renderAnalyticsView();
    }
}

function updateThemeIcon() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const btn = document.getElementById('themeToggle');
    if (btn) {
        btn.innerHTML = isDark ? '<i class="ri-sun-line"></i>' : '<i class="ri-moon-line"></i>';
        btn.title = isDark ? 'Switch to light theme' : 'Switch to dark theme';
    }
}

// ─── ROUTING & VIEW CONTROLLER ────────────────────────────────────────────

function switchView(viewName) {
    state.currentView = viewName;
    document.querySelectorAll('.menu-item').forEach(i => {
        i.classList.toggle('active', i.getAttribute('data-view') === viewName);
    });

    document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active-view'));
    const target = document.getElementById(`view-${viewName}`);
    if (target) {
        target.classList.add('active-view');
    }

    // Close mobile sidebar upon navigation
    if (window.innerWidth < 900) {
        document.getElementById('sidebar').classList.remove('open');
    }

    renderAll();
}

function setPipelineMode(mode) {
    state.pipelineMode = mode;
    document.getElementById('pipelineKanbanToggle')?.classList.toggle('active', mode === 'kanban');
    document.getElementById('pipelineFunnelToggle')?.classList.toggle('active', mode === 'funnel');

    document.getElementById('kanbanBoard')?.classList.toggle('hidden', mode !== 'kanban');
    document.getElementById('funnelSection')?.classList.toggle('hidden', mode !== 'funnel');
}

// ─── MASTER RENDERER ──────────────────────────────────────────────────────

function renderAll() {
    renderBadges();
    setCurrentDate();

    if (state.currentView === 'dashboard') {
        renderDashboardOverview();
    } else if (state.currentView === 'candidates') {
        renderCandidatesTable();
    } else if (state.currentView === 'pipeline') {
        renderPipelineView();
    } else if (state.currentView === 'interviews') {
        renderInterviewsView();
    } else if (state.currentView === 'analytics') {
        renderAnalyticsView();
    }
}

function renderBadges() {
    const totalEl = document.getElementById('totalBadge');
    const interviewEl = document.getElementById('interviewBadge');
    if (totalEl) totalEl.textContent = state.candidates.length;
    if (interviewEl) {
        const interviewCount = state.candidates.filter(c => c.status === 'Interview').length;
        interviewEl.textContent = interviewCount;
    }
}

function setCurrentDate() {
    const el = document.getElementById('currentDate');
    if (el) {
        el.textContent = new Date().toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }
}

// ─── 1. DASHBOARD VIEW RENDERER ───────────────────────────────────────────

function renderDashboardOverview() {
    const c = state.candidates;
    const total = c.length;
    const interview = c.filter(x => x.status === 'Interview').length;
    const offered = c.filter(x => x.status === 'Offered').length;
    const hired = c.filter(x => x.status === 'Hired').length;

    animateCount('statTotal', total);
    animateCount('statInterview', interview);
    animateCount('statOffered', offered);
    animateCount('statHired', hired);

    renderRecentActivity();
    renderDashboardUpcomingInterviews();
}

function animateCount(id, target) {
    const el = document.getElementById(id);
    if (!el) return;
    const current = parseInt(el.textContent, 10) || 0;
    if (current === target) return;

    const diff = target - current;
    const step = diff > 0 ? 1 : -1;
    let val = current;
    const interval = setInterval(() => {
        val += step;
        el.textContent = val;
        if (val === target) clearInterval(interval);
    }, 25);
}

function renderRecentActivity() {
    const list = document.getElementById('activityList');
    if (!list) return;
    list.innerHTML = '';

    const recent = [...state.candidates]
        .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
        .slice(0, 5);

    if (recent.length === 0) {
        list.innerHTML = `<li style="padding:1rem;color:var(--color-text-muted);font-size:0.84rem;">No recent applicant updates.</li>`;
        return;
    }

    recent.forEach(item => {
        const li = document.createElement('li');
        li.className = 'activity-item';
        const statusClass = (item.status || 'applied').toLowerCase();
        li.innerHTML = `
            <div class="activity-dot ${statusClass}"></div>
            <div class="activity-content">
                <strong>${esc(item.fullName)}</strong> applied for 
                <span style="color:var(--color-text-main);font-weight:500;">${esc(item.roleApplied)}</span>
                <span class="status-pill ${statusClass}" style="margin-left:0.4rem;padding:1px 6px;font-size:0.7rem;">${esc(item.status)}</span>
            </div>
            <span class="activity-time">${timeAgo(item.createdAt)}</span>
        `;
        list.appendChild(li);
    });
}

function renderDashboardUpcomingInterviews() {
    const list = document.getElementById('dashboardInterviewsList');
    if (!list) return;
    list.innerHTML = '';

    const scheduled = state.candidates
        .filter(c => c.interviewDate)
        .sort((a, b) => new Date(a.interviewDate) - new Date(b.interviewDate))
        .slice(0, 4);

    if (scheduled.length === 0) {
        list.innerHTML = `<li style="padding:1rem;color:var(--color-text-muted);font-size:0.84rem;">No upcoming interviews scheduled.</li>`;
        return;
    }

    scheduled.forEach(c => {
        const li = document.createElement('li');
        li.className = 'dash-interview-item';
        li.innerHTML = `
            <div>
                <div class="dash-int-title">${esc(c.fullName)}</div>
                <div class="dash-int-sub">${esc(c.roleApplied)} • ${esc(c.interviewType || 'Interview')}</div>
            </div>
            <div style="text-align:right;">
                <div style="font-weight:600;font-size:0.82rem;color:var(--status-interview);">${formatDate(c.interviewDate)} ${c.interviewTime || ''}</div>
                <div style="font-size:0.72rem;color:var(--color-text-darker);">Host: ${esc(c.recruiterName)}</div>
            </div>
        `;
        li.style.cursor = 'pointer';
        li.addEventListener('click', () => openCandidateDrawer(c.id));
        list.appendChild(li);
    });
}

// ─── 2. CANDIDATES TABLE & PAGINATION ─────────────────────────────────────

function getFilteredCandidates() {
    let list = state.candidates.filter(c => {
        const q = state.filters.searchQuery;
        const matchSearch = !q ||
            c.fullName.toLowerCase().includes(q) ||
            c.email.toLowerCase().includes(q) ||
            c.roleApplied.toLowerCase().includes(q) ||
            (c.department && c.department.toLowerCase().includes(q)) ||
            c.recruiterName.toLowerCase().includes(q);

        const matchStatus = state.filters.status === 'All' || c.status === state.filters.status;
        const matchDept = state.filters.department === 'All' || c.department === state.filters.department;

        return matchSearch && matchStatus && matchDept;
    });

    // Sorting
    const sort = state.filters.sort;
    if (sort === 'name') {
        list.sort((a, b) => a.fullName.localeCompare(b.fullName));
    } else if (sort === 'experience') {
        list.sort((a, b) => (Number(b.experience) || 0) - (Number(a.experience) || 0));
    } else if (sort === 'rating') {
        list.sort((a, b) => (Number(b.experience) || 0) - (Number(a.experience) || 0));
    } else if (sort === 'custom') {
        const col = state.filters.sortColumn;
        const dir = state.filters.sortDirection === 'asc' ? 1 : -1;
        list.sort((a, b) => {
            const vA = (a[col] || '').toString().toLowerCase();
            const vB = (b[col] || '').toString().toLowerCase();
            return vA.localeCompare(vB) * dir;
        });
    } else {
        // 'newest' default
        list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    }

    return list;
}

function getPaginatedCandidates() {
    const filtered = getFilteredCandidates();
    const start = (state.filters.page - 1) * state.filters.pageSize;
    return filtered.slice(start, start + state.filters.pageSize);
}

function renderCandidatesTable() {
    const filtered = getFilteredCandidates();
    const paginated = getPaginatedCandidates();

    const tbody = document.getElementById('candidateTableBody');
    const emptyState = document.getElementById('emptyState');
    const footerInfo = document.getElementById('tableFooter');
    const pageIndicator = document.getElementById('pageIndicator');
    const prevBtn = document.getElementById('prevPageBtn');
    const nextBtn = document.getElementById('nextPageBtn');

    if (!tbody) return;
    tbody.innerHTML = '';

    if (filtered.length === 0) {
        emptyState?.classList.remove('hidden');
        if (footerInfo) footerInfo.textContent = 'Showing 0 candidates';
        if (pageIndicator) pageIndicator.textContent = 'Page 1 of 1';
        if (prevBtn) prevBtn.disabled = true;
        if (nextBtn) nextBtn.disabled = true;
        updateBulkActionBar();
        return;
    }

    emptyState?.classList.add('hidden');

    const totalPages = Math.ceil(filtered.length / state.filters.pageSize) || 1;
    if (state.filters.page > totalPages) state.filters.page = totalPages;

    const startIdx = (state.filters.page - 1) * state.filters.pageSize + 1;
    const endIdx = Math.min(startIdx + paginated.length - 1, filtered.length);

    if (footerInfo) footerInfo.textContent = `Showing ${startIdx}–${endIdx} of ${filtered.length} candidates`;
    if (pageIndicator) pageIndicator.textContent = `Page ${state.filters.page} of ${totalPages}`;
    if (prevBtn) prevBtn.disabled = state.filters.page <= 1;
    if (nextBtn) nextBtn.disabled = state.filters.page >= totalPages;

    // Sync select-all checkbox state
    const selectAllCheckbox = document.getElementById('selectAll');
    const allSelected = paginated.length > 0 && paginated.every(c => state.selectedIds.has(c.id));
    if (selectAllCheckbox) selectAllCheckbox.checked = allSelected;

    paginated.forEach(c => {
        const tr = document.createElement('tr');
        const initials = c.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        const isChecked = state.selectedIds.has(c.id);

        tr.innerHTML = `
            <td>
                <input type="checkbox" class="row-checkbox" data-id="${c.id}" ${isChecked ? 'checked' : ''} aria-label="Select ${esc(c.fullName)}">
            </td>
            <td>
                <div class="candidate-profile-cell" data-action="view" data-id="${c.id}">
                    <div class="candidate-initials">${initials}</div>
                    <div>
                        <div class="candidate-meta-name">${esc(c.fullName)}</div>
                        <div class="candidate-meta-email">${esc(c.email)}</div>
                    </div>
                </div>
            </td>
            <td>
                <div style="font-weight:500;">${esc(c.roleApplied)}</div>
                <span class="dept-badge">${esc(c.department || 'General')}</span>
            </td>
            <td>${c.experience} yrs</td>
            <td><span style="color:var(--color-text-muted);font-size:0.82rem;">${esc(c.recruiterName)}</span></td>
            <td>
                ${c.interviewDate ? `<span style="display:inline-flex;align-items:center;gap:3px;font-size:0.8rem;color:var(--status-interview);font-weight:500;"><i class="ri-calendar-line"></i> ${formatDate(c.interviewDate)}</span>` : '<span style="color:var(--color-text-darker)">—</span>'}
            </td>
            <td>
                <span class="status-pill ${c.status.toLowerCase()}">${esc(c.status)}</span>
            </td>
            <td>
                <div class="actions-cell-wrapper">
                    <button class="action-btn" data-action="view" data-id="${c.id}" title="View Details">
                        <i class="ri-eye-line"></i>
                    </button>
                    <button class="action-btn" data-action="edit" data-id="${c.id}" title="Edit Profile">
                        <i class="ri-pencil-line"></i>
                    </button>
                    <button class="action-btn delete" data-action="delete" data-id="${c.id}" title="Remove Candidate">
                        <i class="ri-delete-bin-line"></i>
                    </button>
                </div>
            </td>
        `;

        // Wire click events
        tr.querySelector('.row-checkbox').addEventListener('change', e => {
            if (e.target.checked) state.selectedIds.add(c.id);
            else state.selectedIds.delete(c.id);
            updateBulkActionBar();
            // Sync selectAll
            const allChecked = paginated.every(item => state.selectedIds.has(item.id));
            if (selectAllCheckbox) selectAllCheckbox.checked = allChecked;
        });

        tr.querySelectorAll('[data-action="view"]').forEach(el => {
            el.addEventListener('click', () => openCandidateDrawer(c.id));
        });

        tr.querySelector('[data-action="edit"]').addEventListener('click', () => openCandidateModal(c.id));
        tr.querySelector('[data-action="delete"]').addEventListener('click', () => {
            confirmAction({
                title: "Remove Candidate?",
                message: `Are you sure you want to delete ${c.fullName} from the pool?`,
                onConfirm: () => {
                    deleteCandidate(c.id);
                }
            });
        });

        tbody.appendChild(tr);
    });

    updateBulkActionBar();
}

function renderTableRowsOnly() {
    renderCandidatesTable();
}

function updateBulkActionBar() {
    const bar = document.getElementById('bulkActionBar');
    const countEl = document.getElementById('bulkSelectedCount');
    if (!bar || !countEl) return;

    if (state.selectedIds.size > 0) {
        bar.classList.remove('hidden');
        countEl.textContent = state.selectedIds.size;
    } else {
        bar.classList.add('hidden');
    }
}

// ─── 3. PIPELINE KANBAN VIEW ──────────────────────────────────────────────

function renderPipelineView() {
    renderKanbanBoard();
    renderFunnelView();
}

function renderKanbanBoard() {
    const container = document.getElementById('kanbanBoard');
    if (!container) return;
    container.innerHTML = '';

    STAGES.forEach(stage => {
        const stageCandidates = state.candidates.filter(c => c.status === stage);

        const column = document.createElement('div');
        column.className = 'kanban-column';
        column.setAttribute('data-stage', stage);

        column.innerHTML = `
            <div class="kanban-column-header">
                <div class="column-header-title">
                    <span class="stage-dot" style="background:${STAGE_COLORS[stage]};"></span>
                    <span>${stage}</span>
                </div>
                <span class="column-count-badge">${stageCandidates.length}</span>
            </div>
            <div class="kanban-cards-list" data-stage="${stage}"></div>
        `;

        const cardsList = column.querySelector('.kanban-cards-list');

        // Drag & Drop event handlers on column
        cardsList.addEventListener('dragover', e => {
            e.preventDefault();
            column.classList.add('drag-over');
        });

        cardsList.addEventListener('dragleave', () => {
            column.classList.remove('drag-over');
        });

        cardsList.addEventListener('drop', e => {
            e.preventDefault();
            column.classList.remove('drag-over');
            const candidateId = e.dataTransfer.getData('text/plain');
            if (candidateId) {
                moveCandidateStage(candidateId, stage);
            }
        });

        // Populate cards
        stageCandidates.forEach(c => {
            const card = document.createElement('div');
            card.className = 'kanban-card';
            card.setAttribute('draggable', 'true');
            card.setAttribute('data-id', c.id);

            card.innerHTML = `
                <div class="kanban-card-top">
                    <span class="kanban-candidate-name">${esc(c.fullName)}</span>
                    <span class="dept-badge" style="font-size:0.68rem;">${esc(c.department || 'Gen')}</span>
                </div>
                <div class="kanban-role">${esc(c.roleApplied)}</div>
                ${c.interviewDate ? `<div class="kanban-interview-chip"><i class="ri-calendar-line"></i> ${formatDate(c.interviewDate)}</div>` : ''}
                <div class="kanban-card-footer">
                    <span>${c.experience} yrs exp</span>
                    <span>${esc(c.recruiterName)}</span>
                </div>
            `;

            // HTML5 Drag handlers on card
            card.addEventListener('dragstart', e => {
                card.classList.add('dragging');
                e.dataTransfer.setData('text/plain', c.id);
                e.dataTransfer.effectAllowed = 'move';
            });

            card.addEventListener('dragend', () => {
                card.classList.remove('dragging');
            });

            // Click to open details
            card.addEventListener('click', () => openCandidateDrawer(c.id));

            cardsList.appendChild(card);
        });

        container.appendChild(column);
    });
}

function moveCandidateStage(candidateId, newStage) {
    const candidate = state.candidates.find(c => c.id === candidateId);
    if (!candidate || candidate.status === newStage) return;

    const oldStage = candidate.status;
    candidate.status = newStage;
    candidate.history = candidate.history || [];
    candidate.history.unshift({
        date: Date.now(),
        text: `Pipeline stage moved from ${oldStage} to ${newStage}`
    });

    syncStorage();
    showToast(`${candidate.fullName} moved to ${newStage}.`, 'success');
    renderAll();
}

function renderFunnelView() {
    const funnelEl = document.getElementById('funnelBars');
    if (!funnelEl) return;
    funnelEl.innerHTML = '';

    const total = state.candidates.length || 1;
    STAGES.forEach(stage => {
        const count = state.candidates.filter(c => c.status === stage).length;
        const pct = Math.max(Math.round((count / total) * 100), count > 0 ? 8 : 0);

        const row = document.createElement('div');
        row.className = 'funnel-row';
        row.innerHTML = `
            <div class="funnel-label">${stage}</div>
            <div class="funnel-bar-track">
                <div class="funnel-bar-fill" style="width:${pct}%;background:${STAGE_COLORS[stage]};">
                    ${count > 0 ? `${count} (${Math.round((count / total) * 100)}%)` : ''}
                </div>
            </div>
            <div class="funnel-count">${count}</div>
        `;
        funnelEl.appendChild(row);
    });
}

// ─── 4. INTERVIEWS SCHEDULE VIEW ──────────────────────────────────────────

function renderInterviewsView() {
    const container = document.getElementById('interviewsGrid');
    const emptyState = document.getElementById('interviewsEmptyState');
    if (!container) return;
    container.innerHTML = '';

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const allWithInterviews = state.candidates
        .filter(c => c.interviewDate)
        .sort((a, b) => new Date(a.interviewDate) - new Date(b.interviewDate));

    const upcoming = allWithInterviews.filter(c => new Date(c.interviewDate) >= today);
    const past = allWithInterviews.filter(c => new Date(c.interviewDate) < today);

    document.getElementById('countAllInterviews').textContent = allWithInterviews.length;
    document.getElementById('countUpcomingInterviews').textContent = upcoming.length;
    document.getElementById('countPastInterviews').textContent = past.length;

    let displayList = allWithInterviews;
    if (state.interviewTab === 'upcoming') displayList = upcoming;
    else if (state.interviewTab === 'past') displayList = past;

    if (displayList.length === 0) {
        emptyState?.classList.remove('hidden');
        return;
    }

    emptyState?.classList.add('hidden');

    displayList.forEach(c => {
        const dateObj = new Date(c.interviewDate);
        const isPast = dateObj < today;
        const card = document.createElement('div');
        card.className = 'interview-card-rich';

        card.innerHTML = `
            <div>
                <div class="int-card-header">
                    <div>
                        <div class="int-card-candidate-name">${esc(c.fullName)}</div>
                        <div class="int-card-role">${esc(c.roleApplied)} • ${esc(c.department || 'Engineering')}</div>
                    </div>
                    <span class="status-pill ${c.status.toLowerCase()}">${c.status}</span>
                </div>

                <div class="int-round-tag">
                    <i class="ri-git-commit-line"></i> ${esc(c.interviewType || 'General Technical Round')}
                </div>

                <div class="int-schedule-meta">
                    <div class="int-meta-row">
                        <i class="ri-calendar-event-line"></i>
                        <span>${formatDate(c.interviewDate)} at ${c.interviewTime || '14:00'}</span>
                        ${isPast ? '<span style="color:var(--color-text-darker);font-size:0.75rem;">(Passed)</span>' : '<span style="color:var(--status-interview);font-size:0.75rem;">(Scheduled)</span>'}
                    </div>
                    <div class="int-meta-row">
                        <i class="ri-user-voice-line"></i>
                        <span>Interviewer: <strong>${esc(c.recruiterName)}</strong></span>
                    </div>
                    ${c.interviewLink ? `
                    <div class="int-meta-row">
                        <i class="ri-video-chat-line"></i>
                        <a href="${esc(c.interviewLink)}" target="_blank" rel="noopener noreferrer" style="color:var(--color-primary);text-decoration:underline;">Join Video Session</a>
                    </div>` : ''}
                </div>
            </div>

            <div class="int-actions-row">
                <button class="btn btn-secondary btn-sm" data-action="reschedule" data-id="${c.id}">
                    <i class="ri-time-line"></i> Reschedule
                </button>
                <button class="btn btn-primary btn-sm" data-action="manage" data-id="${c.id}">
                    Review Candidate
                </button>
            </div>
        `;

        card.querySelector('[data-action="reschedule"]').addEventListener('click', () => openScheduleModal(c.id));
        card.querySelector('[data-action="manage"]').addEventListener('click', () => openCandidateDrawer(c.id));

        container.appendChild(card);
    });
}

// ─── 5. ANALYTICS VIEW & CHARTS ───────────────────────────────────────────

function renderAnalyticsView() {
    const c = state.candidates;
    const total = c.length || 1;

    // Metrics calculation
    const offered = c.filter(x => x.status === 'Offered' || x.status === 'Hired').length;
    const hired = c.filter(x => x.status === 'Hired').length;
    const offerRate = offered > 0 ? Math.round((hired / offered) * 100) : 0;

    const screening = c.filter(x => x.status === 'Screening').length;
    const interviewed = c.filter(x => x.status === 'Interview' || x.status === 'Offered' || x.status === 'Hired').length;
    const interviewRate = (screening + interviewed) > 0 ? Math.round((interviewed / (screening + interviewed)) * 100) : 0;

    const avgExp = (c.reduce((sum, item) => sum + (Number(item.experience) || 0), 0) / total).toFixed(1);

    const recruiters = new Set(c.map(x => x.recruiterName)).size;

    document.getElementById('kpiOfferRate').textContent = `${offerRate}%`;
    document.getElementById('kpiInterviewRate').textContent = `${interviewRate}%`;
    document.getElementById('kpiAvgExp').textContent = `${avgExp} yrs`;
    document.getElementById('kpiActiveRecruiters').textContent = recruiters;

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#94a3b8' : '#64748b';
    const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';

    // Status Doughnut Chart
    const ctx1 = document.getElementById('statusChart');
    if (ctx1 && window.Chart) {
        if (statusChartInstance) statusChartInstance.destroy();
        const stageCounts = STAGES.map(s => c.filter(x => x.status === s).length);

        statusChartInstance = new Chart(ctx1, {
            type: 'doughnut',
            data: {
                labels: STAGES,
                datasets: [{
                    data: stageCounts,
                    backgroundColor: Object.values(STAGE_COLORS),
                    borderWidth: 0,
                    hoverOffset: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: textColor,
                            font: { family: "'Plus Jakarta Sans', sans-serif", size: 11 },
                            boxWidth: 10,
                            padding: 12
                        }
                    }
                }
            }
        });
    }

    // Recruiter Leaderboard
    const leaderboard = document.getElementById('recruiterLeaderboard');
    if (leaderboard) {
        const counts = {};
        c.forEach(item => {
            counts[item.recruiterName] = (counts[item.recruiterName] || 0) + 1;
        });

        const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
        const max = sorted[0]?.[1] || 1;

        leaderboard.innerHTML = sorted.map(([name, count]) => `
            <div class="recruiter-row">
                <span class="recruiter-name" title="${esc(name)}">${esc(name)}</span>
                <div class="recruiter-bar">
                    <div class="recruiter-bar-fill" style="width:${(count / max) * 100}%;"></div>
                </div>
                <span class="recruiter-count">${count}</span>
            </div>
        `).join('');
    }

    // Experience Distribution Bar Chart
    const ctx2 = document.getElementById('expChart');
    if (ctx2 && window.Chart) {
        if (expChartInstance) expChartInstance.destroy();
        const buckets = { '0–2 yrs': 0, '3–5 yrs': 0, '6–8 yrs': 0, '9+ yrs': 0 };
        c.forEach(item => {
            const exp = Number(item.experience) || 0;
            if (exp <= 2) buckets['0–2 yrs']++;
            else if (exp <= 5) buckets['3–5 yrs']++;
            else if (exp <= 8) buckets['6–8 yrs']++;
            else buckets['9+ yrs']++;
        });

        expChartInstance = new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: Object.keys(buckets),
                datasets: [{
                    label: 'Applicants',
                    data: Object.values(buckets),
                    backgroundColor: '#4f46e5',
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { ticks: { color: textColor }, grid: { display: false } },
                    y: { ticks: { color: textColor, stepSize: 1 }, grid: { color: gridColor } }
                }
            }
        });
    }

    // Department Breakdown Chart
    const ctx3 = document.getElementById('deptChart');
    if (ctx3 && window.Chart) {
        if (deptChartInstance) deptChartInstance.destroy();
        const deptCounts = {};
        DEPARTMENTS.forEach(d => { deptCounts[d] = 0; });
        c.forEach(item => {
            const d = item.department || 'Engineering';
            deptCounts[d] = (deptCounts[d] || 0) + 1;
        });

        deptChartInstance = new Chart(ctx3, {
            type: 'bar',
            data: {
                labels: Object.keys(deptCounts),
                datasets: [{
                    label: 'Applicants',
                    data: Object.values(deptCounts),
                    backgroundColor: '#06b6d4',
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { ticks: { color: textColor }, grid: { display: false } },
                    y: { ticks: { color: textColor, stepSize: 1 }, grid: { color: gridColor } }
                }
            }
        });
    }
}

// ─── CANDIDATE DETAIL DRAWER ──────────────────────────────────────────────

function openCandidateDrawer(candidateId) {
    const candidate = state.candidates.find(c => c.id === candidateId);
    if (!candidate) return;

    state.activeDrawerCandidateId = candidateId;

    document.getElementById('drawerName').textContent = candidate.fullName;
    document.getElementById('drawerRoleDept').textContent = `${candidate.roleApplied} • ${candidate.department || 'Engineering'}`;

    const initials = candidate.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    document.getElementById('drawerAvatar').textContent = initials;

    // Contact info
    const emailEl = document.getElementById('drawerEmail');
    emailEl.textContent = candidate.email;
    emailEl.href = `mailto:${candidate.email}`;

    const phoneEl = document.getElementById('drawerPhone');
    phoneEl.textContent = candidate.phone;
    phoneEl.href = `tel:${candidate.phone}`;

    document.getElementById('drawerExperience').textContent = `${candidate.experience} years`;
    document.getElementById('drawerRecruiter').textContent = candidate.recruiterName;
    document.getElementById('drawerNotes').textContent = candidate.notes || 'No evaluation notes recorded yet.';

    // Interactive Stage Switcher
    const stageSwitcher = document.getElementById('drawerStageSwitcher');
    if (stageSwitcher) {
        stageSwitcher.innerHTML = STAGES.map(s => `
            <button class="stage-btn ${candidate.status === s ? 'active' : ''}" data-stage="${s}">
                ${s}
            </button>
        `).join('');

        stageSwitcher.querySelectorAll('.stage-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const newStage = btn.getAttribute('data-stage');
                moveCandidateStage(candidate.id, newStage);
                openCandidateDrawer(candidate.id); // refresh drawer state
            });
        });
    }

    // Interview Assessment Card
    const interviewBox = document.getElementById('drawerInterviewContent');
    if (interviewBox) {
        if (candidate.interviewDate) {
            interviewBox.innerHTML = `
                <div style="font-weight:600;color:var(--color-text-main);margin-bottom:0.3rem;">
                    ${esc(candidate.interviewType || 'Technical Interview')}
                </div>
                <div style="display:flex;align-items:center;gap:0.4rem;color:var(--status-interview);font-size:0.82rem;margin-bottom:0.4rem;">
                    <i class="ri-calendar-check-line"></i> ${formatDate(candidate.interviewDate)} at ${candidate.interviewTime || '14:00'}
                </div>
                ${candidate.interviewLink ? `
                    <a href="${esc(candidate.interviewLink)}" target="_blank" rel="noopener noreferrer" style="color:var(--color-primary);font-size:0.8rem;text-decoration:underline;">
                        Join Video Meeting
                    </a>
                ` : ''}
            `;
        } else {
            interviewBox.innerHTML = `<span style="color:var(--color-text-darker);">No assessment scheduled yet. Click "Manage" above to schedule an interview.</span>`;
        }
    }

    // History Log
    const historyList = document.getElementById('drawerHistoryList');
    if (historyList) {
        historyList.innerHTML = '';
        const history = candidate.history || [
            { date: candidate.createdAt || Date.now(), text: 'Candidate profile registered in TalentFlow' }
        ];

        history.forEach(h => {
            const li = document.createElement('li');
            li.className = 'drawer-history-item';
            li.innerHTML = `
                <div>${esc(h.text)}</div>
                <div class="drawer-history-time">${formatDate(h.date)} • ${timeAgo(h.date)}</div>
            `;
            historyList.appendChild(li);
        });
    }

    document.getElementById('candidateDrawerOverlay').classList.remove('hidden');
}

function closeCandidateDrawer() {
    document.getElementById('candidateDrawerOverlay')?.classList.add('hidden');
    state.activeDrawerCandidateId = null;
}

// ─── CANDIDATE ADD / EDIT MODAL & VALIDATION ──────────────────────────────

function openCandidateModal(candidateId = null) {
    const modal = document.getElementById('candidateModal');
    const form = document.getElementById('candidateForm');
    form.reset();
    clearFormErrors();

    if (candidateId) {
        const candidate = state.candidates.find(c => c.id === candidateId);
        if (candidate) {
            document.getElementById('modalTitle').textContent = 'Edit Candidate Profile';
            document.getElementById('candidateId').value = candidate.id;
            document.getElementById('fullName').value = candidate.fullName;
            document.getElementById('email').value = candidate.email;
            document.getElementById('phone').value = candidate.phone;
            document.getElementById('roleApplied').value = candidate.roleApplied;
            document.getElementById('department').value = candidate.department || 'Engineering';
            document.getElementById('experience').value = candidate.experience;
            document.getElementById('recruiterName').value = candidate.recruiterName;
            document.getElementById('status').value = candidate.status;
            document.getElementById('interviewDate').value = candidate.interviewDate || '';
            document.getElementById('interviewTime').value = candidate.interviewTime || '';
            document.getElementById('interviewType').value = candidate.interviewType || '';
            document.getElementById('interviewLink').value = candidate.interviewLink || '';
            document.getElementById('notes').value = candidate.notes || '';
        }
    } else {
        document.getElementById('modalTitle').textContent = 'Add New Candidate';
        document.getElementById('candidateId').value = '';
        document.getElementById('recruiterName').value = state.workspace.recruiterName;
        document.getElementById('department').value = 'Engineering';
        document.getElementById('status').value = 'Applied';
    }

    modal.classList.add('open');
    document.getElementById('fullName').focus();
}

function closeCandidateModal() {
    document.getElementById('candidateModal')?.classList.remove('open');
}

function clearFormErrors() {
    document.querySelectorAll('.form-error').forEach(el => { el.textContent = ''; });
}

function handleCandidateSubmit(e) {
    e.preventDefault();
    clearFormErrors();

    const id = document.getElementById('candidateId').value;
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const roleApplied = document.getElementById('roleApplied').value.trim();
    const department = document.getElementById('department').value;
    const experience = parseInt(document.getElementById('experience').value.trim(), 10);
    const recruiterName = document.getElementById('recruiterName').value.trim();
    const status = document.getElementById('status').value;
    const interviewDate = document.getElementById('interviewDate').value;
    const interviewTime = document.getElementById('interviewTime').value;
    const interviewType = document.getElementById('interviewType').value;
    const interviewLink = document.getElementById('interviewLink').value.trim();
    const notes = document.getElementById('notes').value.trim();

    let hasErrors = false;

    if (!fullName) {
        document.getElementById('fullNameError').textContent = 'Full name is required.';
        hasErrors = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Enter a valid email address.';
        hasErrors = true;
    }

    if (!phone) {
        document.getElementById('phoneError').textContent = 'Contact phone number is required.';
        hasErrors = true;
    }

    if (!roleApplied) {
        document.getElementById('roleAppliedError').textContent = 'Job role is required.';
        hasErrors = true;
    }

    if (isNaN(experience) || experience < 0) {
        document.getElementById('experienceError').textContent = 'Please enter valid years of experience.';
        hasErrors = true;
    }

    if (!recruiterName) {
        document.getElementById('recruiterNameError').textContent = 'Assign a recruiter.';
        hasErrors = true;
    }

    if (hasErrors) return;

    const candidateData = {
        fullName,
        email,
        phone,
        roleApplied,
        department,
        experience,
        recruiterName,
        status,
        interviewDate,
        interviewTime,
        interviewType,
        interviewLink,
        notes
    };

    if (id) {
        // Edit existing candidate
        const idx = state.candidates.findIndex(c => c.id === id);
        if (idx !== -1) {
            const existing = state.candidates[idx];
            existing.history = existing.history || [];
            existing.history.unshift({
                date: Date.now(),
                text: `Candidate details updated (Stage: ${status})`
            });
            state.candidates[idx] = { ...existing, ...candidateData };
            showToast(`${fullName}'s profile updated successfully.`, 'success');
        }
    } else {
        // Add new candidate
        const newCandidate = {
            id: 'c_' + Date.now().toString(36),
            ...candidateData,
            createdAt: Date.now(),
            history: [
                { date: Date.now(), text: `Application registered for ${roleApplied}` }
            ]
        };
        state.candidates.unshift(newCandidate);
        showToast(`Candidate ${fullName} added to pool.`, 'success');

        // Add to notification feed
        state.notifications.unshift({
            id: 'notif_' + Date.now(),
            text: `New applicant added: ${fullName} (${roleApplied})`,
            time: Date.now()
        });
        renderNotifications();
    }

    syncStorage();
    closeCandidateModal();
    renderAll();
}

function deleteCandidate(candidateId) {
    state.candidates = state.candidates.filter(c => c.id !== candidateId);
    state.selectedIds.delete(candidateId);
    syncStorage();
    showToast('Candidate removed from pool.', 'danger');
    renderAll();
}

// ─── SCHEDULE INTERVIEW MODAL ─────────────────────────────────────────────

function openScheduleModal(preselectedCandidateId = null) {
    const modal = document.getElementById('scheduleModal');
    const select = document.getElementById('scheduleCandidateSelect');
    select.innerHTML = '<option value="" disabled selected>Choose candidate...</option>';

    state.candidates.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.id;
        opt.textContent = `${c.fullName} (${c.roleApplied})`;
        if (preselectedCandidateId && c.id === preselectedCandidateId) {
            opt.selected = true;
        }
        select.appendChild(opt);
    });

    const candidate = state.candidates.find(c => c.id === preselectedCandidateId);
    if (candidate) {
        document.getElementById('scheduleCandidateId').value = candidate.id;
        document.getElementById('scheduleRoundType').value = candidate.interviewType || 'Technical Assessment';
        document.getElementById('scheduleDate').value = candidate.interviewDate || getDefaultInterviewDate();
        document.getElementById('scheduleTime').value = candidate.interviewTime || '14:00';
        document.getElementById('scheduleMeetingLink').value = candidate.interviewLink || '';
        document.getElementById('scheduleInterviewer').value = candidate.recruiterName || state.workspace.recruiterName;
    } else {
        document.getElementById('scheduleCandidateId').value = '';
        document.getElementById('scheduleDate').value = getDefaultInterviewDate();
        document.getElementById('scheduleTime').value = '14:00';
        document.getElementById('scheduleMeetingLink').value = '';
        document.getElementById('scheduleInterviewer').value = state.workspace.recruiterName;
    }

    modal.classList.add('open');
}

function getDefaultInterviewDate() {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
}

function closeScheduleModal() {
    document.getElementById('scheduleModal')?.classList.remove('open');
}

function handleScheduleSubmit(e) {
    e.preventDefault();
    const candidateId = document.getElementById('scheduleCandidateSelect').value;
    const roundType = document.getElementById('scheduleRoundType').value;
    const date = document.getElementById('scheduleDate').value;
    const time = document.getElementById('scheduleTime').value;
    const meetingLink = document.getElementById('scheduleMeetingLink').value.trim();
    const interviewer = document.getElementById('scheduleInterviewer').value.trim() || state.workspace.recruiterName;

    if (!candidateId || !date || !time) {
        showToast('Please select candidate, date, and time.', 'danger');
        return;
    }

    const candidate = state.candidates.find(c => c.id === candidateId);
    if (candidate) {
        candidate.interviewDate = date;
        candidate.interviewTime = time;
        candidate.interviewType = roundType;
        candidate.interviewLink = meetingLink;
        candidate.recruiterName = interviewer;
        candidate.status = 'Interview';

        candidate.history = candidate.history || [];
        candidate.history.unshift({
            date: Date.now(),
            text: `Scheduled ${roundType} on ${formatDate(date)} at ${time}`
        });

        syncStorage();
        showToast(`Interview scheduled for ${candidate.fullName}.`, 'success');
        closeScheduleModal();

        if (state.activeDrawerCandidateId === candidate.id) {
            openCandidateDrawer(candidate.id);
        }

        renderAll();
    }
}

// ─── CSV EXPORT & IMPORT ENGINE ───────────────────────────────────────────

function exportCSV() {
    exportToCSV(state.candidates, 'talentflow_all_candidates.csv');
}

function exportToCSV(candidateList, filename = 'candidates.csv') {
    if (!candidateList || candidateList.length === 0) {
        showToast('No candidates available to export.', 'info');
        return;
    }

    const headers = [
        'ID',
        'Full Name',
        'Email Address',
        'Phone Number',
        'Role Applied',
        'Department',
        'Experience (Years)',
        'Assigned Recruiter',
        'Stage / Status',
        'Interview Date',
        'Interview Time',
        'Interview Type',
        'Notes'
    ];

    const rows = candidateList.map(c => [
        c.id,
        c.fullName,
        c.email,
        c.phone,
        c.roleApplied,
        c.department || 'Engineering',
        c.experience,
        c.recruiterName,
        c.status,
        c.interviewDate || '',
        c.interviewTime || '',
        c.interviewType || '',
        c.notes || ''
    ].map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(','));

    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(`Exported ${candidateList.length} candidate records.`, 'info');
}

function handleCSVImport(e) {
    const file = e.target.files[0];
    if (!file) return;

    document.getElementById('csvFileName').textContent = file.name;

    const reader = new FileReader();
    reader.onload = function(evt) {
        try {
            const text = evt.target.result;
            const parsed = parseCSVText(text);

            if (parsed.length === 0) {
                showToast('No valid candidate rows found in CSV.', 'danger');
                return;
            }

            let addedCount = 0;
            parsed.forEach(row => {
                if (row.fullName && row.email) {
                    state.candidates.unshift({
                        id: 'csv_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5),
                        fullName: row.fullName,
                        email: row.email,
                        phone: row.phone || '+91 90000 00000',
                        roleApplied: row.roleApplied || 'Candidate',
                        department: row.department || 'Engineering',
                        experience: parseInt(row.experience, 10) || 2,
                        recruiterName: row.recruiterName || state.workspace.recruiterName,
                        status: STAGES.includes(row.status) ? row.status : 'Applied',
                        interviewDate: row.interviewDate || '',
                        notes: row.notes || 'Imported via CSV',
                        createdAt: Date.now()
                    });
                    addedCount++;
                }
            });

            syncStorage();
            showToast(`Successfully imported ${addedCount} candidates.`, 'success');
            renderAll();
        } catch (err) {
            console.error('CSV import error:', err);
            showToast('Failed to parse CSV file. Ensure valid CSV structure.', 'danger');
        }
    };
    reader.readAsText(file);
}

function parseCSVText(csvText) {
    const lines = csvText.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length < 2) return [];

    const headers = parseCSVLine(lines[0]).map(h => h.trim().toLowerCase());
    const candidates = [];

    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        if (values.length === 0) continue;

        const obj = {};
        headers.forEach((h, idx) => {
            const val = values[idx] || '';
            if (h.includes('name')) obj.fullName = val;
            else if (h.includes('email')) obj.email = val;
            else if (h.includes('phone')) obj.phone = val;
            else if (h.includes('role')) obj.roleApplied = val;
            else if (h.includes('dept') || h.includes('department')) obj.department = val;
            else if (h.includes('exp')) obj.experience = val;
            else if (h.includes('recruiter')) obj.recruiterName = val;
            else if (h.includes('status') || h.includes('stage')) obj.status = val;
            else if (h.includes('interview')) obj.interviewDate = val;
            else if (h.includes('note')) obj.notes = val;
        });

        if (obj.fullName || obj.email) {
            candidates.push(obj);
        }
    }

    return candidates;
}

function parseCSVLine(text) {
    const regex = /(?:,|\n|^)("(?:(?:"")*[^"]*)*"|[^",\n]*|(?:\n|$))/g;
    const matches = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
        let val = match[1];
        if (val === undefined) break;
        if (val.startsWith('"') && val.endsWith('"')) {
            val = val.substring(1, val.length - 1).replace(/""/g, '"');
        }
        matches.push(val.trim());
        if (regex.lastIndex >= text.length) break;
    }
    return matches;
}

// ─── CONFIRMATION DIALOG MODAL ────────────────────────────────────────────

function confirmAction({ title, message, onConfirm }) {
    state.pendingConfirm = { onConfirm };
    const overlay = document.getElementById('confirmOverlay');
    document.getElementById('confirmDialogTitle').textContent = title;
    document.getElementById('confirmDialogMessage').textContent = message;
    overlay.classList.remove('hidden');
}

function closeConfirmDialog() {
    document.getElementById('confirmOverlay')?.classList.add('hidden');
    state.pendingConfirm = null;
}

// ─── NOTIFICATIONS FEED RENDERER ──────────────────────────────────────────

function renderNotifications() {
    const list = document.getElementById('notifList');
    const badge = document.getElementById('notifBadge');
    if (!list) return;

    list.innerHTML = '';
    if (state.notifications.length === 0) {
        list.innerHTML = '<li style="padding:1rem;color:var(--color-text-darker);text-align:center;">No recent activity</li>';
        if (badge) badge.classList.add('hidden');
        return;
    }

    if (badge) badge.classList.remove('hidden');

    state.notifications.slice(0, 6).forEach(n => {
        const li = document.createElement('li');
        li.className = 'notif-item';
        li.innerHTML = `
            <div style="flex:1;">
                <div>${esc(n.text)}</div>
                <div class="notif-time">${timeAgo(n.time)}</div>
            </div>
        `;
        list.appendChild(li);
    });
}

// ─── TOAST NOTIFICATION SYSTEM ────────────────────────────────────────────

function showToast(msg, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    let icon = 'ri-checkbox-circle-fill';
    if (type === 'danger') icon = 'ri-error-warning-fill';
    else if (type === 'info') icon = 'ri-information-fill';

    toast.innerHTML = `<i class="${icon}"></i><span>${esc(msg)}</span>`;
    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 250);
    }, 3800);
}

// ─── UTILITIES & FORMATTERS ───────────────────────────────────────────────

function esc(str = '') {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function formatDate(ds) {
    if (!ds) return '';
    try {
        const parts = ds.split('-');
        if (parts.length === 3) {
            const date = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        }
        return new Date(ds).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
        return ds;
    }
}

function timeAgo(ts) {
    if (!ts) return '';
    const diff = Date.now() - ts;
    const m = Math.floor(diff / 60000);
    if (m < 1) return 'just now';
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    const d = Math.floor(h / 24);
    return `${d}d ago`;
}
