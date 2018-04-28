const passport=require('passport')
    localStrategy=require('passport-local').Strategy
    // facebookStrategy=require('passport-facebook').Strategy
    // googleStrategy=require('passport-google-oauth').OAuth2Strategy
    bcrypt=require('bcrypt-nodejs')
    userModel=require('../models/user')
    secret = require('../config/secret');


    
// Passport local Strategy for user
//This strategy will search the user with username in databse, compare its password and return user data
passport.use('user',new localStrategy(function(username,password,done){
    userModel.findOne({username:username},function(err,user){
        if(err){
           return done(err);
        }
        if(!user){
            return done(null,false);
        }
        if(!user.comparePassword(password)){
            return done(null,false);
        }

        return done(null,user);
   }) 
}))




// Passport local Strategy for admin
//This strategy will search the admin with username in databse, compare its password and return admin's data
// passport.use('admin',new localStrategy(function(username,password,done){
//     adminModel.findOne({'local.username':username},function(err,admin) {
//         if(err) {
//             return done(err)
//         }
//         if(!admin){
//             return done(null,false);
//         }
//         if(!admin.comparePassword(password)){
//             return done(null,false);
//         }
//         return done(null,admin);
//     })
// }))




// Passport facebook strategy for user
//This will search the user in database with Facebook Id
// if Id found this will return the user, else creat the new user in database with Facebook Information
// passport.use(new facebookStrategy({
//     clientID: secret.Fb_Client_Id,
//     clientSecret: secret.Fb_Client_Secret,
//     callbackURL: 'http://localhost:5000/auth/facebook/callback',
//     // profileFields: ['id', 'displayName', 'email']
//     profileFields: ['id', 'displayName']
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     process.nextTick(function(){
//         customerModel.findOne({'facebook.id':profile.id},function(err,user){
            
//             if(err){
//                 return cb(err);
//             }
//             if(user){
//                 return cb(null,user);
//                 console.log(user);
//             }
//             else{
//                 var newUser=new customerModel();
//                 newUser.facebook.id=profile.id;
//                 newUser.facebook.token=accessToken;
//                 newUser.facebook.name=profile.name.givenName+' '+profile.name.familyName;
//                 // newUser.facebook.email=profile.emails[0].value;
//                 newUser.accountType='Customer';

//                 newUser.save(function(err){
//                     if(err){
//                         throw err;
//                     }
                    
//                     return cb(null,newUser);
//                 });
//             }
           
//         })
//     });
//   }
// ));





// // Passport google strategy for user
// //This will search the user in database with google Id
// // if Id found this will return the user, else creat the new user in database with Facebook Information
// passport.use(new googleStrategy({
//     clientID: secret.Google_Client_Id,
//     clientSecret: secret.Google_Client_Secret,
//     callbackURL: 'http://localhost:5000/auth/google/callback',
//     profileFields: ['id', 'displayName', 'email']
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     process.nextTick(function(){
//         customerModel.findOne({'google.id':profile.id},function(err,user){
            
//             if(err){
//                 return cb(err);
//             }
//             if(user){
//                 return cb(null,user);
//             }
//             else{
//                 var newUser=new customerModel();
//                 newUser.google.id=profile.id;
//                 newUser.google.token=accessToken;
//                 newUser.google.name=profile.displayName;
//                 newUser.google.email=profile.emails[0].value;
//                 newUser.accountType='Customer';

//                 newUser.save(function(err){
//                     if(err){
//                         throw err;
//                         // newUser.save();
//                     }
                    
//                     return cb(null,newUser);
//                 });
//             }
           
//         })
//     });
//   }
// ));



// Passport Serialization
passport.serializeUser(function(user,done){
    done(null,user._id);
})


// Passport Deserialization
//This will search the user in customerModel and adminModel
passport.deserializeUser(function(id,done){
    userModel.findById(id,function(err,user){
        if(err){
            return done(err);
        }
        if(user){
            done(null,user);
        }
    })
    
})

