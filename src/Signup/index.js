import React from  "react";
import axios from "axios";
// import logo from "../Images/logo.png"

export default class extends React.Component{

    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            email:'',
            fullname:'',
            selectedFile:''
        }
        this.handleSignup = this.handleSignup.bind(this);
    }



    async handleSignup(){

        let formData = new FormData();
        formData.set('username', this.state.username);
        formData.set('password', this.state.password);
        formData.set('email', this.state.email);
        formData.set('fullname', this.state.fullname);
        formData.set('selectedFile', this.state.selectedFile);

        let radios = document.getElementsByName('accountType');

        for (let i = 0; i < radios.length; i++){
            if(radios[i].checked){
                formData.set('accountType', radios[i].value);
            }
        }

        axios({
            method:'post',
            url:'http://localhost:9000/signup',
            data:formData,
            headers:{
                'Access-Control-Allow-Origin':'http://localhost:9000/'
            }
        }).then((response)=>{
            // if(response === ''){
            //     alert("user is already exits")
            // }
            // else{
                this.props.history.push(response.data.path);
                // console.log(this.props.history.push('/login'));
            // }
            // console.log(response);
            
        }).catch((err)=>{
            console.log(err);
        })


        
    }
    
    render(){
        return(
            <div>
                <input 
                    type='text' 
                    name='username' 
                    placeholder='username' 
                    onChange={(e) => this.setState({ username: e.target.value})}     
                />
                <input 
                    type='text' 
                    name='email' 
                    placeholder='email'
                    onChange={(e) => this.setState({ email: e.target.value})}     
                />
                <input 
                    type='text' 
                    name='password' 
                    placeholder='password'
                    onChange={(e) => this.setState({ password: e.target.value})} 
                />
                
                <input 
                    type='text' 
                    name='fullname' 
                    placeholder='fullname'
                    onChange={(e) => this.setState({ fullname: e.target.value})} 
                />
                <br/>
                Student:<input type="radio" name="accountType" value="student" checked/>Professional:<input type="radio" value="professional" name="accountType" />
                <br/>
                <input type="file" id="file" name="avatar" onChange={(e) => this.setState({ selectedFile: e.target.files[0]})} />
                
                
                <button onClick={this.handleSignup}>Signup</button>

                <div>
                    <a href='/login' >Login</a>
                </div>
            </div>
        )
    }
}