const express = require("express");

const router = express.Router();
const jwt = require("jsonwebtoken");

const moviesBL = require("../BL/moviesBL");

router.route("/").get(async function (req, resp) {
  try {
    const RSA_PRIVATE_KEY = "QHhpZGlvCg==";

    var token = req.headers.authorization;
    if (!token)
      return resp
        .status(401)
        .send({ auth: false, message: "No token provided." });

    jwt.verify(token, RSA_PRIVATE_KEY, async function (err, decoded) {
      if (err)
        return resp
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
        let obj = {token : token}
      let movies = await moviesBL.getAllMovieData(obj);
      return resp.json(movies.data);
    });
  } catch (err) {
    console.log(err);
  }
});

router.route("/updateMovie").post(async function (req, resp) {
  try {
    const RSA_PRIVATE_KEY = "QHhpZGlvCg==";

    var token = req.headers.authorization;
    if (!token)
      return resp
        .status(401)
        .send({ auth: false, message: "No token provided." });

    jwt.verify(token, RSA_PRIVATE_KEY, async function (err, decoded) {
      if (err)
        return resp
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
          let obj = req.body
          obj.token = token
      let movies = await moviesBL.updateMovieInDB(obj);
      return resp.json(movies);
    });
  } catch (err) {
    console.log(err);
  }
});

router.route("/deleteMovie").post(async function (req, resp) {
  try {
    const RSA_PRIVATE_KEY = "QHhpZGlvCg==";

    var token = req.headers.authorization;
    if (!token)
      return resp
        .status(401)
        .send({ auth: false, message: "No token provided." });

    jwt.verify(token, RSA_PRIVATE_KEY, async function (err, decoded) {
      if (err)
        return resp
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
      let obj = req.body;
      obj.token = token
      let movies = await moviesBL.deleteMovieInDB(obj);
      return resp.json(movies);
    });
  } catch (err) {
    console.log(err);
  }
});

router.route("/addMovieToDB").post(async function (req, resp) {
  try {
    const RSA_PRIVATE_KEY = "QHhpZGlvCg==";

    var token = req.headers.authorization;
    if (!token)
      return resp
        .status(401)
        .send({ auth: false, message: "No token provided." });

    jwt.verify(token, RSA_PRIVATE_KEY, async function (err, decoded) {
      if (err)
        return resp
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
      let obj = req.body;
      obj.token = token
      let movies = await moviesBL.addMovieToDB(obj);
      return resp.json(movies);
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
