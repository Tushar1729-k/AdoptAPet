import React from 'react';
import renderer from 'react-test-renderer';
import SpeciesModelPage from './SpeciesModelPage';
import axios from 'axios'
import SpeciesModelPageTestData from '../Data/SpeciesModelPageTestData.json'

test("Pets Model Page Properly Rendered", () => {
    jest.mock('axios')
    axios.get = jest.fn()
    const resp = SpeciesModelPageTestData;
    axios.get.mockResolvedValue(resp);
    const component = renderer.create(
        <SpeciesModelPage />,
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
})