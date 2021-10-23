from typing import get_args
from models import (
	AdoptablePet,
	AdoptionCenter,
	BreedsSpecies,
	db,
	app,
	adoptable_pet_schema,
	adoption_center_schema,
	breeds_species_schema
)

from flask import Flask, request, make_response, jsonify, send_from_directory
from format import *
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, Column, String, Integer
import urllib
import json
from dotenv import load_dotenv
import os

from AdoptablePet import *
from AdoptionCenter import *
from BreedsSpecies import *


# app = Flask(__name__)
# app.debug = True
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# Schema: "postgres+psycopg2://<USERNAME>:<PASSWORD>@<IP_ADDRESS>:<PORT>/<DATABASE_NAME>"
# load_dotenv()
# print(os.getenv("AWS_DB_KEY"))
# app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("AWS_DB_KEY")
# db = SQLAlchemy(app)
# print(db)

@app.route("/")
# returning json not html, within function u interface with db
# earlier u had a one off script that populates db
def hello_world() :
	return "<p>Hello, World!</p>"

# -------------------- Adoptable Pets ---------------------

@app.route("/ap", methods=["GET"])
def pets() :
	queries = request.args.to_dict(flat=False)
	pet_query = db.session.query(AdoptablePet)

	page = get_query("page", queries)
	if page == None :
		page = 1
	else :
		# Convert the given page number into an int
		page = int(page[0])

	# Searching
	q = get_query("q", queries)
	if q :
		pet_query = search_politicians(q, pet_query)

	# filtering
	pet_query = filter_politicans(pet_query, queries)

	# sorting
	sort = get_query("sort", queries)
	pet_query = sort_politicians(sort, pet_query)

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

	for r in result:
		format_adoptable_pet(r)

	return {"page": result, "count": count}


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

	# searching
	q = get_query("sort", queries)
	if q:
		center_query = search_centers(q, center_query)

	# filtering
	center_query = filter_centers(center_query, queries)

	# sorting
	sort = get_query("sort", queries)
	center_query = sort_districts(sort, center_query)

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

	for r in result:
		format_center(r)

	return {"page": result, "count": count}


@app.route("/ac/<int:id>", methods=["GET"])
def center_id(id):
	center = db.session.query(AdoptionCenter).filter_by(id=id)

	center = adoption_center_schema.dump(center, many=True)[0]

	format_center(center)

	return center


# ----------------- BreedsSpecies -------------------

@app.route("/sb", method=["GET"])
def species_breeds() :
	queries = request.args.to_dict(flat=False)
	sb_query = db.session.query(BreedsSpecies)
	page = get_query("page", queries)
	if page == None:
		page = 1
	else:
		# Convert the given page number into an int
		page = int(page[0])
	
	# searching
	q = get_query("q", queries)
	if q:
		sb_query = search_sb(q, sb_query)

	# filtering
	sb_query = filter_sb(sb_query, queries)

	# sorting
	sort = get_query("sort", queries)
	sb_query = sort_sb(sort, sb_query)

	count = sb_query.count()

	if page != -1:
		per_page = (
			int(get_query("perPage", queries).pop())
			if get_query("perPage", queries)
			else 20
		)
		sb = sb_query.pagination(page=page, per_page=per_page)
		result = breeds_species_schema.dump(sb.items, many=True)
	else:
		result = breeds_species_schema.dump(sb_query, many=True)

	for r in results:
		format_sb(r)

	return {"page": result, "count": count}

@app.route("/sb/<int:id>", methods=["GET"])
def sb_id(id) :
	sb = db.session.query(BreedsSpecies).filter_by(id=id)
	sb = breeds_species_schema.dump(sb, many=True)[0]
	format_sb(sb)
	return sb






##### MODELS #####

# Define table/data models

# Adoptable Pet model
# class AdoptablePet(db.Model) :
# 	pet_id = db.Column(db.Integer, primary_key=True)
# 	pet_name = db.Column(db.String())
# 	pet_breed = db.Column(db.String())
# 	pet_sex = db.Column(db.String())
# 	pet_age = db.Column(db.String())
# 	pet_color = db.Column(db.String())
# 	pet_desc = db.Column(db.String())
	# pet_allergies = db.Column(db.String())
	# pet_diet = db.Column(db.String())
	# pet_issues = db.Column(db.String())
	# pet_hearing = db.Column(db.String())
	# pet_sight = db.Column(db.String())

# Adoption Center model
# class AdoptionCenter(db.Model) :
# 	adoptioncenter_id = db.Column(db.Integer, primary_key=True)
# 	adoptioncenter_name = db.Column(db.String())
# 	adoptioncenter_city = db.Column(db.String())
# 	adoptioncenter_state = db.Column(db.String())
# 	adoptioncenter_zip = db.Column(db.String())
# 	adoptioncenter_services = db.Column(db.String())
# 	adoptioncenter_type = db.Column(db.String())
# 	adoptioncenter_species = db.Column(db.String())
# 	adoptioncenter_address = db.Column(db.String())
# 	adoptioncenter_phone = db.Column(db.String())
# 	adoptioncenter_email = db.Column(db.String())
# 	adoptioncenter_website = db.Column(db.String())

# Breed(/species) model
# class Breed(db.Model) :
# 	breed_id = db.Column(db.Integer, primary_key=True)
# 	breed_name = db.Column(db.String())
# 	breed_species = db.Column(db.String())
# 	breed_lifeexp = db.Column(db.String())
# 	breed_size = db.Column(db.String())
# 	breed_issues = db.Column(db.String())
# 	breed_height = db.Column(db.String())
# 	breed_weight = db.Column(db.String())
# 	breed_colors = db.Column(db.String())
# 	breed_energy = db.Column(db.String())
# 	breed_lifespan = db.Column(db.String())
# 	breed_desc = db.Column(db.String())
# 	breed_temperament = db.Column(db.String())
# 	breed_shedding = db.Column(db.String())


if __name__ == "__main__" :
	app.run(host="0.0.0.0", port=5000, debug=True)