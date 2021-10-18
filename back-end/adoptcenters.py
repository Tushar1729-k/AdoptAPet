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

# Adoptable Pet Model
# class AdoptablePet(db.Model) :
# 	pet_id = db.Column(db.Integer, primary_key=True)
# 	pet_name = db.Column(db.String())
# 	pet_breed = db.Column(db.String())
# 	pet_sex = db.Column(db.String())
# 	pet_age = db.Column(db.String())
# 	pet_color = db.Column(db.String())
# 	pet_desc = db.Column(db.String())

# Adoption Center Model
class AdoptionCenter(db.Model) :
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String())
	city = db.Column(db.String())
	state = db.Column(db.String())
	zipcode = db.Column(db.String())
	services = db.Column(db.String())

def __init__(self, name="NaN", city="NaN", state="NaN", zipcode="NaN", services="NaN") :
	self.name = name
	self.city = city
	self.state = state
	self.zipcode = zipcode
	self.services = services

db.create_all()

def populate_centers() :
	url = "https://api.rescuegroups.org/v5/public/orgs?limit=250"
	querystring = {"format": "json"}
	headers = {
		'Authorization': "wmUYpgAP"
	}
	response = requests.request("GET", url, headers=headers, params=querystring)
	data = response.json()
	org_list = []
	# print(orgs_list)
	for item in data['data'] :
		name = item['attributes']['name'] if 'name' in item['attributes'] else ''
		city = item['attributes']['city'] if 'city' in item['attributes'] else ''
		state = item['attributes']['state'] if 'state' in item['attributes'] else ''
		zipcode = item['attributes']['postalcode'] if 'postalcode' in item['attributes'] else ''
		services = item['attributes']['services'] if 'services' in item['attributes'] else ''
		new_center = AdoptionCenter(name=name, city=city, state=state, zipcode=zipcode, services=services)
		org_list.append(new_center)

	db.session.add_all(org_list)
	db.session.commit()

if __name__ == '__main__' :
	db.drop_all()
	db.create_all()
	populate_centers()