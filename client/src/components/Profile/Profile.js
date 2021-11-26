import React from "react";
import ProfilePic from "./ProfilePic/profPic";
import Album from "./photoAlbum/Album.js"
import Wall from "./Wall/Wall";
import Yelp from "../YelpSearch/Search";

export default class Profile extends React.Component{
    constructor(props){
        super(props);

      this.state={
          isClicked: false
      }
      
    }

 
    render(){
      let isClicked = this.state.isClicked
      return(
        <>
          <ProfilePic/>
         <Album />
         <Wall /><br/>
         <Yelp/>
        </>
      );

    }

}