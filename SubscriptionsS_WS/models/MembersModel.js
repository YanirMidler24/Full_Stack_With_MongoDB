const mongooseMembers = require("mongoose")

let MemberSchema = new mongooseMembers.Schema({
    Name : String,
    Email : String,
    City : String
})

module.exports = mongooseMembers.model("members", MemberSchema)