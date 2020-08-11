import React from "react";

const Select = ({ name, label, onChange, options, errors }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}> {label} </label>
      <select
        onChange={onChange}
        className="form-control"
        name={name}
        id={name}
      >
        {options.map((option) => (
          <option value={option._id}>{option.name}</option>
        ))}
      </select>
      {errors ? (
        <div style={{ fontSize: "0.8em" }} className="alert alert-danger">
          {errors}
        </div>
      ) : null}
    </div>
  );
};

export default Select;
