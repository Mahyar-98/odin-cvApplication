import React from "react";
import PropTypes from "prop-types";

export default function ShowSection({ type, list }) {
  const renderSectionDetails = (data) => {
    if (type === "education") {
      return (
        <>
          <b>University: </b>
          <p>{data.edSchool}</p>
          <br />
          <b>Degree: </b>
          <p>{data.edTitle}</p>
          <br />
          <p>
            {data.edFrom} to {data.edTo}
          </p>
          <br />
        </>
      );
    }
    if (type === "practical") {
      return (
        <>
          <b>Company:</b>
          <p>{data.expCompany}</p>
          <b>Position:</b>
          <p>{data.expPosition}</p>
          <b>Responsibilities:</b>
          <p>{data.expRole}</p>
          <p>
            {data.expFrom} to {data.expTo}
          </p>
        </>
      );
    }
    return null;
  };

  const sectionItems = Object.entries(list).map(([num, data]) => (
    <React.Fragment key={num}>{renderSectionDetails(data)}</React.Fragment>
  ));

  return <> {sectionItems} </>;
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
