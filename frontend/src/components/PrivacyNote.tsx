import { Lock } from "lucide-react";
import styles from "./PrivacyNote.module.css";

interface PrivacyNoteProps {
  language: "en" | "hi";
}

const COPY = {
  en: "Evidence stays in this browser session. Nothing is uploaded, stored, or shared until analysis is enabled.",
  hi: "सभी सबूत इसी ब्राउज़र सत्र में रहते हैं। विश्लेषण चालू होने तक कुछ भी अपलोड या साझा नहीं किया जाता।",
};

export default function PrivacyNote({ language }: PrivacyNoteProps) {
  return (
    <p className={styles.note}>
      <Lock size={13} aria-hidden="true" />
      {COPY[language]}
    </p>
  );
}
