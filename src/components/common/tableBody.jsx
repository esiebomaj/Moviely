import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  render() {
    return (
      <tbody>
        {this.props.items.map((item) => (
          <tr key={item._id}>
            {this.props.columns.map((column) =>
              column.content ? (
                <td>{column.content(item)}</td>
              ) : (
                <td>{_.get(item, column.path)}</td>
              )
            )}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
