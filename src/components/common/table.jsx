import React, { Component } from "react";
import TableHead from "./tableHead";
import TableBody from "./tableBody";

class Table extends Component {
  render() {
    return (
      <table className="table  table-hover">
        <TableHead
          sortColumn={this.props.sortColumn}
          columns={this.props.columns}
          onSort={this.props.onSort}
        />
        <TableBody
          items={this.props.items}
          columns={this.props.columns}
          onLiked={this.props.onLiked}
          onDelete={this.props.handleDelete}
        />
      </table>
    );
  }
}

export default Table;
