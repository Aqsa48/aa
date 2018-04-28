import React from 'react';


export default class extends React.Component {
   render() {
      return (
         <div>
      
            <div className="col-md-3" style={{marginLeft:'70px',marginTop:'60px'}}>
               <div className="card-container" >
                  <div className="card">
                     <div className="front" style={{boxShadow:'1px 1px 3px 0px'}}>
                           <div className="cover">
                              <img src={this.props.coverPhoto} alt="myImage"/>
                           </div>
                           <div className="user">
                              <img className="img-circle" width="100%" height="100%" src={this.props.displayPhoto} alt="myImage"/>
                           </div>
                           <div className="content">
                              <div className="main">
                                 <h3 className="name">{this.props.name}</h3>
                                 <p className="profession">{this.props.title}</p>
                                 <p className="text-center">"{this.props.bio}"</p>
                              </div>
                              <div className="footer">
                                 <i className="fa fa-mail-forward"></i> Auto Rotation
                              </div>
                           </div>
                     </div>
                     <div className="back">
                           <div className="header">
                              <h4 className="text-center">Education</h4>
                              <h5 className="text-center">{this.props.education}</h5>
                              <hr/>
                           </div>
                           <div className="content">
                              <div className="main">
                                 <div>
                                 <h4 className="text-center">Skills</h4>
                                 <p className="text-center">{this.props.skills}</p>
                                 </div>
                                 <hr/>
                                 <h4 className="text-center">Experience</h4>
                                 <h5 className="text-center">{this.props.experience}</h5>
                                 <hr/>
                                 <div className="stats-container" style={{marginTop:'-10px'}}>
                                       <div className="stats">
                                          <h4>235</h4>
                                          <p>
                                             Followers
                                          </p>
                                       </div>
                                       <div className="stats">
                                          <h4>114</h4>
                                          <p>
                                             Following
                                          </p>
                                       </div>
                                       <div className="stats">
                                          <h4>35</h4>
                                          <p>
                                             Projects
                                          </p>
                                       </div>
                                 </div>

                              </div>
                           </div>
                           <div className="footer">
                              <div className="social-links text-center" style={{marginTop:'-35px'}}>
                                 {/* <a href="http://creative-tim.com" className="facebook"><i className="fa fa-facebook fa-fw"></i></a>
                                 <a href="http://creative-tim.com" className="google"><i className="fa fa-google-plus fa-fw"></i></a>
                                 <a href="http://creative-tim.com" className="twitter"><i className="fa fa-twitter fa-fw"></i></a> */}
                              </div>
                              <div className="text-center" style={{marginTop:'10px'}}>
                                 <a href={"/user_profile?id="+this.props.id}><button>View Profile</button></a>
                              </div>
                           </div>
                     </div>
                  </div>
               </div>
            </div>
         
         </div>
      );
   }
}
