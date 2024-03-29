import React from "react";
import PropTypes from "prop-types";

import InputField from "./InputField.jsx";

export default function Practical({ data, num, handleInputChange }) {
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

Practical.propTypes = {
  data: PropTypes.shape({
    expCompany: PropTypes.string.isRequired,
    expPosition: PropTypes.string.isRequired,
    expRole: PropTypes.string.isRequired,
    expFrom: PropTypes.string.isRequired,
    expTo: PropTypes.string.isRequired,
  }).isRequired,
  num: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  handleInputChange: PropTypes.func.isRequired,
};
