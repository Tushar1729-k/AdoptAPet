from flask import Flask, request, jsonify
from db import init_db
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from marshmallow import fields, post_dump

app = Flask(__name__)
CORS(app)
db = init_db(app)
ma = Marshmallow(app)

# Association table between BreedsSpecies and Adoption Centers, many-to-many relationship
link_species_centers = db.Table(
    "link_species_centers",
    db.Column(
        "adoption_center_id",
        db.Integer,
        db.ForeignKey("adoption_center.id"),
        primary_key=True,
    ),
    db.Column(
        "breeds_species_id",
        db.Integer,
        db.ForeignKey("breeds_species.id"),
        primary_key=True,
    ),
)

# Create tables
class AdoptablePet(db.Model):
    __tablename__ = "adoptable_pet"
    id = db.Column(db.Integer, primary_key=True)
    api_id = db.Column(db.Integer)
    # Foreign key for associated center, one-to-many relationship
    center_id = db.Column(
        db.Integer, db.ForeignKey("adoption_center.id"), nullable=True
    )
    # Foreign key for associated species/breed, one-to-many relationship
    species_breed_id = db.Column(
        db.Integer, db.ForeignKey("breeds_species.id"), nullable=True
    )
    center_number = db.Column(db.Integer)
    breed_number = db.Column(db.Integer)
    name = db.Column(db.String())
    # breed = db.Column(db.String())
    sex = db.Column(db.String())
    age = db.Column(db.String())
    color = db.Column(db.String())
    desc = db.Column(db.String())
    pic_url = db.Column(db.String)

    # pet_allergies = db.Column(db.String())
    # pet_diet = db.Column(db.String())
    # pet_issues = db.Column(db.String())
    # pet_hearing = db.Column(db.String())
    # pet_sight = db.Column(db.String())


# def __repr__(self) :
#   return "<AdoptablePet %s>" % self.name


class AdoptionCenter(db.Model):
    __tablename__ = "adoption_center"
    id = db.Column(db.Integer, primary_key=True)
    api_id = db.Column(db.Integer)
    # All associated pets, one-to-many relationship
    pets = db.relationship("AdoptablePet", backref="center")
    # All associated species, many-to-many relationship
    species_breeds = db.relationship(
        "BreedsSpecies",
        secondary=link_species_centers,
        backref=db.backref("center", lazy="dynamic"),
    )
    name = db.Column(db.String())
    street = db.Column(db.String)
    city = db.Column(db.String())
    state = db.Column(db.String())
    zipcode = db.Column(db.String())
    # country = db.Column(db.String)
    email = db.Column(db.String)
    # url = db.Column(db.String)
    # facebookUrl = db.Column(db.String)
    phone = db.Column(db.String)
    lat = db.Column(db.Float)
    lon = db.Column(db.Float)
    services = db.Column(db.String())


# def __repr__(self) :
#   return "<Adoption Center %s %s>" % (self.type_name, self.number)

# Breeds/Species Model
class BreedsSpecies(db.Model):
    __tablename__ = "breeds_species"
    id = db.Column(db.Integer, primary_key=True)
    centers = db.relationship(
        "AdoptionCenter",
        secondary=link_species_centers,
        lazy="subquery",
        backref=db.backref("species", lazy=True),
    )
    # All associated pets, one-to-many relationship
    pets = db.relationship("AdoptablePet", backref="species_breed")
    api_id = db.Column(db.Integer)
    species_id = db.Column(db.Integer)
    species_name = db.Column(db.String())
    breed_name = db.Column(db.String())
    youth_name = db.Column(db.String())
    temperament = db.Column(db.String)
    life_span = db.Column(db.String)
    alt_names = db.Column(db.String)
    wikipedia_url = db.Column(db.String)
    origin = db.Column(db.String)
    weight = db.Column(db.String)
    country_code = db.Column(db.String)
    height = db.Column(db.String)
    hairless = db.Column(db.Integer)
    natural = db.Column(db.Integer)
    suppressed_tail = db.Column(db.Integer)
    short_legs = db.Column(db.Integer)
    hypoallergenic = db.Column(db.Integer)
    adaptability = db.Column(db.Integer)
    affection_level = db.Column(db.Integer)
    child_friendly = db.Column(db.Integer)
    dog_friendly = db.Column(db.Integer)
    energy_level = db.Column(db.Integer)
    grooming = db.Column(db.Integer)
    health_issues = db.Column(db.Integer)
    intelligence = db.Column(db.Integer)
    shedding_level = db.Column(db.Integer)
    social_needs = db.Column(db.Integer)
    stranger_friendly = db.Column(db.Integer)
    vocalization = db.Column(db.Integer)

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


