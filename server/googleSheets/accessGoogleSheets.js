/* Imports googlesheets API and Sheets API creds */
const {google} =require("googleapis"); 
const keys = require("../credentials.json");

/* Sets up authorization to access creds */

const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
});

const client = auth.getClient();
const googleSheets = google.sheets({version:"v4", auth: client});

/* Important properties for Sheet functions:
auth, range, spreadsheetId, majorDimension, valueRenderOption */

 async function getData(range,dim="rows"){
   try{ let data = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: keys.spreadsheetId,
        majorDimension:dim,
        range: `User Data!${range}`
    });
    return data.data.values;}
    catch(err){
        return;
    }
};
async function writeUser(user){
    try {
        let upload = await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId: keys.spreadsheetId,
            valueInputOption:"USER_ENTERED",
            range:"User Data!a1",
            resource:{
                values:[user]
            }
            
        })
    } catch (error) {
        return;
    } 
}
module.exports = {getData,writeUser};