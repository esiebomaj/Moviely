import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";
import SeacrForm from "./common/searchForm";
import auth from "../services/authService";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (item) => (
        <Link to={`/movies/movie-form/${item._id}`}> {item.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rating" },

    {
      key: "like",
      content: (item) => (
        <Like onLiked={() => this.props.onLiked(item)} liked={item.liked} />
      ),
    },
  ];

  deleteColumn = {
    key: "delete",
    content: (item) => (
      <button
        onClick={() => this.props.handleDelete(item._id)}
        className="btn btn-danger"
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  onSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
    }
    this.props.onSort(sortColumn);
  };

  render() {
    const {
      movies,
      paginatedMovies,
      onLiked,
      handleDelete,
      sortColumn,
      handleSearch,
      searchQuery,
    } = this.props;
    return (
      <div className="list">
        {movies.length !== 0 ? (
          <React.Fragment>
            <p>showing {movies.length} movies in database</p>
            <SeacrForm value={searchQuery} handleSearch={handleSearch} />
            <Table
              items={paginatedMovies}
              columns={this.columns}
              sortColumn={sortColumn}
              onSort={this.onSort}
              onLiked={onLiked}
              handleDelete={handleDelete}
            />
          </React.Fragment>
        ) : (
          <p>You are yet to add any movies</p>
        )}
      </div>
    );
  }
}

export default MoviesTable;
