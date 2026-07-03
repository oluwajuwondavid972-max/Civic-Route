import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ReportComplaint from "./pages/ReportComplaint";
import Dashboard from "./pages/Dashboard";
import styles from "./App.module.css";

function App() {
  return (
    <BrowserRouter>
      <div className={styles.shell}>
        <Navbar />
        <Routes>
          <Route path="/" element={<ReportComplaint />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <footer className={styles.footer}>
          <p className={styles.footerText}>
            Civic Route · Built for Local Government Councils · Complaints are
            classified by an AI router and reviewed by council staff.
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
