import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-100">
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-lg-3">
            <div className="footer-item">
              <div className="footer-logo">
                <a href="index.html">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/img/logo.png`}
                    alt="Logo"
                  />
                </a>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. It has survived not only five centuries,
                  but also the leap into electronic.
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div className="footer-item">
              <div className="footer-company">
                <h3>Company</h3>
                <ul>
                  <li>
                    <a href="about.html" target="_blank">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="services.html" target="_blank">
                      Services
                    </a>
                  </li>
                  <li>
                    <a href="projects.html" target="_blank">
                      Projects
                    </a>
                  </li>
                  <li>
                    <a href="team.html" target="_blank">
                      Team
                    </a>
                  </li>
                  <li>
                    <a href="blog.html" target="_blank">
                      Blog
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div className="footer-item">
              <div className="footer-company">
                <h3>Support</h3>
                <ul>
                  <li>
                    <a href="faq.html" target="_blank">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a href="privacy-policy.html" target="_blank">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="terms-and-conditions.html" target="_blank">
                      Terms & Conditions
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      Community
                    </a>
                  </li>
                  <li>
                    <a href="contact.html" target="_blank">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div className="footer-item">
              <div className="footer-contact">
                <h3>Contact Info</h3>
                <ul>
                  <li>
                    <span>Location: 6th Floor, Barbosa, Sidney</span>
                  </li>
                  <li>
                    <span>Email:</span>{" "}
                    <a href="mailto:info@lixi.com" target="_blank">
                      info@lixi.com
                    </a>
                  </li>
                  <li>
                    <span>Phone:</span>{" "}
                    <a href="tel:+0123456789" target="_blank">
                      +0123 456 789
                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer-social">
                <ul>
                  <li>
                    <a href="#" target="_blank">
                      <i className="bx bxl-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      <i className="bx bxl-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      <i className="bx bxl-linkedin"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      <i className="bx bxl-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright-area">
          <p>Copyright @ {currentYear}, Hind Samiri.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
