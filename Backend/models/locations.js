const mongoose = require("mongoose")
const locationSchema = new mongoose.Schema({
    name:String,
    subPlaces:[String],
})

const location = mongoose.model('locations', locationSchema)
module.exports=location
