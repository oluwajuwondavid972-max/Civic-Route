import { useEffect, useMemo, useState } from "react";
import { getComplaints, updateComplaintStatus } from "../services/api";
import { CATEGORIES, LGC_ID, STATUSES } from "../data/constants";
import ComplaintCard from "../components/ComplaintCard";
import styles from "./Dashboard.module.css";

/**
 * Local Government Dashboard.
 * Officials see AI-routed complaints, filter them, advance their
 * status, and read simple analytics on neighbourhood pain points.
 */
function Dashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await getComplaints(LGC_ID);
        if (!cancelled) setComplaints(data);
      } catch (err) {
        console.error(err);
        if (!cancelled) setLoadError("Could not load complaints. Check the backend connection and refresh.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleStatusChange = async (id, status) => {
    // Optimistic update, with rollback on failure.
    const previous = complaints;
    setComplaints((list) => list.map((c) => (c.id === id ? { ...c, status } : c)));
    try {
      await updateComplaintStatus(id, status);
    } catch (err) {
      console.error(err);
      setComplaints(previous);
    }
  };

  const filtered = useMemo(
    () =>
      complaints.filter(
        (c) =>
          (statusFilter === "All" || c.status === statusFilter) &&
          (categoryFilter === "All" || c.category === categoryFilter)
      ),
    [complaints, statusFilter, categoryFilter]
  );

  const counts = useMemo(() => {
    const byStatus = { Pending: 0, "In Progress": 0, Resolved: 0 };
    const byCategory = {};
    for (const c of complaints) {
      if (byStatus[c.status] !== undefined) byStatus[c.status] += 1;
      byCategory[c.category] = (byCategory[c.category] || 0) + 1;
    }
    const categoryBars = Object.entries(byCategory).sort((a, b) => b[1] - a[1]);
    const max = categoryBars[0]?.[1] || 1;
    return { byStatus, categoryBars, max };
  }, [complaints]);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Council view · {LGC_ID.toUpperCase()}</p>
          <h1 className={styles.title}>Routed complaints</h1>
        </div>
        <div className={styles.statRow}>
          <div className={`${styles.stat} ${styles.statPending}`}>
            <span className={styles.statNumber}>{counts.byStatus.Pending}</span>
            <span className={styles.statLabel}>Pending</span>
          </div>
          <div className={`${styles.stat} ${styles.statProgress}`}>
            <span className={styles.statNumber}>{counts.byStatus["In Progress"]}</span>
            <span className={styles.statLabel}>In progress</span>
          </div>
          <div className={`${styles.stat} ${styles.statResolved}`}>
            <span className={styles.statNumber}>{counts.byStatus.Resolved}</span>
            <span className={styles.statLabel}>Resolved</span>
          </div>
        </div>
      </header>

      <section className={styles.analytics} aria-label="Neighbourhood pain points">
        <h2 className={styles.sectionTitle}>Pain points by category</h2>
        {counts.categoryBars.length === 0 && !loading ? (
          <p className={styles.emptyNote}>No data yet — complaints will appear here as citizens report them.</p>
        ) : (
          <ul className={styles.barList}>
            {counts.categoryBars.map(([name, value]) => (
              <li key={name} className={styles.barRow}>
                <span className={styles.barLabel}>{name}</span>
                <span className={styles.barTrack}>
                  <span
                    className={styles.barFill}
                    style={{ width: `${(value / counts.max) * 100}%` }}
                  />
                </span>
                <span className={styles.barValue}>{value}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-label="Complaint list">
        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <label htmlFor="status-filter" className={styles.filterLabel}>
              Status
            </label>
            <select
              id="status-filter"
              className={styles.filterSelect}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All</option>
              {STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label htmlFor="category-filter" className={styles.filterLabel}>
              Category
            </label>
            <select
              id="category-filter"
              className={styles.filterSelect}
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option>All</option>
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <p className={styles.resultCount}>
            {filtered.length} of {complaints.length} complaints
          </p>
        </div>

        {loading && <p className={styles.loading}>Loading complaints…</p>}

        {loadError && (
          <p className={styles.error} role="alert">
            {loadError}
          </p>
        )}

        {!loading && !loadError && filtered.length === 0 && (
          <p className={styles.emptyNote}>
            No complaints match these filters. Clear a filter to see more.
          </p>
        )}

        <div className={styles.grid}>
          {filtered.map((complaint) => (
            <ComplaintCard
              key={complaint.id}
              complaint={complaint}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
