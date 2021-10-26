import React from 'react';
import InstancePageTemplate from './PetsInstanceTemplate';
import renderer from 'react-test-renderer';
import beagle1 from '../Images/beagle_1.jpeg'

test("Pet Instance Page Text Properly Rendered", () => {
    const component = renderer.create(
        <InstancePageTemplate
        attributes={{ breed: "German Sheperd", name: "Max", size: "large", 
            age: "5", color: "Grey/Black", sex: "M",
            description: "Warm and loyal friend", imgSrc: "",
            adoptCenter: "Pets For Life" }}
        medicalHistory={{ allergies: "Cats", diet: "Organic food", 
                issues: "None", hearing: "No",
                sight: "No" }}
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
            adoptCenter: "Pets For Life" }}
        medicalHistory={{ allergies: "Cats", diet: "Organic food", 
                issues: "None", hearing: "No",
                sight: "No" }}
        />,
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
})