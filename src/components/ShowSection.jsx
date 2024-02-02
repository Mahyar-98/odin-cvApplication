import React from "react";
import PropTypes from "prop-types";

export default function ShowSection({ type, list }) {
  const structureRoles = (text) => {
    const rolesArr = text.split(",")
    const roleItems = rolesArr.map(item => (
      <li key={item}>
        {item}
      </li>
    ))
      return <ul className="expRole">{roleItems}</ul>
  }

  const renderSectionDetails = (data) => {
    if (type === "education") {
      return (
        <div className="edSection">
        <div className="edLeft">
          <p className="edSchool">{data.edSchool}</p>
          <p className="edTitle">{data.edTitle}</p>
          </div>
          <p className="edDate">
            {data.edFrom} to {data.edTo}
          </p>
        </div>
      );
    }
    if (type === "practical") {
      return (
        <div className="expSection">
          <div className="expLeft">
          <p className="expCompany">{data.expCompany}</p>
          <p>{data.expPosition}</p>
          {structureRoles(data.expRole)}
          </div>
          <p>
            {data.expFrom} to {data.expTo}
          </p>
        </div>
      );
    }
    return null;
  };

  const sectionItems = Object.entries(list).map(([num, data]) => (
    <React.Fragment key={num}>{renderSectionDetails(data)}</React.Fragment>
  ));

  return <div className="section"> {sectionItems} </div>;
}

ShowSection.propTypes = {
  type: PropTypes.oneOf(["education", "practical"]).isRequired,
  list: PropTypes.objectOf(
    PropTypes.shape({
      edSchool: PropTypes.string,
      edTitle: PropTypes.string,
      edFrom: PropTypes.string,
      edTo: PropTypes.string,
      expCompany: PropTypes.string,
      expPosition: PropTypes.string,
      expRole: PropTypes.string,
      expFrom: PropTypes.string,
      expTo: PropTypes.string,
    }),
  ).isRequired,
};
