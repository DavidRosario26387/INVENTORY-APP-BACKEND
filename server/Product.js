const mongoose =require('mongoose')
const productSchema=new mongoose.Schema({
    name:String,
    quantity:Number,
    price:Number
})

const productModel=new mongoose.model('Products',productSchema,'Products')
module.exports=productModel