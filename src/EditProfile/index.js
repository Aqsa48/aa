import React from  "react";
import axios from "axios";
  
import { Tag } from 'antd';
import '../../node_modules/antd/dist/antd.css';

// import {
//     Accordion,
//     AccordionItem,
//     AccordionItemTitle,
//     AccordionItemBody,
// } from 'react-accessible-accordion';


// import 'react-accessible-accordion/dist/fancy-example.css';
// import 'react-accessible-accordion/dist/minimal-example.css';

var updatedData = new FormData();


export default class extends React.Component{

    constructor(props){
        super(props);
        this.state={
           USER:'',
           educationDivs:[],
           experienceDivs:[],
           achievementDivs:[],
           serviceDivs:[],
           skillBadges:[],
           skillDivs:[],
           skillValues:[],
           interestBadges:[],
           interestDivs:[],
           interestValues:[],
        }
        this.setPageData=this.setPageData.bind(this);
        this.handleCover=this.handleCover.bind(this);
        this.handleDp=this.handleDp.bind(this);
        this.editBasics=this.editBasics.bind(this);
        this.updateUser=this.updateUser.bind(this);
        
        //Methods for Education
        this.addEducation=this.addEducation.bind(this);
        this.editEducation=this.editEducation.bind(this);
        this.editEducationOpenModal=this.editEducationOpenModal.bind(this);        
        this.deleteEducation=this.deleteEducation.bind(this);        
        //Methods for Experience
        this.addExperience=this.addExperience.bind(this);
        this.editExperience=this.editExperience.bind(this);        
        this.editExperienceOpenModal=this.editExperienceOpenModal.bind(this);
        this.deleteExperience=this.deleteExperience.bind(this);   
        //Methods for Achievement
        this.addAchievement=this.addAchievement.bind(this);
        this.editAchievement=this.editAchievement.bind(this);        
        this.editAchievementOpenModal=this.editAchievementOpenModal.bind(this);
        this.deleteAchievement=this.deleteAchievement.bind(this);      
        //Methods for Skills
        this.addSkillBadge=this.addSkillBadge.bind(this);
        this.deleteSkillBadge=this.deleteSkillBadge.bind(this);
        this.removeAllSkillBadges=this.removeAllSkillBadges.bind(this);
        this.addSkills=this.addSkills.bind(this);
        this.deleteSkill=this.deleteSkill.bind(this);
        //Methods for Interests
        this.addInterestBadge=this.addInterestBadge.bind(this);
        this.deleteInterestBadge=this.deleteInterestBadge.bind(this);
        this.removeAllInterestBadges=this.removeAllInterestBadges.bind(this);
        this.addInterests=this.addInterests.bind(this);
        this.deleteInterest=this.deleteInterest.bind(this);
        //Methods for Services
        this.addService=this.addService.bind(this);
        this.editService=this.editService.bind(this);        
        this.editServiceOpenModal=this.editServiceOpenModal.bind(this);
        this.deleteService=this.deleteService.bind(this); 
        
    }



    componentDidMount(){
        axios.get('http://localhost:9000/userData')
        .then((res)=>{        
            this.setState({USER:res.data});
            this.setPageData();           
            console.log(res.data);
        }).catch((err)=>{
            console.log(err);
        })

        document.getElementById('EPsaveBtn').disabled=true;
    }




