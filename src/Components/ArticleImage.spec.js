import React from 'react';
import expect from 'expect';
import {shallow, configure} from 'enzyme';
import ArticleImage from './ArticleImage';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

const testProps = {
  "url": "https://picsum.photos/640/420/?random",
  "altText": "Vestibulum pellentesque laoreet urna, eget dignissim lorem maximus vel",
  "height": "420",
  "width": "640"
};

const testStyles = {
  height: testProps.height,
  width: testProps.width
}

const wrapper = shallow(<ArticleImage model={testProps}/>);

describe('ArticleImage component', () => {
  it('sets the src attribute based on the url passed to it', () => {
    expect(wrapper.find('img').prop('src')).toEqual(testProps.url);
  });

  it('sets the alt attribute based on the alternative text passed to it', () => {
    expect(wrapper.find('img').prop('alt')).toEqual(testProps.altText);
  });

  it('sets the image styling correctly', () => {
    expect(wrapper.find('img').prop('style')).toEqual(testStyles);
  });
});