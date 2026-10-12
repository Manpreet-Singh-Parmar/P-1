"""HTTP routes for the ScamShield backend."""

from __future__ import annotations

from datetime import datetime, timezone

from fastapi import APIRouter

from app.core.config import get_settings
from app.schemas import AnalysisRequest, AnalysisResponse, HealthResponse
from app.services.analysis_service import open_case

router = APIRouter()


@router.get("/health", response_model=HealthResponse)
def health() -> HealthResponse:
    """Liveness probe used by the frontend header indicator."""
    settings = get_settings()
    return HealthResponse(
        status="ok",
        service=settings.app_name,
        version=settings.version,
        time=datetime.now(timezone.utc).isoformat(timespec="seconds"),
    )


@router.post("/analysis", response_model=AnalysisResponse, status_code=202)
def submit_analysis(payload: AnalysisRequest) -> AnalysisResponse:
    """Accept evidence and open a case.

    Phase 1 validates the payload and returns an explicit "pending" response.
    The analysis engine is connected in Phase 2; no risk assessment is produced
    or implied here.
    """
    return open_case(payload)
