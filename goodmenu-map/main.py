from pydantic import BaseModel
from typing import List
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///./restaurants.db"

Base = declarative_base()

class Store(Base):
    __tablename__ = "stores"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    phone = Column(String, index=True)
    menu = Column(String, index=True)
    link = Column(String, index=True)
    latitude = Column(String, index=True)
    longitude = Column(String, index=True)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)

app = FastAPI()

class StoreCreate(BaseModel):
    name: str
    phone: str
    menu: str
    link: str
    latitude: str
    longitude: str

class StoreResponse(StoreCreate):
    id: int

@app.get("/stores/", response_model=List[StoreResponse])
def read_stores():
    db = SessionLocal()
    stores = db.query(Store).all()
    return stores
