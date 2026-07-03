import { useState } from "react";
import StatusBadge from "./StatusBadge";
import UrgencyChip from "./UrgencyChip";
import styles from "./ComplaintCard.module.css";

function timeAgo(iso) {
  const hours = Math.max(1, Math.round((Date.now() - new Date(iso)) / 3.6e6));
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

/**
 * One routed complaint on the council dashboard.
 * Officials can advance the status; the update is optimistic-friendly —
 * the parent owns the data and passes onStatusChange(id, nextStatus).
 */
function ComplaintCard({ complaint, onStatusChange }) {
  const [updating, setUpdating] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const next =
    complaint.status === "Pending"
      ? "In Progress"
      : complaint.status === "In Progress"
      ? "Resolved"
      : null;

  const handleAdvance = async () => {
    if (!next) return;
    setUpdating(true);
    try {
      await onStatusChange(complaint.id, next);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <article className={styles.card}>
      <div className={styles.topRow}>
        <span className={styles.trackingId}>{complaint.id}</span>
        <span className={styles.time}>{timeAgo(complaint.created_at)}</span>
      </div>

      <h3 className={styles.summary}>{complaint.summary}</h3>

      <dl className={styles.meta}>
        <div className={styles.metaItem}>
          <dt>Category</dt>
          <dd>{complaint.category}</dd>
        </div>
        <div className={styles.metaItem}>
          <dt>Location</dt>
          <dd>{complaint.extracted_location}</dd>
        </div>
        <div className={styles.metaItem}>
          <dt>Routed to</dt>
          <dd>{complaint.department}</dd>
        </div>
      </dl>

      <div className={styles.chips}>
        <UrgencyChip urgency={complaint.urgency} />
        <StatusBadge status={complaint.status} />
        <span className={styles.ward}>{complaint.ward}</span>
      </div>

      <button
        type="button"
        className={styles.toggle}
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        {expanded ? "Hide citizen's words" : "Read citizen's words"}
      </button>

      {expanded && (
        <blockquote className={styles.rawText}>“{complaint.raw_text}”</blockquote>
      )}

      {next && (
        <button
          type="button"
          className={styles.advanceBtn}
          onClick={handleAdvance}
          disabled={updating}
        >
          {updating ? "Updating…" : `Mark as ${next}`}
        </button>
      )}
    </article>
  );
}

export default ComplaintCard;
