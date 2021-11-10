# Texas Votes https://gitlab.com/forbesye/fitsbits/-/blob/master/back-end/app.py
# and Burnin' Up https://gitlab.com/caitlinlien/cs373-sustainability/-/blob/master/backend/main.py
# for overall structure of file

# from typing import get_args
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
# from models import *

from flask import Flask, request, make_response, jsonify, send_from_directory
from format import *
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, Column, String, Integer
import urllib
import json
from dotenv import load_dotenv
import os

from AdoptablePet import *
# from AdoptionCenter import *
# from BreedsSpecies import *

from query_helpers import *

# app = Flask(__name__)
# app.debug = True
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# Schema: "postgres+psycopg2://<USERNAME>:<PASSWORD>@<IP_ADDRESS>:<PORT>/<DATABASE_NAME>"
# load_dotenv()
# print(os.getenv("AWS_DB_KEY"))
# app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("AWS_DB_KEY")
# db = SQLAlchemy(app)
# print(db)

# returning json not html, within function u interface with db
# earlier u had a one off script that populates db

# base url: api.adoptapet.me
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

    # Searching
    q = get_query("q", queries)
    if q :
    	pet_query = search_politicians(q, pet_query)

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

    # for r in result:
    # 	format_adoptable_pet(r)

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
        # Conver the given page number into an int
        page = int(page[0])

    # # searching
    # q = get_query("sort", queries)
    # if q:
    # 	center_query = search_centers(q, center_query)

    # # filtering
    # center_query = filter_centers(center_query, queries)

    # # sorting
    # sort = get_query("sort", queries)
    # center_query = sort_districts(sort, center_query)

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

    # for r in result:
    # 	format_center(r)

    return {"page": result, "count": count}


@app.route("/ac/<int:api_id>", methods=["GET"])
def center_id(api_id):
    center = db.session.query(AdoptionCenter).filter_by(api_id=api_id)
    center = adoption_center_schema.dump(center, many=True)[0]
    # format_center(center)
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

    # # searching
    # q = get_query("q", queries)
    # if q:
    # 	sb_query = search_sb(q, sb_query)

    # # filtering
    # sb_query = filter_sb(sb_query, queries)

    # # sorting
    # sort = get_query("sort", queries)
    # sb_query = sort_sb(sort, sb_query)

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

    # for r in results:
    # 	format_sb(r)

    return {"page": result, "count": count}


@app.route("/sb/<int:api_id>", methods=["GET"])
def sb_id(api_id):
    sb = db.session.query(BreedsSpecies).filter_by(api_id=api_id)
    sb = breeds_species_schema.dump(sb, many=True)[0]
    # format_sb(sb)
    return sb


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/favicon.ico")
def favicon():
    # return "<p>Hello</p>"
    return send_from_directory(
        os.path.join(app.root_path, "static"),
        "icon.ico",
        # mimetype="image/vnd.microsoft.icon"
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
