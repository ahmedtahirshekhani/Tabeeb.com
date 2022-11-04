const mongoose = require("mongoose")
const tripsSchema = new mongoose.Schema({
    username:String,   
    name: String,
    startDate: String,
    days:Number,
    destination: String,
    imageUrl: String,
    urlSlug: String,
    createdOn: String,
    friends: Array
})

const trips= mongoose.model('trips', tripsSchema)
module.exports=trips
