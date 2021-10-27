import React from 'react';
import renderer from 'react-test-renderer';
import PetsModelPage from './PetsModelPage';
import axios from 'axios'
import PetsModelPageTestData from '../Data/PetsModelPageTestData.json'

test("Pets Model Page Properly Rendered", () => {
    jest.mock('axios')
    axios.get = jest.fn()
    const resp = PetsModelPageTestData;
    axios.get.mockResolvedValue(resp);
    const component = renderer.create(
        <PetsModelPage/>,
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
})