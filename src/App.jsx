import "./App.css";
import React, { useState } from "react";
import PropTypes, { func } from "prop-types";

function InputField({ name, type = "text", label }) {
  return (
    <label htmlFor={name}>
      {label}
      <input name={name} id={name} type={type} />{" "}
    </label>
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
    <fieldset>
      <legend>General Information:</legend>
      <InputField name="firstName" label="First Name: " />
      <br />
      <InputField name="lastName" label="Last Name: " />
      <br />
      <InputField name="email" type="email" label="Email Address: " />
      <br />
      <InputField name="phone" label="Phone Number: " />
    </fieldset>
  );
}

function Education() {
  return (
    <fieldset>
      <legend>Education:</legend>
      <InputField name="edSchool" label="School: " />
      <br />
      <InputField name="edTitle" label="Program of Study: " />
      <br />
      <InputField name="edFrom" type="date" label="From: " />
      <br />
      <InputField name="edTo" type="date" label="To: " />
    </fieldset>
  );
}

function Practical() {
  return (
    <fieldset>
      <legend>Experience:</legend>
      <InputField name="expCompany" label="Company: " />
      <br />
      <InputField name="expPosition" label="Position: " />
      <br />
      <InputField
        name="expRole"
        type="textarea"
        label="Responsibilities"
      />
      <br />
      <InputField name="expFrom" type="date" label="From: " />
      <br />
      <InputField name="expTo" type="date" label="To: " />
    </fieldset>
  );
}

function CVApp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    edSchool: "",
    edTitle: "",
    edFrom: "",
    edTo: "",
    expCompany: "",
    expPosition: "",
    expRole: "",
    expFrom: "",
    expTo: ""
  });
  const [isEditing, setIsEditing] = useState(true);

  function handleActionClick(e) {
    e.preventDefault();
    if (isEditing) {
      const eventFormData = new FormData(e.target);
      const formDataObj = {};
      eventFormData.forEach((value, key) => {
        formDataObj[key] = value;
      });
      setFormData(formDataObj);
    }
    setIsEditing(!isEditing);
  }

  return (
    <>
      <h1>CV Application</h1>
      <p>
        {isEditing
          ? "Please provide your information to generate a CV: "
          : "Here's your generated CV: "}
      </p>

      <form onSubmit={handleActionClick}>
        {isEditing ? (
          <>
            <General />
            <Education />
            <Practical />
          </>
        ) : (
          <>
          <h2>{`${formData.firstName} ${formData.lastName}`}</h2>
          <p>{formData.email}</p>
          <p>{formData.phone}</p>
          <div className="panel">
            <h3>Education:</h3>
            <b>University: </b>
            <p>{formData.edSchool}</p>
            <b>Degree:</b>
            <p>{formData.edTitle}</p>
            <br />
            <p>{formData.edFrom} to {formData.edTo}</p>
          </div>
          <div className="panel">
            <h3>Experience</h3>
            <b>Company:</b>
            <p>{formData.expCompany}</p>
            <b>Position:</b>
            <p>{formData.expPosition}</p>
            <b>Responsibilities:</b>
            <p>{FormData.expRole}</p>
            <p>{formData.expFrom} to {formData.expTo}</p>
          </div>
          </>
        )}
        <button type="submit">click me</button>
      </form>
    </>
  );
}

export default CVApp;
