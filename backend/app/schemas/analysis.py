"""Analysis request and response schemas.

Phase 1 defines the contract only. The response models deliberately include
null placeholders for analysis fields that are not implemented yet — the API
will never fabricate a risk level, suspicious-phrase list, or recommendation.
"""

from __future__ import annotations

from enum import Enum
from typing import Literal

from pydantic import BaseModel, Field, model_validator


class EvidenceType(str, Enum):
    MESSAGE = "message"
    SCREENSHOT = "screenshot"


class Language(str, Enum):
    EN = "en"
    HI = "hi"


class RiskLevel(str, Enum):
    LOW = "low"
    MODERATE = "moderate"
    HIGH = "high"
    CRITICAL = "critical"


class AnalysisStatus(str, Enum):
    PENDING = "pending"
    COMPLETE = "complete"


class AnalysisRequest(BaseModel):
    """Evidence submitted for examination."""

    evidence_type: EvidenceType
    language: Language = Language.EN
    message_text: str | None = None
    file_name: str | None = None
    mime_type: str | None = None
    file_size_bytes: int | None = Field(default=None, ge=0)

    @model_validator(mode="after")
    def validate_evidence(self) -> "AnalysisRequest":
        if self.evidence_type is EvidenceType.MESSAGE and not (
            self.message_text and self.message_text.strip()
        ):
            raise ValueError("message_text is required when evidence_type is 'message'")
        if self.evidence_type is EvidenceType.SCREENSHOT and not self.file_name:
            raise ValueError("file_name is required when evidence_type is 'screenshot'")
        return self


class SuspiciousPhrase(BaseModel):
    """A single highlighted phrase and why it matters."""

    phrase: str
    category: str
    note: str


class AnalysisResult(BaseModel):
    """Completed analysis output. Not produced until Phase 2."""

    case_id: str
    status: Literal[AnalysisStatus.COMPLETE] = AnalysisStatus.COMPLETE
    risk_level: RiskLevel
    summary: str
    suspicious_phrases: list[SuspiciousPhrase] = Field(default_factory=list)
    recommended_actions: list[str] = Field(default_factory=list)
    created_at: str


class AnalysisResponse(BaseModel):
    """Envelope returned when evidence is submitted."""

    case_id: str
    status: AnalysisStatus
    message: str
    result: AnalysisResult | None = None


class HealthResponse(BaseModel):
    """Backend liveness payload."""

    status: str
    service: str
    version: str
    time: str
