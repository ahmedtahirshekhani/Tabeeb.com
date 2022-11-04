const mongoose = require("mongoose")
const singleTripSchema = new mongoose.Schema({
    username:String,
    tripname:String,
    tId: String,
    tripdata:Array,
})

const singleTrip= mongoose.model('single_trips', singleTripSchema)
module.exports=singleTrip