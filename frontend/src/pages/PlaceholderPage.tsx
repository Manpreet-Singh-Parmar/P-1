import PhaseNotice from "../components/PhaseNotice";
import styles from "./PlaceholderPage.module.css";

interface PlaceholderPageProps {
  index: string;
  heading: string;
  title: string;
  description: string;
  planned: string[];
}

export default function PlaceholderPage({
  index,
  heading,
  title,
  description,
  planned,
}: PlaceholderPageProps) {
  return (
    <article className={styles.page}>
      <div className={styles.caseStrip}>
        <span className={styles.caseItem}>
          <span className={styles.caseKey}>Case file</span>
          <span className="mono">{index}</span>
        </span>
        <span className={styles.caseItem}>
          <span className={styles.caseKey}>Stage</span>
          <span className="mono">Not started</span>
        </span>
        <span className={styles.caseItem}>
          <span className={styles.caseKey}>Status</span>
          <span className="mono">Awaiting Phase 2</span>
        </span>
      </div>

      <header className={styles.intro}>
        <h1 className={styles.heading}>{heading}</h1>
      </header>

      <hr className="rule" />

      <PhaseNotice
        index={index}
        title={title}
        description={description}
        planned={planned}
      />
    </article>
  );
}
