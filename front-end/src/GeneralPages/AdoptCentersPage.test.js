import React from 'react';
import renderer from 'react-test-renderer';
import AdoptCentersPage from './AdoptCentersPage';
import axios from 'axios'
import AdoptCentersPageTestData from '../Data/AdoptCentersPageTestData.json'
import Adapter from 'enzyme-adapter-react-16';
import Select from 'react-select'
import { shallow, configure } from 'enzyme';

configure({ adapter: new Adapter() });

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

describe('Test Select Component', () => {
  it('Test click event', () => {
    const mockCallBack = jest.fn();
    const select = shallow((<Select onClick={mockCallBack}></Select>));
    select.find('Select').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});