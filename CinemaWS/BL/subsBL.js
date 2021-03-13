const subsWS = require("../DAL/subsWS")

const addSubToDB = async function(obj) 
{
    try{
        let data = await subsWS.addAndGetSubs(obj)
        return data
    }catch(err)
    {
        console.log(err)
    }
}

const getAllFromDB = async function(obj)
{
    try{
        let resp = await subsWS.getAllUsers(obj)
        return resp
    }catch(err)
    {
        console.log(err)
    }
}
module.exports = {addSubToDB,getAllFromDB}