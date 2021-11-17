from sqlalchemy.sql.expression import null
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

# filters adoption centers by one of the five supported attributes
# supports filtering for multiple values for the attribute
def filter_center_by(center_query, filtering, what) :
  if filtering == 'city':
    center_query = center_query.filter(func.lower(AdoptionCenter.city).in_(what))
  elif filtering == 'state':
    center_query = center_query.filter(func.lower(AdoptionCenter.state).in_(what))
  elif filtering == 'zip':
    center_query = center_query.filter(func.lower(AdoptionCenter.zipcode).in_(what))
  elif filtering == 'services':
    # if AdoptionCenter.services != None:
    # print(what)
    center_query = center_query.filter(func.lower(AdoptionCenter.services).contains(what[0]))
  elif filtering == 'type':
    center_query = center_query.filter(func.lower(AdoptionCenter.type).in_(what))

  return center_query

# filters adoption centers for all five supported attributes
def filter_centers(center_query, queries) :
  city = get_query('city', queries)
  state = get_query('state', queries)
  zip = get_query('zip', queries)
  services = get_query('services', queries)
  type = get_query('type', queries)

  if city != None:
    center_query = filter_center_by(center_query, 'city', city)
  if state != None:
    center_query = filter_center_by(center_query, 'state', state)
  if zip != None:
    center_query = filter_center_by(center_query, 'zip', zip)
  if services != None:
    center_query = filter_center_by(center_query, 'services', services)
  if type != None:
    center_query = filter_center_by(center_query, 'type', type)

  return center_query


def return_all_cities(center_query, queries) :
  return center_query.with_entities(AdoptionCenter.city)
def return_all_states(center_query, queries) :
  return center_query.with_entities(AdoptionCenter.state)
def return_all_zips(center_query, queries) :
  return center_query.with_entities(AdoptionCenter.zipcode)


# sorts adoption centers by one of the five supported attributes
# in ascending or descending order
def sort_center_by(sorting, center_query, desc) :
  center = None

  if sorting == "name":
    center = AdoptionCenter.name
  elif sorting == "city":
    center = AdoptionCenter.city
  elif sorting == "state":
    center = AdoptionCenter.state
  elif sorting == "zip":
    center = AdoptionCenter.zipcode
  elif sorting == "type":
    center = AdoptionCenter.type
  else:
    return center_query

  if desc:
    return center_query.order_by(center.desc())
  else:
    return center_query.order_by(center)

# determines whether attribute will be sorted in ascending or descending order
# passes attribute to be sorted to sort_center_by for sorting
# only supports sorting on one attribute at a time
def sort_centers(sort, center_query) :
  if sort == None:
    return center_query
  else:
    sort = sort[0]

  sort = sort.split("-")

  # in descending order
  if len(sort) > 1:
    return sort_center_by(sort[1], center_query, True)
  else:
    return sort_center_by(sort[0], center_query, False)

# applies filter with an "or" on each of the five searchable attributes
def search_centers(q, center_query) :
  if not q:
    return center_query
  else:
    q = q[0].strip()

  terms = q.split()

  searches = []
  for term in terms:
    searches.append(AdoptionCenter.name.contains(term))
    searches.append(AdoptionCenter.city.contains(term))
    searches.append(AdoptionCenter.state.contains(term))
    searches.append(AdoptionCenter.zipcode.contains(term))
    searches.append(AdoptionCenter.type.contains(term))

  center_query = center_query.filter(or_(*tuple(searches)))

  return center_query