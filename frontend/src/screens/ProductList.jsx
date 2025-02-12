import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';


const ProductList = () => {
  const { keyword = '' } = useParams(); // Get keyword from URL
  const { data, isLoading, error } = useGetProductsQuery({ keyword });

  return (
    <>
      <Meta />
      <h1>Discounted Products</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (
        <>
          {data.products.length === 0 ? (
            <Message variant="info">
              Apologies, we couldn't find any products matching your search. Please try again later.
            </Message>
          ) : (
            <>
              <Row>
                {data.products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
        
            </>
          )}
        </>
      )}
    </>
  );
};

export default ProductList;