import os
#
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine


SQLITE_FILE = "../db.sqlite"
BASE_DIR = os.path.dirname(os.path.realpath(__file__))
SQLALCHEMY_DATABASE_URL = f"sqlite:///{os.path.join(BASE_DIR, SQLITE_FILE)}"
# SQLALCHEMY_DATABASE_URL = "postgresql://postgres:postgres@db-postgres:5432/test"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
