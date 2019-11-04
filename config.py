from dotenv import load_dotenv
import os

load_dotenv()

class Config:
    SQL_ALCHEMY_DATABASE_URI = "sqlite:///db.sqlite"
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY")
