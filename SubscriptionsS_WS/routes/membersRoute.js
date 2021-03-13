const express = require("express");

const router = express.Router();

const membresBL = require("../BL/membersBL");

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
      let members = await membresBL.MembersToDB();
      return resp.json(members);
    });
  } catch (err) {
    console.log(err);
  }
});

router.route("/updateMember").post(async function (req, resp) {
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
      return resp.json(await membresBL.updateMember(req.body));
    });
  } catch (err) {
    console.log(err);
  }
});

router.route("/deleteMember").post(async function (req, resp) {
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
      return resp.json(await membresBL.deleteMember(req.body));
    });
  } catch (err) {
    console.log(err);
  }
});
router.route("/createMember").post(async function (req, resp) {
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
      return resp.json(await membresBL.createMember(req.body));
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
