import React from "react";
import PropTypes from "prop-types";

import InputField from "./InputField.jsx";

export default function Education({ data, num, handleInputChange }) {
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

Education.propTypes = {
  data: PropTypes.shape({
    edSchool: PropTypes.string,
    edTitle: PropTypes.string,
    edFrom: PropTypes.string,
    edTo: PropTypes.string,
  }).isRequired,
  num: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  handleInputChange: PropTypes.func.isRequired,
};
