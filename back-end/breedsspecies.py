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
print("hello")
app.debug = True
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("AWS_DB_KEY")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)
path = "./datasets"

# Breeds/Species Model
class BreedsSpecies(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    species = db.Column(db.String())
    breed = db.Column(db.String())
    youth_name = db.Column(db.String())
    # get other fields from another api or db
    # lifeexp = db.Column(db.String())
    # size = db.Column(db.String())
    # issues = db.Column(db.String())
    # color = db.Column(db.String())
    # patterns = db.Column(db.String())


def __init__(self, species="NaN", breed="NaN", youth_name="NaN"):
    self.species = species
    self.breed = breed
    self.youth_name = youth_name


# cache
species_id_to_name = {}


def populate_breeds():
    breeds_url = "https://api.rescuegroups.org/v5/public/animals/breeds?limit=250"
    querystring = {"format": "json"}
    headers = {"Authorization": "wmUYpgAP"}
    breeds_response = requests.request(
        "GET", breeds_url, headers=headers, params=querystring
    )
    breeds_data = breeds_response.json()
    breed_list = []
    for item in breeds_data["data"]:
        breed = item["attributes"]["name"]
        species_id = item["relationships"]["species"]["data"][0]["id"]
        if species_id in species_id_to_name:
            species_name = species_id_to_name[species_id][0]
            species_youth_name = species_id_to_name[species_id][1]
        else:
            species_url = (
                "https://api.rescuegroups.org/v5/public/animals/species/" + species_id
            )
            species_response = requests.request(
                "GET", species_url, headers=headers, params=querystring
            )
            species_data = species_response.json()
            species_name = species_data["data"][0]["attributes"]["singular"]
            species_youth_name = species_data["data"][0]["attributes"]["youngSingular"]
            species_id_to_name[species_id] = [species_name, species_youth_name]
        new_breed = BreedsSpecies(
            species=species_name, breed=breed, youth_name=species_youth_name
        )
        breed_list.append(new_breed)

    num_pages = breeds_data["meta"]["pages"]
    for page in range(2, num_pages + 1):
        breeds_url = (
            "https://api.rescuegroups.org/v5/public/animals/breeds?limit=250&page="
            + str(page)
        )
        breeds_response = requests.request(
            "GET", breeds_url, headers=headers, params=querystring
        )
        breeds_data = breeds_response.json()
        for item in breeds_data["data"]:
            breed = item["attributes"]["name"]
            species_id = item["relationships"]["species"]["data"][0]["id"]
            if species_id in species_id_to_name:
                species_name = species_id_to_name[species_id][0]
                species_youth_name = species_id_to_name[species_id][1]
            else:
                species_url = (
                    "https://api.rescuegroups.org/v5/public/animals/species/"
                    + species_id
                )
                species_response = requests.request(
                    "GET", species_url, headers=headers, params=querystring
                )
                species_data = species_response.json()
                species_name = species_data["data"][0]["attributes"]["singular"]
                species_youth_name = species_data["data"][0]["attributes"][
                    "youngSingular"
                ]
                species_id_to_name[species_id] = [species_name, species_youth_name]
            new_breed = BreedsSpecies(
                species=species_name, breed=breed, youth_name=species_youth_name
            )
            breed_list.append(new_breed)

    db.session.add_all(breed_list)
    db.session.commit()


if __name__ == "__main__":
    db.drop_all()
    db.create_all()
    populate_breeds()
