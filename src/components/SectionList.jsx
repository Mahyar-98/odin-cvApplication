import React from "react";
import PropTypes from "prop-types";

import Education from "./Education.jsx";
import Practical from "./Practical.jsx";

export default function SectionList({ type, list, handleInputChange }) {
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

SectionList.propTypes = {
  type: PropTypes.oneOf(["education", "practical"]).isRequired,
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
};
