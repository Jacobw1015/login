
function setCookie (key,val){
    let expDate =  new Date('14 Jun 2017 00:00:00 PDT');
    expDate.setFullYear(9999)
    expDate.toUTCString();
    document.cookie = `${key}=${val};expires=${expDate};`;
}


function getCookies(){
    let cookie= document.cookie.split(';').map((ele,index)=>{
        let keys = ele.split("=")[0];
        let values = ele.split("=")[1];
        return{  id: ++index, 
             key:  keys,
            values: values }

    })
    
    return cookie;
}
console.log(getCookies())