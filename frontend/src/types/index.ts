export type Language = "en" | "hi";

export type EvidenceType = "message" | "screenshot";

export type RiskLevel = "low" | "moderate" | "high" | "critical";

export interface AnalysisRequest {
  evidenceType: EvidenceType;
  language: Language;
  messageText?: string;
  fileName?: string;
  mimeType?: string;
  fileSizeBytes?: number;
}

export interface SuspiciousPhrase {
  phrase: string;
  category: string;
  note: string;
}

export interface AnalysisResult {
  caseId: string;
  status: "complete";
  riskLevel: RiskLevel;
  summary: string;
  suspiciousPhrases: SuspiciousPhrase[];
  recommendedActions: string[];
  createdAt: string;
}

export interface AnalysisResponse {
  caseId: string;
  status: "pending" | "complete";
  message: string;
  result: AnalysisResult | null;
}

export interface HealthResponse {
  status: string;
  service: string;
  version: string;
  time: string;
}
