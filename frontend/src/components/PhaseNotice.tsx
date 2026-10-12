import type { ReactNode } from "react";
import { CircleDashed } from "lucide-react";
import SectionLabel from "./SectionLabel";
import styles from "./PhaseNotice.module.css";

interface PhaseNoticeProps {
  index: string;
  title: string;
  description: string;
  planned: string[];
  aside?: ReactNode;
}

export default function PhaseNotice({
  index,
  title,
  description,
  planned,
  aside,
}: PhaseNoticeProps) {
  return (
    <section className={styles.section}>
      <SectionLabel aside={aside ?? `Section ${index}`}>{index}</SectionLabel>
      <div className={styles.panel}>
        <CircleDashed size={18} aria-hidden="true" className={styles.icon} />
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <h3 className={styles.plannedLabel}>Planned in Phase 2</h3>
        <ul className={styles.plannedList}>
          {planned.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
