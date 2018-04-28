const mongoose =require('mongoose')
mongoose.Promise = require('bluebird')
bcrypt=require('bcrypt-nodejs');    
const schema=mongoose.Schema;

const Message = new schema({
       message :String,
       time: String,
       senderId:String,
       receiverId:String,
       currenttime:String
})

module.exports=mongoose.model('Message',Message); 