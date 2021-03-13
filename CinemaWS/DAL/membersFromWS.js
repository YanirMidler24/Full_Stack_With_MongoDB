const axios = require("axios")

exports.getMembersFromAPi = () =>
{
  axios
  .post("http://localhost:8000/api/members", obj)
  .then((resp) => {
    return resp.data;
  });
};


exports.updateMemberInDB = (obj) => {
   axios
     .post("http://localhost:8000/api/members/updateMember", obj)
     .then((resp) => {
       return resp.data;
     });
 };
 exports.deleteMember = (obj) => {
   axios
     .post("http://localhost:8000/api/members/deleteMember", obj)
     .then((resp) => {
       return resp.data;
     });
 };
 exports.createMember = (obj) => {
   axios
     .post("http://localhost:8000/api/members/createMember", obj)
     .then((resp) => {
       return resp.data;
     });
 };

 


 