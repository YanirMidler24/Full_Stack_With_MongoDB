const express = require("express");

const router = express.Router();
const jwt = require("jsonwebtoken");

const subsBL = require("../BL/subsBL");

router.route("/").post(async function (req, resp) {
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
      return resp.json(await subsBL.addSubToDB(obj));
    });
  } catch (err) {
    console.log(err);
  }
});

router.route("/getUsers").get(async function (req, resp) {
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
      return resp.json(await subsBL.getAllFromDB(obj));
    });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
