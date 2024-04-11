import React from "react";
import PropTypes from "prop-types";

export default function ShowSection({ type, list }) {
  const structureRoles = (text) => {
    const rolesArr = text.split(",");
    const roleItems = rolesArr.map((item) => <li key={item}>{item}</li>);
    return <ul className="expRole">{roleItems}</ul>;
  };

  const renderSectionDetails = (data) => {
    if (type === "education") {
      return (
        <div className="edSection">
          <div className="first-line">
            <p className="edSchool">{data.edSchool}</p>
            <p className="edDate">
              {data.edFrom} — {data.edTo}
            </p>
          </div>
            <p className="edTitle">{data.edTitle}</p>
        </div>
      );
    }
    if (type === "practical") {
      return (
        <div className="expSection">
          <div className="first-line">
            <p className="expCompany">{data.expCompany}</p>
            <p className="expDate">
            {data.expFrom} — {data.expTo}
          </p>
          </div>
            <p>{data.expPosition}</p>
            {structureRoles(data.expRole)}

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
