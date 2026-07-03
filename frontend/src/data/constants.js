// ============================================================
// Civic Route — shared constants
// Keep option lists here so the form, filters, and dashboard
// never drift out of sync.
// ============================================================

// Matches the categories the LLM agent classifier returns.
export const CATEGORIES = [
  "Electricity / Power",
  "Water Supply",
  "Roads & Drainage",
  "Waste & Sanitation",
  "Public Safety",
  "Health Facilities",
  "Markets & Amenities",
  "Other",
];

// Wards for the pilot Local Government Area. Replace / extend
// with real ward data, or fetch from the backend later.
export const WARDS = [
  "Ward 1 — Sabon Gari",
  "Ward 2 — Herbert Macaulay",
  "Ward 3 — Township Central",
  "Ward 4 — Riverside",
  "Ward 5 — New Layout",
  "Ward 6 — Industrial Road",
];

// The LGC this deployment serves. The dashboard uses it to call
// GET /api/complaints/local-government/{lgcId}.
export const LGC_ID = "lgc-001";

export const STATUSES = ["Pending", "In Progress", "Resolved"];

export const URGENCIES = ["High", "Medium", "Low"];
