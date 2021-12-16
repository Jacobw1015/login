import React from "react";
import ProfilePic from "./ProfilePic/profPic";
import Album from "./photoAlbum/Album.js"
import Wall from "./Wall/Wall";
import Yelp from "../YelpSearch/Search";

export default class Profile extends React.Component{
    constructor(props){
        super(props);

      this.state={
          user: ""
      }
      this.getUser=this.getUser.bind(this);
    }
    async getUser(){
      let url = "http://localhost:5500/user";
        let request = new Request(url,{
          method:"GET",
          headers:{
            'Content-Type': 'application/json'
          }
        });
        const res = await fetch(request);
      const data = await res.json();
      
      if(this.state.user ==""){
        console.log(data.name)
     this.setState({user:data.name});
    };
  }
 
    render(){
     this.getUser();
      return(
        <>
       <h2>Welcome {this.state.user}!</h2>
          <ProfilePic/>
         <Album />
         <Wall /><br/>
         <Yelp/>
        </>
      );

    }

}