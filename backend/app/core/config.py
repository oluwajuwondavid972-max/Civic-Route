from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    supabase_url: str = Field(validation_alias="SUPABASE_URL")
    supabase_key: str = Field(validation_alias="SUPABASE_KEY")
    gemini_api_key: str = Field(validation_alias="GEMINI_API_KEY")
    frontend_origin: str = Field(default="http://localhost:5173", validation_alias="FRONTEND_ORIGIN")


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()
