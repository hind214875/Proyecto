import React from "react";

const Estimate = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="estimate-area ptb-100">
      <div className="container">
        <div className="estimate-content">
          <div className="section-title">
            <h2>Let's Find An Estimate On Your Project</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Name"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Your Email"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Place"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Subject"
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <textarea
                    id="your-message"
                    rows="6"
                    className="form-control"
                    placeholder="Your Message"
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-12">
                <button type="submit" className="btn cmn-btn">
                  Book A Schedule
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Estimate;
