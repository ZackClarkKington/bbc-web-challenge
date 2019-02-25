import 'isomorphic-fetch';

class ConnectionManager {
    constructor(){

    }

    /*
    * fetchOptions - returns a basic set of request options
    */
    fetchOptions(){
        return {
            headers: {
                Accept: 'application/json'
            }
        };
    }

    /*
    * getArticleWithId - Attempts to fetch an article from the API based on the article's ID
    */
    getArticleWithId(articleId) {
        const promise = new Promise((resolve) => {
            var articleRequest = new Request(`http://localhost:8080/articles/${articleId}`);
            fetch(articleRequest, this.fetchOptions())
                .then(res => {
                    if (!res.ok) throw Error(res.statusText);
                    res.json().then(result => {
                        resolve(result);
                    });
                })
                .catch(err => {
                    //TODO: Better notfify the user that an error has occurred, perhaps load an article object describing the error?
                    console.log(err);
                });
            });
        return promise;
    }

    /*
    * rankArticles - POST an array of article ids in rank order to update each article ranking server-side
    */
    rankArticles(ranks) {
        const promise = new Promise(resolve => {
            var url = 'http://localhost:8080/ranks';
            var options = this.fetchOptions();
            options.method = "POST";
            options.body = JSON.stringify({ranks: ranks});
            options.headers['Content-Type'] = 'application/json';
            fetch(url, options)
                .then(res => {
                    if(!res.ok) throw Error(res.statusText);
                    res.json().then(result => {
                        if(result.hasOwnProperty('success') && result.success){
                            resolve(result);
                        } else {
                            throw Error('Could not update article ranks');
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
                });
        });
        return promise;
    }
}

export default ConnectionManager;