import { ScanSearch } from "lucide-react";
import styles from "./AnalyseButton.module.css";

interface AnalyseButtonProps {
  disabled: boolean;
  onSubmit: () => void;
}

export default function AnalyseButton({ disabled, onSubmit }: AnalyseButtonProps) {
  return (
    <button
      type="button"
      className={styles.button}
      disabled={disabled}
      onClick={onSubmit}
    >
      <ScanSearch size={16} aria-hidden="true" />
      Analyse evidence
    </button>
  );
}
