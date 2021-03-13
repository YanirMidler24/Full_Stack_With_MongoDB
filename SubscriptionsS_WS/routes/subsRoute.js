const express = require("express");

const router = express.Router();
const jwt = require("jsonwebtoken");

const subsBL = require("../BL/subsBL");

router.route("/addSubToDB").post(async function (req, resp) {
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
      return resp.json(await subsBL.addSubToDB(obj));
    });
  } catch (err) {
    console.log(err);
  }
});

router.route("/getAllSUbs").post(async function (req, resp) {
  try {
    const RSA_PRIVATE_KEY = "QHhpZGlvCg==";

    if (!req.body.token)
      return resp
        .status(401)
        .send({ auth: false, message: "No token provided." });

    jwt.verify(token, RSA_PRIVATE_KEY, async function (err, decoded) {
      if (err)
        return resp
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });

      return resp.json(await subsBL.getAllSubs());
    });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
