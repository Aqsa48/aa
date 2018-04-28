// import React from  "react";
// import axios from "axios";
// import io from "socket.io-client";

// var User;
//  var date1 ,min,sec,hour;

// export default class extends React.Component{

//     constructor(props){
//         super(props);

//         this.state = {
//             messages: [] ,
//             showtime:'',
//             showCurrentTime:'',
//             CurrentChatUser:'',
//             MessagesData:[],  
//             MessageDivs:[],
//             URL_id:'',
//             AllUsers:[],
//             UserDivs:[],
//             DivsPersons:[]
//         };

//         this.Div=this.Div.bind(this);
//         this.getMessagesData=this.getMessagesData.bind(this);
//         this.sendMessage=this.sendMessage.bind(this);
//         // this.addMessage=this.addMessage.bind(this);
//         this.setUserDivs=this.setUserDivs.bind(this);
//         this.createMessageDivs=this.createMessageDivs.bind(this);
//         this.socket = io('localhost:9000');

//         // this.addMessage(data){
//             // this.setState({messages: [...this.state.messages, data]});
//         // };

//         this.socket.on('RECEIVE_MESSAGE', function(data){
//             if(data.receiver===User._id){
//                 addMessage(data);
//             }
//             else{
//                 console.log('User Not found');
//             }
//         })

//         const addMessage=data=>{
//             this.setState({messages: [...this.state.messages, data]});
//         };

//     }



//     componentWillMount(){ 
//         this.state.URL_id=this.props.location.search.substring(4);
//         this.setState({});

//         axios.get('http://localhost:9000/userData')
//         .then((res)=>{    
//             this.setState({USER:res.data});
//             User=this.state.USER.username;
            
//         })

//         // this.getMessagesData();
//         this.setUserDivs();
//     }




//     setUserDivs(){
        
//         axios.get('http://localhost:9000/getAllUsers')
//         .then((res)=>{
//             this.setState({AllUsers:res.data});

//             axios.get('http://localhost:9000/allMsgs')
//             .then((res)=>{
//                 this.setState({MessagesData:res.data});

//                 let USER_DIVS=[];
//                 // eslint-disable-next-line
//                 this.state.MessagesData.map((element1,index)=>{
                    
//                     // eslint-disable-next-line
//                     this.state.AllUsers.map((element2,index)=>{
//                         if(
//                             (element1.receiverId === this.state.USER._id  && element1.senderId === element2._id) ||
//                             (element1.receiverId === element2._id  && element1.senderId === this.state.USER._id)
//                         )
//                         {
//                             if(this.state.DivsPersons.indexOf(element2._id) === -1){
//                                 this.state.DivsPersons.push(element2._id);
//                                 USER_DIVS.push(
//                                     <div key={Math.random()}  id={element2._id} onClick={this.Div} className="col-md-12 aa" style ={{height:'100px',border:'1px solid black' }}>
//                                     {element2.username+"  AND  Me" }
//                                     </div>
//                                 )
//                             }
//                         }
//                         // This will create the divs of all users with whom I have chated before.


//                         if(this.state.DivsPersons.indexOf(this.state.URL_id) === -1){
//                             if(this.state.URL_id === element2._id){ 
//                                 this.state.DivsPersons.push(element2._id);
//                                 USER_DIVS.unshift(
//                                     <div key={Math.random()}  id={element2._id} onClick={this.Div} className="col-md-12 aa" style ={{height:'100px',border:'1px solid black' }}>
//                                     {element2.username+"  AND  Me" }
//                                     </div>
//                                 )
//                                 this.setState({CurrentChatUser:this.state.URL_id});
//                             }
//                         }
//                         else{
//                             this.setState({CurrentChatUser:this.state.URL_id});
//                         }
//                         // This if-else condition will create the user div of URL-id at first position, if the div is not created in above if-condition
//                         // and will assign this user's id as a CurrentChatUser, and then display messages of this user.

//                         // console.log('a');
//                     })
//                 })

//                 this.setState({UserDivs:USER_DIVS});


