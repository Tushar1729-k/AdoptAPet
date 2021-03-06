import React from 'react';
import InstancePageTemplate from './PetsInstanceTemplate';
import renderer from 'react-test-renderer';
import beagle1 from '../Images/beagle_1.jpg'

test("Pet Instance Page Text Properly Rendered", () => {
    const component = renderer.create(
        <InstancePageTemplate
        attributes={{ breed: "German Sheperd", name: "Max", size: "large", 
            age: "5", color: "Grey/Black", sex: "M",
            description: "Warm and loyal friend", imgSrc: "",
            adoptCenter: {api_id: 12, name: 'Cat Rescue of Maryland, Inc.'}, speciesBreeds: {api: 208} }}
        />,
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
})

test("Pet Instance Page Text and Image Properly Rendered", () => {
    const component = renderer.create(
        <InstancePageTemplate
        attributes={{ breed: "German Sheperd", name: "Max", size: "large", 
            age: "5", color: "Grey/Black", sex: "M",
            description: "Warm and loyal friend", imgSrc: beagle1,
            adoptCenter: {api_id: 12, name: 'Cat Rescue of Maryland, Inc.'}, speciesBreeds: {api: 208} }}
        />,
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
})