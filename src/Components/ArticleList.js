import React, {Component} from 'react';

class ArticleList extends Component {
  constructor(props, context){
    super(props, context);
  }

  populateListItems() {
    let listItems = [];

    this.props.model.items.forEach(item => {
      listItems.push(<li>{item}</li>);
    });

    return listItems;
  }

  render(){
    let listItems = this.populateListItems();

    if(this.props.model.type === "unordered"){
      return(
        <ul>
          {listItems}
        </ul>
      );
    } else {
      return(
        <ol>
          {listItems}
        </ol>
      );
    }
  }
}

export default ArticleList;