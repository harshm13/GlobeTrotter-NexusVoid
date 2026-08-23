from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Basic API Info
    PROJECT_NAME: str = "GlobeTrotter API"
    
    # Database connection string (defaults to a local SQLite file for easy setup)
    DATABASE_URL: str = "sqlite:///./globetrotter.db" 
    
    # Security variables for JWT Tokens
    SECRET_KEY: str = "super-secret-key-change-this-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    class Config:
        # Tells Pydantic to read variables from the .env file
        env_file = ".env"

# Create a global settings object to use throughout the app
settings = Settings()