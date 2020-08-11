import { toast } from "react-toastify";
import Joi from "joi-browser";
import React from "react";
import auth from "../services/authService";
import Form from "./common/form";

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {
      password: "",
      username: "",
    },
  };

  schema = {
    username: Joi.string().max(20).min(3).required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { username, password } = this.state.data;
      await auth.login(username, password);
      window.location = "/";
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errors = this.state.errors;
        errors.username = err.response.data;
        this.setState({ errors });
        toast.error(err.response.data);
      }
    }
  };

  render() {
    return (
      <div className="main">
        <h1>Login Page</h1>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput("text", "username", "Username")}
          {this.renderInput("password", "password", "Password")}
          <div className="formgroup">{this.renderButton()}</div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
