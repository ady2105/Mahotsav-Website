from pydantic import BaseModel, EmailStr

from datetime import datetime
from typing import List, Optional

# Pydantic Models
class EventCreate(BaseModel):
    name: str
    description: str

class EventResponse(BaseModel):
    id: int
    name: str
    description: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class RegistrationCreate(BaseModel):
    event_id: int
    full_name: str
    email: EmailStr
    phone: str
    organization: Optional[str] = None

class RegistrationResponse(BaseModel):
    id: int
    event_id: int
    full_name: str
    email: str
    phone: str
    organization: Optional[str]
    registration_date: datetime
    event_name: str
    
    class Config:
        from_attributes = True
