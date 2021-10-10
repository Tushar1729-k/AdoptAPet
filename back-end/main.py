from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, Column, String, Integer
import urllib
import json
from dotenv import load_dotenv
import os

app = Flask(__name__)
app.debug = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Schema: "postgres+psycopg2://<USERNAME>:<PASSWORD>@<IP_ADDRESS>:<PORT>/<DATABASE_NAME>"

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("AWS_DB_KEY")

db = SQLAlchemy(app)

print(db)
