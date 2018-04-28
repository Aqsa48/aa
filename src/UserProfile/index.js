import React from  "react";
import axios from "axios";


export default class extends React.Component{

    constructor(props){
        super(props);
        this.state={
            LoggedUser:'',
            URL_id:'',
            AllUsers:'',
            UserProfileData:'',
            PortCatItems:[],
            EducationDivs:[],
            ExperienceDivs:[],
            SkillDivs:[],
            InterestDivs:[],
            AchievementDivs:[],
            ServiceDivs:[],
        }
        this.setPortfolioData=this.setPortfolioData.bind(this);
        this.setEducations=this.setEducations.bind(this);
        this.setExperiences=this.setExperiences.bind(this);
        this.setAchievements=this.setAchievements.bind(this);
        this.setSkills=this.setSkills.bind(this);
        this.setInterests=this.setInterests.bind(this);
        this.setServices=this.setServices.bind(this);
        this.follow=this.follow.bind(this);
    }



    componentDidMount(){
        this.setState({URL_id:this.props.location.search.substring(4)});

        axios.get('http://localhost:9000/userData')
        .then((res)=>{        
            this.setState({LoggedUser:res.data});
            
            // This will change the text of Follow button to 'Unfollow' if the logged-in account is already following this User.
            if(this.state.LoggedUser.following.indexOf(this.state.URL_id) !== -1){
                document.getElementById('UPfollowBtn').innerHTML="Unfollow";
            }
            
        }).catch((err)=>{
            console.log(err);
        })

        axios.get('http://localhost:9000/getAllUsers')
        .then((res)=>{        
            this.setState({AllUsers:res.data});

            // eslint-disable-next-line
            this.state.AllUsers.map((value,index)=>{
                if(value._id===this.state.URL_id){
                    this.setState({UserProfileData:value});
                    this.setPortfolioData();
                }
            });
        }).catch((err)=>{
            console.log(err);
        })

    }



    setPortfolioData(){
        // eslint-disable-next-line
        this.state.UserProfileData.educations.map((element,index)=>{
            this.state.EducationDivs.push(
                <div  className="col-md-12" style={{border:'1px solid',height:'80px'}}>
                    <p className="col-md-12">School: {element.school}</p>
                    <p className="col-md-12" style={{marginTop:'-10px'}}>Degree: {element.degree}</p>
                    <p className="col-md-12" style={{marginTop:'-10px'}}>{element.from} - {element.to}</p>
                </div>
            );
        });

        // eslint-disable-next-line
        this.state.UserProfileData.experiences.map((element,index)=>{
            this.state.ExperienceDivs.push(
                <div  className="col-md-12" style={{border:'1px solid',height:'100px'}}>
                    <p className="col-md-12">Title: {element.title}</p>
                    <p className="col-md-12" style={{marginTop:'-10px'}}>Organization: {element.organization}</p>
                    <p className="col-md-12" style={{marginTop:'-10px'}}>{element.from} - {element.to}</p>
                    <p className="col-md-12" style={{marginTop:'-10px'}}>Description: {element.description}</p>
                </div>
            );
        });

        // eslint-disable-next-line
        this.state.UserProfileData.achievements.map((element,index)=>{
            this.state.AchievementDivs.push(
                <div  className="col-md-12" style={{border:'1px solid',height:'90px'}}>
                    <p className="col-md-12">Title: {element.title}</p>
                    <p className="col-md-12" style={{marginTop:'-10px'}}>Description: {element.description}</p>
                    <p className="col-md-12" style={{marginTop:'-10px'}}>URL: {element.url}</p>
                </div>
            );
        });

        // eslint-disable-next-line
        this.state.UserProfileData.skills.map((element,index)=>{
            this.state.SkillDivs.push(
                <div  className="col-md-12" style={{border:'1px solid',height:'40px'}}>
                    <p className="col-md-12">{element}</p>
                </div>
            );
        });
        
        // eslint-disable-next-line
        this.state.UserProfileData.interests.map((element,index)=>{
            this.state.InterestDivs.push(
                <div  className="col-md-12" style={{border:'1px solid',height:'40px'}}>
                    <p className="col-md-12">{element}</p>
                </div>
            );
        });

        // eslint-disable-next-line
        this.state.UserProfileData.services.map((element,index)=>{
            this.state.ServiceDivs.push(
                <div  className="col-md-12" style={{border:'1px solid',height:'80px'}}>
                    <p className="col-md-12">Title: {element.title}</p>
                    <p className="col-md-12" style={{marginTop:'-10px'}}>Description: {element.description}</p>
                </div>
            );
        });

        this.setState({PortCatItems:this.state.EducationDivs});
    }



    setEducations(){
        this.setState({PortCatItems:this.state.EducationDivs});  
        document.getElementById('UPpCatHeading').innerHTML="Education";      
    }

    setExperiences(){
        this.setState({PortCatItems:this.state.ExperienceDivs});  
        document.getElementById('UPpCatHeading').innerHTML="Experience";      
    }

    setAchievements(){
        this.setState({PortCatItems:this.state.AchievementDivs});  
        document.getElementById('UPpCatHeading').innerHTML="Achievements";      
    }

    setSkills(){
        this.setState({PortCatItems:this.state.SkillDivs});  
        document.getElementById('UPpCatHeading').innerHTML="Skills";      
    }

