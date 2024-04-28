import React from "react";

const AboutPageTitle = ({ title }) => {
  console.log("AboutPageTitle is being rendered with title:", title);
  return (
    <div className="page-title-area">
      <div className="d-table">
        <div className="d-table-cell">
          <div className="container">
            <div className="title-item">
              <h2>{title}</h2>
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <i className="bx bx-chevrons-right"></i>
                </li>
                <li>
                  <span>{title}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPageTitle;
