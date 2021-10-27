import React from 'react';
import AdoptInstanceTemplate from './AdoptInstanceTemplate';
import renderer from 'react-test-renderer';
import terrier1 from '../Images/pitbull_terrier_1.jpeg'

test("Adoption Center Instance Page Properly Rendered", () => {
    const component = renderer.create(
        <AdoptInstanceTemplate
            attributes={{ name: "Pets for Life", address: "187 Star War Way",
            city: "Austin", state: "TX", 
            zip: "78705", phone: "123-456-7890", 
            email: "pets4life@gmail.com",
            site: "www.pets4life.com", species: "Dogs, Cats",
            services: "grooming, training", speciesBreeds: [{api_id: 12}],
            pets: [{api_id: 1, name: 'Jack'}, {api_id: 2, name: 'John'}],
            imgSrc: ""
        }}
        />
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
})

test("Adoption Center Instance Page Properly Rendered With Image", () => {
    const component = renderer.create(
        <AdoptInstanceTemplate
            attributes={{ name: "Pets for Life", address: "187 Star War Way",
            city: "Austin", state: "TX", 
            zip: "78705", phone: "123-456-7890", 
            email: "pets4life@gmail.com",
            site: "www.pets4life.com", species: "Dogs, Cats",
            services: "grooming, training", speciesBreeds: [{api_id: 12}],
            pets: [{api_id: 1, name: 'Jack'}, {api_id: 2, name: 'John'}],
            imgSrc: terrier1
        }}
        />
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
})