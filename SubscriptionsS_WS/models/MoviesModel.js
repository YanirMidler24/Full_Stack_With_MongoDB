const mongoose = require("mongoose")

let MovieSchema = new mongoose.Schema({
    MovieName : String,
    MovieGeners : [String],
    MovieImage : String,
    Premiered : Date
})

module.exports = mongoose.model("movies",MovieSchema)