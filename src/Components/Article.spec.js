import React from 'react';
import expect from 'expect';
import {shallow, configure} from 'enzyme';
import Article from './Article';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

const testProps = {
  title: "a test title",
  body: [
    {
      "type": "heading",
      "model": {
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
      }
    },
    {
      "type": "paragraph",
      "model": {
        "text": "Etiam ornare nulla in sem pharetra, vel varius magna tempus. Praesent pulvinar eget dolor vitae elementum. Donec id velit at sem gravida tristique non vitae lorem."
      }
    },
    {
      "type": "image",
      "model": {
        "url": "https://picsum.photos/640/420/?random",
        "altText": "Vestibulum pellentesque laoreet urna, eget dignissim lorem maximus vel",
        "height": "420",
        "width": "640"
      }
    }
  ]
}

const wrapper = shallow(<Article article={testProps} />);

describe('Article component', () => {
  it('renders an h1 element with the correct article title', () => {
    expect(wrapper.find('h1').text()).toEqual(testProps.title);
  });

  it('renders each body element appropriately', () => {
    it('renders a heading as an h2 element containing text', () => {
      let headings = testProps.body.filter(element => element.type === "heading");
      headings.forEach(element => {
        expect(wrapper.find('h2').text()).toEqual(element.model.text);
      });
    });

    it('renders a paragraph as a p element containing text', () => {
      let paragraphs = testProps.body.filter(element => element.type === "paragraph");
      paragraphs.forEach(element => {
        expect(wrapper.find('p').text()).toEqual(element.model.text);
      });
    });

    it('renders an ArticleImage component when passed an image', () => {
      let images = testProps.body.filter(element => element.type === "image");
      expect(wrapper.find('ArticleImage')).toBeTruthy();

      images.forEach(element => {
        expect(wrapper.find('ArticleImage').prop('model')).toEqual(element.model)
      });
    });
  });
});