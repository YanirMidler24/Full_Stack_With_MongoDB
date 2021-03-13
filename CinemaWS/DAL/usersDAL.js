const Users = require("../models/UserModel")
const jfile = require("jsonfile")


const readUsersFile = () => {
    return new Promise((resolve, reject) => {
        jfile.readFile(__dirname + "/users.json", function (err, users) {
            if (err) {
                reject(err)
            } else {
                resolve(users)
            }
        })
    })
}

const addUserToFIle = (arr) => {

    return new Promise((resolve, reject) => {
        jfile.writeFile(__dirname + "/users.json", arr, function (err) {
            if (err) {
                reject(err)
            } else {
                resolve(true)
            }
        })
    })
}


const DeleteUserFromArr = (arr) => {
    return new Promise((resolve, reject) => {
        jfile.writeFile(__dirname + "/users.json", arr, function (err) {
            if (err) {
                reject(err)
            } else {
                resolve(true)
            }
        })
    })
}

const getUsersDetalis = async function () {
    return new Promise((resolve, reject) => {
        Users.find({}, function (err, users) {
            if (err) {
                reject(err)
            } else {
                resolve(users)
            }
        })
    })
}

const deleteUser = function (id) {
    return new Promise((resolve, reject) => {
        Users.findByIdAndDelete(id, function (err) {
            if (err) {
                reject(err)
            }
            else {
                resolve(true)
            }
        })
    })
}


const getUserId = async function (username) {
    return new Promise((resolve, reject) => {
        Users.find({ "Username": username }, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}



module.exports = { getUsersDetalis, getUserId, readUsersFile, addUserToFIle, deleteUser, DeleteUserFromArr }