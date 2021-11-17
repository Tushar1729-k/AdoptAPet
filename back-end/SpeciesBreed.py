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

from sqlalchemy import and_, or_, func
from query_helpers import *

# filters breeds by one of the five supported attributes
# supports filtering for multiple values for the attribute
def filter_breed_by(breed_query, filtering, what) :
  if filtering == "species":
    breed_query = breed_query.filter(func.lower(BreedsSpecies.species_name).in_(what))
  elif filtering == "breed":
    breed_query = breed_query.filter(func.lower(BreedsSpecies.breed_name).in_(what))
  elif filtering == "life_exp":
    breed_query = breed_query.filter(func.lower(BreedsSpecies.life_span).in_(what))
  elif filtering == "weight":
    breed_query = breed_query.filter(func.lower(BreedsSpecies.weight).in_(what))
  elif filtering == "origin":
    breed_query = breed_query.filter(func.lower(BreedsSpecies.origin).in_(what))

  return breed_query

# filters breeds for all five supported attributes
def filter_breeds(breed_query, queries) :
  species = get_query("species", queries)
  breed = get_query("breed", queries)
  life_exp = get_query("life_exp", queries)
  weight = get_query("weight", queries)
  origin = get_query("origin", queries)

  if species:
    breed_query = filter_breed_by(breed_query, "species", species)
  if breed:
    breed_query = filter_breed_by(breed_query, "breed", breed)
  if life_exp:
    breed_query = filter_breed_by(breed_query, "life_exp", life_exp)
  if weight:
    breed_query = filter_breed_by(breed_query, "weight", weight)
  if origin:
    breed_query = filter_breed_by(breed_query, "origin", origin)

  return breed_query

def return_all_weights(breed_query, queries) :
  return breed_query.with_entities(BreedsSpecies.weight)
def return_all_origins(breed_query, queries) :
  return breed_query.with_entities(BreedsSpecies.origin)
def return_all_lifeexps(breed_query, queries) :
  return breed_query.with_entities(BreedsSpecies.life_span)

# sorts breeds by one of the five supported attributes
# in ascending or descending order
def sort_breed_by(sorting, breed_query, desc) :
  breed = None

  if sorting == "species":
    breed = BreedsSpecies.species_name
  elif sorting == "breed":
    breed = BreedsSpecies.breed_name
  elif sorting == "life_exp":
    breed = BreedsSpecies.life_span
  elif sorting == "weight":
    breed = BreedsSpecies.weight
  elif sorting == "origin":
    breed = BreedsSpecies.origin
  else:
    return breed_query

  if desc:
    return breed_query.order_by(breed.desc())
  else:
    return breed_query.order_by(breed)

# determines whether attribute will be sorted in ascending or descending order
# passes attribute to be sorted to sort_breed_by for sorting
# only supports sorting on one attribute at a time
def sort_breeds(sort, breed_query) :
  if sort == None:
    return breed_query
  else:
    sort = sort[0]

  sort = sort.split("-")

  # in descending order
  if len(sort) > 1:
    return sort_breed_by(sort[1], breed_query, True)
  else:
    return sort_breed_by(sort[0], breed_query, False)
    
# applies filter with an "or" on each of the five searchable attributes
def search_breeds(q, breed_query) :
  if not q:
    return breed_query
  else:
    q = q[0].strip()

  terms = q.split()

  searches = []
  for term in terms:
    searches.append(func.lower(BreedsSpecies.species_name).contains(func.lower(term)))
    searches.append(func.lower(BreedsSpecies.breed_name).contains(func.lower(term)))
    searches.append(func.lower(BreedsSpecies.life_span).contains(func.lower(term)))
    searches.append(func.lower(BreedsSpecies.weight).contains(func.lower(term)))
    searches.append(func.lower(BreedsSpecies.origin).contains(func.lower(term)))
  breed_query = breed_query.filter(or_(*tuple(searches)))

  return breed_query