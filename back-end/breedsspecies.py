from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
# from flask_marshmellow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from dotenv import load_dotenv
from sqlalchemy import Column, String, Integer
from flask import request
import urllib
import os
import json
from sqlalchemy import create_engine
import flask_restless
# import pandas as pd
# import numpy as np
import requests
from time import sleep
import flask_marshmallow as ma
from flask_marshmallow import Marshmallow

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))

load_dotenv()
print('hello')
app.debug = True
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("AWS_DB_KEY")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)
path = "./datasets"

# Breeds/Species Model
class BreedsSpecies(db.Model) :
	breed_id = db.Column(db.Integer, primary_key=True)
	species = db.Column(db.String())
	lifeexp = db.Column(db.String())
	size = db.Column(db.String())
	issues = db.Column(db.String())

