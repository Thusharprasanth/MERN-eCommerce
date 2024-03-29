import axios from 'axios'
export const addTocart = (id,qty) =>async(dispatch,getState)=> {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type:'CART_ADD_ITEM',
        payload:{
            product:data._id,
            name:data.name,
            image:data.image,
            price:data.price,
            countInStock:data.countInStock,
            qty
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id)=>(dispatch, getState) => {
    dispatch({
        type:'CART_REMOVE_ITEMS',
        payload : id
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}