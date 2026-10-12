import type { ReactNode } from "react";
import styles from "./SectionLabel.module.css";

interface SectionLabelProps {
  children: ReactNode;
  /** Optional trailing rule content, e.g. a case index. */
  aside?: ReactNode;
}

export default function SectionLabel({ children, aside }: SectionLabelProps) {
  return (
    <div className={styles.label}>
      <h2 className={styles.text}>{children}</h2>
      <span className={styles.rule} aria-hidden="true" />
      {aside ? <span className={styles.aside}>{aside}</span> : null}
    </div>
  );
}
