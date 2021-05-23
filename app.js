const fetch = require('node-fetch');
// functions that gets data from petfinder api
require('dotenv').config();

console.log(process.env);
//access token
const token = process.env.TOKEN_ACCESS;
const token_type = process.env.TOKEN_TYPE;

// Variables parameters: organization and type
let org = 'RI77';
let type = 'Dog';

fetch('https://api.petfinder.com/v2/animals?organization=' + org + '&type=' + type, {
        headers: {
            'Authorization': token_type + ' ' + token,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    

}).then(function (resp) {

    // Return the API response as JSON
    return resp.json();

}).then(function (data) {

    // Log the pet data
    console.log('pets', data);

}).catch(function (err) {

    // Log any errors
    console.log('ERROR!! Something not working!', err);

});
