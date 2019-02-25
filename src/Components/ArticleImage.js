import React, {Component} from 'react';

class ArticleImage extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    //We use inline styling in order to allow the img height and width to be specified as props
    let imgStyles = {
      height: this.props.model.height,
      width: this.props.model.width
    };

    return(
      <img className="auto-margins" src={this.props.model.url} alt={this.props.model.altText} style={imgStyles} />
    );
  }
}

export default ArticleImage;