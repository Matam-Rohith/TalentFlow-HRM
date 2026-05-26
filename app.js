/**
 * ==========================================================================
 * TALENTPULSE - APPLICATION COMPONENT ENGINE (VANILLA SPA STATE MANAGEMENT)
 * ==========================================================================
 */

// Global Application State Container Architecture
let state = {
    candidates: [],
    currentView: 'dashboard', 
    filters: {
        searchQuery: '',
        status: 'All'
    }
};

// Configuration Parameters Maps
const STAGES = ['Applied', 'Screening', 'Interview', 'Offered', 'Hired', 'Rejected'];

// Mock Seed Data Schema for professional presentation
const SEED_DATA = [
    { id: "c1", fullName: "Arjun Mehta", email: "arjun.mehta@devmail.io", phone: "+91 98450 12345", roleApplied: "Senior Frontend Architect", recruiterName: "Matam Rohith", status: "Interview", experience: "6", interviewDate: "2026-05-28", notes: "Deep technical skill in functional Javascript design patterns." },
    { id: "c2", fullName: "Priya Sharma", email: "priya.s@techcorp.com", phone: "+91 91100 54321", roleApplied: "UI/UX Engineer", recruiterName: "Matam Rohith", status: "Offered", experience: "4", interviewDate: "2026-05-20", notes: "Outstanding portfolio mapping enterprise SaaS layouts." },
    { id: "c3", fullName: "Kiran Kumar", email: "kiran.k@cloudnet.in", phone: "+91 88990 11223", roleApplied: "Full Stack Developer", recruiterName: "Ananya Rao", status: "Hired", experience: "3", interviewDate: "2026-05-15", notes: "Cleared all system design rounds. Node.js ecosystem expert." },
    { id: "c4", fullName: "Sneha Reddy", email: "sneha.reddy@infotech.com", phone: "+91 77665 44332", roleApplied: "Product Designer", recruiterName: "Matam Rohith", status: "Screening", experience: "2", interviewDate: "", notes: "Reviewing comprehensive Figma documentation profiles today." }
];

/**
 * INITIALIZATION ROUTE
 */
document.addEventListener('DOMContentLoaded', () => {
    initializeLocalStorageEngine();
    registerDOMEventListeners();
    renderAppDashboard();
});

/**
 * STORAGE ENGINE IMPLEMENTATIONS
 */
function initializeLocalStorageEngine() {
    const dataPool = localStorage.getItem('talentpulse_candidates');
    if (dataPool) {
        state.candidates = JSON.parse(dataPool);
    } else {
        state.candidates = [...SEED_DATA];
        syncStorageAndState();
    }
}

function syncStorageAndState() {
    localStorage.setItem('talentpulse_candidates', JSON.stringify(state.candidates));
}

/**
 * DOM EVENT BOUNDARY TRACKERS
 */
function registerDOMEventListeners() {
    // Modal Overlay Triggers
    document.getElementById('openModalBtn').addEventListener('click', () => openCandidateModal());
    document.getElementById('closeModalBtn').addEventListener('click', closeCandidateModal);
    document.getElementById('cancelModalBtn').addEventListener('click', closeCandidateModal);
    
    // Core Operations Submission Forms
    document.getElementById('candidateForm').addEventListener('submit', handleFormSubmission);
    
    // Global Search Pipeline Queries
    document.getElementById('globalSearch').addEventListener('input', (e) => {
        state.filters.searchQuery = e.target.value.toLowerCase().trim();
        renderAppDashboard();
    });
    
    // Status Select Filter Modifications
    document.getElementById('statusFilter').addEventListener('change', (e) => {
        state.filters.status = e.target.value;
        renderAppDashboard();
    });

    document.getElementById('candidateModal').addEventListener('click', (e) => {
        if(e.target === document.getElementById('candidateModal')) closeCandidateModal();
    });

    // SPA Link Router Event Binders
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const chosenView = item.getAttribute('data-view');
            if(chosenView) {
                switchActiveView(chosenView);
            }
        });
    });
}

/**
 * SINGLE PAGE ROUTER TRANSITIONS
 */
