from os import name
from app import db
# import os
import json
# import csv
from models import *
import urllib
import requests
from sqlalchemy import select
from query_helpers import *

def populate_pets() :
	# Get API request
	org_ids = db.session.query(AdoptionCenter.api_id).all()
	# print(data)
	pet_list = []
	for org_id in org_ids :
		print(org_id[0])
		request = urllib.request.Request('https://api.rescuegroups.org/v5/public/orgs/' + str(org_id[0]) + '/animals')
		request.add_header("Authorization", "wmUYpgAP")
		r = urllib.request.urlopen(request)
		data = json.loads(r.read())
		if 'data' in data :
			for animal in data['data'] :
				api_id = animal['id']
				center_number = org_id[0]
				breed_number = animal['relationships']['breeds']['data'][0]['id']
				name = animal['attributes']['name'] if 'name' in animal['attributes'] else ""
				# breed = item['attributes']['breedString'] if 'breedString' in item['attributes'] else ""
				sex = animal['attributes']['sex'] if 'sex' in animal['attributes'] else ""
				age = animal['attributes']['ageGroup'] if 'ageGroup' in animal['attributes'] else ""
				color = animal['attributes']['colorDetails'] if 'colorDetails' in animal['attributes'] else ""
				desc = animal['attributes']['descriptionHtml'] if 'descriptionHtml' in animal['attributes'] else ""
				# new_pet = AdoptablePet(pet_name=item['attributes']["name"], pet_breed=item['attributes']["breedString"], 
				# 						pet_sex=item['attributes']["sex"], pet_age=item['attributes']["ageGroup"], 
				# 						pet_color=item['attributes']['colorDetails'],
				# 						pet_desc=item['attributes']['descriptionHtml'])
				# pet_list.append(new_pet)
				new_pet = AdoptablePet(api_id=api_id, center_number=center_number, breed_number=breed_number,
																name=name, sex=sex, 
																age=age, color=color, desc=desc)
				pet_list.append(new_pet)
	# print(pet_list)
	# flush script db.reset
	# loop through all pages api returns
	# db.drop_all()
	# db.create_all()
	db.session.add_all(pet_list)
	db.session.commit()

def __init__(self, api_id=0, center_number=0, breed_number=0, name="NaN", sex="NaN", age="NaN", 
							color="NaN", desc="NaN" 
							# pet_allergies="NaN", pet_diet="NaN",
							# pet_issues="NaN", pet_hearing="NaN", pet_sight="NaN"
							) :
	self.api_id = api_id
	self.center_number = center_number
	self.breed_number = breed_number
	self.name = name
	# self.breed = breed
	self.sex = sex
	self.age = age
	self.color = color
	self.desc = desc

