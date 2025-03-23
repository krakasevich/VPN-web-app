from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from .database import SessionLocal, engine
from . import models
import hashlib

# Creating tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Configuring CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # URL React app
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# The data model from the client
class UserCreate(BaseModel):
    username: str
    password: str

# Dependency for getting a database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# The endpoint for registration
@app.post("/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    # Checking if the user exists
    db_user = db.query(models.User).filter(models.User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="The user already exists")

    # Hashing the password
    hashed_password = hashlib.sha256(user.password.encode()).hexdigest()
    
    # Создаем нового пользователя
    db_user = models.User(
        username=user.username,
        password=hashed_password
    )
    
    # Creating a new user
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return {"message": "The user has been successfully registered"}

# The entry endpoint
@app.post("/login")
def login_user(user: UserCreate, db: Session = Depends(get_db)):
    # Hashing the password for comparison
    hashed_password = hashlib.sha256(user.password.encode()).hexdigest()
    
    # Checking the credentials
    db_user = db.query(models.User).filter(
        models.User.username == user.username,
        models.User.password == hashed_password
    ).first()
    
    if db_user:
        return {"message": "The login was completed successfully"}
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")