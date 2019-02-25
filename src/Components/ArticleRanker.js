import React, {Component} from 'react';

class ArticleRanker extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {articles: this.props.articles, rankedArticles: []};
        this.generateArticleRankings = this.generateArticleRankings.bind(this);
        this.generateArticleGrabber = this.generateArticleGrabber.bind(this);
        this.changeArticleRank = this.changeArticleRank.bind(this);
        this.increaseRank = this.increaseRank.bind(this);
        this.decreaseRank = this.decreaseRank.bind(this);
    }

    /*
    *   generateArticleRankings - Generates an array of article ids in order of their rank and sets state.rankedArticles to this value
    */
    generateArticleRankings() {
        this.setState((state, props) => {
            var rankedArticles = state.rankedArticles;
            var articles = state.articles;
            articles.forEach((article, index) => {
                rankedArticles[article.rank] = index;
            });
            return {rankedArticles: rankedArticles};
        });
    }

    /*
    *   changeArticleRank - Swaps article ranks and updates the state each time the user changes the rank of an article
    */
    changeArticleRank(currentRank, rankChange) {
        let articleId = this.getArticleIdFromRank(currentRank);
        let articleToReplace = this.getArticleIdFromRank(currentRank + rankChange);
        this.setState((state, props) => {
            var rankedArticles = state.rankedArticles;
            rankedArticles[currentRank] = articleToReplace;
            rankedArticles[currentRank + rankChange] = articleId;
            //Send the updated rankings to the server
            props.connManager.rankArticles(rankedArticles);
            return {rankedArticles: rankedArticles};
        });
    }

    /*
    * Returns an article's id based on the rank passed in
    */
    getArticleIdFromRank(rank) {
        return this.state.rankedArticles[rank];
    }

    /*
    * increaseRank - Moves an article up the rankings, i.e. closer to 0
    */
    increaseRank(e) {
        this.changeArticleRank(Number(e.target.parentNode.id), -1);
    }

    /*
    * decreaseRank - Moves an article down the rankings, i.e. further from 0
    */
    decreaseRank(e) {
        this.changeArticleRank(Number(e.target.parentNode.id), 1);
    }

    /*
    * generateArticleGrabber - Creates a component to represent an article, with buttons to change its' rank
    * Initial plan was to have elements that could be dragged and dropped to change rankings, but I have not
    * had time to implement this yet.
    */
    generateArticleGrabber(article, rank) {
        let decreaseRankEnabled = Number(rank) < (this.state.rankedArticles.length - 1);
        let increaseRankEnabled = Number(rank) > 0;
        return (
            <div key={article.title} className="shadow article-grabber padded">
                <span>{article.title}</span>
                <div id={rank} className="float-right">
                    <button disabled={!decreaseRankEnabled} onClick={this.decreaseRank}>-1</button>
                    <button disabled={!increaseRankEnabled} onClick={this.increaseRank}>+1</button>
                </div>
            </div>
        );
    }

    componentDidMount(){
        this.generateArticleRankings();
    }

    render() {
        let articleGrabbers = [];
        //Generate an article grabber for each article
        this.state.rankedArticles.forEach((articleId, rank) => {
            articleGrabbers.push(this.generateArticleGrabber(this.state.articles[articleId], rank));
        });

        return (
            <div>
                {articleGrabbers}
            </div>
        );
    }
}

export default ArticleRanker;