    setInterests(){
        this.setState({PortCatItems:this.state.InterestDivs});  
        document.getElementById('UPpCatHeading').innerHTML="Interests";      
    }

    setServices(){
        this.setState({PortCatItems:this.state.ServiceDivs});  
        document.getElementById('UPpCatHeading').innerHTML="Services";      
    }



    follow(e){
        e.target.innerHTML=e.target.innerHTML==="Follow" ? "Unfollow" : "Follow";
        
        axios({
            method:'post',
            url:'http://localhost:9000/follow',
            data:{
                followedBy:this.state.LoggedUser._id,
                followingTo:this.state.URL_id
            },
            headers:{
                'Access-Control-Allow-Origin':'http://localhost:9000/'
            }
        }).then((response)=>{
            // if(response.data==="Updated Successfully"){
                alert(response.data);
            // }
            // else{
            //     alert('Data Updation Failed');                
            // }
            
        }).catch((err)=>{
            console.log(err);
        })
    }


    render(){
        return(            
            <div className="UPwrapper col-md-12" >

                <header id="UPheader" className="row">
                    {/* <input id="PsearchField" type="text" /> 
                    <button onClick={this.search}>Search</button> */}
                </header>

                <section id="UPsection1" className="row">
                    <img id="UPcoverPhoto" alt="" className="row" width="100%" height="100%"  
                    src={this.state.UserProfileData.coverPhoto!=='' ? "userImages/"+this.state.UserProfileData.coverPhoto : "img/bg11.jpg"} 
                    />
                    <div id="UPdpDiv" className="col-md-2 col-md-offset-5">
                        <div id="UPdpDiv1" className="col-md-8 col-md-offset-2">                
                            <img id="UPdisplayPhoto" className="col-md-12" alt="" src={"userImages/"+this.state.UserProfileData.displayPhoto} />
                        </div>
                    </div>
                    <h3 id="UPname" className="col-md-12">{this.state.UserProfileData.fullname}</h3>
                    <p id="UPtitle" className="col-md-12">{this.state.UserProfileData.title}</p>
                    <div id="UPfollowersDiv" className="col-md-1">
                        <p>Followers</p>
                        <p>0</p>
                    </div>
                    <div id="UPfollowingDiv" className="col-md-1">
                        <p>Following</p>            
                        <p>0</p>
                    </div>
                    <div id="UPcommentsDiv" className="col-md-1">
                        <p>Comments</p>            
                        <p>0</p>
                    </div>
                </section>


                <section id="UPsection2" className="row">
                    <button id="UPfollowBtn" className="col-md-1 col-md-offset-5" onClick={this.follow}>Follow</button>                    
                    <a href={"/messenger?id="+this.state.UserProfileData._id}><button id="UPmsgBtn" className="col-md-1">Message</button></a>                    
                </section>


                <section id="UPsection3" className="row">
                    <div id="UPaboutMeDiv" className="col-md-6 col-md-offset-3">
                        <h1>About Me</h1>
                        <p>{this.state.UserProfileData.bio}</p>
                    </div>                    
                </section>

                <section id="UPsection4" className="row">
                    <div id="UPportfolioDiv" className="col-md-6 col-md-offset-3">
                        <h1>My Portfolio</h1>
                    
                        <div id="UPportBtnsDiv" className="col-md-10 col-md-offset-1">
                            <div className="nav-align-center">
                                <ul className="nav nav-pills nav-pills-primary" role="tablist">
                                    <li className="nav-item" onClick={this.setEducations}>
                                        <a className="nav-link active" data-toggle="tab" role="tablist">
                                            <i className="now-ui-icons location_world"></i>
                                        </a>
                                    </li>
                                    <li className="nav-item" onClick={this.setExperiences}>
                                        <a id="a" className="nav-link" data-toggle="tab" role="tablist">
                                            <i className="now-ui-icons design_image"></i>
                                        </a>
                                    </li>
                                    <li className="nav-item" onClick={this.setAchievements}>
                                        <a className="nav-link" data-toggle="tab" role="tablist">
                                            <i className="now-ui-icons sport_user-run"></i>
                                        </a>
                                    </li>
                                    <li className="nav-item" onClick={this.setSkills}>
                                        <a className="nav-link" data-toggle="tab" role="tablist">
                                            <i className="now-ui-icons sport_user-run"></i>
                                        </a>
                                    </li>
                                    <li className="nav-item" onClick={this.setInterests}>
                                        <a className="nav-link" data-toggle="tab" role="tablist">
                                            <i className="now-ui-icons sport_user-run"></i>
                                        </a>
                                    </li>
                                    <li className="nav-item" onClick={this.setServices}>
                                        <a className="nav-link" data-toggle="tab" role="tablist">
                                            <i className="now-ui-icons sport_user-run"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div id="UPportCatsDiv" className="col-md-12">
                            <h3 id="UPpCatHeading" className="col-md-12">Education</h3>
                            <div id="UPcatMainDiv" className="col-md-12">{this.state.PortCatItems}</div>
                        </div>
                        
                    </div>                    
                </section>


                <section id="UPsection5" className="row">
                    <h3>Comments</h3>
                </section>
               

            </div>
        )
    }
}