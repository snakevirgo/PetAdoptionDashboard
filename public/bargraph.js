// console.log("Testing data display on console")
// const displayPets = () => {
//     fetch("http://localhost:8080/jsonDATA")
//         .then(response => response.json()).then(data => console.log(data));
// }

// displayPets();



//Bargraph.js uses JSONP to get data
//Button is added in "bargraph html" with event listener for zip code searches
//Bargraph.html was previously 'results.html' and can be changed back after testing.


// const fetch = require('node-fetch');
// const express = require('express');
// const jsdom = require("jsdom");
// const fs = require('fs');
// require('dotenv').config();

// const { JSDOM } = jsdom;// functions that gets data from petfinder api

// var page_template = fs.readFileSync('bargraph.html','utf-8');
// const dom = new JSDOM( page_template, 
//                         {
//                             contentType: "text/html",
//                             pretendToBeVisual: true,
//                         });

let url = "http://localhost:8080/results";

async function getPets(city) {
	var catDataByLocation = {};
	var dogDataByLocation = {};
  
	const response = await fetch(url);
	const petData = await response.json();
		  // .then(response => response.json())
		  // .then(data => console.log(data))
		  // .then(function(data){
	// console.log(data);
	petData.forEach((item) => {
		if(item.contact.address.city == city){
			
			//Store cat breeds at this location into catDataByLocation
			if(item.type == 'Cat') {
				if(catDataByLocation[item.type.primary])
					catDataByLocation[item.type.primary] += 1;
				else
					catDataByLocation[item.type.primary] = 1;
				
				if(catDataByLocation[item.type.secondary])
					catDataByLocation[item.type.secondary] += 1;
				else
					catDataByLocation[item.type.secondary] = 1;
			}

			//Store dog breeds at this location into dogDataByLocation
			if(item.type == 'Dog') {
				if(dogDataByLocation[item.type.primary])
					dogDataByLocation[item.type.primary] += 1;
				else
					dogDataByLocation[item.type.primary] = 1;
				
				if(dogDataByLocation[item.type.secondary])
					dogDataByLocation[item.type.secondary] += 1;
				else
					dogDataByLocation[item.type.secondary] = 1;
			}
		}
	}); 
	// console.log("This is the cat data");
	// console.log(catDataByLocation);
	// console.log("This is the dog data");
	// console.log(dogDataByLocation);

	//Store cat breed data and dog breed data
	const catBreedResults = catDataByLocation;
	const dogBreedResults = dogDataByLocation;


var catBreedBarData = {
	labels :  Object.keys(catBreedResults),
	datasets: [{
		data: Object.values(catBreedResults),
	}]
};

var dogBreedBarData = {
	labels :  Object.keys(dogBreedResults),
	datasets: [{
		data: Object.values(dogBreedResults),
		backgroundColor:colors,
		borderColor: [
			'rgb(255, 99, 132)',
			'rgb(255, 159, 64)',
			'rgb(255, 205, 86)',
			'rgb(75, 192, 192)',
			'rgb(54, 162, 235)',
			'rgb(153, 102, 255)',
			'rgb(201, 203, 207)'
	  	],
	}]
};


// const catLabels = Object.keys(catDataByLocation);
const catData = {
	labels: catLabels,
	datasets: [{
    	label: 'Cats by Breed Bar Graph',
    	data: Object.values(catDataByLocation),

    	borderColor: [
      		'rgb(255, 99, 132)',
      		'rgb(255, 159, 64)',
      		'rgb(255, 205, 86)',
      		'rgb(75, 192, 192)',
      		'rgb(54, 162, 235)',
      		'rgb(153, 102, 255)',
      		'rgb(201, 203, 207)'
    	],
    	borderWidth: 1
  	}]
};

var ctx1 = document.getElementById('catBreedChart').getContext('2d');
var catBreedChart = new Chart(ctx1, {
    type: 'bar',
	data: catData,
	options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const dogLabels = Object.keys(dogDataByLocation);
const dogData = {
	labels: dogLabels,
	datasets: [{
    	label: 'Dogs by Breed Bar Graph',
    	data: Object.values(dogDataByLocation),
    	backgroundColor: [
      		'rgba(255, 99, 132, 0.2)',
			'rgba(255, 205, 86, 0.2)',
			'rgba(255, 159, 64, 0.2)',
      		'rgba(75, 192, 192, 0.2)',
      		'rgba(54, 162, 235, 0.2)',
      		'rgba(153, 102, 255, 0.2)',
      		'rgba(201, 203, 207, 0.2)'
    	],
    	borderColor: [
      		'rgb(255, 99, 132)',
      		'rgb(255, 159, 64)',
      		'rgb(255, 205, 86)',
      		'rgb(75, 192, 192)',
      		'rgb(54, 162, 235)',
      		'rgb(153, 102, 255)',
      		'rgb(201, 203, 207)'
    	],
    	borderWidth: 1
  	}]
};

var ctx2 = document.getElementById('dogBreedChart').getContext('2d');
var dogBreedChart = new Chart(ctx2, {
    type: 'bar',
	data: dogData,
	options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

}

getPets('Portland');





// const { document } = dom.window;

// const secret_key = process.env.SECRET_KEY;
// var apiKey = process.env.KEY; // assign our key to a variable, easier to read

// // the next line and function set up the button in our html to be clickable and reactive 
// document.addEventListener('DOMContentLoaded', bindButtons);

// function bindButtons(){
// 	document.getElementById('submitZip').addEventListener('click', function(event){
// 		event.preventDefault();
// 		var zip = document.getElementById('zip').value; // this line gets the zip code from the form entry
// 		var url = 'http://api.petfinder.com/pet.getRandom';
		
// 		// Within $.ajax{...} is where we fill out our query 
// 		$.ajax({
// 			url: url,
// 			jsonp: "callback",
// 			dataType: "jsonp",
// 			data: {
// 				key: apiKey,
// 				animal: 'cat',
// 				'location': zip,
// 				output: 'basic',
// 				format: 'json'
// 			},
// 			// Here is where we handle the response we got back from Petfinder
// 			success: function( response ) {
// 				console.log(response); // debugging
// 				var catName = response.petfinder.pet.name.$t;
// 				var img = response.petfinder.pet.media.photos.photo[0].$t;
// 				var id = response.petfinder.pet.id.$t;

// 				var newName = document.createElement('a');
// 				var newDiv = document.createElement('div');
// 				newName.textContent = catName;
// 				newName.href = 'https://www.petfinder.com/petdetail/' + id;

// 				var newImg = document.createElement('img');
// 				newImg.src = img;
				
// 				var list = document.createElement("div");
// 				list.setAttribute("id", "List");
// 				document.body.appendChild(list);

// 				newDiv.appendChild(newName);
// 				list.appendChild(newDiv);
// 				list.appendChild(newImg);
// 			}
// 		});
// 		})

// }


// // app.listen(8080, () => {
// //     console.log('Example app listening at http://localhost:8080');
// //   });

