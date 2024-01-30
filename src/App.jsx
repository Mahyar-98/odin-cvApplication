import "./App.css";
import React, { useState } from "react";
import PropTypes from "prop-types";

function InputField({ name, type = "text", label, value, handleInputChange }) {
  return (
    <label htmlFor={name}>
      {label}
      {type === "textarea" ? (
        <textarea
          name={name}
          id={name}
          value={value}
          onChange={(e) => handleInputChange(name, e.target.value)}
          cols="30"
          rows="5"
        />
      ) : (
        <input
          name={name}
          id={name}
          type={type}
          value={value}
          onChange={(e) => handleInputChange(name, e.target.value)}
        />
      )}{" "}
    </label>
  );
}
InputField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  handleInputChange: PropTypes.func.isRequired,
};
InputField.defaultProps = {
  type: "text",
};

function General({ data, handleInputChange }) {
  const generalInfo = [
    {
      name: "firstName",
      label: "First Name: ",
      value: data.firstName,
    },
    {
      name: "lastName",
      label: "Last Name: ",
      value: data.lastName,
    },
    {
      name: "email",
      label: "Email Address: ",
      value: data.email,
    },
    { name: "phone", label: "Phone Number: ", value: data.phone },
  ];

  const generalSection = generalInfo.map((item) => (
    <React.Fragment key={item.name}>
      <InputField
        name={item.name}
        label={item.label}
        value={item.value}
        handleInputChange={handleInputChange}
      />
      <br />
    </React.Fragment>
  ));

  return <> {generalSection} </>;
}

function Education({ data, num, handleInputChange = { handleInputChange } }) {
  const educationInfo = [
    {
      name: `edSchool_${num}`,
      label: "School: ",
      value: data.edSchool,
    },
    {
      name: `edTitle_${num}`,
      label: "Program of Study: ",
      value: data.edTitle,
    },
    {
      name: `edFrom_${num}`,
      type: "date",
      label: "From: ",
      value: data.edFrom,
    },
    {
      name: `edTo_${num}`,
      type: "date",
      label: "To: ",
      value: data.edTo,
    },
  ];

  const educationSection = educationInfo.map((item) => (
    <React.Fragment key={item.name}>
      <InputField
        name={item.name}
        type={item.type}
        label={item.label}
        value={item.value}
        handleInputChange={handleInputChange}
      />
      <br />
    </React.Fragment>
  ));

  return <> {educationSection} </>;
}

function Practical({ data, num, handleInputChange }) {
  const practicalInfo = [
    {
      name: `expCompany_${num}`,
      label: "Company: ",
      value: data.expCompany,
    },
    {
      name: `expPosition_${num}`,
      label: "Position: ",
      value: data.expPosition,
    },
    {
      name: `expRole_${num}`,
      type: "textarea",
      label: "Responsibilities: ",
      value: data.expRole,
    },
    {
      name: `expFrom_${num}`,
      type: "date",
      label: "From: ",
      value: data.expFrom,
    },
    {
      name: `expTo_${num}`,
      type: "date",
      label: "To: ",
      value: data.expTo,
    },
  ];

  const practicalSection = practicalInfo.map((item) => (
    <React.Fragment key={item.name}>
      <InputField
        name={item.name}
        type={item.type}
        label={item.label}
        value={item.value}
        handleInputChange={handleInputChange}
      />
      <br />
    </React.Fragment>
  ));
  return <> {practicalSection} </>;
}

function SectionList({ type, list, handleInputChange }) {
  const sectionList = Object.entries(list).map(([key, value]) => (
    <React.Fragment key={key}>
      {key === "1" ? null : <hr />}
      {type === "education" ? (
        <Education
          data={value}
          num={key}
          handleInputChange={handleInputChange}
        />
      ) : (
        <Practical
          data={value}
          num={key}
          handleInputChange={handleInputChange}
        />
      )}
    </React.Fragment>
  ));
  return <> {sectionList} </>;
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

  const handleInputChange = (name, value) => {
    if (name.substring(0, 2) === "ed") {
      const edNum = parseInt(name.substring(name.indexOf("_") + 1), 10);
      const edKey = name.substring(0, name.indexOf("_"));
      setFormData({
        ...formData,
        education: {
          ...formData.education,
          [edNum]: {
            ...formData.education[edNum],
            [edKey]: value,
          },
        },
      });
    } else if (name.substring(0, 3) === "exp") {
      const expNum = parseInt(name.substring(name.indexOf("_") + 1), 10);
      const expKey = name.substring(0, name.indexOf("_"));
      setFormData({
        ...formData,
        experience: {
          ...formData.experience,
          [expNum]: {
            ...formData.experience[expNum],
            [expKey]: value,
          },
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  function handleFormData(form) {
    const eventFormData = new FormData(form);
    const formDataObj = { education: {}, experience: {} };
    eventFormData.forEach((value, key) => {
      if (key.substring(0, 2) === "ed") {
        const edNum = parseInt(key.substring(key.indexOf("_") + 1), 10);
        const edKey = key.substring(0, key.indexOf("_"));
        formDataObj.education[edNum] = formDataObj.education[edNum] || {};
        formDataObj.education[edNum][edKey] = value;
      } else if (key.substring(0, 3) === "exp") {
        const expNum = parseInt(key.substring(key.indexOf("_") + 1), 10);
        const expKey = key.substring(0, key.indexOf("_"));
        formDataObj.experience[expNum] = formDataObj.experience[expNum] || {};
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
      const newFormData = handleFormData(e.target);
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
              <General data={formData} handleInputChange={handleInputChange} />
            </fieldset>
            <fieldset>
              <legend>Education:</legend>

              <SectionList
                type="education"
                list={formData.education}
                handleInputChange={handleInputChange}
              />
              <button type="button" onClick={() => handleAdd("education")}>
                Add More
              </button>
            </fieldset>
            <fieldset>
              <legend>Job Experience:</legend>
              <SectionList
                type="practical"
                list={formData.experience}
                handleInputChange={handleInputChange}
              />
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
        <button type="submit">{isEditing ? "Generate" : "Edit"}</button>
      </form>
    </>
  );
}

export default CVApp;
