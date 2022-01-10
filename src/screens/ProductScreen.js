import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import { listProductDetails } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductScreen = (props) => {
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    useEffect(() => {
        dispatch(listProductDetails(props.match.params.id))
    }, [dispatch, props.match])
   
    return(
        <div>
            <Link to='/' className='btn btn-dark my-3'>Go Back</Link>

            {loading ?
              <Loader />
                : error
                ? <Message variant='danger'>{error}</Message>
                : (
                    <Row>

                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>

                <Col md={3}>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <h3>{product.name}</h3>
                      </ListGroup.Item>
              
                      <ListGroup.Item>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                      </ListGroup.Item>

                      <ListGroup.Item>
                        Price: ${product.price}
                      </ListGroup.Item>

                      <ListGroup.Item>
                        Description: {product.description}
                      </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={3}>
                    <Card>
                        <ListGroup>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                       <p>{product.price}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                       {product.countInStock > 0 ? 'in stock' : 'out of stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button className='btn-block' disabled={product.countInStock === 0} type='button'>Add to Cart</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
                )
            }     
        </div>
    )
}

export default ProductScreen;