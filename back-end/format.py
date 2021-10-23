import json

def format_adoption_center_in_schema(schema):
	if "adoptable_pet" in schema:
		schema["adoptable_pet"] = {
			"type": schema["adoptable_pet"][""]
		}