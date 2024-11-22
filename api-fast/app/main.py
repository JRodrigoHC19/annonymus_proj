from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
#
from .database import Base, engine
from .routes import routes
import app.db.models

app = FastAPI()
origins = ["*"]


# SYNCHRONIZE MODELS TO DATABASE
Base.metadata.create_all(bind=engine)


# ROUTES
app.include_router(routes, prefix="/api/recommendations")


# MIDDLEWARES
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"]
)


# INDEX
@app.get("/")
def index():
    return {"message": "Server FastAPI is running"}