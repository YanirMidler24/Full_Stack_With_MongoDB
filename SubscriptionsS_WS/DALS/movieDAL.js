const axios = require("axios")

exports.getAllMovie = () =>
{
    return axios.get("https://api.tvmaze.com/shows?page=0")
}

