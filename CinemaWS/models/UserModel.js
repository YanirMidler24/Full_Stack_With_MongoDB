const mongoose = require("mongoose")

let UserSchema  = new mongoose.Schema({
    Username : String,
    Password  : String
})

module.exports = mongoose.model("users",UserSchema)