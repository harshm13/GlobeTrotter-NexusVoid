from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models
from pydantic import BaseModel
from routers.users import get_current_user

router = APIRouter()

class StopCreate(BaseModel):
    trip_id: int
    city_name: str
    date: str

@router.post("/")
def add_stop(stop: StopCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    # Verify the trip actually belongs to the person trying to edit it
    trip = db.query(models.Trip).filter(models.Trip.id == stop.trip_id, models.Trip.owner_id == current_user.id).first()
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found or unauthorized")
        
    new_stop = models.Stop(**stop.dict())
    db.add(new_stop)
    db.commit()
    db.refresh(new_stop)
    return new_stop

@router.get("/{trip_id}")
def get_trip_stops(trip_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    # Verify ownership before returning the itinerary data
    trip = db.query(models.Trip).filter(models.Trip.id == trip_id, models.Trip.owner_id == current_user.id).first()
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    
    return db.query(models.Stop).filter(models.Stop.trip_id == trip_id).all()