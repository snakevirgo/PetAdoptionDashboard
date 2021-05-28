// console.log("Testing data display on console")
// const displayPets = () => {
//     fetch("http://localhost:8080/jsonDATA")
//         .then(response => response.json()).then(data => console.log(data));
// }

// displayPets();



//Bargraph.js uses JSONP to get data
//Button is added in "bargraph html" with event listener for zip code searches
//Bargraph.html was previously 'results.html' and can be changed back after testing.


const fetch = require('node-fetch');
const express = require('express');
const jsdom = require("jsdom");
const fs = require('fs');
require('dotenv').config();

const { JSDOM } = jsdom;// functions that gets data from petfinder api

var page_template = fs.readFileSync('bargraph.html','utf-8');
const dom = new JSDOM( page_template, 
                        {
                            contentType: "text/html",
                            pretendToBeVisual: true,
                        });

const { document } = dom.window;

const secret_key = process.env.SECRET_KEY;
var apiKey = process.env.KEY; // assign our key to a variable, easier to read

// the next line and function set up the button in our html to be clickable and reactive 
document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons(){
	document.getElementById('submitZip').addEventListener('click', function(event){
		event.preventDefault();
		var zip = document.getElementById('zip').value; // this line gets the zip code from the form entry
		var url = 'http://api.petfinder.com/pet.getRandom';
		
		// Within $.ajax{...} is where we fill out our query 
		$.ajax({
			url: url,
			jsonp: "callback",
			dataType: "jsonp",
			data: {
				key: apiKey,
				animal: 'cat',
				'location': zip,
				output: 'basic',
				format: 'json'
			},
			// Here is where we handle the response we got back from Petfinder
			success: function( response ) {
				console.log(response); // debugging
				var catName = response.petfinder.pet.name.$t;
				var img = response.petfinder.pet.media.photos.photo[0].$t;
				var id = response.petfinder.pet.id.$t;

				var newName = document.createElement('a');
				var newDiv = document.createElement('div');
				newName.textContent = catName;
				newName.href = 'https://www.petfinder.com/petdetail/' + id;

				var newImg = document.createElement('img');
				newImg.src = img;
				
				var list = document.createElement("div");
				list.setAttribute("id", "List");
				document.body.appendChild(list);

				newDiv.appendChild(newName);
				list.appendChild(newDiv);
				list.appendChild(newImg);
			}
		});
		})

}


// app.listen(8080, () => {
//     console.log('Example app listening at http://localhost:8080');
//   });