def populate_centers() :
	url = "https://api.rescuegroups.org/v5/public/orgs?limit=25"
	querystring = {"format": "json"}
	headers = {
		'Authorization': "wmUYpgAP"
	}
	response = requests.request("GET", url, headers=headers, params=querystring)
	data = response.json()
	org_list = []
	# print(orgs_list)
	for item in data['data'] :
		api_id = item['id']
		print(api_id)
		name = item['attributes']['name'] if 'name' in item['attributes'] else ''
		city = item['attributes']['city'] if 'city' in item['attributes'] else ''
		state = item['attributes']['state'] if 'state' in item['attributes'] else ''
		zipcode = item['attributes']['postalcode'] if 'postalcode' in item['attributes'] else ''
		services = item['attributes']['services'] if 'services' in item['attributes'] else ''
		new_center = AdoptionCenter(api_id=api_id, name=name, city=city, state=state, zipcode=zipcode, services=services)
		org_list.append(new_center)
		orgs_species_url = 'https://api.rescuegroups.org/v5/public/orgs/' + api_id + '/animals/species'
		orgs_species_response = requests.request("GET", orgs_species_url, headers=headers, params=querystring)
		orgs_species_data = orgs_species_response.json()
		# new list of all breed ids at org
		# print(orgs_species_data)
		for species in orgs_species_data['data'] :
			species_breeds = db.session.query(BreedsSpecies).filter_by(api_id=species['id'])
			for species_breed in species_breeds :
				# print(species_breeds)
				new_center.species_breeds.append(species_breed)

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

	num_pages = breeds_data['meta']['pages']

	for page in range(1, num_pages + 1) :
		breeds_url = 'https://api.rescuegroups.org/v5/public/animals/breeds?limit=250&page=' + str(page)
		breeds_response = requests.request("GET", breeds_url, headers=headers, params=querystring)
		breeds_data = breeds_response.json()
		for item in breeds_data['data'] :
				entry = dict()
				entry['api_id'] = item['id']
				entry['breed_name'] = item['attributes']['name']
				breed_name = item['attributes']['name']
				species_id = item['relationships']['species']['data'][0]['id']
				if (species_id in species_id_to_name) :
					entry['species_name'] = species_id_to_name[species_id][0]
					entry['youth_name'] = species_id_to_name[species_id][1]
				else :
					species_url = 'https://api.rescuegroups.org/v5/public/animals/species/' + species_id
					species_response = requests.request("GET", species_url, headers=headers, params=querystring)
					species_data = species_response.json()
					entry['species_name'] = species_data['data'][0]['attributes']['singular']
					species_name = species_data['data'][0]['attributes']['singular']
					entry['youth_name'] = species_data['data'][0]['attributes']['youngSingular']
					species_youth_name = species_data['data'][0]['attributes']['youngSingular']
					species_id_to_name[species_id] = [species_name, species_youth_name]
					if species_name == 'Cat' :
						cat_url = 'https://api.thecatapi.com/v1/breeds/search?q=' + breed_name
						headers_cat = {'x-api-key' : '0934158a-de89-4fad-b996-14cf7f7cb5e7'}
						cat_response = requests.request("GET", cat_url, headers=headers_cat, params=querystring)
						cat_data = cat_response.json()
						if len(cat_data) > 0 :
							entry['temperament'] = cat_data[0]['temperament']
							entry['life_span'] = cat_data[0]['life_span']
							entry['alt_names'] = cat_data[0]['alt_names']
							entry['wikipedia_url'] = cat_data[0]['wikipedia_url']
							entry['origin'] = cat_data[0]['origin']
							entry['weight'] = cat_data[0]['weight']['imperial']
							entry['country_code'] = cat_data[0]['country_code']
							entry['hairless'] = cat_data[0]['hairless']
							entry['natural'] = cat_data[0]['natural']
							entry['rare'] = cat_data[0]['rare']
							entry['rex'] = cat_data[0]['rex']
							entry['suppressed_tail'] = cat_data[0]['suppressed_tail']
							entry['short_legs'] = cat_data[0]['short_legs']
							entry['hypoallergenic'] = cat_data[0]['hypoallergenic']
							entry['adaptability'] = cat_data[0]['adaptability']
							entry['affection_level'] = cat_data[0]['affection_level']
							entry['child_friendly'] = cat_data[0]['child_friendly']
							entry['dog_friendly'] = cat_data[0]['dog_friendly']
							entry['energy_level'] = cat_data[0]['energy_level']
							entry['grooming'] = cat_data[0]['grooming']
							entry['health_issues'] = cat_data[0]['health_issues']
							entry['intelligence'] = cat_data[0]['intelligence']
							entry['shedding_level'] = cat_data[0]['shedding_level']
							entry['social_needs'] = cat_data[0]['social_needs']
							entry['stranger_friendly'] = cat_data[0]['stranger_friendly']
							entry['vocalization'] = cat_data[0]['vocalisation']
					# else if species_name == 'Dog' :

				# new_breed = BreedsSpecies(api_id=api_id, species=species_name, breed=breed, youth_name=species_youth_name)
				new_breed = BreedsSpecies(**entry)
				breed_list.append(new_breed)




	# center_db_instance = AdoptionCenter(**)
	for item in breeds_data['data'] :
		entry = dict()
		entry['api_id'] = item['id']
		entry['breed_name'] = item['attributes']['name']
		breed_name = item['attributes']['name']
		species_id = item['relationships']['species']['data'][0]['id']
		if (species_id in species_id_to_name) :
			entry['species_name'] = species_id_to_name[species_id][0]
			entry['youth_name'] = species_id_to_name[species_id][1]
		else :
			species_url = 'https://api.rescuegroups.org/v5/public/animals/species/' + species_id
			species_response = requests.request("GET", species_url, headers=headers, params=querystring)
			species_data = species_response.json()
			entry['species_name'] = species_data['data'][0]['attributes']['singular']
			species_name = species_data['data'][0]['attributes']['singular']
			entry['youth_name'] = species_data['data'][0]['attributes']['youngSingular']
			species_youth_name = species_data['data'][0]['attributes']['youngSingular']
			species_id_to_name[species_id] = [species_name, species_youth_name]
			if species_name == 'Cat' :
				cat_url = 'https://api.thecatapi.com/v1/breeds/search?q=' + breed_name
				headers_cat = {'x-api-key' : '0934158a-de89-4fad-b996-14cf7f7cb5e7'}
				cat_response = requests.request("GET", cat_url, headers=headers_cat, params=querystring)
				cat_data = cat_response.json()
				if len(cat_data) > 0 :
					entry['temperament'] = cat_data[0]['temperament']
					entry['life_span'] = cat_data[0]['life_span']
					entry['alt_names'] = cat_data[0]['alt_names']
					entry['wikipedia_url'] = cat_data[0]['wikipedia_url']
					entry['origin'] = cat_data[0]['origin']
					entry['weight'] = cat_data[0]['weight']['imperial']
					entry['country_code'] = cat_data[0]['country_code']
					entry['hairless'] = cat_data[0]['hairless']
					entry['natural'] = cat_data[0]['natural']
					entry['rare'] = cat_data[0]['rare']
					entry['rex'] = cat_data[0]['rex']
					entry['suppressed_tail'] = cat_data[0]['suppressed_tail']
					entry['short_legs'] = cat_data[0]['short_legs']
					entry['hypoallergenic'] = cat_data[0]['hypoallergenic']
					entry['adaptability'] = cat_data[0]['adaptability']
					entry['affection_level'] = cat_data[0]['affection_level']
					entry['child_friendly'] = cat_data[0]['child_friendly']
					entry['dog_friendly'] = cat_data[0]['dog_friendly']
					entry['energy_level'] = cat_data[0]['energy_level']
					entry['grooming'] = cat_data[0]['grooming']
					entry['health_issues'] = cat_data[0]['health_issues']
					entry['intelligence'] = cat_data[0]['intelligence']
					entry['shedding_level'] = cat_data[0]['shedding_level']
					entry['social_needs'] = cat_data[0]['social_needs']
					entry['stranger_friendly'] = cat_data[0]['stranger_friendly']
					entry['vocalization'] = cat_data[0]['vocalisation']
			# else if species_name == 'Dog' :

		# new_breed = BreedsSpecies(api_id=api_id, species=species_name, breed=breed, youth_name=species_youth_name)
		new_breed = BreedsSpecies(**entry)
		breed_list.append(new_breed)


	db.session.add_all(breed_list)
	db.session.commit()

def link_pets_centers() :
	pets = db.session.query(AdoptablePet).all()
	for pet in pets :
		temp_center = (
			db.session.query(AdoptionCenter)
			.filter_by(api_id=pet.center_number)
			.first()
		)
		pet.center = temp_center
	db.session.commit()

def link_pets_species_breeds() :
	pets = db.session.query(AdoptablePet).all()
	for pet in pets :
		temp_species_breed = (
			db.session.query(BreedsSpecies)
			.filter_by(api_id=pet.breed_number)
			.first()
		)
		pet.species_breed = temp_species_breed
	db.session.commit()

def reset_db() :
	# db.session.remove()
	db.drop_all()
	db.create_all()

if __name__ == "__main__" :
	reset_db()
	populate_breeds()
	populate_centers()
	populate_pets()
	link_pets_centers()
	link_pets_species_breeds()
