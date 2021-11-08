# from models import (
#   AdoptablePet,
#   AdoptionCenter,
#   BreedsSpecies,
#   db,
#   app,
#   adoptable_pet_schema,
#   adoption_center_schema,
#   breeds_species_schema
# )
from models import *

from sqlalchemy import and_, or_, func, any_
from query_helpers import *

# filters adoptable pets by one of the four supported attributes
# supports filtering for multiple values for the attribute
def filter_adoptablepet_by(pet_query, filtering, what) :
  print('what', what)
  if filtering == "sex":
    pet_query = pet_query.filter(func.lower(AdoptablePet.sex).in_(what))
  
  elif filtering == "age":
    pet_query = pet_query.filter(func.lower(AdoptablePet.age).in_(what))
    # print(pet_query)

  elif filtering == "breeds":
    filters = []
    for breed in what:
      print(breed)
      # filters.append(AdoptionCenter.species_breeds.any(BreedsSpecies.breed_name==breed))
      # pet_query = pet_query.filter(AdoptablePet.breed_number==BreedsSpecies.api_id)
      pet_query = pet_query.join(BreedsSpecies).filter(BreedsSpecies.breed_name==breed)
      print(len(filters))
    # print('tuple', *tuple(filters))
    # pet_query = pet_query.join(AdoptionCenter).filter(or_(*tuple(filters)))
    print(pet_query)

  elif filtering == "color":
    pet_query = pet_query.filter(func.lower(AdoptablePet.color).in_(what))

  return pet_query

def filter_adoptablepets(pet_query, queries) :
  sex = get_query("sex", queries)
  # print(sex)
  age = get_query("age", queries)
  breeds = get_query("breeds", queries)
  color = get_query("color", queries)
  # print('here')
  print(breeds)

  if sex != None:
    pet_query = filter_adoptablepet_by(pet_query, "sex", sex)
  if age != None:
    pet_query = filter_adoptablepet_by(pet_query, "age", age)
  if breeds != None:
    pet_query = filter_adoptablepet_by(pet_query, "breeds", breeds)
  if color != None:
    pet_query = filter_adoptablepet_by(pet_query, "color", color)

  return pet_query

# sorts adoptable pets by one of the four supported attributes
# in ascending or descending order
def sort_adoptablepet_by(sorting, pet_query, desc) :
  pet = None

  if sorting == "name":
    pet = AdoptablePet.name
  elif sorting == "age":
    pet = AdoptablePet.age
  else:
    return pet_query

  if desc:
    return pet_query.order_by(pet.desc())
  else:
    return pet_query.order_by(pet)

# determines whether attribute will be sorted in ascending or descending order
# passes attribute to be sorted to sort_adoptablepet_by for sorting
# only supports sorting on one attribute at a time
def sort_adoptablepets(sort, pet_query):
  if sort == None:
    return pet_query
  else:
    sort = sort[0]

  sort = sort.split("-")

  # In descending order
  if len(sort) > 1:
    return sort_adoptablepet_by(sort[1], pet_query, True)
  else:
    return sort_adoptablepet_by(sort[0], pet_query, False)

# applies filter with an "or" on each attribute
# have to be an exact match
def search_politicians(q, pet_query) :
  if not q:
    return pet_query
  else:
    q = q[0].strip()

  terms = q.split()
  terms = [w.lower() for w in terms]

  searches = []
  for term in terms:
    searches.append(AdoptablePet.sex.match(term))
    # try:
    #   searches.append(AdoptablePet.age.in_)

  pet_query = pet_query.filter(or_(*tuple(searches)))

  return pet_query