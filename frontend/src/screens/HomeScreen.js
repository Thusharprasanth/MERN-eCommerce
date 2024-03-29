import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productAction'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import  Loader  from '../components/Loader'
import  Message  from '../components/Message'



const HomeScreen = () => {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList
    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <>

            <h2>Latest Products</h2>
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : <Row>
                {products.map((product) => (

                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>

                ))}
            </Row>}

        </>
    )
}

export default HomeScreen