const fetch = require('node-fetch')
require('dotenv').config();

const clientId="jfj43NIEkXjeopdf3bbCeQ";
const apiKey = process.env.YELP_API_KEY;



 
 module.exports= {
     search(term = 'Starbucks',location = "Wheaton",sortByNum=0){
    let sortBy =[
    /* 0 */ 'best_match',
    /* 1 */ 'rating',
    /* 2 */ 'review_count'
    ]
    return fetch(`https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&limit=5&sort_by=${sortBy[sortByNum]}`,{
       method:'GET',
       credentials: 'include',
       mode:'cors',
       
     headers:{
    Authorization: `Bearer ${apiKey}`,
    'Content-Type':'application/json',

    
}
})
.then(res=>res.json())
.then((data)=>{
    
    return  Array.from(data.businesses)})
.catch(err=>console.error(err))
    }
}
//.search('steak','maine').then(res=>console.log(res))