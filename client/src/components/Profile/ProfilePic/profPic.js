import React from "react";
import pic from "./juan.png"
import pic2 from "./bender.png"
import "./profPic.css"

export default class ProfilePic extends React.Component{
    constructor(props){
        super(props);
        
        this.state={
          _userPic1:pic,
         
        };
        this.changePic=this.changePic.bind(this)
    }


    changePic(ev){
    //  let pic=[pic,pic2]
      ev.preventDefault();
      if(this.state._userPic1 == pic){
      this.setState({_userPic1:pic2})}
      else{
        this.setState({_userPic1:pic})
      }
    }

    render(){

        return (
        <div className="profPic">
         <form onSubmit={this.changePic}>
            <img  src={this.state._userPic1}/><br/>
            <input className="picButton" type="submit" value="Change Profile Picture"/>
            
          </form>
        </div>
        )
    }
}