import React from "react";
import Form from "./common/form";
import Joi, { errors } from "joi-browser";
import { register } from "../services/userService";
import { toast } from "react-toastify";
import auth from "../services/authService";

class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: "",
    },
    errors: {
      username: "",
      password: "",
      name: "",
    },
  };

  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = async () => {
    try {
      const response = await register(this.state.data);
      const jwt = response.headers["x-auth-token"];
      auth.loginWithJWT(jwt);
      window.location = "/";
      toast(`user ${response.data.name} created sucessfully`);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = "user already exist";
        this.setState({ errors });
        toast.error("user already exist");
      }
    }
  };

  render() {
    return (
      <div className="container">
        <h1>Register Form</h1>
        <form onSubmit={this.handleSubmit} className="">
          {this.renderInput("username", "username", "Username")}
          {this.renderInput("password", "password", "Password")}
          {this.renderInput("text", "name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
