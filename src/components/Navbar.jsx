import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

/**
 * Top navigation shared by every page.
 * Citizen-facing "Report an issue" and the officials' "Council dashboard"
 * are both reachable here; in production the dashboard link would sit
 * behind the auth flow the backend team provides.
 */
function Navbar() {
  const linkClass = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.linkActive}` : styles.link;

  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.brand}>
          <span className={styles.brandMark} aria-hidden="true">
            CR
          </span>
          <span className={styles.brandText}>
            Civic Route
            <span className={styles.brandSub}>Local Government Complaints</span>
          </span>
        </NavLink>

        <nav className={styles.nav} aria-label="Main">
          <NavLink to="/" className={linkClass} end>
            Report an issue
          </NavLink>
          <NavLink to="/dashboard" className={linkClass}>
            Council dashboard
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
