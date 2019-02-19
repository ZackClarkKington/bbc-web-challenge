import React, {Component} from 'react';

class ArticleImage extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    let imgStyles = {
      height: this.props.model.height,
      width: this.props.model.width
    };

    return(
      <img src={this.props.model.url} alt={this.props.model.altText} style={imgStyles} />
    );
  }
}

export default ArticleImage;