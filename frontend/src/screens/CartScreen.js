import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addTocart, removeFromCart } from '../actions/cartAction'
import { Row, Col, Image, ListGroup, Card, Button, Form, ListGroupItem } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useLocation } from 'react-router-dom';

const CartScreen = ({ location }) => {
    const productId = useParams().id
    const qty = useLocation().search.split('=')[1]
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }
    const checkoutHandler = () => {
        console.log('Checkout');
    }

    useEffect(() => {
        if (productId) {
            dispatch(addTocart(productId, qty))
        }
    }, [dispatch, productId, qty])

    return (
        <div>
            <Row>
                <Col md={8}>
                    <h1>Shopping Cart</h1>
                    {cartItems.length === 0 ? (
                        <Message>Your cart is empty <Link to='/'>Go Back</Link></Message>
                    ) : (
                        <ListGroup variant='flush'>
                            {cartItems.map(item => (
                                <ListGroup.Item>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} rounded fluid />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={2}>Rs {item.price}</Col>
                                        <Col md={2}>
                                            <Form.Control as='select' value={item.qty} onChange={(e) => dispatch(addTocart(item.product, Number(e.target.value)))} >
                                                {
                                                    [...Array(item.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                            <Button type='button' variant='light' onClick={() => {
                                                removeFromCartHandler(item.product);
                                            }}>
                                                <i className='fas fa-trash'></i>

                                            </Button>
                                        </Col>
                                    </Row>

                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                    </Col>
                    <Col md={4}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Subtotal : ({cartItems.reduce((acc,item)=> acc+item.qty, 0 )})</h2>
                                    $ {cartItems.reduce((acc, item)=>acc + item.qty*item.price, 0).toFixed(2)}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button className='btn-block' type='button' disabled={cartItems.lenght ===0} onClick={checkoutHandler}>
                                        Checkout
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
            </Row>



        </div>
    )
}

export default CartScreen