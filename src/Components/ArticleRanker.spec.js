import React from 'react';
import expect from 'expect';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ArticleRanker from './ArticleRanker';
configure({adapter: new Adapter()});

const props = {
    articles: [
        {
            title: "Lorem ipsum dolor sit amet",
            rank: 0
        },
        {
            title: "Another test article",
            rank: 1
        }
    ]
};

const expectedRankings = [0,1];

const wrapper = shallow(<ArticleRanker articles={props.articles} />);

describe('ArticleRanker component', () => {
    it('generates article rankings based on articles passed to it', () => {
        expect(wrapper.state('rankedArticles')).toEqual(expectedRankings);
    });

    it('creates an article grabber for each ranked article', () => {
        wrapper.state('rankedArticles').forEach((id, index) => {
            expect(wrapper.find('.article-grabber')).toBeTruthy();
        });
    });
});