    setPageData(){
        document.getElementById('EPeBfullname').value=this.state.USER.fullname;
        document.getElementById('EPeBtitle').value=this.state.USER.title;
        document.getElementById('EPeBbio').value=this.state.USER.bio;

        let eduDivs=[];
        // eslint-disable-next-line
        this.state.USER.educations.map((element,index)=>{
            eduDivs.push(
            <div key={Math.random()} id={element.id} className='col-md-12' style={{border:'1px solid',height:'100px'}}>
            School:{element.school}<br/>Degree:{element.degree}<br/>{element.from}-{element.to}<br/>
            <button onClick={this.editEducationOpenModal} data-toggle="modal" data-target="#EPeditEduModal">Edit</button>
            <button onClick={this.deleteEducation}>Delete</button>
            </div>
        );
        })
        this.setState({educationDivs:eduDivs});

        let expDivs=[];
        // eslint-disable-next-line        
        this.state.USER.experiences.map((element,index)=>{
            expDivs.push(
            <div key={Math.random()} id={element.id} className='col-md-12' style={{border:'1px solid',height:'110px'}}>
            Title:{element.title}<br/>Organization:{element.organization}<br/>Time Span:{element.from}-{element.to}<br/>
            Description:{element.description}<br/>
            <button onClick={this.editExperienceOpenModal} data-toggle="modal" data-target="#EPeditExpModal">Edit</button>            
            <button onClick={this.deleteExperience}>Delete</button>
            </div>
        );
        })
        this.setState({experienceDivs:expDivs});

        let achDivs=[];
        // eslint-disable-next-line        
        this.state.USER.achievements.map((element,index)=>{
            achDivs.push(
            <div key={Math.random()} id={element.id} className='col-md-12' style={{border:'1px solid',height:'110px'}}>
            Title:{element.title}<br/>
            Description:{element.description}<br/>
            URL:{element.url}<br/>
            <button onClick={this.editAchievementOpenModal} data-toggle="modal" data-target="#EPeditAchModal">Edit</button>            
            <button onClick={this.deleteAchievement}>Delete</button>
            </div>
        );
        })
        this.setState({achievementDivs:achDivs});

        let skDivs=[];
        // eslint-disable-next-line        
        this.state.USER.skills.map((element,index)=>{
            skDivs.push(
            <div key={Math.random()} className='col-md-12' id={element} style={{border:'1px solid',height:'40px'}}>
            <p className='col-md-11'>{element}</p>
            <button onClick={this.deleteSkill}>Del</button></div>
        );
        })
        this.setState({skillDivs:skDivs});

        let intDivs=[];
        // eslint-disable-next-line        
        this.state.USER.interests.map((element,index)=>{
            intDivs.push(
            <div key={Math.random()} className='col-md-12' id={element} style={{border:'1px solid',height:'40px'}}>
            <p className='col-md-11'>{element}</p>
            <button onClick={this.deleteInterest}>Del</button></div>
        );
        })
        this.setState({interestDivs:intDivs});

        let servDivs=[];
        // eslint-disable-next-line        
        this.state.USER.services.map((element,index)=>{
            servDivs.push(
            <div key={Math.random()} id={element.id} className='col-md-12' style={{border:'1px solid',height:'110px'}}>
            Title:{element.title}<br/>
            Description:{element.description}<br/>
            <button onClick={this.editServiceOpenModal} data-toggle="modal" data-target="#EPeditServModal">Edit</button>            
            <button onClick={this.deleteService}>Delete</button>
            </div>
        );
        })
        this.setState({serviceDivs:servDivs});

    }




    handleCover(){
        var oFReader = new FileReader();
        oFReader.readAsDataURL(document.getElementById("EPcoverEdit").files[0]);
        // if(!updatedData.has('coverPhoto')){        
            updatedData.set('coverPhoto', document.getElementById("EPcoverEdit").files[0]);
        // }

        oFReader.onload = function (oFREvent) {
            document.getElementById('EPcoverImg').src=oFREvent.target.result; 
        };

        document.getElementById('EPsaveBtn').disabled=false;   
    }




    handleDp(){
        var oFReader = new FileReader();
        oFReader.readAsDataURL(document.getElementById("EPdpEdit").files[0]);
        // if(!updatedData.has('displayPhoto')){
            updatedData.set('displayPhoto', document.getElementById("EPdpEdit").files[0]);
        // }

        oFReader.onload = function (oFREvent) {
            document.getElementById('EPdpImg').src=oFREvent.target.result; 
        };

        document.getElementById('EPsaveBtn').disabled=false;   
    }




    editBasics(){
        document.getElementById('EPsaveBtn').disabled=false;   
        
        let userData=this.state.USER;
        userData.fullname=document.getElementById('EPeBfullname').value;
        userData.title=document.getElementById('EPeBtitle').value;
        userData.bio=document.getElementById('EPeBbio').value;
        
        document.getElementById('EPeBfullname').value=userData.fullname;
        document.getElementById('EPeBtitle').value=userData.title;
        document.getElementById('EPeBbio').value=userData.bio;
        this.setState({USER:userData});   
    }




