import React from "react";
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
