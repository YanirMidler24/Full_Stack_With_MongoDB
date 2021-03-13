const membersDAL = require("../DAL/membersFromWS")

const getAllMembersData = async function(obj)
{
    try{
        let resp = await membersDAL.getMembersFromAPi(obj)
        return resp
    }catch(err)
    {
        console.log(err)
    }
}



const updateMemberInDB = async function(obj)
{
    try{
        
        let resp = await membersDAL.updateMemberInDB(obj)
        return resp
    }catch(err)
    {
        console.log(err)
    }
}

const deleteMemberFromDB = async function(obj)
{
    try{
        
        let resp = await membersDAL.deleteMember(obj)
        return resp
    }catch(err)
    {
        console.log(err)
    }
}

const createMember = async function(obj)
{
    try{
        
        let resp = await membersDAL.createMember(obj)
        return resp
    }catch(err)
    {
        console.log(err)
    }
}


module.exports = {getAllMembersData,updateMemberInDB,deleteMemberFromDB,createMember}