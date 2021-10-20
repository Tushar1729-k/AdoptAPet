from app import db
# import os
import json
# import csv
from models import *
import urllib
import requests

def populate_pets() :
	# Get API request
	request = urllib.request.Request('https://api.rescuegroups.org/v5/public/animals?limit=250')
	request.add_header("Authorization", "wmUYpgAP")
	r = urllib.request.urlopen(request)
	data = json.loads(r.read())
	# print(data)
	pet_list = []
	for item in data['data'] :
		pet_name = item['attributes']['name'] if 'name' in item['attributes'] else ""
		pet_breed = item['attributes']['breedString'] if 'breedString' in item['attributes'] else ""
		pet_sex = item['attributes']['sex'] if 'sex' in item['attributes'] else ""
		pet_age = item['attributes']['ageGroup'] if 'ageGroup' in item['attributes'] else ""
		pet_color = item['attributes']['colorDetails'] if 'colorDetails' in item['attributes'] else ""
		pet_desc = item['attributes']['descriptionHtml'] if 'descriptionHtml' in item['attributes'] else ""
		# new_pet = AdoptablePet(pet_name=item['attributes']["name"], pet_breed=item['attributes']["breedString"], 
		# 						pet_sex=item['attributes']["sex"], pet_age=item['attributes']["ageGroup"], 
		# 						pet_color=item['attributes']['colorDetails'],
		# 						pet_desc=item['attributes']['descriptionHtml'])
		# pet_list.append(new_pet)
		new_pet = AdoptablePet(pet_name=pet_name, pet_breed=pet_breed, pet_sex=pet_sex, 
														pet_age=pet_age, pet_color=pet_color, pet_desc=pet_desc)
		pet_list.append(new_pet)
	# print(pet_list)
	# flush script db.reset
	# loop through all pages api returns
	# db.drop_all()
	# db.create_all()
	db.session.add_all(pet_list)
	db.session.commit()

def __init__(self, pet_name="NaN", pet_breed="NaN", pet_sex="NaN", pet_age="NaN", 
							pet_color="NaN", pet_desc="NaN" 
							# pet_allergies="NaN", pet_diet="NaN",
							# pet_issues="NaN", pet_hearing="NaN", pet_sight="NaN"
							) :
	self.pet_name = pet_name
	self.pet_breed = pet_breed
	self.pet_sex = pet_sex
	self.pet_age = pet_age
	self.pet_color = pet_color
	self.pet_desc = pet_desc

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

def __init__(self, api_id=0, name="NaN", city="NaN", state="NaN", zipcode="NaN", services="NaN") :
	self.api_id = api_id
	self.name = name
	self.city = city
	self.state = state
	self.zipcode = zipcode
	self.services = services

# cache
species_id_to_name = {}

def populate_breeds() :
	breeds_url = 'https://api.rescuegroups.org/v5/public/animals/breeds?limit=250'
	querystring = {'format': 'json'}
	headers = {'Authorization': "wmUYpgAP"}
	breeds_response = requests.request("GET", breeds_url, headers=headers, params=querystring)
	breeds_data = breeds_response.json()
	breed_list = []
	for item in breeds_data['data'] :
		breed = item['attributes']['name']
		species_id = item['relationships']['species']['data'][0]['id']
		if (species_id in species_id_to_name) :
			species_name = species_id_to_name[species_id][0]
			species_youth_name = species_id_to_name[species_id][1]
		else :
			species_url = 'https://api.rescuegroups.org/v5/public/animals/species/' + species_id
			species_response = requests.request("GET", species_url, headers=headers, params=querystring)
			species_data = species_response.json()
			species_name = species_data['data'][0]['attributes']['singular']
			species_youth_name = species_data['data'][0]['attributes']['youngSingular']
			species_id_to_name[species_id] = [species_name, species_youth_name]
		new_breed = BreedsSpecies(species=species_name, breed=breed, youth_name=species_youth_name)
		breed_list.append(new_breed)

	num_pages = breeds_data['meta']['pages']
	for page in range(2, num_pages + 1) :
		breeds_url = 'https://api.rescuegroups.org/v5/public/animals/breeds?limit=250&page=' + str(page)
		breeds_response = requests.request("GET", breeds_url, headers=headers, params=querystring)
		breeds_data = breeds_response.json()
		for item in breeds_data['data'] :
			breed = item['attributes']['name']
			species_id = item['relationships']['species']['data'][0]['id']
			if (species_id in species_id_to_name) :
				species_name = species_id_to_name[species_id][0]
				species_youth_name = species_id_to_name[species_id][1]
			else :
				species_url = 'https://api.rescuegroups.org/v5/public/animals/species/' + species_id
				species_response = requests.request("GET", species_url, headers=headers, params=querystring)
				species_data = species_response.json()
				species_name = species_data['data'][0]['attributes']['singular']
				species_youth_name = species_data['data'][0]['attributes']['youngSingular']
				species_id_to_name[species_id] = [species_name, species_youth_name]
			new_breed = BreedsSpecies(species=species_name, breed=breed, youth_name=species_youth_name)
			breed_list.append(new_breed)

	db.session.add_all(breed_list)
	db.session.commit()

# def link_pets_centers() :
#   pets = db.session.query(AdoptablePet).all()
#   for pet in pets :
#     temp_center = (
#       db.session.query(AdoptionCenter)
#       .filter_by(number=)
#     )

def reset_db() :
  # db.session.remove()
  db.drop_all()
  db.create_all()

if __name__ == "__main__" :
  reset_db()
  populate_pets()
  populate_centers()
  populate_breeds()