    addEducation(){
        this.state.USER.educations.push({
            id:Math.random().toString(36).substring(2, 10),
            school:document.getElementById('EPaEschool').value,
            degree:document.getElementById('EPaEdegree').value,
            from:document.getElementById('EPaEfrom').value,
            to:document.getElementById('EPaEto').value
        })
        document.getElementById('EPaEschool').value=""; 
        document.getElementById('EPaEdegree').value=""; 
        document.getElementById('EPaEfrom').value=""; 
        document.getElementById('EPaEto').value=""; 
        
        this.setPageData();        
        document.getElementById('EPsaveBtn').disabled=false;           
    }

    editEducationOpenModal(e){
        let targetedEducation=e.target.parentNode.id;
        // eslint-disable-next-line        
        this.state.USER.educations.map((element,index)=>{
            if(element.id === targetedEducation){
                document.getElementById('EPeEid').value=element.id;                 
                document.getElementById('EPeEschool').value=element.school; 
                document.getElementById('EPeEdegree').value=element.degree; 
                document.getElementById('EPeEfrom').value=element.from; 
                document.getElementById('EPeEto').value=element.to; 
            }
        });
        // This fuctions set the values of targeted education values in Edit Education Modal
    }

    editEducation(){
        let educationId=document.getElementById('EPeEid').value;
        // eslint-disable-next-line                
        this.state.USER.educations.map((element,index)=>{
            if(element.id===educationId){
                element.school=document.getElementById('EPeEschool').value; 
                element.degree=document.getElementById('EPeEdegree').value; 
                element.from=document.getElementById('EPeEfrom').value; 
                element.to=document.getElementById('EPeEto').value;
            }
        });
        this.setPageData();
        document.getElementById('EPsaveBtn').disabled=false;                   
    }

    deleteEducation(e){
        // eslint-disable-next-line                
        this.state.USER.educations.map((element,index)=>{
            if(e.target.parentNode.id===element.id){
                this.state.USER.educations.splice(index,1);
            }
        })
        this.setPageData();
        document.getElementById('EPsaveBtn').disabled=false;           
    }




    addExperience(){
        // eslint-disable-next-line                
        this.state.USER.experiences.push({
            id:Math.random().toString(36).substring(2, 10),
            title:document.getElementById('EPaExTitle').value,
            organization:document.getElementById('EPaExOrg').value,
            from:document.getElementById('EPaExFrom').value,
            to:document.getElementById('EPaExTo').value,
            description:document.getElementById('EPaExDesc').value
        })
        document.getElementById('EPaExTitle').value="";
        document.getElementById('EPaExOrg').value="";
        document.getElementById('EPaExFrom').value="";
        document.getElementById('EPaExTo').value="";
        document.getElementById('EPaExDesc').value=""
        this.setPageData();
        document.getElementById('EPsaveBtn').disabled=false;   
    }

    editExperienceOpenModal(e){
        let targetedExperience=e.target.parentNode.id;
        // eslint-disable-next-line                
        this.state.USER.experiences.map((element,index)=>{
            if(element.id === targetedExperience){
                document.getElementById('EPeExId').value=element.id;                 
                document.getElementById('EPeExTitle').value=element.title; 
                document.getElementById('EPeExOrg').value=element.organization; 
                document.getElementById('EPeExFrom').value=element.from; 
                document.getElementById('EPeExTo').value=element.to; 
                document.getElementById('EPeExDesc').value=element.description; 
            }
        });
        // This fuctions set the values of targeted Experience values in Edit Experience Modal
    }

    editExperience(){
        let experienceId=document.getElementById('EPeExId').value;
        // eslint-disable-next-line                
        this.state.USER.experiences.map((element,index)=>{
            if(element.id===experienceId){
                element.title=document.getElementById('EPeExTitle').value; 
                element.organization=document.getElementById('EPeExOrg').value; 
                element.from=document.getElementById('EPeExFrom').value; 
                element.to=document.getElementById('EPeExTo').value;
                element.description=document.getElementById('EPeExDesc').value;
            }
        });
        this.setPageData();
        document.getElementById('EPsaveBtn').disabled=false;                   
    }

    deleteExperience(e){
        // eslint-disable-next-line                
        this.state.USER.experiences.map((element,index)=>{
            if(e.target.parentNode.id===element.id){
                this.state.USER.experiences.splice(index,1);
            }
        })
        this.setPageData();
        document.getElementById('EPsaveBtn').disabled=false;           
    }





