from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, Column, String, Integer
import urllib
import json
from dotenv import load_dotenv
import os

app = Flask(__name__)
app.debug = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Schema: "postgres+psycopg2://<USERNAME>:<PASSWORD>@<IP_ADDRESS>:<PORT>/<DATABASE_NAME>"
load_dotenv()
print(os.getenv("AWS_DB_KEY"))
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("AWS_DB_KEY")

db = SQLAlchemy(app)

print(db)

@app.route("/")
# returning json not html, within function u interface with db
# earlier u had a one off script that populates db
def hello_world() :
	return "<p>Hello, World!</p>"

##### MODELS #####

# Define table/data models

# Adoptable Pet model
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

# Adoption Center model
class AdoptionCenter(db.Model) :
	adoptioncenter_id = db.Column(db.Integer, primary_key=True)
	adoptioncenter_name = db.Column(db.String())
	adoptioncenter_city = db.Column(db.String())
	adoptioncenter_state = db.Column(db.String())
	adoptioncenter_zip = db.Column(db.String())
	adoptioncenter_services = db.Column(db.String())
	adoptioncenter_type = db.Column(db.String())
	adoptioncenter_species = db.Column(db.String())
	adoptioncenter_address = db.Column(db.String())
	adoptioncenter_phone = db.Column(db.String())
	adoptioncenter_email = db.Column(db.String())
	adoptioncenter_website = db.Column(db.String())

# Breed(/species) model
class Breed(db.Model) :
	breed_id = db.Column(db.Integer, primary_key=True)
	breed_name = db.Column(db.String())
	breed_species = db.Column(db.String())
	breed_lifeexp = db.Column(db.String())
	breed_size = db.Column(db.String())
	breed_issues = db.Column(db.String())
	breed_height = db.Column(db.String())
	breed_weight = db.Column(db.String())
	breed_colors = db.Column(db.String())
	breed_energy = db.Column(db.String())
	breed_lifespan = db.Column(db.String())
	breed_desc = db.Column(db.String())
	breed_temperament = db.Column(db.String())
	breed_shedding = db.Column(db.String())



if __name__ == "__main__" :
	app.run(host="0.0.0.0", port=5000, debug=True)