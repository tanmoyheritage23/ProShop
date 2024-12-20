import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'John Doe',
      feedback:
        'Amazing products! The quality is top-notch, and the customer service is excellent.',
      image: 'https://api.dicebear.com/6.x/adventurer/svg?seed=John',
    },
    {
      name: 'Jane Smith',
      feedback:
        'A wonderful shopping experience! Highly recommend this store to everyone.',
      image: 'https://api.dicebear.com/6.x/adventurer/svg?seed=Jane',
    },
    {
      name: 'Michael Lee',
      feedback:
        'Fast delivery and the products exceeded my expectations. Will shop again!',
      image: 'https://api.dicebear.com/6.x/adventurer/svg?seed=Alex',
    },
  ];

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">What Our Customers Say</h2>
      <Row className="justify-content-center">
        {testimonials.map((testimonial, index) => (
          <Col key={index} sm={12} md={6} lg={4} className="mb-4">
            <Card className="shadow border-0 h-100">
              <Card.Body className="text-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="rounded-circle mb-3"
                  style={{ width: '80px', height: '80px' }}
                />
                <Card.Text className="text-muted">
                  "{testimonial.feedback}"
                </Card.Text>
                <Card.Title as="h5" className="mt-3">
                  {testimonial.name}
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Testimonials;