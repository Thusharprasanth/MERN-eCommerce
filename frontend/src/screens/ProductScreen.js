import React,{ useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productAction'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'


const ProductScreen = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const [qty, setQty] = useState(1)

    useEffect(()=>{
        
      dispatch(listProductDetails(id))  
    
        
    },[dispatch])

    const addToCartHandler = ()=>{
        navigate(`/cart/${id}?qty=${qty}`)
    }

  return (
    <>
     <Link className='btn btn-light' to='/'>
        Go Back
    </Link>
    { loading ? <Loader/> : error ? <Message variannt='danger'>{error}</Message> : (
        <Row>
        <Col md={6}>
            <Image src={product.image} alt={product.name} fluid></Image>
        </Col>
        <Col md={3}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                </ListGroup.Item>
                <ListGroup.Item>
                   {product.description}
                </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={3}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <Row>
                        <Col>Price:</Col>
                        <Col><strong>$ {product.price}</strong></Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Status:</Col>
                        <Col>{product.countInStock ? 'In Stock' : 'Out of Stock'}</Col>
                    </Row>
                </ListGroup.Item>
                { product.countInStock > 0 && (
                    <ListGroup.Item>
                        <Row>
                            <Col>Qty</Col>
                            <Col>
                            <Form.Control as='select' value={qty} onChange={(e)=>{ setQty(e.target.value) }}>
                                {
                                [...Array(product.countInStock).keys()].map((x)=>(
                                    <option key={x+1} value={x+1}>{x+1}</option>
                                ))
                                }
                            </Form.Control>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ) }
                <ListGroup.Item>
                    <Button onClick={addToCartHandler} className='btn-block' type='button' disabled={product.countInStock===0}>Add to Cart</Button>
                </ListGroup.Item>

            </ListGroup>
        </Col>
    </Row>

    ) }
   
    
    </>
  )
}

export default ProductScreen