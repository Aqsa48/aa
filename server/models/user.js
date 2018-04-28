const mongoose =require('mongoose')
    mongoose.Promise = require('bluebird')
    bcrypt=require('bcrypt-nodejs');
    
const schema=mongoose.Schema;
    



// new Schema for customer local,facebook and google strategies
const userModel = new schema({
    fullname:String,
    username:{type:String,unique:true,lowercase:true},
    email:String,
    password:String,
    displayPhoto:String,
    coverPhoto:String,
    bio:String,
    accountType:String,
    title:String,
    experiences:Array,
    educations:Array,
    achievements:Array,
    skills:Array,
    interests:Array,
    services:Array,
    followers:Array,
    following:Array
})



// this method will encrypt the password of user with bcrypt library before saving in database
userModel.pre('save',function(next){
    const user=this;

    bcrypt.genSalt(10,function(err,salt){
        // this adds salting of 10 extra characters in password
        if(err){
            return next(err);
        }
        bcrypt.hash(user.password,salt,null,function(err,hash){
            if(err){
                return next(err);
            }
            user.password=hash;
            next();
        })
    })
})




// user-defined method for comparing the encrypted password
userModel.methods.comparePassword=function(password){
    // we use this .methods. syntax bcz it is user defined method of customerModel
    return bcrypt.compareSync(password,this.password);
    //this returns true or false
}


module.exports=mongoose.model('userModel',userModel); //It exports the model