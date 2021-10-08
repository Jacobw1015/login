


 function getYelper(){
     let data={
     term: document.querySelector('input[name=term]').value,
             location: document.querySelector('input[name=location]').value,
             sortBy:parseInt(document.querySelector('select').selectedOptions[0].value)
     }
         let url="http://localhost:5500/api"
     let request = new Request(url,{
         method: 'POST',
         headers:{
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(data)
            
            
         
    
     })
     let cache;

    fetch(request).then(res=>{return res.json() }).then(json=>{
        
        let list = document.createElement('ol');
        list.className = 'food-list';
        json.forEach(ele=>{
            
            let listItem = document.createElement('li');
            listItem.className = "food-item"
            listItem.innerHTML = `Name: <a target="_blank" href=${ele.url}>${ele.name}</a> <br> Rating: ${ele.rating} <br> Count: ${ele.review_count} <br> Location: ${ele.location.city}, ${ele.location.state}`;
            listItem.style.backgroundImage =`url(${ele.image_url})`;
            list.appendChild(listItem);
            
            document.querySelector('div[class=food-container]').appendChild(list)
        })
    })
    document.querySelector('form[class=food]').reset()

}
document.querySelector('input[type=button]').onclick=getYelper

