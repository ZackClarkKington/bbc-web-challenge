import React from 'react';
import expect from 'expect';
import {shallow, configure} from 'enzyme';
import App from './App';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
const wrapper = shallow(<App />);
describe('Index component', () => {
  it('renders an h1 element with the title Test', () => {
    expect(wrapper.find('h1').text()).toEqual('Test');
  });
});