from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.complaints import router as complaints_router
from app.api.voice import router as voice_router
from app.core.config import get_settings
from app.core.database import init_supabase_client


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_supabase_client(app)
    yield


def create_app() -> FastAPI:
    settings = get_settings()
    app = FastAPI(title="Civic Route API", lifespan=lifespan)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=[settings.frontend_origin],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(complaints_router)
    app.include_router(voice_router)
    return app


app = create_app()