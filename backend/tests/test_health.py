from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_reports_running_service() -> None:
    response = client.get("/api/health")
    assert response.status_code == 200

    body = response.json()
    assert body["status"] == "ok"
    assert body["service"] == "ScamShield AI"
    assert body["version"]
    assert body["time"]


def test_analysis_returns_pending_without_fabricated_result() -> None:
    payload = {
        "evidence_type": "message",
        "language": "en",
        "message_text": "Your bank account will be closed today. Verify now: http://example.test/login",
    }
    response = client.post("/api/analysis", json=payload)

    assert response.status_code == 202
    body = response.json()
    assert body["status"] == "pending"
    assert body["result"] is None
    assert body["case_id"].startswith("SS-")
    assert body["message"]


def test_analysis_requires_message_text_for_message_evidence() -> None:
    response = client.post(
        "/api/analysis", json={"evidence_type": "message", "language": "en"}
    )
    assert response.status_code == 422
