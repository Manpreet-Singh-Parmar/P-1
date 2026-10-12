import type { ReactNode } from "react";
import styles from "./AppFooter.module.css";

export default function AppFooter(): ReactNode {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.line}>
          ScamShield — an investigative workspace for digital fraud cases.
        </p>
        <p className={styles.note}>
          Phase 1: interface and case intake only. Automated analysis is not yet
          connected.
        </p>
      </div>
    </footer>
  );
}