function switchActiveView(viewName) {
    state.currentView = viewName;
    
    // Synchronize Menu Item Elements
    document.querySelectorAll('.menu-item').forEach(item => {
        if(item.getAttribute('data-view') === viewName) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Toggle Content Containers Display Properties
    document.querySelectorAll('.view-section').forEach(view => {
        view.classList.remove('active-view');
    });
    
    const activeSection = document.getElementById(`view-${viewName}`);
    if(activeSection) {
        activeSection.classList.add('active-view');
    }

    renderAppDashboard();
}

/**
 * CORE RE-RENDER ENGINE DYNAMICS
 */
function renderAppDashboard() {
    const listData = computeFilteredCandidates();
    
    renderMetrics(state.candidates);
    renderPipelineVisualizer(state.candidates);
    renderTableData(listData);
    renderInterviewsTimeline();
}

/**
 * SYSTEM FILTER COMPUTE EXPRESSIONS
 */
function computeFilteredCandidates() {
    return state.candidates.filter(c => {
        const matchesStatus = state.filters.status === 'All' || c.status === state.filters.status;
        const matchesSearch = 
            c.fullName.toLowerCase().includes(state.filters.searchQuery) ||
            c.roleApplied.toLowerCase().includes(state.filters.searchQuery) ||
            c.recruiterName.toLowerCase().includes(state.filters.searchQuery);
            
        return matchesStatus && matchesSearch;
    });
}

/**
 * CALCULATE AND UPDATE METRICS COMPONENT
 */
function renderMetrics(data) {
    document.getElementById('statTotal').innerText = data.length;
    document.getElementById('statInterview').innerText = data.filter(c => c.status === 'Interview').length;
    document.getElementById('statOffered').innerText = data.filter(c => c.status === 'Offered').length;
    document.getElementById('statHired').innerText = data.filter(c => c.status === 'Hired').length;
}

/**
 * HYDRATE PIPELINE METRICS BLOCKS
 */
function renderPipelineVisualizer(data) {
    const pipelineContainer = document.getElementById('pipelineStages');
    if(!pipelineContainer) return;
    pipelineContainer.innerHTML = '';

    STAGES.forEach(stage => {
        const count = data.filter(c => c.status === stage).length;
        const stageCard = document.createElement('div');
        stageCard.className = 'pipeline-stage-card';
        stageCard.style.setProperty('--stage-color', `var(--status-${stage.toLowerCase()})`);
        
        stageCard.innerHTML = `
            <div class="pipeline-stage-name">${stage}</div>
            <div class="pipeline-stage-count">${count}</div>
        `;
        pipelineContainer.appendChild(stageCard);
    });
}

/**
 * HYDRATE DYNAMIC ROWS INTO MATRIX POOL ELEMENTS
 */
function renderTableData(candidatesList) {
    const tbody = document.getElementById('candidateTableBody');
    const emptyState = document.getElementById('emptyState');
    if(!tbody) return;
    tbody.innerHTML = '';

    if (candidatesList.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    } else {
        emptyState.classList.add('hidden');
    }

    candidatesList.forEach(candidate => {
        const tr = document.createElement('tr');
        const initials = candidate.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        
        tr.innerHTML = `
            <td>
                <div class="candidate-profile-cell">
                    <div class="candidate-initials">${initials}</div>
                    <div>
                        <div class="candidate-meta-name">${escapeHTML(candidate.fullName)}</div>
                        <div class="candidate-meta-email">${escapeHTML(candidate.email)}</div>
                    </div>
                </div>
            </td>
            <td><div style="font-weight: 500;">${escapeHTML(candidate.roleApplied)}</div></td>
            <td>${candidate.experience} Yrs</td>
            <td><span style="color: var(--color-text-muted); font-size: 0.85rem;">${escapeHTML(candidate.recruiterName)}</span></td>
            <td>${candidate.interviewDate ? formatDate(candidate.interviewDate) : '<span style="color:var(--color-text-darker)">Not Scheduled</span>'}</td>
            <td><span class="status-pill ${candidate.status.toLowerCase()}">${candidate.status}</span></td>
            <td>
                <div class="actions-cell-wrapper">
                    <button class="action-btn edit" onclick="openCandidateModal('${candidate.id}')" title="Edit Profile">
                        <i class="ri-pencil-line"></i>
                    </button>
                    <button class="action-btn delete" onclick="triggerDeleteCandidate('${candidate.id}')" title="Remove Profile">
                        <i class="ri-delete-bin-line"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

/**
 * INTERVIEWS TAB RE-RENDER SYSTEM LOGIC
 */
function renderInterviewsTimeline() {
    const timeline = document.getElementById('interviewTimelineList');
    if(!timeline) return;
    timeline.innerHTML = '';

    const scheduledEvents = state.candidates.filter(c => c.interviewDate);

    if(scheduledEvents.length === 0) {
        timeline.innerHTML = `<li style="color: var(--color-text-muted); padding: 1rem; font-size:0.9rem;">No upcoming corporate reviews scheduled.</li>`;
        return;
    }

    scheduledEvents.forEach(c => {
        const li = document.createElement('li');
        li.style.backgroundColor = 'var(--bg-input)';
        li.style.padding = '1rem';
        li.style.borderRadius = '10px';
        li.style.display = 'flex';
        li.style.justifyContent = 'space-between';
        li.style.alignItems = 'center';
        li.innerHTML = `
            <div>
                <strong style="color:#fff;">${escapeHTML(c.fullName)}</strong> - <span style="color:var(--color-text-muted);">${escapeHTML(c.roleApplied)}</span>
                <p style="font-size:0.8rem; color:var(--color-text-darker); margin-top:0.25rem;">Assigned Evaluator: ${escapeHTML(c.recruiterName)}</p>
            </div>
            <span class="status-pill interview"><i class="ri-calendar-line"></i> ${formatDate(c.interviewDate)}</span>
        `;
        timeline.appendChild(li);
    });
}

/**
 * OVERLAY WINDOW CONTROLLER SYSTEMS
 */
function openCandidateModal(id = null) {
    const modal = document.getElementById('candidateModal');
    const form = document.getElementById('candidateForm');
    form.reset();
    
    if (id) {
        document.getElementById('modalTitle').innerText = 'Modify Candidate Profile';
        const candidate = state.candidates.find(c => c.id === id);
        if (candidate) {
            document.getElementById('candidateId').value = candidate.id;
            document.getElementById('fullName').value = candidate.fullName;
            document.getElementById('email').value = candidate.email;
            document.getElementById('phone').value = candidate.phone;
            document.getElementById('roleApplied').value = candidate.roleApplied;
            document.getElementById('experience').value = candidate.experience;
            document.getElementById('recruiterName').value = candidate.recruiterName;
            document.getElementById('status').value = candidate.status;
            document.getElementById('interviewDate').value = candidate.interviewDate;
            document.getElementById('notes').value = candidate.notes;
        }
    } else {
        document.getElementById('modalTitle').innerText = 'Add New Candidate';
        document.getElementById('candidateId').value = '';
    }
    
    modal.classList.add('open');
}

function closeCandidateModal() {
    document.getElementById('candidateModal').classList.remove('open');
}

/**
 * DATA WRITING AND OPERATION EXECUTIONS (CRUD - Create & Update)
 */
function handleFormSubmission(e) {
    e.preventDefault();
    
    const id = document.getElementById('candidateId').value;
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const roleApplied = document.getElementById('roleApplied').value.trim();
    const experience = document.getElementById('experience').value.trim();
    const recruiterName = document.getElementById('recruiterName').value.trim();
    const status = document.getElementById('status').value;
    const interviewDate = document.getElementById('interviewDate').value;
    const notes = document.getElementById('notes').value.trim();

    // Data Form Validation Checks
    if (!fullName || !email || !phone || !roleApplied || !experience || !recruiterName) {
        showToast('Please check and fill out all mandatory data properties.', 'danger');
        return;
    }

    if (id) {
        const targetIndex = state.candidates.findIndex(c => c.id === id);
        if(targetIndex !== -1) {
            state.candidates[targetIndex] = { id, fullName, email, phone, roleApplied, experience, recruiterName, status, interviewDate, notes };
            showToast('Candidate file synchronized successfully.');
        }
    } else {
        const brandNewRecord = {
            id: 'id_' + Date.now(),
            fullName, email, phone, roleApplied, experience, recruiterName, status, interviewDate, notes
        };
        state.candidates.unshift(brandNewRecord);
        showToast('New candidate indexed into management pool.');
    }

    syncStorageAndState();
    closeCandidateModal();
    renderAppDashboard();
}

/**
 * DELETE METHOD INTERFACES (CRUD - Delete)
 */
window.triggerDeleteCandidate = function(id) {
    if (confirm("Are you sure you want to remove this candidate from the company talent pool?")) {
        state.candidates = state.candidates.filter(c => c.id !== id);
        syncStorageAndState();
        showToast('Candidate payload purged completely.', 'danger');
        renderAppDashboard();
    }
};

/**
 * NOTIFICATION SYSTEM MODULES
 */
function showToast(msg, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = 'ri-checkbox-circle-fill';
    if(type === 'danger') icon = 'ri-error-warning-fill';
    if(type === 'info') icon = 'ri-information-fill';

    toast.innerHTML = `
        <i class="${icon}"></i>
        <span class="toast-message">${msg}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 50);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

/**
 * UTILITY HELPERS
 */
function escapeHTML(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function formatDate(dateString) {
    if(!dateString) return '';
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}