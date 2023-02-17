import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import "./index.css";

function Footer() {
  return (
    <footer className="bg-light py-3">
        <Row className="align-items-center">
          <Col md={6} className="text-md-start text-center mb-3 mb-md-0">
          </Col>
          <Col md={6} className="text-md-end text-center">
            <a href="https://www.facebook.com" className="me-3">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a href="https://www.instagram.com" className="me-3">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a href="https://www.twitter.com" className="me-3">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
            <a href="https://www.linkedin.com" className="me-3">
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
          </Col>
        </Row>
    </footer>
  );
}

export default Footer;
