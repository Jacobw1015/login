import React from "react";
import "./Search.css";
    function getYelper(){
       let term= document.querySelector('input[name=term]').value;
        let location = document.querySelector('input[name=location]').value;
         let sortBy=parseInt(document.querySelector('select').selectedOptions[0].value)
         if(term==""||location==""){return;}
        let data={
        term: term,
        location: location,
        sortBy:sortBy
        }
            let url="http://localhost:5500/api"
        let request = new Request(url,{
            method: 'POST',
            headers:{
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
               
               
            
       
        })
       
   
       fetch(request).then(res=>{return res.json() })
       .then(json=>{
          
           let list = document.createElement('ol'); 
           list.className = 'food-list';
           json.forEach(ele=>{
               
               let listItem = document.createElement('li');
               listItem.className = "food-item"
               listItem.innerHTML = `<a target="_blank" href=${ele.url}>Name: ${ele.name} <br> Rating: ${ele.rating} <br> Count: ${ele.review_count} <br> Location: ${ele.location.city}, ${ele.location.state}</a>`;
               listItem.style.backgroundImage =`url(${ele.image_url})`;
               list.appendChild(listItem);
               
               document.querySelector('div[class=food-container]').appendChild(list)
           })
       })
       document.querySelector('form[class=food]').reset()
   
   }

   export default class Yelp extends React.Component{
       constructor(props){
           super(props);
           this.handleClick=this.handleClick.bind(this);
       }
       handleClick(ev){
        getYelper();
       }
      render(){ return (
    <div className="yelp">
        <form className="food" >
        <label htmlFor="name">Type in restuarant</label>
      <input type="text" name="term" required/>
      <label htmlFor="location">Type in location</label>
      <input type="text" name="location" required/>
      <label htmlFor="number">How do you wanted it sorted?</label>
      <select  name="number" required>
        <option value="0">Best match</option>
        <option value="1">By Rating</option>
        <option value="2">Review counts</option>
      </select>
      <input type="button" value="Click" onClick={this.handleClick}/>
    </form>
    
     <div className="food-container">

     </div>
    </div>
       );
   }
   }
