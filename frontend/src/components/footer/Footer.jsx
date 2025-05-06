import React from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import './footer.css';

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="container">
        <h5>Contact Us</h5>
        <ul className="footer-links">
          <li>
            <FaEnvelope className="icon" />
            <a href="mailto:tamminh@iastate.edu">tamminh@iastate.edu</a>
          </li>
          <li>
            <FaEnvelope className="icon" />
            <a href="mailto:ntbach@iastate.edu">ntbach@iastate.edu</a>
          </li>
          <li>
            <FaMapMarkerAlt className="icon" />
            <a
              href="https://www.iastate.edu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Iowa State University
            </a>
          </li>
          <li>
            <FaPhone className="icon" />
            <a href="tel:5155672571">(515) 567-2571</a>
          </li>
        </ul>
        <div className="footer-bottom">
          <p>&copy; 2025 VietFood. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
