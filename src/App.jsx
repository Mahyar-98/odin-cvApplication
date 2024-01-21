import "./App.css";
import React from "react";
import PropTypes, { func } from "prop-types";

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
      <br />
      <InputField name="email" type="email" label="Email Address: " />
      <br />
      <InputField name="phone" label="Phone Number: " />
    </>
  );
}

function Education() {
  return (
    <>
      <InputField name="school" label="School: " />
      <br />
      <InputField name="edTitle" label="Program of Study: " />
      <br />
      <InputField name="edFrom" type="date" label="From: " />
      <br />
      <InputField name="edTo" type="date" label="To: " />
    </>
  );
}

function Practical() {
  return (
    <>
      <InputField name="company" label="Company: " />
      <br />
      <InputField name="position" label="Position: " />
      <br />
      <InputField
        name="responsibility"
        type="textarea"
        label="Responsibilities"
      />
      <br />
      <InputField name="jobFrom" type="date" label="From: " />
      <br />
      <InputField name="jobTo" type="date" label="To: " />
    </>
  );
}

function CVform() {
  return (
    <>
      <General />
      <br />
      <Education />
      <br />
      <Practical />
    </>
  );
}

export default CVform;
