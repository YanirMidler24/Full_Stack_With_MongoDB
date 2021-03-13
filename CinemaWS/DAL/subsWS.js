const axios = require("axios");

exports.addAndGetSubs = (obj) => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:8000/api/subs/addSubToDB", obj)
      .then((resp,err) => {
        if (err) {
          reject(err);
        } else {
          resolve(resp.data);
        }
      });
  });
};

exports.getAllUsers = (obj) =>
{
  return new Promise((resolve,reject) =>
  {
    axios.post("http://localhost:8000/api/subs/getAllSUbs",token)
    .then((resp,err) => {
      if (err) {
        reject(err);
      } else {
        resolve(resp.data);
      }
    })
  })
}