const CASE_PREFIX = "SS";

function pad(value: number, length = 4): string {
  return String(value).padStart(length, "0");
}

/** Builds a stable, human-readable case reference for the current session. */
export function createCaseReference(date: Date = new Date()): string {
  const year = date.getUTCFullYear();
  const sequence = (date.getTime() / 1000) % 10000;
  return `${CASE_PREFIX}-${year}-${pad(Math.floor(sequence))}`;
}

/** Case-file style timestamp, e.g. 2026-10-13 09:42 UTC. */
export function formatCaseTimestamp(date: Date = new Date()): string {
  return `${date.toISOString().slice(0, 16).replace("T", " ")} UTC`;
}
