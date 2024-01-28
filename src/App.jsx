import "./App.css";
import React, { useState } from "react";
import PropTypes from "prop-types";

function InputField({ name, type = "text", label, value = null }) {
  return (
    <label htmlFor={name}>
      {label}
      <input name={name} id={name} type={type} value={value} />{" "}
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
      <InputField name="edSchool" label="School: " />
      <br />
      <InputField name="edTitle" label="Program of Study: " />
      <br />
      <InputField name="edFrom" type="date" label="From: " />
      <br />
      <InputField name="edTo" type="date" label="To: " />
      <br />
    </>
  );
}

function Practical({ data, num }) {
  return (
    <>
      <InputField
        name={`expCompany_${num}`}
        label="Company: "
        value={data.expCompany}
      />
      <br />
      <InputField
        name={`expPosition_${num}`}
        label="Position: "
        value={data.expPosition}
      />
      <br />
      <InputField
        name={`expRole_${num}`}
        type="textarea"
        label="Responsibilities"
        value={data.expRole}
      />
      <br />
      <InputField
        name={`expFrom_${num}`}
        type="date"
        label="From: "
        value={data.expFrom}
      />
      <br />
      <InputField
        name={`expTo_${num}`}
        type="date"
        label="To: "
        value={data.expTo}
      />
      <br />
    </>
  );
}

function EducationList({ list }) {
  return (
    <>
      {Object.entries(list).map(([key, value]) => (
        <>
          {key === "1" ? null : <hr />}
          <Education key={key} data={value} num={key} />
        </>
      ))}
    </>
  );
}

function PracticalList({ list }) {
  return (
    <>
      {Object.entries(list).map(([key, value]) => (
        <>
          {key === "1" ? null : <hr />}
          <Practical key={key} data={value} num={key} />
        </>
      ))}
    </>
  );
}

function CVApp() {
  const initialEducation = {
    id: 1,
    edSchool: "",
    edTitle: "",
    edFrom: "",
    edTo: "",
  };

  const initialExperience = {
    expCompany: "",
    expPosition: "",
    expRole: "",
    expFrom: "",
    expTo: "",
  };

  const InitialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    education: { 1: initialEducation },
    experience: { 1: initialExperience },
  };

  const [formData, setFormData] = useState(InitialFormData);

  const [isEditing, setIsEditing] = useState(true);

  function structureFormData(form) {
    const eventFormData = new FormData(form);
    const formDataObj = { education: [], experience: [] };
    eventFormData.forEach((value, key) => {
      if (key.substring(0, 2) === "ed") {
        const edKey = parseInt(key.substring(key.indexOf("_") + 1), 10);
        formDataObj.education[edKey] = value;
      } else if (key.substring(0, 3) === "exp") {
        const expNum = parseInt(key.substring(key.indexOf("_") + 1), 10);
        const expKey = key.substring(0, key.indexOf("_"));
        formDataObj.experience[expNum][expKey] = value;
      } else {
        formDataObj[key] = value;
      }
    });
    return formDataObj;
  }

  function handleCVBuild(e) {
    e.preventDefault();
    if (isEditing) {
      const newFormData = structureFormData(e.target);
      setFormData(newFormData);
    }
    setIsEditing(!isEditing);
  }

  function handleAdd(type) {
    if (type === "education") {
      const nextId = Math.max(...Object.keys(formData.education)) + 1;
      setFormData((prevFormData) => ({
        ...prevFormData,
        education: {
          ...prevFormData.education,
          [nextId]: initialEducation,
        },
      }));
    } else {
      const nextId = Math.max(...Object.keys(formData.experience)) + 1;
      setFormData((prevFormData) => ({
        ...prevFormData,
        experience: {
          ...prevFormData.experience,
          [nextId]: initialExperience,
        },
      }));
    }
    console.log(formData);
  }

  return (
    <>
      <h1>CV Application</h1>
      <p>
        {isEditing
          ? "Please provide your information to generate a CV: "
          : "Here's your generated CV: "}
      </p>

      <form onSubmit={handleCVBuild}>
        {isEditing ? (
          <>
            <fieldset>
              <legend>General Information:</legend>
              <General />
            </fieldset>
            <fieldset>
              <legend>Education:</legend>

              <EducationList list={formData.education} />
              <button type="button" onClick={() => handleAdd("education")}>
                {" "}
                Add More{" "}
              </button>
            </fieldset>
            <fieldset>
              <legend>Job Experience:</legend>
              <PracticalList list={formData.experience} />
              <button type="button" onClick={() => handleAdd("practical")}>
                Add More
              </button>
            </fieldset>
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
              <p>
                {formData.edFrom} to {formData.edTo}
              </p>
            </div>
            <div className="panel">
              <h3>Experience</h3>
              <b>Company:</b>
              <p>{formData.expCompany}</p>
              <b>Position:</b>
              <p>{formData.expPosition}</p>
              <b>Responsibilities:</b>
              <p>{FormData.expRole}</p>
              <p>
                {formData.expFrom} to {formData.expTo}
              </p>
            </div>
          </>
        )}
        <button type="submit">click me</button>
      </form>
    </>
  );
}

export default CVApp;
