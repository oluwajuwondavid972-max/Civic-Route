import styles from "./StatusBadge.module.css";

const STATUS_CLASS = {
  Pending: styles.pending,
  "In Progress": styles.inProgress,
  Resolved: styles.resolved,
};

/** Small pill showing a complaint's lifecycle state. */
function StatusBadge({ status }) {
  return (
    <span className={`${styles.badge} ${STATUS_CLASS[status] || styles.pending}`}>
      <span className={styles.dot} aria-hidden="true" />
      {status}
    </span>
  );
}

export default StatusBadge;
