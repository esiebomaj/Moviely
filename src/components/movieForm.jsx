import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import getGenres from "../services/genreService";
import { saveMovie, getMovie } from "./../services/fakeMovieService";
import moviesService from "../services/movieService";
import { min } from "lodash";

class MovieForm extends Form {
  state = {
    data: {
      _id: "",
      title: "",
      genreId: "",
      dailyRentalRate: "",
      numberInStock: "",
    },
    errors: { movieName: "", genre: "", rating: "", stock: "" },
    genres: [],
  };

  schema = {
    _id: Joi.string().allow("", null),
    title: Joi.string().min(5).required(),
    genreId: Joi.string().required(),
    dailyRentalRate: Joi.number().min(1).max(100).required(),
    numberInStock: Joi.number().min(1).max(100).required(),
  };

  doSubmit = async () => {
    await moviesService.saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  populateGenre = async () => {
    const genres = await getGenres();
    this.setState({ genres });
  };
  populateMovie = async () => {
    const movieId = this.props.match.params.id;
    if (!movieId) {
      return;
    }
    const movie = await moviesService.getMovie(movieId);
    const data = {};
    data._id = movie._id;
    data.title = movie.title;
    data.genreId = movie.genre._id;
    data.dailyRentalRate = movie.dailyRentalRate;
    data.numberInStock = movie.numberInStock;
    this.setState({ data });
  };

  componentDidMount = async () => {
    this.populateGenre();
    this.populateMovie();
  };

  render() {
    return (
      <div>
        {this.props.match.params.id ? (
          <h1>Movie form for {this.props.match.params.id}</h1>
        ) : (
          <h1>New movie</h1>
        )}
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("text", "title", "Movie Name")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("number", "dailyRentalRate", "Rating")}
          {this.renderInput("number", "numberInStock", "Stock")}
          {this.renderButton("save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
