from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os

# Texas Votes https://gitlab.com/forbesye/fitsbits/-/blob/master/back-end/db.py
# for overall structure of file

def init_db(app):
    load_dotenv()
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("AWS_DB_KEY")
    return SQLAlchemy(app)
