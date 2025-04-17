const express = require('express')
const cors = require('cors')
const app = express()
const productModel=require('./Product')
const mongoose=require('mongoose')

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://user:test123@inventory.oxtouzs.mongodb.net/')
.then(()=> console.log('DB Connected'))
.catch(err=>console.log(err))

//Define APIs
app.post('/addProduct',async(req,res)=>{
    try{
        await productModel.create(req.body)
        res.json({message:'Product added successfully'})
    }
    catch(error){
        res.json(error)
    }
})

app.get('/viewProduct',async(req,res)=>{
    try{
        const records=await productModel.find()
        res.json(records)
    }
    catch(error){
        res.json(error)
    }
})

app.get('/findProduct/:id',async(req,res)=>{
    try{
        const records=await productModel.findById(req.params.id)
        res.json(records)
    }
    catch(error){
        res.json(error)
    }
})
app.put('/editProduct/:id',async(req,res)=>{
    try{
        const updatedProduct=await productModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        )
        if(!updatedProduct){
            res.send('Product not found!')
        }
        res.json({message:'Product updated successfully'})
    }
    catch(error){
        res.json(error)
    }
})

app.delete('/deleteProduct/:id',async(req,res)=>{
    try{
        const product=await productModel.findByIdAndDelete(req.params.id)
        if(!product){
         res.json('Item not found!')
        }
        res.json({message:'Item deleted successfully'})
    }
    catch(error){
        res.json(error)
    }
})
//config PORT and Start Server
const PORT = 8000
app.listen(PORT, ()=>{
console.log(`Server running on port ${PORT}`)
})