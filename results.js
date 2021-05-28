// let url = 'https://api.petfinder.com/v2/animals'

// document.addEventListener('DOMContentLoaded', () => {
//     document.getElementById('submit').addEventListener('click', sendRequest);
// });

// let sendRequest = (ev) => {
//     let usertoken = JSON.stringify('eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJWMzZqVmhOc2o3MjBmbk9VaGN4bENjNXlQcHdseU44aEtLdlJLTlFGWVBTMHhhYVVjUiIsImp0aSI6IjhmMGY1ODRlYTBlZjg0MGY2NDYyMzEyYWQzNWIwODIzMjlhMGMyNDVmY2NiYTY3MDI0MGY2Mzg4ODIxYzcwMzZkNjkxYWIwNDUzY2JhYWM1IiwiaWF0IjoxNjIxNDkxNDAyLCJuYmYiOjE2MjE0OTE0MDIsImV4cCI6MTYyMTQ5NTAwMiwic3ViIjoiIiwic2NvcGVzIjpbXX0.CZrzndiR3WzYyNKW_HUSuyREqshhict7LQmKaNwoPqIbuIh1x699UxVmOO0EvQIJWKqGDyoEGu3H7prWGhLDN5Jqei-bsln24E8SL3b3VD9Jfr--bRxCx96JlVek9TkP6KhThEVqVE6khbjMUtIsxC-6SA39Y5j78XffEWiH6fqh-xpWk_WfmOe2XyNkDnybupcEwlo_s2E_IZBx_LqS5sOF4ug8SDmc8oQgWGaj6fMp5VrQG7O9I6-xb3B-uRQV-4-Ktl-VenemD0Ey7ZmS2XxGLdOYPheMBnSMN7BZIWCakkHfpQp4V4kOItkAAIFEcn7FrrdeoPNar73WMaQeBA')
    
//     let h = new Headers();
//     let token = JSON.parse(usertoken);
//     h.append('Authorization', `Bearer ${token}`);

//     let request = new Request(url, {
//         method: 'GET',
//         mode: 'same-origin',
//         headers: h
//     });

//     fetch(request)
//         .then(response => response.json())
//         .then(data => {
//             console.log(data[0]);
//         })
//         .catch(err => {
//             console.error(err.message);
//         })

//   }



//declare fetch
const fetch = require('node-fetch');
const express = require('express');
const jsdom = require("jsdom");
const fs = require('fs');
require('dotenv').config();
const secret_key = process.env.SECRET_KEY;
const key = process.env.KEY;
const app = express();

const { JSDOM } = jsdom;// functions that gets data from petfinder api

var page_template = fs.readFileSync('results.html','utf-8');
const dom = new JSDOM( page_template, 
                        {
                            contentType: "text/html",
                            pretendToBeVisual: true,
                        });

const { document } = dom.window;

let result = document.getElementById('results');

// Variables parameters: organization and type
let org = 'RI77';
let type = 'Dog';
let postcode = '97007';


var DATA = [];
app.get('/', (request, response) => {
    fetch('https://api.petfinder.com/v2/oauth2/token', {
        method: 'POST',
        body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret_key,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function (resp) {

        // Return the response as JSON
        return resp.json();

    }).then(function (data) {

        // Log the API data
        // console.log('token', data);

        // Store token data
        token = data.access_token;
        token_type = data.token_type;
        expires = new Date().getTime() + (data.expires_in * 1000);

        // GET https://api.petfinder.com/v2/animals/type=Dog/
        //iris code
        //fetch('https://api.petfinder.com/v2/animals?organization=' + org + '&type=' + type, {


        fetch('http://api.petfinder.com/pet.getRandom?key=' + key + '&animal=cat&location=' + postcode + '&output=basic&format=json&callback=?', {
            headers: {
                'Authorization': token_type + ' ' + token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        

            }).then(function (resp) {

                // Return the API response as JSON
                // console.log(resp);
                console.log(resp.json());

                return resp.json();

            }).then(function (data) {
                DATA = data.animals;
                console.log(data);

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


app.get('/results', (request, response) => {
    response.send(DATA);
});

// let addToDOM = ( element, item) => {
//     // let par = document.createElement('par');
//     let div = document.createElement(element);
//     let image = document.createElement('img');
//     let caption = document.createElement('textarea') // <textarea></
//     let title = document.createElement('label') // <label></label>
//     div.style.display = "inline-block"
//     div.style.textAlign = "center"
//     div.style.margin = "1%"
//     div.onmouseover = function() {
//         this.style.backgroundColor = 'black';
//         this.style.color = 'white';
//     };
//     div.onmouseout = function() {
//         this.style.backgroundColor = 'transparent';
//         this.style.color = 'black';
//     }
//     image.src = item.photos[0].medium
//     // image.height = "300"
//     // image.width = "240"
//     caption.innerHTML = item.description
//     console.log(item.description)
//     title.style.fontSize ="small"
//     title.style.textAlign = "center"
//     title.innerHTML = item.name
    

//     div.append(image)  
//     div.append(document.createElement('br'));
//     div.append(title)
//     div.append(document.createElement('br'));
//     div.append(caption)    


     
//     result.append(div);

    
// }

app.listen(8080, () => {
    console.log('Example app listening at http://localhost:8080');
  });




  




  