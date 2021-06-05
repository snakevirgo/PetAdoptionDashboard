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

router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/home.html'));
  });
  
router.get('/search',function(req,res){
    res.sendFile(path.join(__dirname+'/search.html'));
});

router.get('/about',function(req,res){
    res.sendFile(path.join(__dirname+'/about.html'));
});
  

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
                    // console.log(val);
                    // if (val.name === 'sdf') {
                    addToDOM('div', val);
                
                    // }
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
    let div = document.createElement(element);
    let col = document.createElement('div');
    let container = document.createElement('div');
    // let card = document.createElement('div');
    let card = document.createElement('a');

  
    
    let card_body = document.createElement('card-body')
    let image = document.createElement('img');
    let h3 = document.createElement('h3');
    let title = document.createElement('card-title');
    let caption = document.createElement('div');
    let card_url = item.url;
   
   
    div.setAttribute('class', 'rowClass');
    div.style.display = "inline-block"
    div.style.textAlign = "center"
    div.style.margin = "1%"
    col.setAttribute('class', 'column');
    card.setAttribute('class', 'card');
    card.setAttribute('href', card_url);

    if(!`${item.photos}`){
       
        image.setAttribute('src', "images/noImage.jpg" );
       
    }
    else
    {
        
        image.setAttribute('src', item.photos[0].medium);
        image.src = item.photos[0].medium;
    }
   
    image.setAttribute('alt', `image of ${item.name}`);
    image.style.width = "100%";
    image.setAttribute('class', 'card-img-top img-fluid');

    container.setAttribute('class', 'container card-body' );
    h3.style.color = "black"
    h3.innerHTML = item.name;

    caption.setAttribute('class', 'description');
    // caption.style.color = "black"
    caption.innerHTML = item.description;
    title.style.fontSize ="small"
    title.style.textAlign = "center"
    title.innerHTML = item.name

    div.append(col);
    col.append(card);
    card.append(image);
    card.append(container);
    container.append(h3);
    container.append(caption);


    result.style.textAlign = "center"
    result.append(div);

}

app.use('/', router);

app.listen(process.env.PORT || 8080, () => {
    console.log('Example app listening at http://localhost:8080');
});