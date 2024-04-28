import React from "react";

const Contact = () => {
  return (
    <div>
      {/* Location */}
      <div className="location-area pt-100 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-lg-4">
              <div className="location-item">
                <i className="bx bx-phone-call"></i>
                <h3>Contact Number</h3>
                <span>Dial And Get Solution:</span>
                <a href="tel:+123456789">+123-456-789</a>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="location-item">
                <i className="bx bx-location-plus"></i>
                <h3>Our Location</h3>
                <span>Find Our Office:</span>
                <span>6th Floor, Barbosa Sidney</span>
              </div>
            </div>
            <div className="col-sm-6 offset-sm-3 offset-lg-0 col-lg-4">
              <div className="location-item">
                <i className="bx bx-mail-send"></i>
                <h3>Our Email</h3>
                <span>Mail Us Anytime:</span>
                <a href="mailto:info@lixi.com">info@lixi.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Location */}

      {/* Contact */}
      <div className="contact-area pb-100">
        <div className="container">
          <div className="section-title">
            <h2>Get In Touch</h2>
          </div>
          <form id="contactForm">
            <div className="row">
              <div className="col-sm-6 col-lg-6">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    required
                    data-error="Please enter your name"
                  />
                  <div className="help-block with-errors"></div>
                </div>
              </div>

              <div className="col-sm-6 col-lg-6">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    required
                    data-error="Please enter your email"
                  />
                  <div className="help-block with-errors"></div>
                </div>
              </div>

              <div className="col-sm-6 col-lg-6">
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    name="phone_number"
                    id="phone_number"
                    required
                    data-error="Please enter your number"
                    className="form-control"
                  />
                  <div className="help-block with-errors"></div>
                </div>
              </div>

              <div className="col-sm-6 col-lg-6">
                <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    name="msg_subject"
                    id="msg_subject"
                    className="form-control"
                    required
                    data-error="Please enter your subject"
                  />
                  <div className="help-block with-errors"></div>
                </div>
              </div>

              <div className="col-md-12 col-lg-12">
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    name="message"
                    className="form-control"
                    id="message"
                    cols="30"
                    rows="8"
                    required
                    data-error="Write your message"
                  ></textarea>
                  <div className="help-block with-errors"></div>
                </div>
              </div>

              <div className="col-lg-12 col-md-12">
                <div className="form-group">
                  <div className="form-check agree-label">
                    <input
                      name="gridCheck"
                      value="I agree to the terms and privacy policy."
                      className="form-check-input"
                      type="checkbox"
                      id="gridCheck"
                      required
                    />
                    <label className="form-check-label" htmlFor="gridCheck">
                      Accept{" "}
                      <a href="terms-and-conditions">Terms & Conditions</a> And{" "}
                      <a href="privacy-policy.html">Privacy Policy.</a>
                    </label>
                    <div className="help-block with-errors gridCheck-error"></div>
                  </div>
                </div>
              </div>

              <div className="col-md-12 col-lg-12">
                <button type="submit" className="cmn-btn btn">
                  Send Message
                </button>
                <div id="msgSubmit" className="h3 text-center hidden"></div>
                <div className="clearfix"></div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* End Contact */}

      {/* Map */}
      <div className="map-area pb-100">
        <div className="container-fluid">
          <iframe
            id="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59843174.53779284!2d62.17507173408573!3d23.728204508550373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3663f18a24cbe857%3A0xa9416bfcd3a0f459!2sAsia!5e0!3m2!1sen!2sbd!4v1598214277553!5m2!1sen!2sbd"
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
          ></iframe>
        </div>
      </div>
      {/* End Map */}

      {/* Subscribe */}
      <div className="subscribe-area">
        <div className="subscribe-wrap">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="section-title">
                  <h2>Stay Up To Date With Our Latest News!</h2>
                </div>
              </div>
              <div className="col-lg-6">
                <form className="newsletter-form" data-toggle="validator">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    name="EMAIL"
                    required
                    autoComplete="off"
                  />
                  <button className="btn cmn-btn" type="submit">
                    Subscribe
                  </button>
                  <div id="validator-newsletter" className="form-result"></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Subscribe */}
    </div>
  );
};

export default Contact;
