import React from 'react';
import renderer from 'react-test-renderer';
import PetsModelPage from './PetsModelPage';
import { shallow, configure } from 'enzyme';
import axios from 'axios'
import PetsModelPageTestData from '../Data/PetsModelPageTestData.json'
import Select from 'react-select'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

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

describe('Test Select Component', () => {
  it('Test click event', () => {
    const mockCallBack = jest.fn();
    const select = shallow((<Select onClick={mockCallBack}></Select>));
    select.find('Select').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});