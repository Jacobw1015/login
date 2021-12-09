const {getData} = require("./googleSheets/accessGoogleSheets");
const {getEmails,getNames,getPass} = require("./googleSheets/uploadUserData")

let users = async function(){
    let names = await getNames();
    let email = await getEmails();
    let pass = await getPass();
     let userArr = [];
    for(let i = 0;i<names.length;i++){
       userArr.push({
            id: Date.now().toString(),
            name: names[i],
            email: email[i],
            password: pass[i]
        })
    }

   return userArr;
    
};

module.exports = {users};