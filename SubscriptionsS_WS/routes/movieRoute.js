const express = require("express");

const router = express.Router();
const jwt = require("jsonwebtoken");

const MoviesBL = require("../BL/moviesBL");

router.route("/").post(async function (req, resp) {
  try {
    let obj = req.body;
    const RSA_PRIVATE_KEY = "QHhpZGlvCg==";
    if (!obj.token)
      return resp
        .status(401)
        .send({ auth: false, message: "No token provided." });

    jwt.verify(token, RSA_PRIVATE_KEY, async function (err, decoded) {
      if (err)
        return resp
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
      let movies = await MoviesBL.movieToDB();
      return resp.json(movies);
    });
  } catch (err) {
    console.log(err);
  }
});

router.route("/updateMovie").post(async function (req, resp) {
  try {
    let obj = req.body;
    const RSA_PRIVATE_KEY = "QHhpZGlvCg==";
    if (!obj.token)
      return resp
        .status(401)
        .send({ auth: false, message: "No token provided." });

    jwt.verify(token, RSA_PRIVATE_KEY, async function (err, decoded) {
      if (err)
        return resp
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
      return resp.json(await MoviesBL.updateMovie(obj));
    });
  } catch (err) {
    console.log(err);
  }
});

router.route("/deleteMovie").post(async function (req, resp) {
  try {
    let obj = req.body;
    const RSA_PRIVATE_KEY = "QHhpZGlvCg==";
    if (!obj.token)
      return resp
        .status(401)
        .send({ auth: false, message: "No token provided." });

    jwt.verify(token, RSA_PRIVATE_KEY, async function (err, decoded) {
      if (err)
        return resp
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
      return resp.json(await MoviesBL.deleteMovie(obj));
    });
  } catch (err) {
    console.log(err);
  }
});

router.route("/createMovie").post(async function (req, resp) {
  try {
    let obj = req.body;
    const RSA_PRIVATE_KEY = "QHhpZGlvCg==";
    if (!obj.token)
      return resp
        .status(401)
        .send({ auth: false, message: "No token provided." });

    jwt.verify(token, RSA_PRIVATE_KEY, async function (err, decoded) {
      if (err)
        return resp
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
      return resp.json(await MoviesBL.createMovie(obj));
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
