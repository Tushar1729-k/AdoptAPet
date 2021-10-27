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


def populate_pets():
    # Get API request
    org_ids = db.session.query(AdoptionCenter.api_id).all()
    # print(data)
    pet_list = []
    for org_id in org_ids:
        request = urllib.request.Request(
            "https://api.rescuegroups.org/v5/public/orgs/"
            + str(org_id[0])
            + "/animals?include=breeds,pictures"
        )
        request.add_header("Authorization", "wmUYpgAP")
        r = urllib.request.urlopen(request)
        data = json.loads(r.read())
        if "data" in data:
            count = 0
            for animal in data["data"]:
                if count == 5:
                    break
                count += 1

                api_id = animal["id"]
                center_number = org_id[0]
                breed_number = (
                    animal["relationships"]["breeds"]["data"][0]["id"]
                    if get_query("breeds", animal["relationships"]) != None
                    else None
                )
                name = (
                    animal["attributes"]["name"]
                    if "name" in animal["attributes"]
                    else ""
                )
                # breed = item['attributes']['breedString'] if 'breedString' in item['attributes'] else ""
                sex = (
                    animal["attributes"]["sex"] if "sex" in animal["attributes"] else ""
                )
                age = (
                    animal["attributes"]["ageGroup"]
                    if "ageGroup" in animal["attributes"]
                    else ""
                )
                color = (
                    animal["attributes"]["colorDetails"]
                    if "colorDetails" in animal["attributes"]
                    else ""
                )
                desc = (
                    animal["attributes"]["descriptionHtml"]
                    if "descriptionHtml" in animal["attributes"]
                    else ""
                )
                for picture in data["included"]:
                    pic_id = (
                        animal["relationships"]["pictures"]["data"][0]["id"]
                        if get_query("pictures", animal["relationships"]) != None
                        else None
                    )
                    if picture["id"] == pic_id:
                        pic_url = picture["attributes"]["original"]["url"]
                # new_pet = AdoptablePet(pet_name=item['attributes']["name"], pet_breed=item['attributes']["breedString"],
                # 						pet_sex=item['attributes']["sex"], pet_age=item['attributes']["ageGroup"],
                # 						pet_color=item['attributes']['colorDetails'],
                # 						pet_desc=item['attributes']['descriptionHtml'])
                # pet_list.append(new_pet)
                new_pet = AdoptablePet(
                    api_id=api_id,
                    center_number=center_number,
                    breed_number=breed_number,
                    name=name,
                    sex=sex,
                    age=age,
                    color=color,
                    desc=desc,
                    pic_url=pic_url,
                )
                pet_list.append(new_pet)
    # print(pet_list)
    # flush script db.reset
    # loop through all pages api returns
    # db.drop_all()
    # db.create_all()
    db.session.add_all(pet_list)
    db.session.commit()


def __init__(
    self,
    api_id=0,
    center_number=0,
    breed_number=0,
    name="NaN",
    sex="NaN",
    age="NaN",
    color="NaN",
    desc="NaN",
    pic_url="NaN"
    # pet_allergies="NaN", pet_diet="NaN",
    # pet_issues="NaN", pet_hearing="NaN", pet_sight="NaN"
):
    self.api_id = api_id
    self.center_number = center_number
    self.breed_number = breed_number
    self.name = name
    # self.breed = breed
    self.sex = sex
    self.age = age
    self.color = color
    self.desc = desc
    self.pic_url = pic_url


def populate_centers():
    url = "https://api.rescuegroups.org/v5/public/orgs?limit=100"
    querystring = {"format": "json"}
    headers = {"Authorization": "wmUYpgAP"}
    response = requests.request("GET", url, headers=headers, params=querystring)
    data = response.json()
    org_list = []
    for item in data["data"]:
        entry = dict()
        entry["api_id"] = item["id"]
        entry["name"] = (
            item["attributes"]["name"] if "name" in item["attributes"] else ""
        )
        entry["street"] = (
            item["attributes"]["street"] if "street" in item["attributes"] else ""
        )
        entry["city"] = (
            item["attributes"]["city"] if "city" in item["attributes"] else ""
        )
        entry["state"] = (
            item["attributes"]["state"] if "state" in item["attributes"] else ""
        )
        entry["zipcode"] = (
            item["attributes"]["postalcode"]
            if "postalcode" in item["attributes"]
            else ""
        )
        entry["services"] = (
            item["attributes"]["services"] if "services" in item["attributes"] else ""
        )
        entry["email"] = get_query("email", item["attributes"])
        entry["phone"] = get_query("phone", item["attributes"])
        entry["lat"] = get_query("lat", item["attributes"])
        entry["lon"] = get_query("lon", item["attributes"])
        # new_center = AdoptionCenter(api_id=api_id, name=name, city=city, state=state, zipcode=zipcode, services=services)
        new_center = AdoptionCenter(**entry)
        org_list.append(new_center)

    db.session.add_all(org_list)
    db.session.commit()


