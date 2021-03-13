const jfile = require("jsonfile")


exports.WritePermissiosTofile = () => {
    return new Promise((resolve, reject) => {
        let json =
        {
            permissions: [
                {

                    view_subs: "View Subscriptions",
                    create_subs: "Create Subscriptions",
                    delete_subs: "Delete Subscriptions",
                    update_subs: "Update Subscriptions",
                    view_movies: "View movies",
                    create_movies: "Create movies",
                    delete_movies: "Delete movies",
                    update_movies: "Update movies"
                }
            ]

        }
        jfile.writeFile(__dirname + "/Permissions.json", json, function (err) {
            if (err) {
                reject(err)
            } else {
                resolve(true)
            }
        })

    })

}

exports.ReadPremsissions = () => {
    return new Promise((resolve, reject) => {

        jfile.readFile(__dirname + "/Permissions.json", function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}