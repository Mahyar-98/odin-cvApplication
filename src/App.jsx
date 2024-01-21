import "./App.css";
import React from "react";
import PropTypes from "prop-types";

function InputField({ name, type = "text", label }) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input name={name} id={name} type={type} />
    </>
  );
}
InputField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
};
InputField.defaultProps = {
  type: "text",
};

function General() {
  return (
    <>
      <InputField name="firstName" label="First Name: " />
      <br />
      <InputField name="lastName" label="Last Name: " />
    </>
  );
}

export default General;
