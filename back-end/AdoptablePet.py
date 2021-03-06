from models import *

from sqlalchemy import and_, or_, func, any_, case, nullslast
from query_helpers import *

# filters adoptable pets by one of the five supported attributes
# supports filtering for multiple values for the attribute
def filter_adoptablepet_by(pet_query, filtering, what):
    print("what", what)
    if filtering == "sex":
        pet_query = pet_query.filter(func.lower(AdoptablePet.sex).in_(what))
    elif filtering == "age":
        pet_query = pet_query.filter(func.lower(AdoptablePet.age).in_(what))
    elif filtering == "breeds":
        filters = []
        for breed in what:
            pet_query = pet_query.join(BreedsSpecies).filter(
                func.lower(BreedsSpecies.breed_name) == func.lower(breed)
            )
    elif filtering == "color":
        pet_query = pet_query.filter(func.lower(AdoptablePet.color).in_(what))
    elif filtering == "size":
        pet_query = pet_query.filter(func.lower(AdoptablePet.size_group).in_(what))

    return pet_query


# filters adoptable pets for all five supported attributes
def filter_adoptablepets(pet_query, queries):
    sex = get_query("sex", queries)
    age = get_query("age", queries)
    breeds = get_query("breeds", queries)
    color = get_query("color", queries)
    size = get_query("size", queries)

    if sex != None:
        pet_query = filter_adoptablepet_by(pet_query, "sex", sex)
    if age != None:
        pet_query = filter_adoptablepet_by(pet_query, "age", age)
    if breeds != None:
        pet_query = filter_adoptablepet_by(pet_query, "breeds", breeds)
    if color != None:
        pet_query = filter_adoptablepet_by(pet_query, "color", color)
    if size != None:
        pet_query = filter_adoptablepet_by(pet_query, "size", size)

    return pet_query


def return_all_breeds(pet_query, queries):
    return pet_query.join(BreedsSpecies).with_entities(BreedsSpecies.breed_name)


def return_all_colors(pet_query, queries):
    return pet_query.with_entities(AdoptablePet.color)


# sorts adoptable pets by one of the five supported attributes
# in ascending or descending order
def sort_adoptablepet_by(sorting, pet_query, desc):
    pet = None

    if sorting == "name":
        pet = AdoptablePet.name
    elif sorting == "age":
        pet = AdoptablePet.age
    elif sorting == "size":
        pet = AdoptablePet.size_group
    elif sorting == "color":
        pet = AdoptablePet.color
    elif sorting == "sex":
        pet = AdoptablePet.sex
    else:
        return pet_query

    if desc:
        return pet_query.order_by(pet.desc())
    else:
        sort_order = pet
        if sorting == "age":
            _whens = {"Baby": 1, "Young": 2, "Adult": 3, "Senior": 4, "": 5}
            sort_order = case(value=pet, whens=_whens)
        elif sorting == "size":
            _whens = {"Small": 1, "Medium": 2, "Large": 3, "": 4}
            sort_order = case(value=pet, whens=_whens)
        elif sorting == "color":
            return pet_query.order_by(
                case([(or_(pet.is_(None), pet == ""), 1)], else_=0), pet
            )

        return pet_query.order_by(sort_order)


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


# applies filter with an "or" on each of the five searchable attributes
def search_adoptablepets(q, pet_query):
    if not q:
        return pet_query
    else:
        q = q[0].strip()

    terms = q.split()

    searches = []
    for term in terms:
        searches.append(func.lower(AdoptablePet.sex).match(func.lower(term)))
        searches.append(func.lower(AdoptablePet.age).contains(func.lower(term)))
        searches.append(func.lower(AdoptablePet.size_group).contains(func.lower(term)))
        searches.append(func.lower(AdoptablePet.color).contains(func.lower(term)))
    pet_query = pet_query.join(BreedsSpecies).filter(
        or_(
            *tuple(searches),
            *tuple([BreedsSpecies.breed_name == term for term in terms])
        )
    )

    return pet_query
