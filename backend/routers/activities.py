from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models
from pydantic import BaseModel
from routers.users import get_current_user

router = APIRouter()

class ActivityCreate(BaseModel):
    stop_id: int
    name: str
    cost: float

@router.post("/")
def add_activity(activity: ActivityCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    # 1. Verify the Stop exists and belongs to a Trip owned by this user
    # We do a 'join' to check the ownership of the parent trip
    stop = db.query(models.Stop).join(models.Trip).filter(
        models.Stop.id == activity.stop_id, 
        models.Trip.owner_id == current_user.id
    ).first()
    
    if not stop:
        raise HTTPException(status_code=404, detail="Stop not found or unauthorized")
        
    # 2. Add the activity
    new_activity = models.Activity(**activity.dict())
    db.add(new_activity)
    
    # 3. Update the trip's total budget
    trip = db.query(models.Trip).filter(models.Trip.id == stop.trip_id).first()
    trip.total_budget += activity.cost
    
    db.commit()
    db.refresh(new_activity)
    return new_activity

@router.get("/{stop_id}")
def get_stop_activities(stop_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    # Verify ownership before returning the activities
    stop = db.query(models.Stop).join(models.Trip).filter(
        models.Stop.id == stop_id, 
        models.Trip.owner_id == current_user.id
    ).first()
    
    if not stop:
        raise HTTPException(status_code=404, detail="Stop not found")
        
    return db.query(models.Activity).filter(models.Activity.stop_id == stop_id).all()