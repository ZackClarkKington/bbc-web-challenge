import React, {Component} from 'react';
import Article from './Article';

class ArticleViewer extends Component {
  constructor(props, context) {
    super(props, context);
  }

  getArticleProps(){
    let props = {};
    props.title = "a test title";

    //TODO: Request article from API and populate props
    props.body = [
      {
        "type": "heading",
        "model": {
          "text": "Some test text"
        }
      }
    ];
    return props;
  }

  render() {
    let articleProps = this.getArticleProps();
    return (
      <div>
        <Article article={articleProps}/>
      </div>
    );
  }
}

export default ArticleViewer;