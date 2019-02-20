import React from 'react';
import expect from 'expect';
import {shallow, configure} from 'enzyme';
import ArticleList from './ArticleList';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

const unorderedTestProps = {
  "type": "unordered",
  "items": [
    "Vestibulum viverra viverra ullamcorper",
    "Aenean ut felis hendrerit, scelerisque est sed, rhoncus sem"
  ]
}

var orderedTestProps = unorderedTestProps;
orderedTestProps.type = "ordered";

const unorderedWrapper = shallow(<ArticleList model={unorderedTestProps} />);
const orderedWrapper = shallow(<ArticleList model={orderedTestProps} />);

describe('ArticleList component', () => {
  it('creates an unordered list when specified', () => {
    expect(unorderedWrapper.find('ul')).toBeTruthy();

    it('has the correct number of children', () => {
      expect(unorderedWrapper.find('ul').children().length).toEqual(unorderedTestProps.items.length);
    });
  });

  it('creates an ordered list when specified', () => {
    expect(orderedWrapper.find('ol')).toBeTruthy();

    it('has the correct number of children', () => {
      expect(orderedWrapper.find('ol').children().length).toEqual(orderedTestProps.items.length);
    });
  });
});