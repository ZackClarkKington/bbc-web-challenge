import React, {Component} from 'react';
import ArticleViewer from './Components/ArticleViewer';

class App extends Component {
  render() {
    return (
      <div className="padded">
        <h1 className="centered-text">Article Ranker</h1>
        <ArticleViewer />
      </div>
    );
  }
}

export default App;