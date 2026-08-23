from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    
    trips = relationship("Trip", back_populates="owner")

class Trip(Base):
    __tablename__ = "trips"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    destination = Column(String)
    start_date = Column(String) 
    end_date = Column(String)
    total_budget = Column(Float, default=0.0)
    
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="trips")
    stops = relationship("Stop", back_populates="trip") # NEW: Links Trip to Stops

# NEW: Represents a single day or city in a trip
class Stop(Base):
    __tablename__ = "stops"
    id = Column(Integer, primary_key=True, index=True)
    trip_id = Column(Integer, ForeignKey("trips.id"))
    city_name = Column(String)
    date = Column(String)
    
    trip = relationship("Trip", back_populates="stops")
    activities = relationship("Activity", back_populates="stop")

# NEW: Represents things to do at a specific stop
class Activity(Base):
    __tablename__ = "activities"
    id = Column(Integer, primary_key=True, index=True)
    stop_id = Column(Integer, ForeignKey("stops.id"))
    name = Column(String)
    cost = Column(Float, default=0.0)
    
    stop = relationship("Stop", back_populates="activities")