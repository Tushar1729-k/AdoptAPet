# Texas Votes https://gitlab.com/forbesye/fitsbits/-/blob/master/back-end/app.py
# and Burnin' Up https://gitlab.com/caitlinlien/cs373-sustainability/-/blob/master/backend/main.py
# for overall structure of file

from sqlalchemy.sql.functions import count
from models import (
    AdoptablePet,
    AdoptionCenter,
    BreedsSpecies,
    db,
    app,
    adoptable_pet_schema,
    adoption_center_schema,
    breeds_species_schema,
)

from flask import Flask, request, make_response, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, Column, String, Integer
import urllib
import json
from dotenv import load_dotenv
import os

from AdoptablePet import *
from AdoptionCenter import *
from SpeciesBreed import *

from query_helpers import *

# base url: api.adoptapet.me

# sitewide search
@app.route("/search", methods=["GET"])
def search():
    queries = request.args.to_dict(flat=False)
    pet_query = db.session.query(AdoptablePet)
    center_query = db.session.query(AdoptionCenter)
    breed_query = db.session.query(BreedsSpecies)

    q = get_query("q", queries)
    if q:
        pet_query = search_adoptablepets(q, pet_query)
        center_query = search_centers(q, center_query)
        breed_query = search_breeds(q, breed_query)

    pet_count = pet_query.count()
    center_count = center_query.count()
    breed_count = breed_query.count()

    pet_result = adoptable_pet_schema.dump(pet_query, many=True)
    center_result = adoption_center_schema.dump(center_query, many=True)
    breed_result = breeds_species_schema.dump(breed_query, many=True)

    return {
        "breed_count": breed_count,
        "breeds": breed_result,
        "center_count": center_count,
        "centers": center_result,
        "pet_count": pet_count,
        "pets": pet_result,
    }


# -------------------- Adoptable Pets ---------------------


@app.route("/ap", methods=["GET"])
def pets():
    queries = request.args.to_dict(flat=False)
    pet_query = db.session.query(AdoptablePet)

    page = get_query("page", queries)
    if page == None:
        page = 1
    else:
        # Convert the given page number into an int
        page = int(page[0])

    breednames = get_query("breednames", queries)
    if breednames:
        pet_query = return_all_breeds(pet_query, queries)
    colors = get_query("colors", queries)
    if colors:
        pet_query = return_all_colors(pet_query, queries)

    # Searching
    q = get_query("q", queries)
    if q:
        pet_query = search_adoptablepets(q, pet_query)

    # Filtering
    pet_query = filter_adoptablepets(pet_query, queries)

    # Sorting
    sort = get_query("sort", queries)
    pet_query = sort_adoptablepets(sort, pet_query)

    count = pet_query.count()

    if page != -1:
        per_page = (
            int(get_query("perPage", queries).pop())
            if get_query("perPage", queries)
            else 20
        )
        pets = pet_query.paginate(page=page, per_page=per_page)

        result = adoptable_pet_schema.dump(pets.items, many=True)
    else:
        result = adoptable_pet_schema.dump(pet_query, many=True)

    return {"page": result, "count": count}


@app.route("/ap/<int:api_id>", methods=["GET"])
def ap_id(api_id):
    pet = db.session.query(AdoptablePet).filter_by(api_id=api_id)
    pet = adoptable_pet_schema.dump(pet, many=True)[0]
    return pet


# ---------------------- Adoption Centers ---------------


@app.route("/ac", methods=["GET"])
def centers():
    queries = request.args.to_dict(flat=False)

    center_query = db.session.query(AdoptionCenter)

    page = get_query("page", queries)
    if page == None:
        page = 1
    else:
        # Convert the given page number into an int
        page = int(page[0])

    cities = get_query("cities", queries)
    if cities:
        center_query = return_all_cities(center_query, queries)
    states = get_query("states", queries)
    if states:
        center_query = return_all_states(center_query, queries)
    zips = get_query("zips", queries)
    if zips:
        center_query = return_all_zips(center_query, queries)

    # searching
    q = get_query("q", queries)
    if q:
        center_query = search_centers(q, center_query)

    # filtering
    center_query = filter_centers(center_query, queries)

    # sorting
    sort = get_query("sort", queries)
    center_query = sort_centers(sort, center_query)

    count = center_query.count()

    if page != -1:
        per_page = (
            int(get_query("perPage", queries).pop())
            if get_query("perPage", queries)
            else 20
        )
        centers = center_query.paginate(page=page, per_page=per_page)

        result = adoption_center_schema.dump(centers.items, many=True)
    else:
        result = adoption_center_schema.dump(center_query, many=True)

    return {"page": result, "count": count}


@app.route("/ac/<int:api_id>", methods=["GET"])
def center_id(api_id):
    center = db.session.query(AdoptionCenter).filter_by(api_id=api_id)
    center = adoption_center_schema.dump(center, many=True)[0]
    return center


# ----------------- BreedsSpecies -------------------


@app.route("/sb", methods=["GET"])
def species_breeds():
    queries = request.args.to_dict(flat=False)
    sb_query = db.session.query(BreedsSpecies)
    page = get_query("page", queries)
    if page == None:
        page = 1
    else:
        # Convert the given page number into an int
        page = int(page[0])

    # return all weights
    weights = get_query("weights", queries)
    if weights:
        sb_query = return_all_weights(sb_query, queries)
    origins = get_query("origins", queries)
    if origins:
        sb_query = return_all_origins(sb_query, queries)
    lifeexps = get_query("lifeexps", queries)
    if lifeexps:
        sb_query = return_all_lifeexps(sb_query, queries)

    # searching
    q = get_query("q", queries)
    if q:
        sb_query = search_breeds(q, sb_query)

    # filtering
    sb_query = filter_breeds(sb_query, queries)

    # sorting
    sort = get_query("sort", queries)
    sb_query = sort_breeds(sort, sb_query)

    count = sb_query.count()

    if page != -1:
        per_page = (
            int(get_query("perPage", queries).pop())
            if get_query("perPage", queries)
            else 20
        )
        sb = sb_query.paginate(page=page, per_page=per_page)
        result = breeds_species_schema.dump(sb.items, many=True)
    else:
        result = breeds_species_schema.dump(sb_query, many=True)

    return {"page": result, "count": count}


@app.route("/sb/<int:api_id>", methods=["GET"])
def sb_id(api_id):
    sb = db.session.query(BreedsSpecies).filter_by(api_id=api_id)
    sb = breeds_species_schema.dump(sb, many=True)[0]
    return sb


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/favicon.ico")
def favicon():
    return send_from_directory(
        os.path.join(app.root_path, "static"),
        "icon.ico"
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
