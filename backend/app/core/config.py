"""Application configuration.

Values are read from environment variables so nothing sensitive is committed.
See backend/.env.example for the documented list.
"""

from __future__ import annotations

import os
from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Runtime settings for the ScamShield backend."""

    model_config = SettingsConfigDict(
        env_prefix="scamshield_",
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_name: str = Field(default="ScamShield AI")
    version: str = Field(default="0.1.0")
    api_prefix: str = Field(default="/api")

    # Comma-separated list of allowed origins for local frontend development.
    cors_origins: str = Field(
        default="http://localhost:5173,http://127.0.0.1:5173"
    )

    # Optional provider keys. Never commit real values — set them in .env only.
    llm_api_key: str | None = Field(default=None)

    debug: bool = Field(default=False)

    @property
    def cors_origin_list(self) -> list[str]:
        origins = [
            origin.strip() for origin in self.cors_origins.split(",") if origin.strip()
        ]
        if not origins:
            origins = ["http://localhost:5173"]
        return origins

    @property
    def is_production(self) -> bool:
        return os.getenv("SCAMSHIELD_ENV", "development").lower() == "production"


@lru_cache
def get_settings() -> Settings:
    return Settings()
