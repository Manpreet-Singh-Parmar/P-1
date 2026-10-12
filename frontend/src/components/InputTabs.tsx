import { Image as ImageIcon, MessageSquareText } from "lucide-react";
import type { EvidenceType } from "../types";
import styles from "./InputTabs.module.css";

interface InputTabsProps {
  active: EvidenceType;
  onChange: (tab: EvidenceType) => void;
  messageEnabled: boolean;
  screenshotEnabled: boolean;
}

const TABS: { id: EvidenceType; label: string; index: string; Icon: typeof MessageSquareText }[] = [
  { id: "message", label: "Message", index: "01", Icon: MessageSquareText },
  { id: "screenshot", label: "Screenshot", index: "02", Icon: ImageIcon },
];

export default function InputTabs({
  active,
  onChange,
  messageEnabled,
  screenshotEnabled,
}: InputTabsProps) {
  return (
    <div className={styles.tabs} role="tablist" aria-label="Evidence type">
      {TABS.map(({ id, label, index, Icon }) => {
        const enabled = id === "message" ? messageEnabled : screenshotEnabled;
        const selected = active === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            id={`tab-${id}`}
            aria-selected={selected}
            aria-controls={`panel-${id}`}
            tabIndex={selected ? 0 : -1}
            className={`${styles.tab} ${selected ? styles.tabActive : ""}`}
            onClick={() => onChange(id)}
          >
            <Icon size={15} aria-hidden="true" className={styles.icon} />
            <span className={styles.index}>{index}</span>
            {label}
            {!enabled ? <span className={styles.hint}>empty</span> : null}
          </button>
        );
      })}
    </div>
  );
}
