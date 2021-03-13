const { json } = require("body-parser");
const express = require("express")

const router = express.Router()
const jwt = require('jsonwebtoken');
const usersBL = require("../BL/usersBL")

router.route("/login").post(async function (req, resp) {
    try {
        let obj = req.body
        if (await usersBL.CheckUserDetails(obj)) {
            if (true) {
                const userID = await usersBL.getUserIdFromDB(obj.username)
                // const userId = "yanirmidler"
                const RSA_PRIVATE_KEY = 'QHhpZGlvCg=='
                var userToken = jwt.sign({ id: userID },
                    RSA_PRIVATE_KEY,
                    { expiresIn: 7200 });
                let per = await  usersBL.getPermissionsForSession(obj.username)
                resp.status(200).send({ token: userToken, auth: true,permissions : per })
            }
        } else {
            resp.sendStatus(401);
        }

    } catch (err) {
        console.log(err)
    }
})

router.route("/signup").post(async function (req, resp) {
    try {
        let obj = req.body
        return resp.json(await usersBL.SignUpUserToDB(obj))
    } catch (err) {
        console.log(err)
    }
})

router.route("/permissions").get(async function (req, resp) {
    try {
        const RSA_PRIVATE_KEY = 'QHhpZGlvCg==';

        var token = req.headers.authorization;
        if (!token)
            return resp.status(401).send({ auth: false, message: 'No token provided.' });

        jwt.verify(token, RSA_PRIVATE_KEY, async function (err, decoded) {
            if (err)

                return resp.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

            return resp.json(await usersBL.getFilePermissions())

        });
    } catch (err) {
        console.log(err)
    }
})

router.route("/addUser").post(async function (req, resp) {
    try {
        const RSA_PRIVATE_KEY = 'QHhpZGlvCg==';

        var token = req.headers.authorization;
        if (!token)
            return resp.status(401).send({ auth: false, message: 'No token provided.' });

        jwt.verify(token, RSA_PRIVATE_KEY, async function (err, decoded) {
            if (err)

                return resp.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

            let obj = req.body

            return resp.json(await usersBL.addUserToDataFile(obj))
        });

    } catch (err) {
        console.log(err)
    }
})

router.route("/getUsers").get(async function (req, resp) {
    try {
        const RSA_PRIVATE_KEY = 'QHhpZGlvCg==';

        var token = req.headers.authorization;
        if (!token)
            return resp.status(401).send({ auth: false, message: 'No token provided.' });

        jwt.verify(token, RSA_PRIVATE_KEY, async function (err, decoded) {
            if (err)

                return resp.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

            return resp.json(await usersBL.getAllUsers())
        });
    } catch (err) {
        console.log(err)
    }
})

router.route("/getID").post(async function (req, resp) {
    try {

        const RSA_PRIVATE_KEY = 'QHhpZGlvCg==';

        var token = req.headers.authorization;
        if (!token)
            return resp.status(401).send({ auth: false, message: 'No token provided.' });

        jwt.verify(token, RSA_PRIVATE_KEY, async function (err, decoded) {
            if (err)

                return resp.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

            let ID = await usersBL.getUserIdFromDB(req.body)
            return resp.json(await usersBL.delUserBL(ID))
        });

    } catch (err) {
        console.log(err)
    }
})


router.route("/getIDForEdit").post(async function (req, resp) {
    try {

        const RSA_PRIVATE_KEY = 'QHhpZGlvCg==';

        var token = req.headers.authorization;
        if (!token)
            return resp.status(401).send({ auth: false, message: 'No token provided.' });

        jwt.verify(token, RSA_PRIVATE_KEY, async function (err, decoded) {
            if (err)

                return resp.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

            let obj = req.body

            return resp.json(await usersBL.getUserIdFromDB(obj))
        });

    } catch (err) {
        console.log(err)
    }
})






router.route("/deleteUser").post(async function (req, resp) {
    try {
        const RSA_PRIVATE_KEY = 'QHhpZGlvCg==';

        var token = req.headers.authorization;
        if (!token)
            return resp.status(401).send({ auth: false, message: 'No token provided.' });

        jwt.verify(token, RSA_PRIVATE_KEY, async function (err, decoded) {
            if (err)

                return resp.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

            return resp.json(await usersBL.delUserFromArr(req.body))

        });
    } catch (err) {
        console.log(err)
    }
})

router.route("/edit-user").post(async function (req, resp) {
    try {
        const RSA_PRIVATE_KEY = 'QHhpZGlvCg==';

        var token = req.headers.authorization;
        if (!token)
            return resp.status(401).send({ auth: false, message: 'No token provided.' });

        jwt.verify(token, RSA_PRIVATE_KEY, async function (err, decoded) {
            if (err)

                return resp.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            let flag = await usersBL.editUser(req.body)
            if (flag) {
                return resp.json(await usersBL.EditUserNameDB(req.body.UserName,req.body.UsernameToChange))
            }
        });



    } catch (err) {
        console.log(err)
    }
})

module.exports = router