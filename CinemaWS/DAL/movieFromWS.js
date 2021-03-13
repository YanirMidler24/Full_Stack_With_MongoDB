const axios = require("axios");

exports.getMovesFromAPi = (obj) => {
  axios
    .post("http://localhost:8000/api/movies", obj)
    .then((resp) => {
      return resp.data;
    });
};

exports.updateMovieInDB = (obj) => {
  axios
    .post("http://localhost:8000/api/movies/updateMovie", obj)
    .then((resp) => {
      return resp.data;
    });
};

exports.deleteMovieFromDB = (obj) => {
    axios.post(`http://localhost:8000/api/movies/deleteMovie`,obj).then(resp =>
    {
        return resp.data
    })
};

exports.addMovieToDB = (obj) => {
  axios.post(`http://localhost:8000/api/movies/createMovie`,obj).then(resp =>
  {
      return resp.data
  })
};