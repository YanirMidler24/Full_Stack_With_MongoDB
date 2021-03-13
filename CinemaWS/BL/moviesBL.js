const movieDAL = require("../DAL/movieFromWS")

const getAllMovieData = async function(obj)
{
    try{
        
        let resp = await movieDAL.getMovesFromAPi(obj)
        return resp
    }catch(err)
    {
        console.log(err)
    }
}


const updateMovieInDB = async function(obj)
{
    try{
        
        let resp = await movieDAL.updateMovieInDB(obj)
        return resp
    }catch(err)
    {
        console.log(err)
    }
}
const deleteMovieInDB = async function(obj)
{
    try{
        let resp = await movieDAL.deleteMovieFromDB(obj)
        return resp
    }catch(err)
    {
        console.log(err)
    }
}
const addMovieToDB = async function(obj)
{
    try{
        let resp = await movieDAL.addMovieToDB(obj)
        return resp
    }catch(err)
    {
        console.log(err)
    }
}


module.exports = {getAllMovieData,updateMovieInDB,deleteMovieInDB,addMovieToDB}