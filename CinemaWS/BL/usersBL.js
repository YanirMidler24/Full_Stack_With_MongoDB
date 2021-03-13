const usersDAL = require("../DAL/usersDAL")
const User = require("../models/UserModel")
const permissionDAL = require("../DAL/PermissionsDAL")

const CheckUserDetails = async function (obj) {
    try {
        let usersList = await usersDAL.getUsersDetalis()
        let auth = usersList.find(x => x.Username == obj.username && x.Password == obj.password)
        if (auth) {
            return true
        } else {
            return false
        }

    } catch (err) {
        console.log(err)
    }
}



const getAllUsers = async function () {
    try {
        let users = await usersDAL.readUsersFile()
        return users
    } catch (err) {
        console.log(err)
    }
}


const getUserIdFromDB = async function (obj) {
    let FlagId
    let userData = await usersDAL.getUserId(obj.username)
    userData.forEach(x => {
        FlagId = x._id
    })

    return FlagId
}


const SignUpUserToDB = async function (obj) {
    return new Promise(async (resolve, reject) => {
        try {
            let usersList = await usersDAL.getUsersDetalis()
            let checkUserInDB = usersList.find(x => x.Username == obj.username)
            if (checkUserInDB) {
                let id = await usersDAL.getUserId(obj.username)

                User.findByIdAndUpdate(id,
                    {
                        Password: obj.password
                    }, function (err) {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(true)
                        }
                    })
            } else {
                return false
            }

        } catch (err) {
            reject(err)
        }


    })
}


const EditUserNameDB = async function (username, usr) {
    let data = await usersDAL.getUsersDetalis()
    let id
    data.forEach(x => {
        if (x.Username == usr) {
            id = x._id
        }
    })
    return new Promise(async (resolve, reject) => {
        try {
            User.findByIdAndUpdate(id,
                {
                    Username: username
                }, function (err) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(true)
                    }
                })
        } catch (err) {
            console.log(err)
        }



    })
}

const delUserBL = async function (id) {
    try {
        let deleteFlag = await usersDAL.deleteUser(id)
        return deleteFlag
    } catch (err) {
        console.log(err)
    }

}

const addUserToDB = async function (obj) {
    return new Promise(async (resolve, reject) => {
        try {
            const newUser = new User({
                Username: obj.UserName,

            })
            newUser.save(function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve(true)
                }
            })

        } catch (err) {
            reject(err)
        }


    })
}

const getFilePermissions = async function () {
    let resp = await permissionDAL.WritePermissiosTofile()
    if (resp) {

        return data = await permissionDAL.ReadPremsissions()

    }


}

const addUserToDataFile = async function (obj) {
    let users = await usersDAL.readUsersFile()
    let check = users.find(x => x.UserName == obj.username)
    if (!check) {
        users.push(obj)
        let resp = await usersDAL.addUserToFIle(users)
        let result = await addUserToDB(obj)
        return resp
    } else {
        return false
    }



}


const getPermissionsForSession = async function (username) {
    try {
        let per
        let list = await usersDAL.readUsersFile()
        list.forEach(x => {
            if (x.UserName == username) {
                per = x.Permissions
            }
        })
        return per
    } catch (err) {
        console.log(err)
    }
}

const delUserFromArr = async function (username) {
    try {
        let userList = await usersDAL.readUsersFile()
        let arr = []
        userList.forEach(x => {
            if (x.UserName != username.username) {
                arr.push(x)
            }
        })
        let resp = await usersDAL.addUserToFIle(arr)
        return resp
    } catch (err) {
        console.log(err)
    }
}


const editUser = async function (obj) {
    let users = await usersDAL.readUsersFile()
    let arr = []

    users.forEach(x => {
        arr.push(x)
        if (x.UserName == obj.UserName || x.FullName == obj.FullName) {
            obj.Created_time = x.Created_time
            arr.pop(x)
        }

    })

    arr.push(obj)

    let resp = await usersDAL.addUserToFIle(arr)
    return resp
}


module.exports = {
    CheckUserDetails, getUserIdFromDB, addUserToDB, getFilePermissions,
    addUserToDataFile, SignUpUserToDB, getAllUsers, delUserBL,
    delUserFromArr, editUser, EditUserNameDB,
    getPermissionsForSession
}