//                 if(this.state.CurrentChatUser===''){
//                     this.setState({CurrentChatUser:this.state.DivsPersons[0]});     
//                     // document.getElementById(this.state.CurrentChatUser).style.backgroundColor="yellow";
//                     this.props.history.push('/messenger?id='+this.state.CurrentChatUser);                                       
//                 }
//                 else{
//                     document.getElementById(this.state.CurrentChatUser).style.backgroundColor="yellow";
//                 }

//                 this.createMessageDivs();
//             })

//         })

//     }

//     createMessageDivs(){
//         let SendMsg=[];  
//         // eslint-disable-next-line
//         this.state.MessagesData.map((element,index)=>{
//             if(
//                 (element.receiverId === this.state.CurrentChatUser && element.senderId === this.state.USER._id) || 
//                 (element.receiverId === this.state.USER._id && element.senderId === this.state.CurrentChatUser)
//             ){
//             SendMsg.push(<div key={Math.random()}  id='touch' className="col-md-10" style={{border:'1px solid',height:'210px'}}>
//                 <p>{"Messaage: "+element.message}</p>
//                 <p>{"Sender: "+element.senderId}</p> 
//                 <p>{"Receiver: "+element.receiverId}</p> 
//                 <p>{"Time: "+element.time}</p> 
//                 <p> <b>{"User: "+this.state.USER.username} </b></p>  
//                 <p><b>{element.currenttime}</b></p>         
                
//                 </div>)}
        
//         })
//         this.setState({MessageDivs:SendMsg});
//     }



//     getMessagesData(){
//         axios.get('http://localhost:9000/allMsgs')
//         .then((res)=>{
//             this.setState({MessagesData:res.data});
//             this.createMessageDivs();
//         })
//     }

    

//    //  addMessage(data){
//    //      this.setState({messages: [...this.state.messages, data]});
//    //  };


//     sendMessage(e){
//         e.preventDefault();

        
//        var objDiv = document.getElementById("myDiv");
//         objDiv.scrollTop = objDiv.scrollHeight;
        
     
//         // Time Method
//         var date = new Date();
//         date=date.toString();
//         this.state.showtime=date; 

//            date1 = new Date();
//            hour=date1.getHours();
//            min=date1.getMinutes();
//            sec=date1.getSeconds();

//              var v= new Date(new Date().getTime() ).toLocaleTimeString();
//              this.state.showCurrentTime=v;
        
//         console.log('v'+v);
//         this.socket.emit('SEND_MESSAGE', {             
//             message: this.state.message,
//             sender: this.state.USER._id,
//             time : this.state.showtime,
//             receiver:this.state.CurrentChatUser,
//         });

//         axios({
//             method:'post',
//             url:'http://localhost:9000/sendmessage',
//             data:{
//                 'message': this.state.message,
//                 'sender': this.state.USER._id,
//                 'time' : this.state.showtime,
//                 'receiver':this.state.CurrentChatUser,
//                 'currenttime':this.state.showCurrentTime,
//             },
//             headers:{
//                 'Access-Control-Allow-Origin':'http://localhost:9000/chatpage'
//             }
            
//         }).then((response)=>{
//             if(response.data.confirmation==="Yes"){
//                 this.getMessagesData();
//             }
            
//         }).catch((err)=>{
//             console.log(err);
//         })

//     }



//     Div(e){
//         let ele = document.getElementsByClassName('aa');
//         for (var i = 0; i < ele.length; i++ ) {
//             ele[i].style.backgroundColor = "white";
//         }

//         e.target.style.backgroundColor="yellow";
        
//         this.state.CurrentChatUser=e.target.id;

//         this.createMessageDivs();

//         this.props.history.push('/messenger?id='+e.target.id);
//     }



//     render(){
//         return(
//             <div>
//                 <div className="row" style ={{  height:'1000px',border:'1px solid black' }}>
//                     {/* {this.state.USER} */}
                     
                
//                     <div className="col-md-3" style ={{ height:'700px',border:'1px solid black' }}>
//                         {this.state.UserDivs}    
//                     </div> 
                    
//                     <div id='myDiv' className="col-md-8" style={{border:'1px solid', height:'700px',overflow:'auto'}}>
//                          {this.state.MessageDivs} 
                         
