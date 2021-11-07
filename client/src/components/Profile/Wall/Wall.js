import React,{Component} from "react";
import "./Wall.css";

export default class Wall extends Component{
    constructor(props){
        super(props);
        this.state={
            posts: []

        }
        this.addPost=this.addPost.bind(this)
    }

    addPost(e){
        e.preventDefault();
        function getPostValue(){
            let post = document.querySelector("#post");
            if(post.value){
                return post.value
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

    render(){
         let post= this.state.posts.map((post,index)=>{
           return  <li key={index++}>{post}</li>
         });
        return (
            <div className="wallpost">
                <h2>Wallposts:</h2>
                <form onSubmit={this.addPost}>
                  <input id="post" type="text" />
                  <input type="submit"value="Post"/>
                </form>
              {post}
            </div>
    );
    }
}