const subsDAL = require("../DALS/subsDAL")

const addSubToDB =async function(obj)
{
    try{
        let data
        let resp = await subsDAL.addSubToDB(obj)
        if(resp)
        {
            data =await subsDAL.getAllSubs()
        }
        return data
    }catch(err)
    {
        console.log(err)
    }
}


const getAllSubs = async function()
{
    try {
        let resp = await subsDAL.getAllSubs()
        return resp
    }catch(err)
    {
        console.log(err)
    }
}

module.exports = {addSubToDB,getAllSubs}