def __init__(
    self, api_id=0, name="NaN", city="NaN", state="NaN", zipcode="NaN", services="NaN"
):
    self.api_id = api_id
    self.name = name
    self.city = city
    self.state = state
    self.zipcode = zipcode
    self.services = services


def populate_breeds():
    breeds_url = "https://api.rescuegroups.org/v5/public/animals/breeds?limit=250"
    querystring = {"format": "json"}
    headers = {"Authorization": "wmUYpgAP"}
    breeds_response = requests.request(
        "GET", breeds_url, headers=headers, params=querystring
    )
    breeds_data = breeds_response.json()
    breed_list = []

    num_pages = breeds_data["meta"]["pages"]

    for page in range(1, num_pages + 1):
        breeds_url = (
            "https://api.rescuegroups.org/v5/public/animals/breeds?limit=250&page="
            + str(page)
        )
        breeds_response = requests.request(
            "GET", breeds_url, headers=headers, params=querystring
        )
        breeds_data = breeds_response.json()
        for item in breeds_data["data"]:
            species_id = item["relationships"]["species"]["data"][0]["id"]
            if species_id == "3" or species_id == "8":
                entry = dict()
                entry["api_id"] = item["id"]
                entry["breed_name"] = item["attributes"]["name"]
                entry["species_id"] = species_id

                if species_id == "3":
                    entry["species_name"] = "Cat"
                    entry["youth_name"] = "Kitten"
                elif species_id == "8":
                    entry["species_name"] = "Dog"
                    entry["youth_name"] = "Puppy"

                if entry["species_name"] == "Cat":
                    cat_url = (
                        "https://api.thecatapi.com/v1/breeds/search?q="
                        + entry["breed_name"]
                    )
                    headers_cat = {"x-api-key": "0934158a-de89-4fad-b996-14cf7f7cb5e7"}
                    cat_response = requests.request(
                        "GET", cat_url, headers=headers_cat, params=querystring
                    )
                    cat_data = cat_response.json()
                    if len(cat_data) > 0:
                        entry["temperament"] = get_query("temperament", cat_data[0])
                        entry["life_span"] = get_query("life_span", cat_data[0])
                        entry["alt_names"] = get_query("alt_names", cat_data[0])
                        entry["wikipedia_url"] = get_query("wikipedia_url", cat_data[0])
                        entry["origin"] = get_query("origin", cat_data[0])
                        entry["weight"] = (
                            get_query("weight", cat_data[0])["imperial"]
                            if get_query("weight", cat_data[0]) != None
                            else None
                        )
                        entry["country_code"] = get_query("country_code", cat_data[0])
                        entry["hairless"] = get_query("hairless", cat_data[0])
                        entry["natural"] = get_query("natural", cat_data[0])
                        entry["suppressed_tail"] = get_query(
                            "suppressed_tail", cat_data[0]
                        )
                        entry["short_legs"] = get_query("short_legs", cat_data[0])
                        entry["hypoallergenic"] = get_query(
                            "hypoallergenic", cat_data[0]
                        )
                        entry["adaptability"] = get_query("adaptability", cat_data[0])
                        entry["affection_level"] = get_query(
                            "affection_level", cat_data[0]
                        )
                        entry["child_friendly"] = get_query(
                            "child_friendly", cat_data[0]
                        )
                        entry["dog_friendly"] = get_query("dog_friendly", cat_data[0])
                        entry["energy_level"] = get_query("energy_level", cat_data[0])
                        entry["grooming"] = get_query("grooming", cat_data[0])
                        entry["health_issues"] = get_query("health_issues", cat_data[0])
                        entry["intelligence"] = get_query("intelligence", cat_data[0])
                        entry["shedding_level"] = get_query(
                            "shedding_level", cat_data[0]
                        )
                        entry["social_needs"] = get_query("social_needs", cat_data[0])
                        entry["stranger_friendly"] = get_query(
                            "stranger_friendly", cat_data[0]
                        )
                        entry["vocalization"] = get_query("vocalisation", cat_data[0])
                elif entry["species_name"] == "Dog":
                    dog_url = (
                        "https://api.thedogapi.com/v1/breeds/search?q="
                        + entry["breed_name"]
                    )
                    headers_dog = {"x-api-key": "57baad70-4ab7-4115-af29-638c7e149024"}
                    dog_response = requests.request(
                        "GET", dog_url, headers=headers_dog, params=querystring
                    )
                    dog_data = dog_response.json()
                    if len(dog_data) > 0:
                        entry["temperament"] = get_query("temperament", dog_data[0])
                        entry["life_span"] = get_query("life_span", dog_data[0])
                        entry["alt_names"] = get_query("alt_names", dog_data[0])
                        entry["wikipedia_url"] = get_query("wikipedia_url", dog_data[0])
                        entry["origin"] = get_query("origin", dog_data[0])
                        entry["weight"] = (
                            get_query("weight", dog_data[0])["imperial"]
                            if get_query("weight", dog_data[0]) != None
                            else None
                        )
                        entry["country_code"] = get_query("country_code", dog_data[0])
                        entry["hairless"] = get_query("hairless", dog_data[0])
                        entry["natural"] = get_query("natural", dog_data[0])
                        entry["suppressed_tail"] = get_query(
                            "suppressed_tail", dog_data[0]
                        )
                        entry["short_legs"] = get_query("short_legs", dog_data[0])
                        entry["hypoallergenic"] = get_query(
                            "hypoallergenic", dog_data[0]
                        )
                        entry["adaptability"] = get_query("adaptability", dog_data[0])
                        entry["affection_level"] = get_query(
                            "affection_level", dog_data[0]
                        )
                        entry["child_friendly"] = get_query(
                            "child_friendly", dog_data[0]
                        )
                        entry["dog_friendly"] = get_query("dog_friendly", dog_data[0])
                        entry["energy_level"] = get_query("energy_level", dog_data[0])
                        entry["grooming"] = get_query("grooming", dog_data[0])
                        entry["health_issues"] = get_query("health_issues", dog_data[0])
                        entry["intelligence"] = get_query("intelligence", dog_data[0])
                        entry["shedding_level"] = get_query(
                            "shedding_level", dog_data[0]
                        )
                        entry["social_needs"] = get_query("social_needs", dog_data[0])
                        entry["stranger_friendly"] = get_query(
                            "stranger_friendly", dog_data[0]
                        )
                        entry["vocalization"] = get_query("vocalisation", dog_data[0])

                # new_breed = BreedsSpecies(api_id=api_id, species=species_name, breed=breed, youth_name=species_youth_name)
                new_breed = BreedsSpecies(**entry)
                breed_list.append(new_breed)

    db.session.add_all(breed_list)
    db.session.commit()


