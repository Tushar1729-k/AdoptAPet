from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmellow import Marshmallow
# from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from sqlalchemy import Column, String, Integer
from flask import request
import urllib
import os
import json
from sqlalchemy import create_engine
import flask_restless
import pandas as pd
import numpy as np
import requests
from time import sleep

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))

app.debug = True
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("AWS_DB_KEY")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)
path = "./datasets"

# Create tables
class AdoptablePet(db.Model) :
	pet_id = db.Column(db.Integer, primary_key=True)
	pet_name = db.Column(db.String())
	pet_breed = db.Column(db.String())
	pet_sex = db.Column(db.String())
	pet_age = db.Column(db.String())
	pet_color = db.Column(db.String())
	pet_desc = db.Column(db.String())
	pet_allergies = db.Column(db.String())
	pet_diet = db.Column(db.String())
	pet_issues = db.Column(db.String())
	pet_hearing = db.Column(db.String())
	pet_sight = db.Column(db.String())

def __init__(self, pet_name="NaN", pet_breed="NaN", pet_sex="NaN", pet_age="NaN", 
							pet_color="NaN", pet_desc="NaN", pet_allergies="NaN", pet_diet="NaN",
							pet_issues="NaN", pet_hearing="NaN", pet_sight="NaN") :
	self.pet_name = pet_name
	self.pet_breed = pet_breed
	self.pet_sex = pet_sex
	self.pet_age = pet_age
	self.pet_color = pet_color
	self.pet_desc = pet_desc
	self.pet_allergies = pet_allergies
	self.pet_diet = pet_diet
	self.pet_issues = pet_issues
	self.pet_hearing = pet_hearing
	self.pet_sight = pet_sight

db.create_all()

### Table for Adoptable Pet ###

# Get API request
request_url = 'https://api.rescuegroups.org/v5/public/animals'
r = urllib.request.urlopen(request_url)
data = json.loads(r.read())
pet_list = []
for item in data[1] :
	new_pet = AdoptablePet(pet_name=item["name"], pet_)