import 'isomorphic-fetch';

class ConnectionManager {
    constructor(){

    }

    getArticleWithId(articleId) {
        const promise = new Promise((resolve) => {
            var articleRequest = new Request(`http://localhost:8080/articles/${articleId}`);
            fetch(articleRequest, {headers: {Accept: 'application/json'}})
                .then(res => {
                    if (!res.ok) throw Error(res.statusText);
                    res.json().then(result => {
                        resolve(result);
                    });
                })
                .catch(err => {
                    console.log(err);
                });
            });
        return promise;
    }
}

export default ConnectionManager;