    addAchievement(){
        // eslint-disable-next-line                
        this.state.USER.achievements.push({
            id:Math.random().toString(36).substring(2, 10),
            title:document.getElementById('EPaAchTitle').value,
            description:document.getElementById('EPaAchDesc').value,
            url:document.getElementById('EPaAchUrl').value
        })
        document.getElementById('EPaAchTitle').value="";
        document.getElementById('EPaAchDesc').value=""
        document.getElementById('EPaAchUrl').value=""
        this.setPageData();
        document.getElementById('EPsaveBtn').disabled=false;   
    }

    editAchievementOpenModal(e){
        let targetedAchievement=e.target.parentNode.id;
        // eslint-disable-next-line                
        this.state.USER.achievements.map((element,index)=>{
            if(element.id === targetedAchievement){
                document.getElementById('EPeAchId').value=element.id;                 
                document.getElementById('EPeAchTitle').value=element.title;  
                document.getElementById('EPeAchDesc').value=element.description; 
                document.getElementById('EPeAchUrl').value=element.url; 
            }
        });
        // This fuctions set the values of targeted Achievement values in Edit Achievement Modal
    }

    editAchievement(){
        let achievementId=document.getElementById('EPeAchId').value;
        // eslint-disable-next-line                
        this.state.USER.achievements.map((element,index)=>{
            if(element.id===achievementId){
                element.title=document.getElementById('EPeAchTitle').value; 
                element.description=document.getElementById('EPeAchDesc').value;
                element.url=document.getElementById('EPeAchUrl').value;
            }
        });
        this.setPageData();
        document.getElementById('EPsaveBtn').disabled=false;                   
    }

    deleteAchievement(e){
        // eslint-disable-next-line                
        this.state.USER.achievements.map((element,index)=>{
            if(e.target.parentNode.id===element.id){
                this.state.USER.achievements.splice(index,1);
            }
        })
        this.setPageData();
        document.getElementById('EPsaveBtn').disabled=false;           
    }





    addService(){
        this.state.USER.services.push({
            id:Math.random().toString(36).substring(2, 10),
            title:document.getElementById('EPaStitle').value,
            description:document.getElementById('EPaSdesc').value,
        })
        document.getElementById('EPaStitle').value=""; 
        document.getElementById('EPaSdesc').value=""; 
        
        this.setPageData();        
        document.getElementById('EPsaveBtn').disabled=false;           
    }

    editServiceOpenModal(e){
        let targetedService=e.target.parentNode.id;
        // eslint-disable-next-line        
        this.state.USER.services.map((element,index)=>{
            if(element.id === targetedService){
                document.getElementById('EPeSid').value=element.id;                 
                document.getElementById('EPeStitle').value=element.title; 
                document.getElementById('EPeSdesc').value=element.description;  
            }
        });
        // This fuctions set the values of targeted education values in Edit Education Modal
    }

    editService(){
        let serviceId=document.getElementById('EPeSid').value;
        // eslint-disable-next-line                
        this.state.USER.services.map((element,index)=>{
            if(element.id===serviceId){
                element.title=document.getElementById('EPeStitle').value; 
                element.description=document.getElementById('EPeSdesc').value; 
            }
        });
        this.setPageData();
        document.getElementById('EPsaveBtn').disabled=false;                   
    }

    deleteService(e){
        // eslint-disable-next-line                
        this.state.USER.services.map((element,index)=>{
            if(e.target.parentNode.id===element.id){
                this.state.USER.services.splice(index,1);
            }
        })
        this.setPageData();
        document.getElementById('EPsaveBtn').disabled=false;           
    }






    addSkillBadge(){
        let badges=this.state.skillBadges;
        let value=document.getElementById('EPaSInput').value;
        badges.push(<Tag closable id={value} onClose={this.deleteSkillBadge}>{value}</Tag>);
        this.state.skillValues.push(value);
    
        document.getElementById('EPaSInput').value="";
        this.setState({skillBadges:badges});
    }

    deleteSkillBadge(e){
        let deletedBadge=e.target.parentNode.id;
        this.state.skillValues.splice(this.state.skillValues.indexOf(deletedBadge),1); //deletes the selected badge from skillValues state      
    }

    removeAllSkillBadges(){
        this.setState({skillBadges:[]});        
    }