def link_pets_centers():
    pets = db.session.query(AdoptablePet).all()
    for pet in pets:
        temp_center = (
            db.session.query(AdoptionCenter).filter_by(api_id=pet.center_number).first()
        )
        pet.center = temp_center
    db.session.commit()


def link_pets_species_breeds():
    pets = db.session.query(AdoptablePet).all()
    for pet in pets:
        temp_species_breed = (
            db.session.query(BreedsSpecies).filter_by(api_id=pet.breed_number).first()
        )
        pet.species_breed = temp_species_breed
    db.session.commit()


def link_species_breeds_centers():
    centers = db.session.query(AdoptionCenter).all()
    for center in centers:
        api_id = center.api_id
        orgs_species_url = (
            "https://api.rescuegroups.org/v5/public/orgs/"
            + str(api_id)
            + "/animals/species"
        )
        querystring = {"format": "json"}
        headers = {"Authorization": "wmUYpgAP"}
        orgs_species_response = requests.request(
            "GET", orgs_species_url, headers=headers, params=querystring
        )
        orgs_species_data = orgs_species_response.json()
        # new list of all breed ids at org
        for species in orgs_species_data["data"]:
            if species["id"] == "3" or species["id"] == "8":
                species_breeds = db.session.query(BreedsSpecies).filter_by(
                    species_id=species["id"]
                )
                for species_breed in species_breeds:
                    center.species_breeds.append(species_breed)
    db.session.commit()


def reset_db():
    # db.session.remove()
    db.drop_all()
    db.create_all()


if __name__ == "__main__":
    reset_db()
    print("start breeds")
    populate_breeds()
    print("start centers")
    populate_centers()
    print("start pets")
    populate_pets()
    print("start link pets centers")
    link_pets_centers()
    print("start link pets species breeds")
    link_pets_species_breeds()
    print("start link adoption centers species breeds")
    link_species_breeds_centers()
