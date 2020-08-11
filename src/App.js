import { Route, Switch, Redirect } from "react-router-dom";
import React, { Component } from "react";
import NavBar from "./components/navBar";
import ListMovies from "./components/movieList";
import Rentals from "./components/rentals";
import Customers from "./components/customers";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import auth from "./services/authService";
import "./App.css";

// for moive rental app
class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState(user);
  }

  render() {
    return (
      <div className="App">
        <main className="main">
          <NavBar user={this.state.user}></NavBar>
          <div className="content">
            <Switch>
              <Route path="/customers" component={Customers} />
              <Route path="/rentals" component={Rentals} />
              <Route path="/login" component={LoginForm} />
              <Route path="/logout" component={Logout} />
              <Route path="/register" component={RegisterForm} />
              <Route
                path="/movies/movie-form/:id?"
                render={(props) => <MovieForm {...props} />}
              />
              <Redirect from="/movies" to="/" />
              <Route path="/not-found" component={NotFound} />
              <Route path="/" exact render={() => <ListMovies></ListMovies>} />
              <Redirect to="/not-found" />
            </Switch>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
