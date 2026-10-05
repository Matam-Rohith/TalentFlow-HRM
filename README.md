# TalentFlow // Enterprise HRMS & ATS

A production-ready Enterprise Human Resource Management & Applicant Tracking System (HRMS & ATS) designed for recruitment teams to manage candidates, hiring pipelines, interview assessments, and talent analytics.

---

## Features

- **Dashboard & Executive Overview**: Real-time metrics tracking active applicants, scheduled interviews, extended offers, and placed hires with activity auditing.
- **Candidate Pool Management**: Advanced multi-attribute search, department and status filtering, custom column sorting, and pagination controls.
- **Interactive Kanban Pipeline**: Drag-and-drop candidates across 6 recruitment stages (`Applied`, `Screening`, `Interview`, `Offered`, `Hired`, `Rejected`) with conversion funnel analytics.
- **Interview Assessment Coordinator**: Schedule, reschedule, and track candidate interview rounds with host assignments, video meeting links, and calendar breakdowns.
- **Talent Analytics**: Visual performance dashboards powered by Chart.js displaying stage distributions, recruiter caseloads, experience brackets, and department volume.
- **Bulk Operations**: Multi-select candidates for batch stage progression, CSV export, and bulk deletion.
- **Data Portability**: Full bidirectional CSV support (export entire applicant rosters or import candidate spreadsheets directly into your pool).
- **Workspace Customization**: Dark/Light mode theme switching and recruiter workspace profile configuration.

---

## Architecture & Technology Stack

| Layer | Technology |
|---|---|
| **Runtime** | Node.js (v22+) |
| **Server** | Express.js |
| **Frontend** | HTML5, Modern CSS3 (Custom Design System), Vanilla ES6+ |
| **Visualizations** | Chart.js 4.4 |
| **Typography & Icons** | Plus Jakarta Sans, Remix Icon |
| **Data Persistence** | LocalStorage with schema versioning & migration fallback |

---

## Directory Structure

```
TalentFlow-HRM/
├── index.html          # Application layout, semantic views, modals & drawers
├── style.css           # Enterprise CSS variables, responsive design, dark/light themes
├── app.js              # Application state machine, drag-and-drop engine, controllers
├── server.js           # Production Express server serving client assets on port 3000
├── package.json        # Dependencies and scripts (dev, build, start)
├── metadata.json       # Applet capabilities and descriptor
└── .env.example        # Environment variable definitions
```

---

## Getting Started

### Prerequisites

- Node.js 18+ or 22+
- npm

### Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be running at `http://localhost:3000`.

---

## License

MIT License. Built for modern talent acquisition teams.
