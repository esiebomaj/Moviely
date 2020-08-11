import React, { Component } from "react";

class TableHead extends Component {
  renderSortIcon = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      return sortColumn.order === "asc" ? (
        <i className="fa fa-sort-asc"></i>
      ) : (
        <i className="fa fa-sort-desc"></i>
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) =>
            column.label ? (
              <th
                className="clickable"
                onClick={() => this.props.onSort(column.label)}
                scope="col"
              >
                {column.label} {this.renderSortIcon(column.label)}
              </th>
            ) : (
              <th></th>
            )
          )}
        </tr>
      </thead>
    );
  }
}

export default TableHead;
