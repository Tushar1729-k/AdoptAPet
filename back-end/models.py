from flask import Flask, request, jsonify
from db import init_db
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from marshmallow import fields, post_dump

app = Flask(__name__)
CORS(app)
db = init_db(app)
ma = Marshmallow(app)

# Association table between politicians and elections, many-to-many relationship
link_species_centers = db.Table("link_species_centers",
	db.Column("species_id", db.Integer, db.ForeignKey("adoption_center.id"), primary_key=True),
	db.Column("center_id", db.Integer, db.ForeignKey("breeds_species.id"), primary_key=True)
)

# Create tables
class AdoptablePet(db.Model) :
	__tablename__ = "adoptable_pet"
	id = db.Column(db.Integer, primary_key=True)
	# Foreign key for associated center, one-to-many relationship
	center_id = db.Column(db.Integer, db.ForeignKey('adoption_center.id'), nullable=True)
	center = db.Column(db.String())
	api_id = db.Column(db.Integer)
	name = db.Column(db.String())
	breed = db.Column(db.String())
	sex = db.Column(db.String())
	age = db.Column(db.String())
	color = db.Column(db.String())
	desc = db.Column(db.String())

	# pet_allergies = db.Column(db.String())
	# pet_diet = db.Column(db.String())
	# pet_issues = db.Column(db.String())
	# pet_hearing = db.Column(db.String())
	# pet_sight = db.Column(db.String())

# def __repr__(self) :
#   return "<AdoptablePet %s>" % self.name

class AdoptionCenter(db.Model) :
	__tablename__ = "adoption_center"
	id = db.Column(db.Integer, primary_key=True)
	api_id = db.Column(db.Integer)
	# All associated pets, one-to-many relationship
	pets = db.relationship("AdoptablePet", backref="center")
	# All associated species, many-to-many relationship
	# species = db.relationship("BreedsSpecies", backref="center")
	name = db.Column(db.String())
	city = db.Column(db.String())
	state = db.Column(db.String())
	zipcode = db.Column(db.String())
	services = db.Column(db.String())
	pets = db.relationship('AdoptablePet', backref='adoptioncenter', lazy=True)

# def __repr__(self) :
#   return "<Adoption Center %s %s>" % (self.type_name, self.number)

# Breeds/Species Model
class BreedsSpecies(db.Model) :
	id = db.Column(db.Integer, primary_key=True)
	centers = db.relationship('AdoptionCenter', secondary=link_species_centers, 
										lazy='subquery', backref=db.backref('species', lazy=True))
	api_id = db.Column(db.Integer)
	species = db.Column(db.String())
	breed = db.Column(db.String())
	youth_name = db.Column(db.String())
	# get other fields from another api or db
	# lifeexp = db.Column(db.String())
	# size = db.Column(db.String())
	# issues = db.Column(db.String())
	# color = db.Column(db.String())
	# patterns = db.Column(db.String())

# def __init__(self, species="NaN", breed="NaN", youth_name="NaN") :
# 	self.species = species
# 	self.breed = breed
# 	self.youth_name = youth_name

# def __repr__(self) :
#   return "<Breeds %s>" % self.name


	