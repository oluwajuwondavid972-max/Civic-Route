import styles from "./UrgencyChip.module.css";

const URGENCY_CLASS = {
  High: styles.high,
  Medium: styles.medium,
  Low: styles.low,
};

/**
 * Road-sign style plate showing the AI-assessed urgency.
 * Kept separate from StatusBadge: urgency is set by the agent,
 * status is set by council officials.
 */
function UrgencyChip({ urgency }) {
  return (
    <span className={`${styles.chip} ${URGENCY_CLASS[urgency] || styles.medium}`}>
      {urgency} urgency
    </span>
  );
}

export default UrgencyChip;
