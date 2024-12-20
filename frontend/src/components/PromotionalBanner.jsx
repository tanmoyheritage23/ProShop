import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PromoBanner = () => {
  return (
    <section className="promo-banner text-center py-5">
      <Container>
        <Row>
          <Col md={6} className="d-flex flex-column justify-content-center text-white">
            <h2 className="promo-title mb-3">Exclusive Offer Just for You!</h2>
            <p className="promo-text mb-4">Don't miss out on our limited-time sale! Shop now and enjoy amazing discounts on top products.</p>
            <Link to="/discount-products">
              <Button variant="light" className="promo-btn px-4 py-2">Shop Now</Button>
            </Link>
          </Col>
          <Col md={6}>
            <img src="https://i.ibb.co/3vnXC1m/black-friday-sale-banner-black-sale-tag-hanging-white-background-7280-4025.jpg" alt="Promo" className="promo-image img-fluid" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PromoBanner;