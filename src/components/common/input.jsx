import React from "react";

const Input = ({ type = "text", name, label, value, onChange, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        onChange={onChange}
        value={value}
        id={name}
        className="form-control"
        type={type}
        placeholder={`Enter ${label}`}
      />
      {error ? (
        <div style={{ fontSize: "0.8em" }} className="alert alert-danger">
          {error}
        </div>
      ) : null}
    </div>
  );
};

export default Input;
