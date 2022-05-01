import express from 'express'
import products from './data/products.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.get('/api/products', (req,res)=>{
    res.json(products)
})
app.get('/api/products/:id', (req,res)=>{
    const {id} = req.params
    const product = products.find((p)=>p._id===id)
    res.json(product)
})

const PORT = process.env.PORT || 5000

app.listen(5000, console.log(`Server running in ${process.env.NODE_DEV} on port ${PORT}`))  