    addSkills(){
        // eslint-disable-next-line                
        this.state.skillValues.map((element,index)=>{
            this.state.USER.skills.push(element);
        });
        this.setState({skillBadges:[]}); 
        this.setState({skillValues:[]}); //////////                
        this.setPageData();
        document.getElementById('EPsaveBtn').disabled=false;        
    }

    deleteSkill(e){
        //finds the index of selected skill in userdata skills array
        let skillIndex=this.state.USER.skills.indexOf(e.target.parentNode.id);
        //here e.target.parentNode.id is the name of skill which is also the id of selected skillDiv
        
        //dletes the selected value form userdata 'USER'
        this.state.USER.skills.splice(skillIndex,1);
        this.setPageData();
        document.getElementById('EPsaveBtn').disabled=false;                
    }





    addInterestBadge(){
        let badges=this.state.interestBadges;
        let value=document.getElementById('EPaIntInput').value;
        badges.push(<Tag closable id={value} onClose={this.deleteInterestBadge}>{value}</Tag>);
        this.state.interestValues.push(value);
    
        document.getElementById('EPaIntInput').value="";
        this.setState({interestBadges:badges});
    }

    deleteInterestBadge(e){
        let deletedBadge=e.target.parentNode.id;
        this.state.interestValues.splice(this.state.interestValues.indexOf(deletedBadge),1); //deletes the selected badge from interestlValues state
    }

    removeAllInterestBadges(){
        this.setState({interestBadges:[]});        
    }

    addInterests(){
        // eslint-disable-next-line                
        this.state.interestValues.map((element,index)=>{
            this.state.USER.interests.push(element);
        });
        this.setState({interestBadges:[]});        
        this.setState({interestValues:[]});        ///////// 
        this.setPageData();
        document.getElementById('EPsaveBtn').disabled=false;        
    }

    deleteInterest(e){
        //finds the index of selcted interest in userdata interests array
        let interestIndex=this.state.USER.interests.indexOf(e.target.parentNode.id);
        //here e.target.parentNode.id is the name of interest which is also the id of selected skillDiv
        
        //dletes the selected value form userdata 'USER'
        this.state.USER.interests.splice(interestIndex,1);
        this.setPageData();
        document.getElementById('EPsaveBtn').disabled=false;                
    }

    


    updateUser(){
        
        updatedData.set('userId', this.state.USER._id);
        updatedData.set('fullname', this.state.USER.fullname);
        updatedData.set('title', this.state.USER.title);
        updatedData.set('oldDisplayPhoto', this.state.USER.displayPhoto);
        updatedData.set('oldCoverPhoto', this.state.USER.coverPhoto);
        updatedData.set('bio', this.state.USER.bio);
        updatedData.set('educations', JSON.stringify(this.state.USER.educations));
        updatedData.set('experiences', JSON.stringify(this.state.USER.experiences));
        updatedData.set('achievements', JSON.stringify(this.state.USER.achievements));
        updatedData.set('skills', JSON.stringify(this.state.USER.skills));
        updatedData.set('interests', JSON.stringify(this.state.USER.interests));
        updatedData.set('services', JSON.stringify(this.state.USER.services));
        
        axios({
            method:'post',
            url:'http://localhost:9000/editProfile',
            data:updatedData,
            headers:{
                'Access-Control-Allow-Origin':'http://localhost:9000/'
            }
        }).then((response)=>{
            if(response.data==="Updated Successfully"){
                alert('Data Updates Successfully');
            }
            else{
                alert('Data Updation Failed');                
            }
            
        }).catch((err)=>{
            console.log(err);
        })

        document.getElementById('EPsaveBtn').disabled=true;           
    }



