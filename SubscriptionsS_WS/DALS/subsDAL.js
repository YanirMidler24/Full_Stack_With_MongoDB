const { response } = require("express");
const Subs = require("../models/SubsModel");

const addSubToDB = function (obj) {
  try {
    let arr = [];
    return new Promise((resolve,reject) => {
      Subs.find({}, function (err, subs) {
        let check = subs.find((x) => x.Name == obj.Name);
        if (check) {
          subs.forEach((x) => {
            if (x.Name === obj.Name) {
              let ID = x._id;
              x.Movies.forEach((y) => {
                arr.push(y);
              });
              if (!arr.includes(obj.MovieName)) {
                arr.push(obj.MovieName);
              }

              Subs.findByIdAndUpdate(
                ID,
                {
                  Movies: arr,
                },
                function (err) {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(true);
                  }
                }
              );
            }
          });
        } else if (!check) {
          const s = new Subs({
            Name: obj.Name,
            Email: obj.Email,
            Date: obj.Date,
            Premiered: obj.Premiered,
            Movies: [obj.MovieName],
          });
          s.save(function (err) {
            if (err) {
              reject(err);
            } else {

              resolve(true);
            }
          });
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
};




const getAllSubs = () =>
{
  return new Promise((resolve, reject) => {
    try{
      Subs.find({}, function (err, subs) 
      {
        if(err)
        {
          reject(err)
        }else{
          resolve(subs)
        }
      })
    }catch(err)
    {
      console.log(err)
    }
    

  })
}

module.exports = {addSubToDB,getAllSubs}