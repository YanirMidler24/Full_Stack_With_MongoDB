const membresDAL = require("../DALS/MembersDAL")
const Member = require("../models/MembersModel")

const MembersToDB = async function()
{
    return new Promise((resolve,reject) =>
    {
        Member.find({} ,async function(err,members)
        {
            if(err)
            {
                reject(err)
            }else
            {
                if(members.length == 0)
                {
                    let resp = await membresDAL.getAllMembers()
                    resp.data.forEach(x =>
                        {
                           const m = new Member({
                               Name : x.name,
                               Email : x.email,
                               City : x.address.City  
                           })
                           m.save(function(err)
                           {
                               if(err)
                               {
                                   reject(err)
                               }else
                               {
                                   resolve(members)
                               }
                           })
                        })
                }else{
                    resolve(members)
                }
            }
        })
    })
}



const updateMember = async function (obj) {
    try {
      return new Promise((resolve, reject) => {
        let id = obj.id;
        Member.findByIdAndUpdate(
          id,
          {
            Name: obj.Name,
            Email: obj.Email
                  },
          function (err) {
            if (err) {
              reject(err);
            } else {
              resolve(true);
            }
          }
        );
      });
    } catch (err) {
      console.log(err);
    }
  };



  const deleteMember = async function (obj) {
    try {
      return new Promise((resolve, reject) => {
        let id = obj.id;
  
        Member.findByIdAndDelete(id, function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  const createMember = async function (obj) {
    try {
      return new Promise((resolve, reject) => {
        const m = new Member({
          Name: obj.Name,
          Email: obj.Email,

        });
        m.save(function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        });
      });
    } catch (err) {
      console.log(err);
    }
  };
module.exports = {MembersToDB,updateMember,deleteMember,createMember}