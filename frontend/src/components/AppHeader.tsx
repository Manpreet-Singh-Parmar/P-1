import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, ShieldCheck, X } from "lucide-react";
import { useBackendHealth } from "../hooks/useBackendHealth";
import type { Language } from "../types";
import styles from "./AppHeader.module.css";

interface AppHeaderProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
}

const NAV_ITEMS = [
  { to: "/", label: "Investigate", id: "01" },
  { to: "/replay", label: "Replay", id: "02" },
  { to: "/reports", label: "Connected Reports", id: "03" },
];

const statusCopy: Record<string, string> = {
  online: "Service reachable",
  offline: "Service offline",
  checking: "Checking service",
};

export default function AppHeader({ language, onLanguageChange }: AppHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const backendStatus = useBackendHealth();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={styles.header}>
      <div className={styles.topRule} aria-hidden="true" />

      <div className={`${styles.bar} ${menuOpen ? styles.barOpen : ""}`}>
        <div className={styles.identity}>
          <NavLink to="/" className={styles.wordmark} aria-label="ScamShield — home">
            ScamShield
          </NavLink>
          <span className={styles.descriptor}>Digital Fraud Investigation</span>
        </div>

        <button
          type="button"
          className={styles.menuToggle}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={16} aria-hidden="true" /> : <Menu size={16} aria-hidden="true" />}
          <span className="visually-hidden">
            {menuOpen ? "Close navigation" : "Open navigation"}
          </span>
        </button>

        <nav
          id="primary-navigation"
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}
          aria-label="Primary"
        >
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
                  }
                >
                  <span className={styles.navIndex}>{item.id}</span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.tools}>
          <div className={styles.languageToggle} role="group" aria-label="Interface language">
            <button
              type="button"
              className={`${styles.languageButton} ${
                language === "en" ? styles.languageButtonActive : ""
              }`}
              aria-pressed={language === "en"}
              onClick={() => onLanguageChange("en")}
            >
              EN
            </button>
            <span className={styles.languageDivider} aria-hidden="true">
              /
            </span>
            <button
              type="button"
              className={`${styles.languageButton} ${
                language === "hi" ? styles.languageButtonActive : ""
              }`}
              aria-pressed={language === "hi"}
              onClick={() => onLanguageChange("hi")}
            >
              हिं
            </button>
          </div>

          <p className={styles.privacy}>
            <ShieldCheck size={14} aria-hidden="true" className={styles.privacyIcon} />
            <span className={styles.privacyLabel}>Privacy</span>
            <span className={styles.privacyNote}>
              Processed in-session
              <span className={styles.statusDot} data-status={backendStatus} aria-hidden="true" />
              <span className="visually-hidden">
                Backend {statusCopy[backendStatus]}
              </span>
            </span>
          </p>
        </div>
      </div>
      <div className={styles.bottomRule} aria-hidden="true" />
    </header>
  );
}
