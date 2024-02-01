import React from "react";
import PropTypes from "prop-types";

export default function InputField({
  name,
  type,
  label,
  value,
  handleInputChange,
}) {
  return (
    <label htmlFor={name}>
      {label}
      {type === "textarea" ? (
        <textarea
          name={name}
          id={name}
          value={value || ""}
          onChange={(e) => handleInputChange(name, e.target.value)}
          cols="30"
          rows="5"
          placeholder="Please provide the information comma separated"
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
  value: "",
};
