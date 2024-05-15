from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()

class Restaurant(BaseModel):
    name: str
    address: str
    latitude: float
    longitude: float

# 임시 데이터베이스
restaurants = [
    Restaurant(name="Restaurant 1", address="Address 1", latitude=37.5665, longitude=126.9780),
    Restaurant(name="Restaurant 2", address="Address 2", latitude=37.5670, longitude=126.9790),
]

@app.get("/restaurants", response_model=List[Restaurant])
def get_restaurants():
    return restaurants

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
