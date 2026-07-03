import StatusBadge from "./StatusBadge";
import UrgencyChip from "./UrgencyChip";
import styles from "./TicketConfirmation.module.css";

/**
 * The "routing ticket" — the signature moment of Civic Route.
 * After the AI classifies a complaint, the citizen receives a
 * stamped-ticket receipt showing exactly where their words went.
 */
function TicketConfirmation({ complaint, onReset }) {
  return (
    <section className={styles.wrap} aria-live="polite">
      <div className={styles.ticket}>
        <header className={styles.header}>
          <span className={styles.stamp}>Received</span>
          <h2 className={styles.title}>Your complaint is on its way</h2>
          <p className={styles.trackingLabel}>Tracking number</p>
          <p className={styles.trackingId}>{complaint.id}</p>
        </header>

        <div className={styles.perforation} aria-hidden="true" />

        <div className={styles.body}>
          <ol className={styles.route}>
            <li className={`${styles.routeStop} ${styles.routeDone}`}>
              <span className={styles.routeDot} aria-hidden="true" />
              <div>
                <p className={styles.routeStage}>Complaint received</p>
                <p className={styles.routeDetail}>“{complaint.summary}”</p>
              </div>
            </li>
            <li className={`${styles.routeStop} ${styles.routeDone}`}>
              <span className={styles.routeDot} aria-hidden="true" />
              <div>
                <p className={styles.routeStage}>Classified by AI router</p>
                <p className={styles.routeDetail}>
                  {complaint.category} · {complaint.extracted_location}
                </p>
              </div>
            </li>
            <li className={styles.routeStop}>
              <span className={styles.routeDot} aria-hidden="true" />
              <div>
                <p className={styles.routeStage}>Routed to council department</p>
                <p className={styles.routeDetail}>{complaint.department}</p>
              </div>
            </li>
          </ol>

          <div className={styles.chips}>
            <UrgencyChip urgency={complaint.urgency} />
            <StatusBadge status={complaint.status} />
          </div>

          <p className={styles.note}>
            Keep your tracking number. The council updates the status as work
            begins and when the issue is resolved.
          </p>
        </div>
      </div>

      <button type="button" className={styles.resetBtn} onClick={onReset}>
        Report another issue
      </button>
    </section>
  );
}

export default TicketConfirmation;