//                     {/* <div key={Math.random()} className="col-md-10" style={{border:'1px solid',height:'140px'}}> */}
//                          {/* <p>{User}<p>11:45pm</p></p>  */}
//                         {/* <p>{"Sender: "+element.senderId}</p> 
//                         <p>{"Receiver: "+element.receiverId}</p> 
//                         <p>{"Time: "+element.time}</p>  */}
//                     {/* </div> */}

//                     </div>

//                     <div className="col-md-4 offset-md-4" style={{border:'1px solid', height:'50px'}} >  
//                         <div className="messages" >            
//                             <input className="col-md-8"  name="message" type="text" placeholder="Message" value={this.state.message} onChange={ev=> this.setState({message:ev.target.value})}/>
//                             <button onClick={this.sendMessage} >Send</button>
//                         </div>        
//                     </div>
//                 </div>
                
//             </div>
//         )
//     }

// }

import React from  "react";
import axios from "axios";
import io from "socket.io-client";

import Message from './messageDiv.js';
// import UserDiv from './userDiv.js';

var User;

export default class extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            messages: [] ,
            showtime:'',
            CurrentChatUser:'',
            MessagesData:[],  
            MessageDivs:[],
            URL_id:'',
            AllUsers:[],
            UserDivs:[],
            DivsPersons:[]
        };

        this.Div=this.Div.bind(this);
        this.getMessagesData=this.getMessagesData.bind(this);
        this.sendMessage=this.sendMessage.bind(this);
        // this.addMessage=this.addMessage.bind(this);
        this.setUserDivs=this.setUserDivs.bind(this);
        this.createMessageDivs=this.createMessageDivs.bind(this);
     
     

        
        this.socket = io('localhost:9000');

        // this.addMessage(data){
            // this.setState({messages: [...this.state.messages, data]});
        // };

        this.socket.on('RECEIVE_MESSAGE', function(data){
            if(data.receiver===User._id){
                addMessage(data);
            }
            else{
                console.log('User Not found');
            }
        })

        const addMessage=data=>{
            this.setState({messages: [...this.state.messages, data]});
        };

    }

    componentWillMount(){ 
        this.state.URL_id=this.props.location.search.substring(4);
        this.setState({});

        axios.get('http://localhost:9000/userData')
        .then((res)=>{    
            this.setState({USER:res.data});
            User=this.state.USER;
        }).catch((err)=>{
            console.log(err);
        })

        // this.getMessagesData();
        this.setUserDivs();
    }




    setUserDivs(){
        
        axios.get('http://localhost:9000/getAllUsers')
        .then((res)=>{
            this.setState({AllUsers:res.data});

            axios.get('http://localhost:9000/allMsgs')
            .then((res)=>{
                this.setState({MessagesData:res.data});

                let USER_DIVS=[];
                // eslint-disable-next-line
                // this.state.MessagesData.map((element1,index)=>{
                for(let i=this.state.MessagesData.length-1 ; i>=0 ; i--){
                  
                    // eslint-disable-next-line
                    this.state.AllUsers.map((element2,index)=>{
                        if(
                            (this.state.MessagesData[i].receiverId === this.state.USER._id  && this.state.MessagesData[i].senderId === element2._id) ||
                            (this.state.MessagesData[i].receiverId === element2._id  && this.state.MessagesData[i].senderId === this.state.USER._id)
                        )
                        {
                            if(this.state.DivsPersons.indexOf(element2._id) === -1){
                                this.state.DivsPersons.push(element2._id);

                                let time,hours,AmPm,mints,date,month,dateMonth;
                                let Months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

                                time=new Date(this.state.MessagesData[i].time);
                                if(time.getHours()>=13){
                                    hours=time.getHours()-12;
                                    AmPm='pm';
                                }
                                else if(time.getHours()===12){
                                    hours=time.getHours();
                                    AmPm='pm';
                                } 
                                else if(time.getHours()<12){
                                    hours=time.getHours();
                                    AmPm='am';
                                } 
                                mints=time.getMinutes();
                                date=time.getDate();
                                month=Months[time.getMonth()];

                                if(time.getMonth() === (new Date()).getMonth()){
                                    if(time.getDate() === (new Date()).getDate()){
                                        dateMonth="Today";
                                    }
                                    else if((time.getDate())+1 === (new Date()).getDate()){
                                        dateMonth="Yesterday";
                                    }
                                    else{
                                        dateMonth=date+" "+month;
                                    }
                                }

                                USER_DIVS.push(
                                    <div  id={element2._id} onClick={this.Div} className="col-md-12" style={{border:'1px solid',height:'90px'}}>
                                        <img className="col-md-3" src={"userImages/"+element2.displayPhoto} alt="" style={{border:'0px solid',height:'70px',padding:'0',borderRadius:'50px',marginTop:'7px'}} />
                                        <p className="col-md-9" style={{marginTop:'17px',fontSize:'16px'}}><b>{element2.fullname}</b><i style={{fontSize:'11px'}}>{" "+hours+":"+mints+" "+AmPm+" - "+dateMonth}</i></p>
                                        <p className="col-md-9" style={{marginTop:'-10px',fontSize:'13px'}}>{this.state.MessagesData[i].message}</p>
                                    </div>  
                                )
                            }
                        }
                        // This will create the divs of all users with whom I have chated before.


                        if(this.state.DivsPersons.indexOf(this.state.URL_id) === -1){
                            if(this.state.URL_id === element2._id){ 
                                this.state.DivsPersons.push(element2._id);
                                USER_DIVS.unshift(
                                    <div  id={element2._id} onClick={this.Div} className="col-md-12" style={{border:'1px solid',height:'90px'}}>
                                        <img className="col-md-3" src={"userImages/"+element2.displayPhoto} alt="" style={{border:'0px solid',height:'70px',padding:'0',borderRadius:'50px',marginTop:'7px'}} />
                                        <p className="col-md-9" style={{marginTop:'17px',fontSize:'17px'}}><b>{element2.fullname}</b><i style={{fontSize:'11px'}}>{"11:45 pm"}</i></p>
                                        <p className="col-md-9" style={{marginTop:'-10px',fontSize:'13px'}}>Hello Anybody?</p>
                                    </div> 
                                )
                                this.setState({CurrentChatUser:this.state.URL_id});
                            }
                        }
                        else{
                            this.setState({CurrentChatUser:this.state.URL_id});
                        }
                        // This if-else condition will create the user div of URL-id at first position, if the div is not created in above if-condition
                        // and will assign this user's id as a CurrentChatUser, and then display messages of this user.

                        // console.log('a');
                    })
                // })
                }

                this.setState({UserDivs:USER_DIVS});


                if(this.state.CurrentChatUser===''){
                    this.setState({CurrentChatUser:this.state.DivsPersons[0]});     
                    document.getElementById(this.state.CurrentChatUser).style.backgroundColor="yellow";
                    this.props.history.push('/messenger?id='+this.state.CurrentChatUser);                                       
                }
                else{
                    document.getElementById(this.state.CurrentChatUser).style.backgroundColor="yellow";
                }

                this.createMessageDivs();
            })

        })
        

    }



    createMessageDivs(){
        let MSG=[];  
        // eslint-disable-next-line 
        this.state.MessagesData.map((element,index)=>{
            let dp,name,time,hours,AmPm,mints,date,month,dateMonth;
            let Months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
            
            if(element.receiverId === this.state.CurrentChatUser && element.senderId === this.state.USER._id){
                dp=this.state.USER.displayPhoto;
                name=this.state.USER.fullname;
                time=new Date(element.time);
                if(time.getHours()>=13){
                    hours=time.getHours()-12;
                    AmPm='pm';
                }
                else if(time.getHours()===12){
                    hours=time.getHours();
                    AmPm='pm';
                } 
                else if(time.getHours()<12){
                    hours=time.getHours();
                    AmPm='am';
                } 
                mints=time.getMinutes();
                date=time.getDate();
                month=Months[time.getMonth()];

                if(time.getMonth() === (new Date()).getMonth()){
                    if(time.getDate() === (new Date()).getDate()){
                        dateMonth="Today";
                    }
                    else if((time.getDate())+1 === (new Date()).getDate()){
                        dateMonth="Yesterday";
                    }
                    else{
                        dateMonth=date+" "+month;
                    }
                }

                MSG.push(
                    <Message
                        key={Math.random()}
                        id={element._id}
                        dp={dp}
                        name={name}
                        msg={element.message}
                        time={hours+":"+mints+" "+AmPm+" - "+dateMonth}
                    />
                )
            }

            else if(element.receiverId === this.state.USER._id && element.senderId === this.state.CurrentChatUser){
                // eslint-disable-next-line
                this.state.AllUsers.map((element2,index)=>{
                    if(element.senderId === element2._id){
                        dp=element2.displayPhoto;
                        name=element2.fullname;
                    }
                })
                time=new Date(element.time);
                if(time.getHours()>=13){
                    hours=time.getHours()-12;
                    AmPm='pm';
                }
                else if(time.getHours()===12){
                    hours=time.getHours();
                    AmPm='pm';
                } 
                else if(time.getHours()<12){
                    hours=time.getHours();
                    AmPm='am';
                } 
                mints=time.getMinutes();
                date=time.getDate();
                month=Months[time.getMonth()];

                if(time.getMonth() === (new Date()).getMonth()){
                    if(time.getDate() === (new Date()).getDate()){
                        dateMonth="Today";
                    }
                    else if((time.getDate())+1 === (new Date()).getDate()){
                        dateMonth="Yesterday";
                    }
                    else{
                        dateMonth=date+" "+month;
                    }
                }

                MSG.push(
                    <Message
                        key={Math.random()}
                        id={element._id}
                        dp={dp}
                        name={name}
                        msg={element.message}                
                        time={hours+":"+mints+" "+AmPm+" - "+dateMonth}
                    />
                )
            }
        })
        this.setState({MessageDivs:MSG});
    }



    getMessagesData(){
        axios.get('http://localhost:9000/allMsgs')
        .then((res)=>{
            this.setState({MessagesData:res.data});
            this.createMessageDivs();
        })
    }

    

   //  addMessage(data){
   //      this.setState({messages: [...this.state.messages, data]});
   //  };


    sendMessage(e){
        e.preventDefault();

     
        var objDiv = document.getElementById("myDiv");
            objDiv.scrollTop = objDiv.scrollHeight;

        
     
        // Time Method
        var date = new Date();
        date=date.toString();
        this.state.showtime=date; 
        
        this.socket.emit('SEND_MESSAGE', {             
            message: this.state.message,
            sender: this.state.USER._id,
            time : this.state.showtime,
            receiver:this.state.CurrentChatUser,
        });

        axios({
            method:'post',
            url:'http://localhost:9000/sendmessage',
            data:{
                'message': this.state.message,
                'sender': this.state.USER._id,
                'time' : this.state.showtime,
                'receiver':this.state.CurrentChatUser
            },
            headers:{
                'Access-Control-Allow-Origin':'http://localhost:9000/chatpage'
            }
            
        }).then((response)=>{
            if(response.data.confirmation==="Yes"){
                this.getMessagesData();
            }
            
        }).catch((err)=>{
            console.log(err);
        })

    }



    Div(e){
        let ele = document.getElementsByClassName('aa');
        for (var i = 0; i < ele.length; i++ ) {
            ele[i].style.backgroundColor = "white";
        }

        e.target.style.backgroundColor="yellow";
        
        this.state.CurrentChatUser=e.target.id;

        this.createMessageDivs();

        this.props.history.push('/messenger?id='+e.target.id);
    }




    render(){
        return(
            <div>
                <div className="row" style ={{  height:'1000px',border:'1px solid black' }}>
                
                    <div className="col-md-3" style ={{ height:'700px',border:'1px solid black' }}>
                        {this.state.UserDivs}
                    </div> 
                    
                    <div id='myDiv' className="col-md-8" style={{border:'1px solid', height:'700px',overflow:'auto'}}>
                        {this.state.MessageDivs}
                    </div>

                    <div className="col-md-4 offset-md-4" style={{border:'1px solid', height:'50px'}} >  
                        <div className="messages" >            
                            <input className="col-md-8"  name="message" type="text" placeholder="Message" value={this.state.message} onChange={ev=> this.setState({message:ev.target.value})}/>
                            <button onClick={this.sendMessage} >Send</button>
                        </div>        
                    </div>
                </div>
                
            </div>
        )
    }

}