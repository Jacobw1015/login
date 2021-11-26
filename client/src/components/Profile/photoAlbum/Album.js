import React, {Component,useRef} from "react";
import pics from "./imageImport" ;


export default class Album extends Component{
    constructor(props){
        super(props);
        this.state={
            clicked: true,
         uploadedPic: null
            
        }
     this.pictures=new Set();
        
        this.getPictures=this.getPictures.bind(this);
        this.renderPictures=this.renderPictures.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        
        this.fileInput = React.createRef();
        
    }

    getPictures(){
        let photo=this.pictures;
        let upload= this.state.uploadedPic;
        let album = Object.values(pics).forEach(key=>{
            
            photo.add(key);
        })
      
         if(upload){
             photo.add(upload)
         }
      return photo
    }
    renderPictures(){
        let album=this.getPictures();
        return Array.from(album).map((picz,index)=>{
      return <img src={picz}  alt="word"  key={index}/>;
    })
    
     
    };

   
   
    handleSubmit(e){
        e.preventDefault();
     try{   let url = URL.createObjectURL(this.fileInput.current.files[0])
        this.setState({
            uploadedPic:url
        });
        this.fileInput.current.value = null;}
        catch(err){
            return;
        }
    }

    render(){
     
        return (
        <div className="album">
          {this.renderPictures()}
            <form onSubmit={this.handleSubmit}>
              <input  type="file" ref={this.fileInput} />
              <input  type="submit"   />
            </form>
           </div>
            );
    }

}