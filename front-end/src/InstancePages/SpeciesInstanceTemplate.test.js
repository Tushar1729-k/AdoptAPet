import React from 'react';
import SpeciesInstanceTemplate from './SpeciesInstanceTemplate';
import renderer from 'react-test-renderer';

test("Species Instance Page Properly Rendered", () => {
    const component = renderer.create(
        <SpeciesInstanceTemplate
            attributes={{ breed: "German Sheperd", species: "Dog", weight: "10 - 15", height: "", energy: "High",
            color: 'White, black, blue, red, cream and silver, plus various patterns and shadings', lifespan: "10 - 15", 
            temperament: "Angry",
            shedding: 2,
            health: 2,
            origin: "Germany",
            adoptCenters: [{api_id: 12, name: 'Cat Rescue of Maryland, Inc.'}], pets: [{api_id: 1, name: 'Jack'}, {api_id: 2, name: 'John'}], wiki: ""}}
        />
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
})