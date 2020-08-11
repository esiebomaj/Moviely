import React, { Component } from "react";
import Input from "./input";
import Joi from "joi-browser";
import Select from "./select";

class Form extends Component {
  state = { data: {}, errors: {} };

  validate = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.data, this.schema, options);
    if (result.error) {
      const errors = {};
      for (let error of result.error.details) {
        errors[error.path[0]] = error.message;
      }
      return errors;
    } else {
      return null;
    }
  };

  validateInput = (e) => {
    let errorMessage = "";
    const result = Joi.validate(e.target.value, this.schema[e.target.id]);
    if (result.error) {
      errorMessage = result.error.details[0].message;
    }
    return errorMessage;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.validate()) {
      let errors = {};
      errors = this.validate();
      this.setState({ errors });
    }
    this.doSubmit();
  };

  handleChange = (e) => {
    e.preventDefault();
    let data = { ...this.state.data };
    data[e.target.id] = e.target.value;
    let errors = { ...this.state.errors };
    const errorMessage = this.validateInput(e);
    console.log(errorMessage);
    errors[e.target.id] = errorMessage;
    this.setState({ data, errors });
  };

  //   Helper functions
  renderButton(label = "submit") {
    return (
      <button
        disabled={this.validate()}
        type="submit"
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  }
  renderInput(type = "text", name, label) {
    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={this.state.data[name]}
        onChange={this.handleChange}
        error={this.state.errors[name]}
      />
    );
  }

  renderSelect = (name, label, options) => {
    return (
      <Select
        name={name}
        label={label}
        options={options}
        onChange={this.handleChange}
        errors={this.state.errors[name]}
      />
    );
  };
}

export default Form;
