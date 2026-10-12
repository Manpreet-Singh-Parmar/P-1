import { useId, useRef, useState } from "react";
import { FileWarning, ImageUp, Trash2 } from "lucide-react";
import styles from "./ScreenshotUpload.module.css";

export const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];
export const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024;

interface ScreenshotUploadProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  onError: (message: string | null) => void;
  disabled?: boolean;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function ScreenshotUpload({
  file,
  onFileChange,
  onError,
  disabled,
}: ScreenshotUploadProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const accept = (candidate: File | undefined | null): boolean => {
    if (!candidate) return false;
    if (!ACCEPTED_IMAGE_TYPES.includes(candidate.type)) {
      onError("Unsupported file type. Use PNG, JPEG, or WebP.");
      return false;
    }
    if (candidate.size > MAX_FILE_SIZE_BYTES) {
      onError("Screenshot is larger than 8 MB. Split it into separate images.");
      return false;
    }
    onError(null);
    onFileChange(candidate);
    return true;
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    if (disabled) return;
    accept(event.dataTransfer.files?.[0]);
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.dropzone} ${dragging ? styles.dropzoneDragging : ""} ${
          file ? styles.dropzoneFilled : ""
        }`}
        data-dragging={dragging}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        aria-label="Add a screenshot — click to browse or drop a file here"
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(event) => {
          if (disabled) return;
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(event) => {
          event.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <ImageUp size={22} aria-hidden="true" className={styles.icon} />
        <p className={styles.title}>
          {file ? "Screenshot attached" : "Drop a screenshot here"}
        </p>
        <p className={styles.subtitle}>
          {file
            ? "Drop another file to replace it."
            : "Or click to browse. PNG, JPEG, or WebP up to 8 MB."}
        </p>

        <input
          ref={inputRef}
          id={inputId}
          className="visually-hidden"
          type="file"
          accept={ACCEPTED_IMAGE_TYPES.join(",")}
          disabled={disabled}
          onChange={(event) => {
            accept(event.target.files?.[0]);
            event.target.value = "";
          }}
        />
      </div>

      {file ? (
        <div className={styles.fileCard}>
          <dl className={styles.fileList}>
            <div className={styles.fileRow}>
              <dt>File</dt>
              <dd className={styles.fileName}>{file.name}</dd>
            </div>
            <div className={styles.fileRow}>
              <dt>Type</dt>
              <dd>{file.type}</dd>
            </div>
            <div className={styles.fileRow}>
              <dt>Size</dt>
              <dd>{formatSize(file.size)}</dd>
            </div>
            <div className={styles.fileRow}>
              <dt>Modified</dt>
              <dd>{new Date(file.lastModified).toISOString().replace("T", " ").slice(0, 19)}</dd>
            </div>
          </dl>
          <button
            type="button"
            className={styles.remove}
            onClick={() => {
              onFileChange(null);
              onError(null);
            }}
          >
            <Trash2 size={14} aria-hidden="true" />
            Remove
          </button>
        </div>
      ) : (
        <p className={styles.note}>
          <FileWarning size={13} aria-hidden="true" />
          The image is read only to extract text for analysis. It is not shared with anyone.
        </p>
      )}
    </div>
  );
}
