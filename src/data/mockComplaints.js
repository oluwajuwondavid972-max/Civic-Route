// ============================================================
// Civic Route — mock complaint data
// Used while the Python backend is not running (see services/api.js).
// Shapes mirror exactly what the backend will persist after the
// LLM agent classifies a submission.
// ============================================================

const hoursAgo = (h) => new Date(Date.now() - h * 3600 * 1000).toISOString();

export const mockComplaints = [
  {
    id: "CR-2026-0148",
    raw_text:
      "The transformer near the community market on Herbert Macaulay Way burst last night, we don't have light.",
    category: "Electricity / Power",
    urgency: "High",
    extracted_location: "Community Market, Herbert Macaulay Way",
    ward: "Ward 2 — Herbert Macaulay",
    summary: "Transformer failure resulting in neighbourhood blackout.",
    department: "Works & Infrastructure",
    status: "Pending",
    created_at: hoursAgo(14),
  },
  {
    id: "CR-2026-0147",
    raw_text:
      "Refuse has not been collected on Industrial Road for two weeks now. The heap is blocking the walkway and it smells terrible.",
    category: "Waste & Sanitation",
    urgency: "Medium",
    extracted_location: "Industrial Road",
    ward: "Ward 6 — Industrial Road",
    summary: "Uncollected refuse blocking pedestrian walkway for two weeks.",
    department: "Environment & Sanitation",
    status: "In Progress",
    created_at: hoursAgo(38),
  },
  {
    id: "CR-2026-0146",
    raw_text:
      "There is a very deep pothole at the junction before Riverside Primary School. A keke almost tipped over this morning with children inside.",
    category: "Roads & Drainage",
    urgency: "High",
    extracted_location: "Junction near Riverside Primary School",
    ward: "Ward 4 — Riverside",
    summary: "Dangerous pothole at school junction; near-accident reported.",
    department: "Works & Infrastructure",
    status: "Pending",
    created_at: hoursAgo(51),
  },
  {
    id: "CR-2026-0145",
    raw_text:
      "The public tap at Sabon Gari square has been dry for four days. People are trekking far to fetch water.",
    category: "Water Supply",
    urgency: "Medium",
    extracted_location: "Sabon Gari Square",
    ward: "Ward 1 — Sabon Gari",
    summary: "Public tap dry for four days; residents lack nearby water access.",
    department: "Water & Utilities",
    status: "In Progress",
    created_at: hoursAgo(76),
  },
  {
    id: "CR-2026-0144",
    raw_text:
      "Streetlights along New Layout close have not worked for a month, the area is very dark at night and unsafe.",
    category: "Public Safety",
    urgency: "Medium",
    extracted_location: "New Layout Close",
    ward: "Ward 5 — New Layout",
    summary: "Streetlights out for a month, raising night-time safety concerns.",
    department: "Works & Infrastructure",
    status: "Resolved",
    created_at: hoursAgo(120),
  },
  {
    id: "CR-2026-0143",
    raw_text:
      "The drainage beside Township Central health post is blocked and overflowing whenever it rains, water enters the clinic compound.",
    category: "Roads & Drainage",
    urgency: "High",
    extracted_location: "Township Central Health Post",
    ward: "Ward 3 — Township Central",
    summary: "Blocked drain flooding health post compound during rainfall.",
    department: "Environment & Sanitation",
    status: "Resolved",
    created_at: hoursAgo(160),
  },
];
