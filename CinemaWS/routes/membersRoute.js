const express = require("express");

const router = express.Router();
const jwt = require("jsonwebtoken");

const membersBL = require("../BL/membersBL");

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
      let members = await membersBL.getAllMembersData(obj);
      return resp.json(members.data);
    });
  } catch (err) {
    console.log(err);
  }
});

router.route("/updateMember").post(async function (req, resp) {
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
      let movies = await membersBL.updateMemberInDB(obj);
      return resp.json(movies);
    });
  } catch (err) {
    console.log(err);
  }
});
router.route("/deleteMember").post(async function (req, resp) {
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
      let movies = await membersBL.deleteMemberFromDB(obj);
      return resp.json(movies);
    });
  } catch (err) {
    console.log(err);
  }
});
router.route("/createMember").post(async function (req, resp) {
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
      let movies = await membersBL.createMember(obj);
      return resp.json(movies);
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
