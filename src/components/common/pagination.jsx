import React, { Component } from "react";
import _ from "lodash";
import propTypes from "prop-types";

class Pagination extends Component {
  state = {};

  render() {
    const { pageSize, totalItemNum, onPaginate, currentPage } = this.props;
    const numPages = Math.ceil(totalItemNum / pageSize);
    if (numPages === 1) {
      return null;
    }
    const pages = _.range(1, numPages + 1);
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pages.map((page) => (
            <li
              key={page}
              className={
                currentPage === page ? "page-item active" : "page-item"
              }
            >
              <a onClick={() => onPaginate(page)} className="page-link">
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  pageSize: propTypes.number.isRequired,
  totalItemNum: propTypes.number.isRequired,
  onPaginate: propTypes.func.isRequired,
  currentPage: propTypes.number.isRequired,
};

export default Pagination;
