import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary text-light py-4">
      <Container>
        <Row>
          {/* About Section */}
          <Col md={4}>
            <h5>About Us</h5>
            <p>
              ProShop is your one-stop shop for quality products. We provide the
              best prices, fast delivery, and excellent customer service.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-light">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" className="text-light">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/" className="text-light">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/" className="text-light">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </Col>

          {/* Contact Section */}
          <Col md={4}>
            <h5>Contact Us</h5>
            <p>
              <strong>Email:</strong> support@proshop.com
            </p>
            <p>
              <strong>Phone:</strong> +1 234 567 890
            </p>
            <p>
              <strong>Address:</strong> 123 ProShop Street, New York, NY, USA
            </p>
          </Col>
        </Row>

        {/* Copyright */}
        <Row className="text-center mt-3">
          <Col>
            <p className="mb-0">
              &copy; {new Date().getFullYear()} ProShop. All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;