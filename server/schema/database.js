import mongoose from "mongoose";

const userList= new mongoose.Schema({
     id:Number,
    name: String,
    username: String,
    age:Number,
    nationality: String,

})


const UserList= mongoose.model('User',userList);



export default UserList;

