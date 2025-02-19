import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import Testimonials from '../components/Testimonials';
import PromotionalBanner from '../components/PromotionalBanner';

const HomeScreen = () => {
  const { pageNumber = 1, keyword } = useParams(); // Default page number to 1

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber: parseInt(pageNumber), // Ensure pageNumber is parsed as a number
  });

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light mb-4'>
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />
          <h1>Latest Products</h1>
          {data.products.length === 0 ? (
      <Message variant="info">
        We are trying to add your products soon. Keep shopping with us!
      </Message>
    ) : (
      <Row>
        {data.products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    )}
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
      {/* Add Promotional Section */}
      <PromotionalBanner />
      {/* Add Testimonials Section Below */}
      <Testimonials />
    </>
  );
};

export default HomeScreen;