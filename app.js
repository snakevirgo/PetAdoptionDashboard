//declare fetch
const fetch = require('node-fetch');
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const jsdom = require("jsdom");
const fs = require('fs');
const { isContext } = require('vm');
require('dotenv').config();
const secret_key = process.env.SECRET_KEY;
const key = process.env.KEY;


const { JSDOM } = jsdom;

var page_template = fs.readFileSync('home.html','utf-8');

//Add router to different extensions - homepage, search and about page
router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/home.html'));
});
  
router.get('/search',function(req,res){
    res.sendFile(path.join(__dirname+'/search.html'));
});

router.get('/about',function(req,res){
    res.sendFile(path.join(__dirname+'/about.html'));
});
  
//Use mychart.js and style page in public folder 
app.use(express.static('public'));


const dom = new JSDOM( page_template, 
                        {
                            contentType: "text/html",
                            pretendToBeVisual: true,
                        });

const { document } = dom.window;


// Variables parameters: status and city
let status = 'adoptable';
let city = 'Portland, OR';

//Store the JSON data into this array
var DATA = [];
app.get('/', (request, response) => {
    fetch('https://api.petfinder.com/v2/oauth2/token', {
        method: 'POST',
        body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret_key,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function (resp) {

        // Return response as JSON
        return resp.json();

    }).then(function (data) {

        // Store token data
        token = data.access_token;
        token_type = data.token_type;
        expires = new Date().getTime() + (data.expires_in * 1000);

        //fetch token
        fetch('https://api.petfinder.com/v2/animals?status=' + status + "&location=" + city +'&limit=100' , {
            headers: {
                'Authorization': token_type + ' ' + token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        
            //get response
            }).then(function (resp) {

                // Return the API response as JSON
                return resp.json();

            }).then(function (data) {
                // console.log(data)
                DATA = data.animals;
                // Log the pet data
                // your content will be here
                data.animals.forEach(val => {
                    addToDOM('div', val);
                
                });

                // send back html dom to the browser
                // dom will be the place to store html
                response.send(dom.serialize());
            }).catch(function (err) {
                // Log any errors
                console.log('ERROR!! Something not working!', err);
            });
    });

})

//send data over to /jsonDATA for frontend
app.get('/jsonDATA', (request, response) => {
    response.send(DATA);
});

let result = document.getElementById('results');

//function that appends pet cards on home page
let addToDOM = ( element, item) => {

    //create elements to be added to DOM for the cards, col, container and main div
    let div = document.createElement(element);
    let col = document.createElement('div');
    let container = document.createElement('div');
    let card = document.createElement('a');

    let card_body = document.createElement('card-body')
    let image = document.createElement('img');
    let h3 = document.createElement('h3');
    let title = document.createElement('card-title');
    let caption = document.createElement('div');
    let card_url = item.url;
   
    //add styling and add class names to the elements. They can be referenced by class names.
    div.setAttribute('class', 'rowClass');
    div.style.display = "inline-block"
    div.style.textAlign = "center"
    div.style.margin = "1%"
    col.setAttribute('class', 'column');
    card.setAttribute('class', 'card');
    card.setAttribute('href', card_url);
    
    //if there is no image of the pet, load the noImage photo as the card image
    if(!`${item.photos}`){
        image.setAttribute('src', "images/noImage.jpg" );  
    }
    //otherwise, use the first photo available for the pet image
    else
    {  
        image.setAttribute('src', item.photos[0].medium);
        image.src = item.photos[0].medium;
    }
   
    //add the image attribute 
    image.setAttribute('alt', `image of ${item.name}`);
    image.style.width = "100%";
    image.setAttribute('class', 'card-img-top img-fluid');

    //add class name to the container element. Make the pet name color black
    container.setAttribute('class', 'container card-body' );
    h3.style.color = "black"
    h3.innerHTML = item.name;

    //add the pet description to the title element 
    caption.setAttribute('class', 'description');
    caption.innerHTML = item.description;
    title.style.fontSize ="small"
    title.style.textAlign = "center"
    title.innerHTML = item.name

    //html layout will be contained as follows 
    //<div "column"> => <a "card"> => <img>, <div container card-body> => <h3 petName>, <div "description"
    div.append(col);
    col.append(card);
    card.append(image);
    card.append(container);
    container.append(h3);
    container.append(caption);

    result.style.textAlign = "center"
    result.append(div);

}

//data will be displayed to the home page
app.use('/', router);

//for testing locally, application can be opened at localhost using node app.js
app.listen(process.env.PORT || 8080, () => {
    console.log('Example app listening at http://localhost:8080');
});