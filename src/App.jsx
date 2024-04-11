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
    expRole:
      "Developing web applications, Collaborating with team members, Troubleshooting issues",
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
      <main>
        <form onSubmit={handleCVBuild}>
          {isEditing ? (
            <div className="editing">
              <p className="description">
                Please provide your information to generate a CV:
              </p>
              <fieldset>
                <legend>General Information</legend>
                <General
                  data={formData}
                  handleInputChange={handleInputChange}
                />
              </fieldset>
              <fieldset>
                <legend>Education</legend>
                <SectionList
                  type="education"
                  list={formData.education}
                  handleInputChange={handleInputChange}
                  handleRemoveField={handleRemoveField}
                />
                <button
                  className="field-btn"
                  type="button"
                  onClick={() => handleAdd("education")}
                  aria-label="Add education field"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                  </svg>
                  <p>Add more</p>
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
                <button
                  className="field-btn"
                  type="button"
                  onClick={() => handleAdd("practical")}
                  aria-label="Add experience field"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                  </svg>
                  <p>Add more</p>
                </button>
              </fieldset>
            </div>
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
                  <ShowSection type="education" list={formData.education} />
                </div>
                <div className="panel">
                  <h3>Experience</h3>
                  <hr />
                  <ShowSection type="practical" list={formData.experience} />
                </div>
              </div>
            </>
          )}
          <button className="submit-btn" type="submit">
            {isEditing ? "Generate" : "Edit"}
          </button>
        </form>
      </main>
      <footer>
        <p>Check out my GitHub:</p>
        <a
          href="https://github.com/Mahyar-98"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Mahyar's GitHub Profile"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
            <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
          </svg>
        </a>
      </footer>
    </>
  );
}

export default CVApp;
