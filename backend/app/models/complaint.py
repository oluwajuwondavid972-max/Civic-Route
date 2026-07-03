from datetime import datetime
from typing import Literal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

InputMode = Literal["text", "voice"]
Urgency = Literal["Low", "Medium", "High"]
ComplaintStatus = Literal["Pending", "In Progress", "Resolved"]


class ComplaintSubmitRequest(BaseModel):
    text: str = Field(min_length=1)
    lgc_id: str = Field(min_length=1)


class ComplaintCreate(BaseModel):
    raw_text: str
    input_mode: InputMode
    original_language: str | None = None
    category: str
    urgency: Urgency
    extracted_location: str | None = None
    summary: str
    lgc_id: str
    status: ComplaintStatus = "Pending"


class ComplaintResponse(ComplaintCreate):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime
    updated_at: datetime


class ComplaintStatusUpdate(BaseModel):
    status: Literal["In Progress", "Resolved"]


class ComplaintListQuery(BaseModel):
    status: ComplaintStatus | None = None
    category: str | None = None
    limit: int = Field(default=20, ge=1, le=100)
    offset: int = Field(default=0, ge=0)
