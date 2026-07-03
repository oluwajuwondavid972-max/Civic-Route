// ============================================================
// Civic Route — API service layer
//
// Every network call in the app goes through this file, so when
// the backend engineer ships the FastAPI endpoints you only flip
// USE_MOCK to false (or set VITE_USE_MOCK=false in .env) and
// nothing else in the UI changes.
//
// Backend contract (from the architecture doc):
//   POST  /api/complaints/submit
//   GET   /api/complaints/local-government/{lgc_id}
//   PATCH /api/complaints/{id}/status
// ============================================================

import { mockComplaints } from "../data/mockComplaints";

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false"; // mock by default
const BASE_URL = import.meta.env.VITE_API_URL || ""; // "" = same origin / vite proxy

// In-memory copy so mock status updates persist while the tab is open.
let mockStore = [...mockComplaints];

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Request failed (${res.status}). ${detail}`);
  }
  return res.json();
}

/**
 * Submit a citizen complaint.
 * @param {{ raw_text: string, ward: string, category?: string }} payload
 * @returns the stored complaint, including AI-generated metadata.
 */
export async function submitComplaint(payload) {
  if (USE_MOCK) {
    await wait(1400); // simulate LLM classification latency

    // A tiny stand-in for the AI router so the demo feels real.
    const text = payload.raw_text.toLowerCase();
    const guess = (pairs, fallback) =>
      pairs.find(([keys]) => keys.some((k) => text.includes(k)))?.[1] ?? fallback;

    const category =
      payload.category ||
      guess(
        [
          [["light", "power", "transformer", "electric", "nepa"], "Electricity / Power"],
          [["water", "tap", "borehole"], "Water Supply"],
          [["road", "pothole", "drain", "flood"], "Roads & Drainage"],
          [["refuse", "waste", "dirt", "sanit"], "Waste & Sanitation"],
          [["safe", "theft", "streetlight", "security"], "Public Safety"],
          [["clinic", "hospital", "health"], "Health Facilities"],
          [["market", "stall", "park"], "Markets & Amenities"],
        ],
        "Other"
      );

    const urgency = guess(
      [
        [["burst", "fire", "danger", "collapse", "accident", "emergency"], "High"],
        [["weeks", "month", "still", "again"], "Medium"],
      ],
      "Medium"
    );

    const complaint = {
      id: `CR-2026-${String(149 + mockStore.length - mockComplaints.length).padStart(4, "0")}`,
      raw_text: payload.raw_text,
      category,
      urgency,
      extracted_location: payload.ward,
      ward: payload.ward,
      summary: payload.raw_text.slice(0, 110) + (payload.raw_text.length > 110 ? "…" : ""),
      department:
        category === "Waste & Sanitation" || category === "Roads & Drainage"
          ? "Environment & Sanitation"
          : category === "Water Supply"
          ? "Water & Utilities"
          : "Works & Infrastructure",
      status: "Pending",
      created_at: new Date().toISOString(),
    };
    mockStore = [complaint, ...mockStore];
    return complaint;
  }

  return request("/api/complaints/submit", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * Fetch all routed complaints for a Local Government Council.
 * @param {string} lgcId
 */
export async function getComplaints(lgcId) {
  if (USE_MOCK) {
    await wait(500);
    return [...mockStore];
  }
  return request(`/api/complaints/local-government/${lgcId}`);
}

/**
 * Update a complaint's status ("Pending" | "In Progress" | "Resolved").
 * @param {string} id
 * @param {string} status
 */
export async function updateComplaintStatus(id, status) {
  if (USE_MOCK) {
    await wait(350);
    mockStore = mockStore.map((c) => (c.id === id ? { ...c, status } : c));
    return mockStore.find((c) => c.id === id);
  }
  return request(`/api/complaints/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}
