import React, { Component } from "react";

class ListGroup extends Component {
  state = {};
  render() {
    return (
      <div className="list-group">
        {this.props.categories.map((category) => (
          <a
            key={category._id}
            onClick={() => this.props.onCategorize(category.name)}
            className={
              this.props.currentCategory.name === category.name
                ? "list-group-item list-group-item-action active"
                : "list-group-item list-group-item-action"
            }
            style={{ cursor: "pointer" }}
          >
            {category.name}
          </a>
        ))}
      </div>
    );
  }
}

export default ListGroup;
