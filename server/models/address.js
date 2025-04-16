import mongoose from 'mongoose'

const addressSchema = new mongoose.Schema({
    userId:String,
    address:String,
    city:String,
    pincode:String,
    phone:Number,
    notes:String

},{timestamps:true})

export const Address = mongoose.model('address',addressSchema);