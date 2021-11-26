import React from "react";
import pic from "./juan.png"
import "./profPic.css";

export default class ProfilePic extends React.Component{
    constructor(props){
        super(props);
        
        this.state={
          _userPic1:pic,
         
        };
        this.changePic=this.changePic.bind(this);
       
    }


    changePic(ev){

      this.setState({
        _userPic1: URL.createObjectURL(ev.target.files[0])
      })
    }

    render(){

        return (
        <div className="profPic">
            <img  src={this.state._userPic1}/><br/>
            <label>
              Change your profile pic
              <input className="picButton" type="file" onChange={this.changePic}/>
           </label>
           </div>
        )
    }
}