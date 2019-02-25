import expect from 'expect';
import ConnectionManager from './ConnectionManager';
import fetchMock from 'fetch-mock';

describe('ConnectionManager module', () => {
    it('should perform a get request to the correct api route when fetching an article', (done) => {
        var connManager = new ConnectionManager();
        var expectedResult = {urlRequested: "http://localhost:8080/articles/1"};
        fetchMock.mock(expectedResult.urlRequested, JSON.stringify(expectedResult));
        connManager.getArticleWithId(1).then(response => {
            expect(response).toEqual(expectedResult);
            fetchMock.restore();
            done();
        });
    });

    it('should perform a post request to the correct api route when updating article ranks', (done) => {
        var connManager = new ConnectionManager();
        var ranks = {ranks: [0]};
        var expectedResult = {
            urlRequested: "http://localhost:8080/ranks",
            options: {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(ranks)
            }
        };
        fetchMock.mock(expectedResult.urlRequested, (url, options) => {
            expect(url).toEqual(expectedResult.urlRequested);
            expect(options).toEqual(expectedResult.options);
            return JSON.stringify({success: true});
        });
        connManager.rankArticles(ranks.ranks).then(response => {
            fetchMock.restore();
            done();
        });
    });
});