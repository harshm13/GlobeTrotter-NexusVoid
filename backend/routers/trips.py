from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
import models
from pydantic import BaseModel
from routers.users import get_current_user

router = APIRouter()

# What the frontend needs to send to create a trip
class TripCreate(BaseModel):
    title: str
    destination: str
    start_date: str
    end_date: str
    total_budget: float

@router.post("/")
def create_trip(trip: TripCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    # Create the trip and automatically link it to the logged-in user's ID
    new_trip = models.Trip(**trip.dict(), owner_id=current_user.id)
    db.add(new_trip)
    db.commit()
    db.refresh(new_trip)
    return new_trip

@router.get("/")
def get_my_trips(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    # Fetch ONLY the trips that belong to this user
    return db.query(models.Trip).filter(models.Trip.owner_id == current_user.id).all()