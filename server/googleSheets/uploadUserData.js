const {getData} = require("./accessGoogleSheets.js");

async function getId(){
  let data= await getData("a2:a","columns");
  return data[0];
}

async function getNames(){
    let data = await getData("B2:B","columns")
    return data[0];
}
  async function getEmails(){
  let data = await getData("c2:c","columns")
    return data[0];
}
async function getPass(){
   let data = await getData("d2:d","columns")
    return data[0];
}


async function getUser(entry){
  let regex = new RegExp(entry,"i");
  
  let found = regex.test(entry);

  let user = await getNames();
  let userRows = await getData("a2:z");
 
  
  let userIndex =  user.find(ele=>ele===entry);
 
   if(userIndex !== undefined){
     for(let i = 0; i< userRows.length;i++){
     let userRow = userRows[i];
        for(let j = 0;j<userRow.length;j++){
          if(userRow[j]===entry){
            console.log(userRow)
          }
        }
   }
 }
}

module.exports= {getEmails,getNames,getPass,getId};