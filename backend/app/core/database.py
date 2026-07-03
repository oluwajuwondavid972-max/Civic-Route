from fastapi import HTTPException, Request, status
from supabase import AsyncClient, acreate_client

from app.core.config import get_settings


async def init_supabase_client(app) -> None:
    settings = get_settings()
    app.state.supabase = await acreate_client(settings.supabase_url, settings.supabase_key)


async def get_supabase_client(request: Request) -> AsyncClient:
    client = getattr(request.app.state, "supabase", None)
    if client is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Supabase client is not ready")
    return client
