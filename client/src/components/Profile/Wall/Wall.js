import React,{Component} from "react";
import "./Wall.css";

export default class Wall extends Component{
    constructor(props){
        super(props);
        this.state={
            posts: []

        }
        this.addPost=this.addPost.bind(this);
        this.renderPosts=this.renderPosts.bind(this);
    }

    addPost(e){
        e.preventDefault();
        function getPostValue(){
            let rndInx=Math.floor(Math.random()*256);
            let rndInx2=Math.floor(Math.random()*256);
            let rndInx3=Math.floor(Math.random()*256);
            let idNum =`${rndInx}.${rndInx2}.${rndInx3}`;
            let post = document.querySelector("#post");
               
                return {
                    id: `${idNum} ${post.value}`,
                    post: post.value
                }
            
      }
            
        this.setState({
            posts: [...this.state.posts,getPostValue()]
        })
        function clearField(){
            let post = document.querySelector("#post");
            post.value=null
        }
        clearField();
    }

    renderPosts(obj){
      function getPost(obj){ 
          let arr =[];
        for(let post in obj){
            if(obj[post].post!==""){
            arr.push(obj[post].post);
            }
        }
        return arr;
    }
   let postList= getPost(obj).map((ele,index)=>{
        return (
           
           <li key={index++}>{ele}</li> 
            
            
            );

    });
  
    return postList
    }

    render(){
       
         let posts= this.state.posts;
   
        return (
            <div className="wallpost">
                <h2>Wallposts:</h2>
                <form onSubmit={this.addPost}>
                  <input id="post" type="text" />
                  <input type="submit"value="Post"/>
                </form>
               {this.renderPosts(posts)}
            </div>
    );
    }
}