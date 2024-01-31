import React from "react";
import PropTypes from "prop-types";
import InputField from "./InputField.jsx";

export default function General({ data, handleInputChange }) {
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

General.propTypes = {
  data: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
};
