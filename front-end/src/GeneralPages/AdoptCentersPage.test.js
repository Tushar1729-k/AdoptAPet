import React from 'react';
import renderer from 'react-test-renderer';
import AdoptCentersPage from './AdoptCentersPage';
import axios from 'axios'
import AdoptCentersPageTestData from '../Data/AdoptCentersPageTestData.json'

test("Pets Model Page Properly Rendered", () => {
    jest.mock('axios')
    axios.get = jest.fn()
    const resp = AdoptCentersPageTestData;
    axios.get.mockResolvedValue(resp);
    const component = renderer.create(
        <AdoptCentersPage/>,
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
})