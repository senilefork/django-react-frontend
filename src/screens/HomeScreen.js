import { Row , Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useState, useEffect } from 'react';
import { listProducts } from '../actions/productActions';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { error, loading, products } = productList;

    useEffect(()  => {
        dispatch(listProducts());
    },[dispatch]);

    return(
        <div>
            <h1>Latest Products</h1>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <Row>
                    {products.map(p => (
                        <Col key={p._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={p} />
                        </Col>
                    ))}
                    </Row> }
        </div>
    )
}

export default HomeScreen;