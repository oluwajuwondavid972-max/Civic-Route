<<<<<<< HEAD
# Civic Route — Frontend

Citizen complaint router for Local Government Councils.
React + Vite + Vanilla CSS (CSS Modules — no inline styles, one CSS file per component/page).

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:5173

- `/` — Citizen Portal (report an issue, voice or text)
- `/dashboard` — Council Dashboard (routed complaints, filters, analytics)

## Mock mode (default)

The app ships with **mock mode ON** so you can build and demo the entire UI
before the backend exists. All network logic lives in `src/services/api.js`.

When the Python (FastAPI) backend is live:

1. Copy `.env.example` to `.env`
2. Set `VITE_USE_MOCK=false`
3. Restart `npm run dev` — the Vite proxy forwards `/api/*` to `http://localhost:8000`

## Backend contract (what the API layer expects)

- `POST /api/complaints/submit` → body `{ raw_text, ward, category? }`, returns the stored complaint with AI metadata (`id, category, urgency, extracted_location, summary, department, status, created_at`)
- `GET /api/complaints/local-government/{lgc_id}` → array of complaints
- `PATCH /api/complaints/{id}/status` → body `{ status }`

## Structure

```
src/
├── components/        # Reusable UI — each .jsx has a matching .module.css
│   ├── Navbar
│   ├── ComplaintCard
│   ├── StatusBadge
│   ├── UrgencyChip
│   └── TicketConfirmation   # the "routing ticket" receipt
├── pages/
│   ├── ReportComplaint      # Citizen Portal
│   └── Dashboard            # LGC officials view
├── services/api.js          # ALL fetch calls + mock mode
├── data/
│   ├── constants.js         # categories, wards, statuses, LGC id
│   └── mockComplaints.js
└── styles/
    ├── variables.css        # design tokens
    └── global.css           # resets, focus states, utilities
```

## Design system quick notes

- Fonts: **Archivo** (display), **Public Sans** (body), **IBM Plex Mono** (tracking IDs, timestamps, labels)
- Colours live in `styles/variables.css` — change tokens there, never hardcode hex in components
- Urgency (set by AI) uses `UrgencyChip`; status (set by officials) uses `StatusBadge` — don't merge them
=======
# Civic-Route
A shared repo for Civic Engagement. This project serves as complain Router in the Local Government Level integrated with stacks like React, Python and LLM agents.
>>>>>>> 25c380b1773f81c2a83208e557776225b3e577ba
