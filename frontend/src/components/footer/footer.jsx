import React from "react";
import "./footer.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Logo from "../../assets/logo/footer-logo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Footer Top */}
        <div className="footer-top">
          {/* Logo and Description */}
          <div className="footer-logo">
            <img src={Logo} alt="Nagrik Aur Samvidhan" />
            <p>Interactive games and resources to learn about the Indian Constitution in a fun way!</p>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Games</a></li>
              <li><a href="#">Resources</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-contact">
            <h3>Contact Us</h3>
            <p>Email: support@nagrikaur.com</p>
            <p>Phone: +91 98765 43210</p>
            <p>Address: 123 Constitution Lane, New Delhi, India</p>
          </div>

          {/* Social Media */}
          <div className="footer-social">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Nagrik Aur Samvidhan. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
