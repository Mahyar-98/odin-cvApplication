import React from "react";
import PropTypes from "prop-types";

import Education from "./Education.jsx";
import Practical from "./Practical.jsx";

export default function SectionList({
  type,
  list,
  handleInputChange,
  handleRemoveField,
}) {
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
      {key === "1" ? null : (
        <button
          className="field-btn"
          type="button"
          onClick={() => handleRemoveField(type, key)}
          aria-label="Remove fieldset"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
          <p>Remove field</p>
        </button>
      )}
    </React.Fragment>
  ));
  return <> {sectionList} </>;
}

SectionList.propTypes = {
  type: PropTypes.oneOf(["education", "experience"]).isRequired,
  list: PropTypes.oneOfType([
    PropTypes.objectOf(
      PropTypes.shape({
        edSchool: PropTypes.string.isRequired,
        edTitle: PropTypes.string.isRequired,
        edFrom: PropTypes.string.isRequired,
        edTo: PropTypes.string.isRequired,
      }),
    ),
    PropTypes.objectOf(
      PropTypes.shape({
        expCompany: PropTypes.string.isRequired,
        expPosition: PropTypes.string.isRequired,
        expRole: PropTypes.string.isRequired,
        expFrom: PropTypes.string.isRequired,
        expTo: PropTypes.string.isRequired,
      }),
    ),
  ]).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleRemoveField: PropTypes.func.isRequired,
};
