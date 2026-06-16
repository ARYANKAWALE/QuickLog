import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        index:true
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    brand:{
        type:String,
        trim:true
    },
    category:{
        type:String,
        required:true
    },
    purchaseDate:{
        type:Date,
        required:true
    },
    warrantyMonths:{
        type:Number,
        required:true,
        min:0
    },
    warrentyEndData:{
        type:Date,
        required:true
    },
    receiptUrl:{
        type:String,
    },
    notes:{
        type:String,
        trim:true
    }
},{timestamp:true})

export const Item = mongoose.model('Item', itemSchema)