import moviesService from "../services/movieService";
import getGenres from "../services/genreService";
import React, { Component } from "react";
import Pagination from "./common/pagination";
import _ from "lodash";
import paginate from "../utils/paginate";
import MoviesTable from "./moviesTable";
import ListGroup from "./common/listGroup";
import { Link } from "react-router-dom";

class ListMovies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    currentGenre: "",
    sortColumn: { path: "Title", order: "asc" },
    searchQuery: "",
  };

  async componentDidMount() {
    const genres = await getGenres();
    const movies = await moviesService.getMovies();
    this.setState({
      movies: movies,
      genres: [{ name: "All Genres" }, ...genres],
    });
  }

  handleDelete = async (movieId) => {
    const original_movies = this.state.movies;

    // delete from backend
    try {
      const movies_left = this.state.movies.filter(
        (movie) => movie._id !== movieId
      );
      this.setState({ movies: movies_left });
      await moviesService.deleteMovie(movieId);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("this movie has already been deleted");
      }
    }
  };

  onLiked = (movie1) => {
    movie1.liked = !movie1.liked;
    const movies = this.state.movies.map((movie) =>
      movie._id === movie1._id ? movie1 : movie
    );
    this.setState({ movies });
  };

  handlePaginate = (page) => {
    console.log("handling pagination", page);

    this.setState({ currentPage: page });
  };

  handleCategorize = (category_name) => {
    const currentGenre = this.state.genres.find(
      (category) => category.name === category_name
    );
    console.log(currentGenre);
    this.setState({ currentGenre: currentGenre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (searchQuery) => {
    const currentGenre = "";
    this.setState({ searchQuery, currentGenre });
  };

  getData = () => {
    if (this.state.searchQuery) {
      let categorized_movies = [...this.state.movies];
      categorized_movies = categorized_movies.filter(
        (movie) =>
          movie.title.toLowerCase().indexOf(this.state.searchQuery) !== -1
      );
      const paginatedMovies = paginate(
        categorized_movies,
        this.state.currentPage,
        this.state.pageSize
      );

      const sorted_movies = _.orderBy(
        paginatedMovies,
        [this.state.sortColumn.path],
        [this.state.sortColumn.order]
      );

      return { sorted_movies, categorized_movies };
    }
    const categorized_movies = !this.state.currentGenre
      ? this.state.movies
      : this.state.currentGenre.name === "All Genres"
      ? this.state.movies
      : this.state.movies.filter(
          (movie) => movie.genre.name === this.state.currentGenre.name
        );

    const paginatedMovies = paginate(
      categorized_movies,
      this.state.currentPage,
      this.state.pageSize
    );

    const sorted_movies = _.orderBy(
      paginatedMovies,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );
    return { sorted_movies, categorized_movies };
  };

  render() {
    const { sorted_movies, categorized_movies } = this.getData();
    return (
      <React.Fragment>
        <div className="row">
          <div className=" col-4">
            <ListGroup
              categories={this.state.genres}
              currentCategory={this.state.currentGenre}
              onCategorize={this.handleCategorize}
            />
          </div>
          <div className="col">
            <Link className="btn btn-primary m-2" to="/movies/movie-form">
              New Movie
            </Link>
            <MoviesTable
              movies={categorized_movies}
              paginatedMovies={sorted_movies}
              onLiked={this.onLiked}
              handleDelete={this.handleDelete}
              onSort={this.handleSort}
              sortColumn={this.state.sortColumn}
              handleSearch={this.handleSearch}
              searchQuery={this.state.searchQuery}
            />
            <Pagination
              onPaginate={this.handlePaginate}
              pageSize={this.state.pageSize}
              currentPage={this.state.currentPage}
              totalItemNum={categorized_movies.length}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ListMovies;
