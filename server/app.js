const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const multer = require('multer');




const app = express();

const passportConf = require('./config/passport');
const secret = require('./config/secret');

const User = require('./models/user'); 
const Message = require('./models/message'); 

const Port = process.env.PORT || secret.port;


const uploadedAvatar = multer({dest: '../public/userImages/'});


// DATABASE CONNECTION
mongoose.connect(secret.database,function(err){
    if(err){console.log(err);}
    else{console.log('DATABASE CONNECTED')}
})


//Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000'
}))
app.use(cookieParser())
app.use(session({
    secret: process.env.SESSION_SECRET || 'ddf',
    resave: true,
    saveUninitialized: false
    // store: new MongoStore({url:secret.database})
}))
app.use(passport.initialize())
app.use(passport.session())
 
var userData;


app.post('/login', passport.authenticate('user',{failureRedirect:'/login'}),(req,res)=>{
    console.log('Login Encountered')
    // console.log(req.user);
    userData=req.user;
    res.json({"path":"/profile"})
});


app.post('/signup',uploadedAvatar.single('selectedFile'),(req,res,next)=>{
    
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    user.fullname = req.body.fullname;
    user.accountType = req.body.accountType;
    user.displayPhoto = req.file.filename;
    user.coverPhoto = "";
    user.title = "";    
    user.bio = "";
    user.experiences = [];           
    user.educations = [];            
    user.achievements = [];            
    user.skills = [];            
    user.interests = [];            
    user.services = [];            
    user.followers = [];            
    user.following = [];            
   
    user.save((err,user) => {
        if(err){console.error("Error: ", err)}
        else{
            res.json({"path":"/login"});
        }
        
    })
})



app.post('/editProfile',uploadedAvatar.fields([{name:'coverPhoto'},{name:'displayPhoto'}]),(req,res,next)=>{
    
    userModel.findOneAndUpdate({_id: req.body.userId}, 
        {$set:{
            fullname:req.body.fullname,
            title:req.body.title,
            bio:req.body.bio,
            displayPhoto:req.files.displayPhoto ? req.files.displayPhoto[0].filename : req.body.oldDisplayPhoto,
            coverPhoto:req.files.coverPhoto ? req.files.coverPhoto[0].filename : req.body.oldCoverPhoto,
            educations: JSON.parse(req.body.educations),
            experiences: JSON.parse(req.body.experiences),
            achievements: JSON.parse(req.body.achievements),
            skills:JSON.parse(req.body.skills),
            interests:JSON.parse(req.body.interests),
            services:JSON.parse(req.body.services),
        }},(err,user)=>{
            if(err){
                console.error("Error: ",err);
            }
            else{
                userModel.findOne({_id:req.body.userId},function(err,user){
                    if(user){
                        userData=user; //Updated data from database
                        res.json("Updated Successfully");
                    }
                })
            }
        }
    )
    
})




app.post('/follow',(req,res,next)=>{
    console.log(req.body.followedBy);
    console.log(req.body.followingTo);

    //Insert followed user in current user's 'following array' 
		userModel.findOne({_id:req.body.followedBy},function(err,user){
			if(err){
				console.log('Error');
			}
			if(user){
				let FOLLOWING=user.following;
				// If the followed user is already present in 'following array' then remove the user otherwise add it.
				if(FOLLOWING.indexOf(req.body.followingTo) === -1){
					FOLLOWING.push(req.body.followingTo);
				}
				else if(FOLLOWING.indexOf(req.body.followingTo) != -1){
					FOLLOWING.splice(FOLLOWING.indexOf(req.body.followingTo) , 1);
				}

				userModel.findOneAndUpdate({_id:req.body.followedBy}, 
					{$set:{following:FOLLOWING}},(err,user)=>{
					if(err){
						console.error("Error: ",err);
					}
				})
			}
		})

		//Insert current user in followed user's 'followers array' 
		userModel.findOne({_id:req.body.followingTo},function(err,user){
			if(err){
				console.log('Error');
			}
			if(user){
				let FOLLOWERS=user.followers;
				// If the user who is following the followed user is already present in 'followers array' then remove the user otherwise add it.				
				if(FOLLOWERS.indexOf(req.body.followedBy) === -1){
					FOLLOWERS.push(req.body.followedBy);
				}
				else if(FOLLOWERS.indexOf(req.body.followedBy) != -1){
					FOLLOWERS.splice(FOLLOWERS.indexOf(req.body.followedBy) , 1);
				}

				userModel.findOneAndUpdate({_id:req.body.followingTo}, 
					{$set:{followers:FOLLOWERS}},(err,user)=>{
					if(err){
						console.error("Error: ",err);
                    }
                    else{
                        // Updates the data of logged in user
                        userModel.findOne({_id:req.body.followedBy},function(err,updated){
                            if(err){
                                console.log('Error');
                            }
                            if(user){
                                console.log(updated);
                                userData=updated;
                            }
                        })
                    }
				})
			}
		})


        res.json("Operation Successfull");
    
})




app.get('/userData',(req,res)=>{
    res.send(userData);
})

app.get('/getAllUsers',(req,res)=>{
    userModel.find({},function(err,user){
        res.send(user);
   })
})




app.post('/sendmessage',(req,res,next)=>{

    let message = new Message();
    message.message = req.body.message;
    message.time = req.body.time;
    message.senderId = req.body.sender;
    message.receiverId = req.body.receiver;
    message.currenttime=req.body.currenttime
    

    message.save((err,message) => {
        if(err){console.error("Error: ", err)}
        else{
            res.json({"confirmation":"Yes"});
        }  
    })

})


app.get('/allMsgs',(req,res) => {
    Message.find({},(err,user) =>{
    if(err){console.error("Error: ",err)}
    else{res.json(user)}
    })
})



// app.get('/logout', (req,res) => {
//     req.logout();
//     res.redirect('/');
//   })


// app.get('/aa',(req,res)=>{
//     res.json("hello")
// })



server=app.listen(9000, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Server connected to http://localhost:9000`);
    }
});


var socket = require('socket.io');
io = socket(server);


io.on('connection', (socket) => {    
   
socket.on('SEND_MESSAGE', function(data){
        io.emit('RECEIVE_MESSAGE', data);

    })
})

