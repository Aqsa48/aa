import React from  "react";
import axios from "axios";

// import "./profile.css";


export default class extends React.Component{

    constructor(props){
        super(props);
        this.state={
            USER:'',
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
        this.search=this.search.bind(this);

    }

    componentDidMount(){
        axios.get('http://localhost:9000/userData')
        .then((res)=>{        
            this.setState({USER:res.data});
            this.setPortfolioData();
        }).catch((err)=>{
            console.log(err);
        })
    }


    setPortfolioData(){
        // eslint-disable-next-line
        this.state.USER.educations.map((element,index)=>{
            this.state.EducationDivs.push(
                <div  className="col-md-12" style={{border:'1px solid',height:'80px'}}>
                    <p className="col-md-12">School: {element.school}</p>
                    <p className="col-md-12" style={{marginTop:'-10px'}}>Degree: {element.degree}</p>
                    <p className="col-md-12" style={{marginTop:'-10px'}}>{element.from} - {element.to}</p>
                </div>
            );
        });

        // eslint-disable-next-line
        this.state.USER.experiences.map((element,index)=>{
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
        this.state.USER.achievements.map((element,index)=>{
            this.state.AchievementDivs.push(
                <div  className="col-md-12" style={{border:'1px solid',height:'90px'}}>
                    <p className="col-md-12">Title: {element.title}</p>
                    <p className="col-md-12" style={{marginTop:'-10px'}}>Description: {element.description}</p>
                    <p className="col-md-12" style={{marginTop:'-10px'}}>URL: {element.url}</p>
                </div>
            );
        });

        // eslint-disable-next-line
        this.state.USER.skills.map((element,index)=>{
            this.state.SkillDivs.push(
                <div  className="col-md-12" style={{border:'1px solid',height:'40px'}}>
                    <p className="col-md-12">{element}</p>
                </div>
            );
        });
        
        // eslint-disable-next-line
        this.state.USER.interests.map((element,index)=>{
            this.state.InterestDivs.push(
                <div  className="col-md-12" style={{border:'1px solid',height:'40px'}}>
                    <p className="col-md-12">{element}</p>
                </div>
            );
        });

        // eslint-disable-next-line
        this.state.USER.services.map((element,index)=>{
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
        document.getElementById('PpCatHeading').innerHTML="Education";      
    }

    setExperiences(){
        this.setState({PortCatItems:this.state.ExperienceDivs});  
        document.getElementById('PpCatHeading').innerHTML="Experience";      
    }

    setAchievements(){
        this.setState({PortCatItems:this.state.AchievementDivs});  
        document.getElementById('PpCatHeading').innerHTML="Achievements";      
    }

    setSkills(){
        this.setState({PortCatItems:this.state.SkillDivs});  
        document.getElementById('PpCatHeading').innerHTML="Skills";      
    }

    setInterests(){
        this.setState({PortCatItems:this.state.InterestDivs});  
        document.getElementById('PpCatHeading').innerHTML="Interests";      
    }

    setServices(){
        this.setState({PortCatItems:this.state.ServiceDivs});  
        document.getElementById('PpCatHeading').innerHTML="Services";      
    }



    search(){
        if(document.getElementById('PsearchField').value!==''){
            this.props.history.push("/search_results?search="+document.getElementById('PsearchField').value);
        }
    }


    render(){
        return(            
            <div className="Pwrapper col-md-12" >

                <header id="Pheader" className="row">
                    <input id="PsearchField" type="text" /> 
                    <button onClick={this.search}>Search</button>
                </header>

                <section id="Psection1" className="row">
                    <img id="PcoverPhoto" alt="" className="row" width="100%" height="100%"  src={"userImages/"+this.state.USER.coverPhoto} />
                    <div id="PdpDiv" className="col-md-2 col-md-offset-5">
                        <div id="PdpDiv1" className="col-md-8 col-md-offset-2">                
                            <img id="PdisplayPhoto" className="col-md-12" alt="" src={"userImages/"+this.state.USER.displayPhoto} />
                        </div>
                    </div>
                    <h3 id="Pname" className="col-md-12">{this.state.USER.fullname}</h3>
                    
                    <p id="Ptitle" className="col-md-12">{this.state.USER.title}</p>

                    <div id="PfollowersDiv" className="col-md-1">
                        <p>Followers</p>
                        <p>0</p>
                    </div>
                    <div id="PfollowingDiv" className="col-md-1">
                        <p>Following</p>            
                        <p>0</p>
                    </div>
                    <div id="PcommentsDiv" className="col-md-1">
                        <p>Comments</p>            
                        <p>0</p>
                    </div>
                </section>

                <section id="Psection2" className="row">
                    <div id="PaboutMeDiv" className="col-md-6 col-md-offset-3">
                        <h1>About Me</h1>
                        <p>" An artist of considerable range, Ryan — the name taken by Melbourne-raised, 
                            Brooklyn-based Nick Murphy — writes, performs and records all of his own music, 
                            giving it a warm, intimate feel with a solid groove structure. An artist of considerable range. "
                        </p>
                    </div>                    
                </section>

                <section id="Psection3" className="row">
                    <div id="PportfolioDiv" className="col-md-6 col-md-offset-3">
                        <h1>My Portfolio</h1>
                    
                        <div id="PportBtnsDiv" className="col-md-10 col-md-offset-1">
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

                        <div id="PportCatsDiv" className="col-md-12">
                            <h3 id="PpCatHeading" className="col-md-12">Education</h3>
                            <div id="PcatMainDiv" className="col-md-12">{this.state.PortCatItems}</div>
                        </div>
                        
                    </div>                    
                </section>


                <section id="Psection4" className="row">
                    <h3>Comments</h3>
                </section>
               

            </div>
        )
    }
}