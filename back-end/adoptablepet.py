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

# import pandas as pdp
# import numpy as np
# import requests
from time import sleep
import flask_marshmallow as ma
from flask_marshmallow import Marshmallow

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))

load_dotenv()
print("hello")
app.debug = True
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("AWS_DB_KEY")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)
path = "./datasets"

# Create tables
class AdoptablePet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    pet_name = db.Column(db.String())
    pet_breed = db.Column(db.String())
    pet_sex = db.Column(db.String())
    pet_age = db.Column(db.String())
    pet_color = db.Column(db.String())
    pet_desc = db.Column(db.String())
    # pet_allergies = db.Column(db.String())
    # pet_diet = db.Column(db.String())
    # pet_issues = db.Column(db.String())
    # pet_hearing = db.Column(db.String())
    # pet_sight = db.Column(db.String())


def __init__(
    self,
    pet_name="NaN",
    pet_breed="NaN",
    pet_sex="NaN",
    pet_age="NaN",
    pet_color="NaN",
    pet_desc="NaN"
    # pet_allergies="NaN", pet_diet="NaN",
    # pet_issues="NaN", pet_hearing="NaN", pet_sight="NaN"
):
    self.pet_name = pet_name
    self.pet_breed = pet_breed
    self.pet_sex = pet_sex
    self.pet_age = pet_age
    self.pet_color = pet_color
    self.pet_desc = pet_desc
    # self.pet_allergies = pet_allergies
    # self.pet_diet = pet_diet
    # self.pet_issues = pet_issues
    # self.pet_hearing = pet_hearing
    # self.pet_sight = pet_sight


# db.create_all()

### Table for Adoptable Pet ###


def populate_pets():
    # Get API request
    request = urllib.request.Request(
        "https://api.rescuegroups.org/v5/public/animals?limit=250"
    )
    request.add_header("Authorization", "wmUYpgAP")
    r = urllib.request.urlopen(request)
    data = json.loads(r.read())
    # print(data)
    pet_list = []
    for item in data["data"]:
        pet_name = item["attributes"]["name"] if "name" in item["attributes"] else ""
        pet_breed = (
            item["attributes"]["breedString"]
            if "breedString" in item["attributes"]
            else ""
        )
        pet_sex = item["attributes"]["sex"] if "sex" in item["attributes"] else ""
        pet_age = (
            item["attributes"]["ageGroup"] if "ageGroup" in item["attributes"] else ""
        )
        pet_color = (
            item["attributes"]["colorDetails"]
            if "colorDetails" in item["attributes"]
            else ""
        )
        pet_desc = (
            item["attributes"]["descriptionHtml"]
            if "descriptionHtml" in item["attributes"]
            else ""
        )
        # new_pet = AdoptablePet(pet_name=item['attributes']["name"], pet_breed=item['attributes']["breedString"],
        # 						pet_sex=item['attributes']["sex"], pet_age=item['attributes']["ageGroup"],
        # 						pet_color=item['attributes']['colorDetails'],
        # 						pet_desc=item['attributes']['descriptionHtml'])
        # pet_list.append(new_pet)
        new_pet = AdoptablePet(
            pet_name=pet_name,
            pet_breed=pet_breed,
            pet_sex=pet_sex,
            pet_age=pet_age,
            pet_color=pet_color,
            pet_desc=pet_desc,
        )
        pet_list.append(new_pet)
    # print(pet_list)
    # flush script db.reset
    # loop through all pages api returns
    # db.drop_all()
    # db.create_all()
    db.session.add_all(pet_list)
    db.session.commit()


if __name__ == "__main__":
    db.drop_all()
    db.create_all()
    populate_pets()
