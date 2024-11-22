import random
#
from fastapi.exceptions import HTTPException
from fastapi.routing import APIRouter
from fastapi import status, Depends
from sqlalchemy.orm import Session
from sqlalchemy.sql import text
#
from .database import get_db
from .utils import recommend

routes = APIRouter()



@routes.get("/", status_code=status.HTTP_200_OK )
async def read_all(skip: int = 0, limit: int = 10, val: int = 1, db: Session = Depends(get_db)):
    data = {}
    users = [random.randrange(1, 610) for _ in range(5)]
    users.insert(0, val)
    
    statement = text("""
        SELECT movies.title, ratings.rating 
        FROM ratings 
        JOIN movies ON movies.movie_id = ratings.movie_id 
        WHERE ratings.user_id = :user_id
    """)

    try:
        for id in users:
            ratings = db.execute(statement, {"user_id": id})
            result = ratings.fetchall()
            data[id] = [list(row) for row in result]

        list_recom = recommend(users[0], data)

        return list_recom
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail=f"Reservation Not Found: {e}"
        )
    

@routes.get("", status_code=status.HTTP_200_OK)
async def index():
    pass