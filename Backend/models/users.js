const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    name:String,
    email: String,
    username:String,
    password:String
    
})

const User = mongoose.model('users', UserSchema)
module.exports=User


