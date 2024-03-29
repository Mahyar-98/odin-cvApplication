import React, { useState } from "react";

import "./App.css";

import General from "./components/General.jsx";
import SectionList from "./components/SectionList.jsx";
import ShowSection from "./components/ShowSection.jsx";

function CVApp() {
  const initialEducation = {
    id: 1,
    edSchool: "Example University",
    edTitle: "B.Sc. of Computer Science",
    edFrom: "2015-09-01",
    edTo: "2019-05-31",
  };

  const initialExperience = {
    expCompany: "Tech Solutions Inc.",
    expPosition: "Software Engineer",
    expRole: "Developing web applications, Collaborating with team members, Troubleshooting issues",
    expFrom: "2020-02-01",
    expTo: "2023-09-30",
  };

  const InitialFormData = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "555-123-4567",
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

  const handleRemoveField = (type, num) => {
    const remainingFields = Object.fromEntries(
      Object.entries(formData[type]).filter((pair) => pair[0] !== num),
    );
    setFormData({ ...formData, [type]: remainingFields });
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
      <header>
        <h1>CV Application</h1>
      </header>
      <form onSubmit={handleCVBuild}>
        {isEditing ? (
          <>
          <p>Please provide your information to generate a CV: </p>
            <fieldset>
              <legend>General Information</legend>
              <General data={formData} handleInputChange={handleInputChange} />
            </fieldset>
            <fieldset>
              <legend>Education</legend>
              <SectionList
                type="education"
                list={formData.education}
                handleInputChange={handleInputChange}
                handleRemoveField={handleRemoveField}
              />
              <button type="button" onClick={() => handleAdd("education")}>
                Add More
              </button>
            </fieldset>
            <fieldset>
              <legend>Job Experience</legend>
              <SectionList
                type="experience"
                list={formData.experience}
                handleInputChange={handleInputChange}
                handleRemoveField={handleRemoveField}
              />
              <button type="button" onClick={() => handleAdd("practical")}>
                Add More
              </button>
            </fieldset>
          </>
        ) : (
          <>
          <p>Here is your generated CV: </p>
          <div className="CV">
            <div className="general">
            <h2>{`${formData.firstName} ${formData.lastName}`}</h2>
            <div className="contactInfo">
            <p>{formData.email}</p>
            <p>{formData.phone}</p>
            </div>
            </div>
            <div className="panel">
              <h3>Education</h3>
              <hr />
              <ShowSection className="edSection" type="education" list={formData.education} />
            </div>
            <div className="panel">
              <h3>Experience</h3>
              <hr />
              <ShowSection type="practical" list={formData.experience} />
            </div>
            </div>
          </>
        )}
        <button className="submit-btn" type="submit">{isEditing ? "Generate" : "Edit"}</button>
      </form>
    </>
  );
}

export default CVApp;
