import expect from 'expect';
import ConnectionManager from './ConnectionManager';
import fetchMock from 'fetch-mock';

const expectedResult = {urlRequested: "http://localhost:8080/articles/1"};
const connManager = new ConnectionManager();

describe('ConnectionManager module', () => {
    it('should perform a get request to the correct api route when fetching an article', (done) => {
        fetchMock.mock(expectedResult.urlRequested, JSON.stringify(expectedResult));
        connManager.getArticleWithId(1).then(response => {
            expect(response).toEqual(expectedResult);
            fetchMock.restore();
            done();
        });
    });
});