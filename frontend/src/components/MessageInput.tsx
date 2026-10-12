import { useId } from "react";
import styles from "./MessageInput.module.css";

export const MIN_MESSAGE_LENGTH = 10;

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function MessageInput({ value, onChange, disabled }: MessageInputProps) {
  const id = useId();
  const characters = value.length;

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={id}>
        Pasted message content
      </label>
      <textarea
        id={id}
        className={styles.textarea}
        value={value}
        disabled={disabled}
        spellCheck={false}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Paste the suspicious message exactly as received — SMS, WhatsApp, email, or a social media DM. Keep links, numbers, and formatting intact."
        aria-describedby={`${id}-meta`}
      />
      <div className={styles.meta} id={`${id}-meta`}>
        <span className={styles.hint}>
          Pasting is supported. Do not edit the text — it becomes part of the evidence record.
        </span>
        <span className={styles.count} data-empty={characters === 0}>
          {characters} chars
        </span>
      </div>
    </div>
  );
}
