const mongoose = require("mongoose")

let SubsSchema = new mongoose.Schema({
   Name : String,
   Email : String,
   Date : String,
   Premiered: String,
   Movies : [String],
})

module.exports = mongoose.model("Subscriptions", SubsSchema)