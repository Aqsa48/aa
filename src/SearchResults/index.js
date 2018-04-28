import React from 'react';
import axios from 'axios';
import Card from './card.js';


export default class extends React.Component{

    constructor(props){
        super(props);
        this.state = {AllUsers:[],UserCards:[],USER:''};
        this.showCards=this.showCards.bind(this);
    }

    componentWillMount(){
            axios.get('http://localhost:9000/getAllUsers')
            .then((response)=>{
                this.setState({AllUsers:response.data});
                this.showCards();
            })
            axios.get('http://localhost:9000/userData')
            .then((response)=>{
                this.setState({USER:response.data});
                this.showCards();
            })
    }

   showCards(){
       // eslint-disable-next-line
      this.state.AllUsers.map((value,index)=>{
            if(value._id !== this.state.USER._id){
                this.state.UserCards.push(
                    <Card
                    key={Math.random()}
                    id={value._id}
                    coverPhoto={value.coverPhoto!=='' ? "userImages/"+value.coverPhoto : "img/bg11.jpg"}
                    displayPhoto={"userImages/"+value.displayPhoto}
                    name={value.fullname}
                    title={value.title}
                    bio={value.bio.substring(0,120)}
                    education={value.educations.length}
                    skills={value.skills.length}
                    experience={value.experiences.length}
                    />
                );
            }
        })
        this.setState({});
    }

    render(){
        return( 
            <main>

                {this.state.UserCards}
                    

            </main>
        )
    }

}