import React from 'react';
import expect from 'expect';
import {shallow, configure} from 'enzyme';
import ArticleViewer from './ArticleViewer';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

const wrapper = shallow(<ArticleViewer />);

describe('ArticleViewer component', () => {
  it('displays articles', () => {
    expect(wrapper.exists('Article')).toBeTruthy();
  });
});