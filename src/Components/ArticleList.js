import React, {Component} from 'react';

class ArticleList extends Component {
  constructor(props, context){
    super(props, context);
  }

  /*
  * populateListItems - Takes all the items passed in as props and places them into list items that can be rendered
  */
  populateListItems() {
    let listItems = [];

    this.props.model.items.forEach((item, index) => {
      listItems.push(<li key={index}>{item}</li>);
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