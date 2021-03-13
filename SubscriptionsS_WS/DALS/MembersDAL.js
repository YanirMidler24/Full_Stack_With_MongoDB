const axios = require("axios")

exports.getAllMembers = () =>
{
   return axios.get("https://jsonplaceholder.typicode.com/users")
}