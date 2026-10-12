"""Case-intake service.

Phase 1 behaviour: accept evidence, allocate a case reference, and report the
case as pending. The actual examination logic (classification, identifier
extraction, recommended actions) is implemented in Phase 2 — until then this
service intentionally returns `result=None` rather than a fabricated
assessment.
"""

from __future__ import annotations

import secrets
from datetime import datetime, timezone

from app.schemas import AnalysisRequest, AnalysisResponse, AnalysisStatus
from app.schemas.analysis import EvidenceType

PENDING_MESSAGE = (
    "Evidence received and logged. Analysis is not yet connected; no "
    "classification or risk score has been produced."
)


def allocate_case_id() -> str:
    """Allocate a case reference, e.g. SS-2026-8F3A2C."""
    year = datetime.now(timezone.utc).year
    token = secrets.token_hex(3).upper()
    return f"SS-{year}-{token}"


def open_case(request: AnalysisRequest) -> AnalysisResponse:
    case_id = allocate_case_id()

    if request.evidence_type is EvidenceType.MESSAGE:
        received = f"{len(request.message_text or '')} characters of message text"
    else:
        received = request.file_name or "screenshot"

    return AnalysisResponse(
        case_id=case_id,
        status=AnalysisStatus.PENDING,
        message=f"{PENDING_MESSAGE} Received: {received}.",
        result=None,
    )
