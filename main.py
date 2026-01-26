from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, HTMLResponse, JSONResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy import create_engine, Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, relationship
from models import *
from datetime import datetime
from typing import List, Optional
import os

# Database setup
SQLALCHEMY_DATABASE_URL = "sqlite:///./event_registrations.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Database Models
class Event(Base):
    __tablename__ = "events"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    description = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    registrations = relationship("Registration", back_populates="event")

class Registration(Base):
    __tablename__ = "registrations"
    
    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer, ForeignKey("events.id"))
    full_name = Column(String, index=True)
    email = Column(String, index=True)
    phone = Column(String)
    organization = Column(String, nullable=True)
    registration_date = Column(DateTime, default=datetime.utcnow)
    
    event = relationship("Event", back_populates="registrations")

# Create tables
Base.metadata.create_all(bind=engine)

# FastAPI app
app = FastAPI(title="Event Registration API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ============================================
# API ENDPOINTS (with /api prefix)
# ============================================

# Event endpoints
@app.post("/api/events/", response_model=EventResponse)
def create_event(event: EventCreate, db: Session = Depends(get_db)):
    db_event = db.query(Event).filter(Event.name == event.name).first()
    if db_event:
        raise HTTPException(status_code=400, detail="Event already exists")
    
    new_event = Event(name=event.name, description=event.description)
    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    return new_event

@app.get("/api/events/", response_model=List[EventResponse])
def get_events(db: Session = Depends(get_db)):
    events = db.query(Event).all()
    return events

@app.get("/api/events/{event_id}", response_model=EventResponse)
def get_event(event_id: int, db: Session = Depends(get_db)):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event

# Registration endpoints
@app.post("/api/registrations/", response_model=RegistrationResponse)
def create_registration(registration: RegistrationCreate, db: Session = Depends(get_db)):
    # Check if event exists
    event = db.query(Event).filter(Event.id == registration.event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    # Check for duplicate registration
    existing = db.query(Registration).filter(
        Registration.event_id == registration.event_id,
        Registration.email == registration.email
    ).first()
    
    if existing:
        raise HTTPException(status_code=400, detail="Already registered for this event")
    
    new_registration = Registration(**registration.dict())
    db.add(new_registration)
    db.commit()
    db.refresh(new_registration)
    
    # Format response with event name
    response = RegistrationResponse(
        id=new_registration.id,
        event_id=new_registration.event_id,
        full_name=new_registration.full_name,
        email=new_registration.email,
        phone=new_registration.phone,
        organization=new_registration.organization,
        registration_date=new_registration.registration_date,
        event_name=event.name
    )
    return response

@app.get("/api/registrations/", response_model=List[RegistrationResponse])
def get_all_registrations(db: Session = Depends(get_db)):
    registrations = db.query(Registration).join(Event).all()
    
    response = [
        RegistrationResponse(
            id=reg.id,
            event_id=reg.event_id,
            full_name=reg.full_name,
            email=reg.email,
            phone=reg.phone,
            organization=reg.organization,
            registration_date=reg.registration_date,
            event_name=reg.event.name
        )
        for reg in registrations
    ]
    return response

@app.get("/api/registrations/event/{event_id}", response_model=List[RegistrationResponse])
def get_event_registrations(event_id: int, db: Session = Depends(get_db)):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    registrations = db.query(Registration).filter(Registration.event_id == event_id).all()
    
    response = [
        RegistrationResponse(
            id=reg.id,
            event_id=reg.event_id,
            full_name=reg.full_name,
            email=reg.email,
            phone=reg.phone,
            organization=reg.organization,
            registration_date=reg.registration_date,
            event_name=event.name
        )
        for reg in registrations
    ]
    return response

@app.delete("/api/registrations/{registration_id}")
def delete_registration(registration_id: int, db: Session = Depends(get_db)):
    registration = db.query(Registration).filter(Registration.id == registration_id).first()
    if not registration:
        raise HTTPException(status_code=404, detail="Registration not found")
    
    db.delete(registration)
    db.commit()
    return {"message": "Registration deleted successfully"}

@app.get("/api/dashboard/stats")
def get_dashboard_stats(db: Session = Depends(get_db)):
    total_events = db.query(Event).count()
    total_registrations = db.query(Registration).count()
    
    events_with_counts = db.query(
        Event.id, Event.name, Event.description
    ).all()
    
    event_stats = []
    for event_id, event_name, event_desc in events_with_counts:
        count = db.query(Registration).filter(Registration.event_id == event_id).count()
        event_stats.append({
            "event_id": event_id,
            "event_name": event_name,
            "description": event_desc,
            "registration_count": count
        })
    
    return {
        "total_events": total_events,
        "total_registrations": total_registrations,
        "event_stats": event_stats
    }

# ============================================
# SERVE STATIC FILES
# ============================================

# Mount static directory for all assets
app.mount("/assets", StaticFiles(directory="static/assets"), name="assets")
app.mount("/pages", StaticFiles(directory="static/pages"), name="pages")
app.mount("/components", StaticFiles(directory="static/components"), name="components")


# Serve CSS and JS files from static root
@app.get("/style.css")
def serve_css():
    return FileResponse("static/style.css")

@app.get("/script.js")
def serve_js():
    return FileResponse("static/script.js")

# Serve index.html at root
@app.get("/")
def serve_index():
    return FileResponse("static/index.html")

# Optional: Admin dashboard route using Jinja2 (if you want to create one)
# Uncomment this if you create a templates folder with dashboard.html
"""
templates = Jinja2Templates(directory="templates")

@app.get("/admin/dashboard", response_class=HTMLResponse)
def admin_dashboard(request: Request, db: Session = Depends(get_db)):
    registrations = db.query(Registration).join(Event).all()
    events = db.query(Event).all()
    
    formatted_registrations = [
        {
            "id": reg.id,
            "full_name": reg.full_name,
            "email": reg.email,
            "phone": reg.phone,
            "organization": reg.organization,
            "event_name": reg.event.name,
            "registration_date": reg.registration_date
        }
        for reg in registrations
    ]
    
    return templates.TemplateResponse(
        "dashboard.html",
        {
            "request": request,
            "registrations": formatted_registrations,
            "events": events,
            "total_registrations": len(registrations)
        }
    )
"""

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)