    render(){
        return(
            <div className="EPwrapper col-md-12">

                <header id="EPheader" className="row">
                    
                </header>      

                <div id="EPmainDiv" className="col-md-8" >
                    <section id="EPsection1" className="row">
                        <div id="EPcoverDiv" className="col-md-12">
                            
                            <img alt="" id="EPcoverImg" className="row" width="100%" height="160%" 
                                src={this.state.USER.coverPhoto !== '' ? "userImages/"+this.state.USER.coverPhoto :'img/bg5.jpg'} 
                            />  
                            <input type="file" id="EPcoverEdit" onChange={this.handleCover} />                          
                        </div>
                        <div id="EPdpDiv" className="col-md-2">
                            <img alt="" id="EPdpImg" className="row" width="100%" height="100%" src={"userImages/"+this.state.USER.displayPhoto} />   
                            <input type="file" id="EPdpEdit" onChange={this.handleDp} />                                                       
                        </div>
                        <p id="EPname" className="col-md-12" >{this.state.USER.fullname}</p>
                        <p id="EPtitle" className="col-md-12" >{this.state.USER.title}</p>
                        <p id="EPbio" className="col-md-12" >{this.state.USER.bio}</p>
                        
                        <input type="button" id="EPedBasicBtn" data-toggle="modal" data-target="#EPeditBasicModal" value="Edit" />

                    </section>


                    {/* <Accordion id="EPeducationAcc" className="row" onChange={this.handleButton} style={{marginTop:'30px'}}>
                        <AccordionItem style={{border:'1px solid black'}}>
                            <AccordionItemTitle  style={{backgroundColor:'gray'}}>
                                <h3>Education</h3>
                                <i className="material-icons" style={{color:'black'}}>keyboard_arrow_down</i>
                            </AccordionItemTitle>
                            <input type="button" id="EPaddEduBtn" data-toggle="modal" data-target="#EPaddEduModal" value="Add" />
                            
                            <AccordionItemBody style={{marginTop:'30px'}}>
                                <div className="row" style={{border:'1px solid', height:'100px'}}></div>
                                <div className="row" style={{border:'1px solid', height:'100px'}}></div>
                                <div className="row" style={{border:'1px solid', height:'100px'}}></div>
                                <div className="row" style={{border:'1px solid', height:'100px'}}></div>
                            </AccordionItemBody>
                        </AccordionItem>
                    </Accordion> */}



                    <section id="EPsection2" className="row">
                        <h2>Education</h2>
                        <input type="button" id="EPaddEduBtn" data-toggle="modal" data-target="#EPaddEduModal" value="Add" />
                        <div id="EPeduDivsContainer" className="col-md-12">{this.state.educationDivs}</div>
                    </section>



                    <section id="EPsection3" className="row">
                        <h2>Experience</h2>
                        <input type="button" id="EPaddExpBtn" data-toggle="modal" data-target="#EPaddExpModal" value="Add" />
                        <div id="EPexpDivsContainer" className="col-md-12">{this.state.experienceDivs}</div>
                    </section>



                    <section id="EPsection4" className="row">
                        <h2>Achievements</h2>
                        <input type="button" id="EPaddAchBtn" data-toggle="modal" data-target="#EPaddAchModal" value="Add" />
                        <div id="EPachDivsContainer" className="col-md-12">{this.state.achievementDivs}</div>
                    </section>



                    <section id="EPsection5" className="row">
                        <h2>Skills</h2>
                        <input type="button" id="EPaddSkBtn" data-toggle="modal" data-target="#EPaddSkModal" value="Add" />
                        <div id="EPskDivsContainer" className="col-md-12">{this.state.skillDivs}</div>
                    </section>



                    <section id="EPsection6" className="row">
                        <h2>Interests</h2>
                        <input type="button" id="EPaddIntBtn" data-toggle="modal" data-target="#EPaddIntModal" value="Add" />
                        <div id="EPintDivsContainer" className="col-md-12">{this.state.interestDivs}</div>
                    </section>


                    {this.state.USER.accountType === 'professional' ? (
                        <section id="EPsection7" className="row">
                            <h2>Services</h2>
                            <input type="button" id="EPaddServBtn" data-toggle="modal" data-target="#EPaddServModal" value="Add" />
                            <div id="EPservDivsContainer" className="col-md-12">{this.state.serviceDivs}</div>
                        </section>
                        ) : (<p></p>)
                    }
                    

                </div>

                <section id="EPsaveBar">
                    <button id="EPsaveBtn" onClick={this.updateUser}>Save</button>
                </section>






                            {/*........................... Modals............................ */}

                {/* // Edit Basics Modal  */}
                <div className="modal" id="EPeditBasicModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Information</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Fullname:<input id="EPeBfullname" type="text" name="fullname" /><br/>
                                Current Position/Title:<input id="EPeBtitle" type="text" name="title" /><br/>
                                Bio:<textarea id="EPeBbio" name="bio" cols="30" ></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.editBasics}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>





                {/* Add Education Modal  */}
                <div className="modal" id="EPaddEduModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add Education</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                School:<input id="EPaEschool" type="text" name="school"/><br/>
                                Degree:<input id="EPaEdegree" type="text" name="degree"/><br/>
                                From:<input id="EPaEfrom" type="text" name="from"/><br/>
                                To:<input id="EPaEto" type="text" name="to"/><br/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.addEducation}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>






    
                {/* Edit Education Modal  */}
                <div className="modal" id="EPeditEduModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Education</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <input id="EPeEid" type="text" name="title" hidden/>
                                School:<input id="EPeEschool" type="text" name="school"/><br/>
                                Degree:<input id="EPeEdegree" type="text" name="degree"/><br/>
                                From:<input id="EPeEfrom" type="text" name="from"/><br/>
                                To:<input id="EPeEto" type="text" name="to"/><br/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.editEducation}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>






                {/* Add Experience Modal  */}
                <div className="modal" id="EPaddExpModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add Experience</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">                    
                                Title:<input id="EPaExTitle" type="text" name="title"/><br/>
                                Organization:<input id="EPaExOrg" type="text" name="company"/><br/>
                                From:<input id="EPaExFrom" type="text" name="from"/><br/>
                                To:<input id="EPaExTo" type="text" name="to"/><br/>
                                Description:<textarea id="EPaExDesc" name="bio" cols="30" ></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.addExperience}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>






                {/* Edit Experience Modal  */}
                <div className="modal" id="EPeditExpModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Experience</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">         
                                <input id="EPeExId" type="text" name="title" hidden/>                                       
                                Title:<input id="EPeExTitle" type="text" name="title"/><br/>
                                Organization:<input id="EPeExOrg" type="text" name="company"/><br/>
                                From:<input id="EPeExFrom" type="text" name="from"/><br/>
                                To:<input id="EPeExTo" type="text" name="to"/><br/>
                                Description:<textarea id="EPeExDesc" name="bio" cols="30" ></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.editExperience}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>





                {/* Add Achievement Modal  */}
                <div className="modal" id="EPaddAchModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add Achievement</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">                    
                                Title:<input id="EPaAchTitle" type="text" name="title"/><br/>
                                Description:<textarea id="EPaAchDesc" name="bio" cols="30" ></textarea><br/>
                                URL:<input id="EPaAchUrl" type="text" name="title"/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.addAchievement}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>






                {/* Edit Achievement Modal  */}
                <div className="modal" id="EPeditAchModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Achievement</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">         
                                <input id="EPeAchId" type="text" name="title" hidden/>                                       
                                Title:<input id="EPeAchTitle" type="text" name="title"/><br/>
                                Description:<textarea id="EPeAchDesc" name="bio" cols="30" ></textarea><br/>
                                URL:<input id="EPeAchUrl" type="text" name="title"/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.editAchievement}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>






                {/* Add Skills Modal  */}
                <div className="modal" id="EPaddSkModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add Skills</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.removeAllSkillBadges}>
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <input id="EPaSInput" type="text" name="inputfield"/>
                                <button onClick={this.addSkillBadge}>Ok</button>
                                <div id="EPmodalBadgeDiv" className="col-md-12" style={{border:'1px solid',height:'100px'}}>{this.state.skillBadges}</div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.removeAllSkillBadges}>Close</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.addSkills}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>






                {/* Add Interests Modal  */}
                <div className="modal" id="EPaddIntModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add Interests</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.removeAllInterestBadges}>
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <input id="EPaIntInput" type="text" name="inputfield"/>
                                <button onClick={this.addInterestBadge}>Ok</button>
                                <div id="EPmodalBadgeDiv" className="col-md-12" style={{border:'1px solid',height:'100px'}}>{this.state.interestBadges}</div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.removeAllInterestBadges}>Close</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.addInterests}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>






                {/* Add Service Modal  */}
                <div className="modal" id="EPaddServModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add Service</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">                    
                                Title:<input id="EPaStitle" type="text" name="title"/><br/>
                                Description:<textarea id="EPaSdesc" name="bio" cols="30" ></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.addService}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>






                {/* Edit Experience Modal  */}
                <div className="modal" id="EPeditServModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Service</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">         
                                <input id="EPeSid" type="text" name="title" hidden/>                                       
                                Title:<input id="EPeStitle" type="text" name="title"/><br/>
                                Description:<textarea id="EPeSdesc" name="bio" cols="30" ></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.editService}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>





            </div>
        )
    }
}