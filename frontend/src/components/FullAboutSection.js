import React from "react";

const AboutSection = () => {
  return (
    <div className="choose-area two pt-100 pb-70">
      <div className="choose-shape">
        <img src="assets/img/home-one/choose1.png" alt="Shape" />
      </div>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="choose-content">
              <div className="about-img">
                <img src="assets/img/home-two/choose1.jpg" alt="Choose" />
                <img src="assets/img/home-two/choose2.jpg" alt="Choose" />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="choose-contact">
              <div className="section-title">
                <span className="sub-title">About Us</span>
                <h2>Certified Cleaning Service Company Over 15 years</h2>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
                harum qui, beatae aliquid, esse modi asperiores, sit ea pariatur
                ipsa quaerat repellendus voluptatibus commodi doloremque
                architecto. Dignissimos doloremque quod modi.It is a long
                established fact that a reader will be distracted by the
                readable content of a page when looking at its layout. The point
                of using Lorem Ipsum is that it has a more-or-less normal
                distribution of letters, as opposed to using 'Content here,
                content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover.Many desktop publishing packages and web
                page editors now use Lorem Ipsum as their default model text,
                and a search for 'lorem ipsum' will uncover.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