class BaseSchema(ma.Schema):
    SKIP_VALUES = [None]

    @post_dump
    def remove_skip_values(self, data, **kargs):
        return {
            key: value for key, value in data.items() if value not in self.SKIP_VALUES
        }


class AdoptablePetSchema(BaseSchema):
    id = fields.Int(required=True)
    api_id = fields.Int(required=True)
    name = fields.Str(required=True)
    center = fields.Nested(
        "AdoptionCenterSchema",
        only=(
            "id",
            "api_id",
            "name",
            "city",
            "state",
            "zipcode",
            "lat",
            "lon",
            "services",
        ),
        required=True,
    )
    species_breed = fields.Nested(
        "BreedsSpeciesSchema",
        only=("id", "api_id", "species_name", "breed_name", "youth_name"),
        required=True,
    )
    sex = fields.Str(required=True)
    age = fields.Str(required=True)
    color = fields.Str(required=True)
    desc = fields.Str(required=True)
    pic_url = fields.Str(required=True)


class AdoptionCenterSchema(BaseSchema):
    id = fields.Int(required=True)
    api_id = fields.Int(required=True)
    name = fields.Str(required=True)
    pets = fields.Nested(
        "AdoptablePetSchema", only=("id", "api_id", "name"), required=True, many=True
    )
    species_breed = fields.Nested(
        "BreedsSpeciesSchema",
        only=("id", "api_id", "species_name", "breed_name", "youth_name"),
        required=True,
        attribute="species",
        many=True,
    )
    street = fields.Str(required=True)
    city = fields.Str(required=True)
    state = fields.Str(required=True)
    zipcode = fields.Str(required=True)
    email = fields.Email(required=True)
    phone = fields.Str(required=True)
    lat = fields.Float(required=True)
    lon = fields.Float(required=True)
    services = fields.Str(required=True)


class BreedsSpeciesSchema(BaseSchema):
    id = fields.Int(required=True)
    api_id = fields.Int(required=True)
    species_id = fields.Int(required=True)
    species_name = fields.Str(required=True)
    breed_name = fields.Str(required=True)
    centers = fields.Nested(
        "AdoptionCenterSchema",
        only=("id", "api_id", "name"),
        required=True,
        attribute="center",
        many=True,
    )
    pets = fields.Nested(
        "AdoptablePetSchema", only=("id", "api_id", "name"), required=True, many=True
    )
    youth_name = fields.Str(required=True)
    temperament = fields.Str(required=True)
    life_span = fields.Str(required=True)
    alt_names = fields.Str(required=True)
    wikipedia_url = fields.Str(required=True)
    origin = fields.Str(required=True)
    weight = fields.Str(required=True)
    country_code = fields.Str(required=True)
    height = fields.Str(required=True)
    hairless = fields.Int(required=True)
    natural = fields.Int(required=True)
    suppressed_tail = fields.Int(required=True)
    short_legs = fields.Int(required=True)
    hypoallergenic = fields.Int(required=True)
    adaptability = fields.Int(required=True)
    affection_level = fields.Int(required=True)
    child_friendly = fields.Int(required=True)
    dog_friendly = fields.Int(required=True)
    energy_level = fields.Int(required=True)
    grooming = fields.Int(required=True)
    health_issues = fields.Int(required=True)
    intelligence = fields.Int(required=True)
    shedding_level = fields.Int(required=True)
    social_needs = fields.Int(required=True)
    stranger_friendly = fields.Int(required=True)
    vocalization = fields.Int(required=True)


adoptable_pet_schema = AdoptablePetSchema()
adoption_center_schema = AdoptionCenterSchema()
breeds_species_schema = BreedsSpeciesSchema()
