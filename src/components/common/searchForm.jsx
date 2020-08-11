import React, { Component } from "react";

class SeacrForm extends Component {
  state = {};
  handleChange = (e) => {
    e.preventDefault();
    let searchQuery = "";
    searchQuery = e.target.value.toLowerCase();
    this.props.handleSearch(searchQuery);
  };
  render() {
    const { value } = this.props;
    return (
      <div className="form-group mt-3">
        <input
          name="search"
          id="search"
          className="form-control"
          type="text"
          placeholder="Search . . . ."
          value={value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default SeacrForm;
