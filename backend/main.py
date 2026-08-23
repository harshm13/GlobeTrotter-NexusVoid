from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
import models
from routers import users, trips, stops, activities

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="GlobeTrotter API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (safest for testing right now)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ADD THIS LINE TO CONNECT YOUR USER,trip,stops,activites
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(trips.router, prefix="/api/trips", tags=["Trips"])
app.include_router(stops.router, prefix="/api/stops", tags=["Stops"])
app.include_router(activities.router, prefix="/api/activities", tags=["Activities"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the GlobeTrotter Hackathon API!"}
