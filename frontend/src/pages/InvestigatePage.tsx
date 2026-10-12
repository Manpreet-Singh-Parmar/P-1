import { useMemo, useState } from "react";
import InputTabs from "../components/InputTabs";
import MessageInput, { MIN_MESSAGE_LENGTH } from "../components/MessageInput";
import ScreenshotUpload, { MAX_FILE_SIZE_BYTES } from "../components/ScreenshotUpload";
import AnalyseButton from "../components/AnalyseButton";
import PrivacyNote from "../components/PrivacyNote";
import AnalysisPanel, { type AnalysisState } from "../components/AnalysisPanel";
import { createCaseReference, formatCaseTimestamp } from "../services/caseFile";
import type { EvidenceType, Language } from "../types";
import styles from "./InvestigatePage.module.css";

interface InvestigatePageProps {
  language: Language;
}

const READING_NOTES = [
  {
    title: "Verify the sender",
    body: "Compare the number, address, or handle against the institution it claims to represent. Official contact rarely changes mid-conversation.",
  },
  {
    title: "Look for manufactured urgency",
    body: "Deadlines, threats of account closure, and 'act now' phrasing are pressure devices, not information.",
  },
  {
    title: "Check the destination",
    body: "Payment handles, UPI IDs, shortened links, and attachments are where the money and the credentials actually leave.",
  },
  {
    title: "Preserve the original",
    body: "Do not delete or edit the message before it has been reported. Screenshots lose metadata that investigators need.",
  },
];

const COPY = {
  en: {
    lead:
      "ScamShield reads a suspicious message or screenshot, isolates the language and identifiers that matter, and files them as a structured case. You keep the evidence; the system does the pattern work.",
    label: "Reading notes",
    uploadErrorTitle: "Attachment rejected",
  },
  hi: {
    lead:
      "स्कैमशील्ड संदिग्ध संदेश या स्क्रीनशॉट पढ़ता है, महत्वपूर्ण भाषा और पहचानकर्ताओं को अलग करता है, और उन्हें एक संरचित केस में दर्ज करता है। सबूत आपके पास रहते हैं; पैटर्न का काम सिस्टम करता है।",
    label: "पठन टिप्पणियाँ",
    uploadErrorTitle: "अनुलग्नक अस्वीकृत",
  },
};

export default function InvestigatePage({ language }: InvestigatePageProps) {
  const [activeTab, setActiveTab] = useState<EvidenceType>("message");
  const [messageText, setMessageText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisState>({ kind: "empty" });

  const copy = COPY[language];

  const messageReady = useMemo(
    () => messageText.trim().length >= MIN_MESSAGE_LENGTH,
    [messageText],
  );

  const canSubmit = activeTab === "message" ? messageReady : file !== null;

  const handleSubmit = () => {
    if (activeTab === "message") {
      if (messageText.trim().length === 0) {
        setAnalysis({
          kind: "rejected",
          message: "The message field is empty. Paste the suspicious message before analysing.",
        });
        return;
      }
      if (messageText.trim().length < MIN_MESSAGE_LENGTH) {
        setAnalysis({
          kind: "rejected",
          message: `That message is too short to examine. Provide at least ${MIN_MESSAGE_LENGTH} characters of the original text.`,
        });
        return;
      }

      const now = new Date();
      setAnalysis({
        kind: "accepted",
        caseRef: createCaseReference(now),
        openedAt: formatCaseTimestamp(now),
        evidenceType: "message",
        evidenceSummary: `${messageText.trim().length} characters of message text`,
      });
      return;
    }

    if (!file) {
      setAnalysis({
        kind: "rejected",
        message: "No screenshot attached. Drop an image file or browse to select one.",
      });
      return;
    }

    if (!file.type.startsWith("image/")) {
      setAnalysis({
        kind: "rejected",
        message: `"${file.name}" is not an image. Attach a PNG, JPEG, or WebP screenshot.`,
      });
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setAnalysis({
        kind: "rejected",
        message: `"${file.name}" is larger than ${MAX_FILE_SIZE_BYTES / (1024 * 1024)} MB.`,
      });
      return;
    }

    const now = new Date();
    setAnalysis({
      kind: "accepted",
      caseRef: createCaseReference(now),
      openedAt: formatCaseTimestamp(now),
      evidenceType: "screenshot",
      evidenceSummary: `${file.name} · ${(file.size / 1024).toFixed(1)} KB`,
    });
  };

  return (
    <article className={styles.page}>
      <div className={styles.caseStrip}>
        <span className={styles.caseItem}>
          <span className={styles.caseKey}>Case file</span>
          <span className="mono">SS-INTAKE</span>
        </span>
        <span className={styles.caseItem}>
          <span className={styles.caseKey}>Stage</span>
          <span className="mono">Evidence collection</span>
        </span>
        <span className={styles.caseItem}>
          <span className={styles.caseKey}>Status</span>
          <span className="mono">Open</span>
        </span>
      </div>

      <header className={styles.intro}>
        <h1 className={styles.heading}>Examine the evidence.</h1>
        <p className={styles.lead}>{copy.lead}</p>
      </header>

      <hr className="rule" />

      <div className={styles.workspace}>
        <section className={styles.primary} aria-labelledby="evidence-heading">
          <h2 className="visually-hidden" id="evidence-heading">
            Evidence intake
          </h2>

          <InputTabs
            active={activeTab}
            onChange={(tab) => {
              setActiveTab(tab);
              setUploadError(null);
              if (analysis.kind === "rejected") setAnalysis({ kind: "empty" });
            }}
            messageEnabled={messageReady}
            screenshotEnabled={file !== null}
          />

          <div
            id="panel-message"
            role="tabpanel"
            aria-labelledby="tab-message"
            hidden={activeTab !== "message"}
          >
            <MessageInput value={messageText} onChange={setMessageText} />
          </div>

          <div
            id="panel-screenshot"
            role="tabpanel"
            aria-labelledby="tab-screenshot"
            hidden={activeTab !== "screenshot"}
          >
            <ScreenshotUpload
              file={file}
              onFileChange={setFile}
              onError={setUploadError}
            />
          </div>

          {uploadError ? (
            <p className={styles.inlineError} role="alert">
              {uploadError}
            </p>
          ) : null}

          <div className={styles.actions}>
            <AnalyseButton disabled={!canSubmit} onSubmit={handleSubmit} />
            <p className={styles.actionsNote}>
              {activeTab === "message"
                ? `Minimum ${MIN_MESSAGE_LENGTH} characters of original text.`
                : "PNG, JPEG, or WebP up to 8 MB."}
            </p>
          </div>

          <PrivacyNote language={language} />
        </section>

        <aside className={styles.margin} aria-label={copy.label}>
          <h2 className={styles.marginLabel}>{copy.label}</h2>
          <ol className={styles.noteList}>
            {READING_NOTES.map((note, index) => (
              <li key={note.title} className={styles.note}>
                <span className={styles.noteIndex}>{index + 1}</span>
                <div>
                  <p className={styles.noteTitle}>{note.title}</p>
                  <p className={styles.noteBody}>{note.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </aside>
      </div>

      <AnalysisPanel state={analysis} />
    </article>
  );
}
