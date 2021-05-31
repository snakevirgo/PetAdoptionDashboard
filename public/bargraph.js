console.log("Hello");

var options = {
	responsive: true,
	title: {
	  display: true,
	  position: "top",
	  text: "Doughnut Chart",
	  fontSize: 18,
	  fontColor: "#111"
	},
	legend: {
	  display: true,
	  position: "bottom",
	  labels: {
		fontColor: "#333",
		fontSize: 16
	  }
	}
};

let url = "http://localhost:8080/results";

async function getCatsDogs(city) {
	var catDataByLocation = {};
	// var dogDataByLocation = {};
  
	const response = await fetch(url);
	const petData = await response.json();
		  // .then(response => response.json())
		  // .then(data => console.log(data))
		  // .then(function(data){
	// console.log(data);
	petData.forEach((item) => {
		if(item.contact.address.city == city){
			
			//Store cat breeds at this location into catDataByLocation
			// if(item.breeds == 'Cat') {
				if(catDataByLocation[item.breeds.primary])
					catDataByLocation[item.breeds.primary] += 1;
				else
					catDataByLocation[item.breeds.primary] = 1;
				
				// if(catDataByLocation[item.breeds.secondary])
				// 	catDataByLocation[item.breeds.secondary] += 1;
				// else
				// 	catDataByLocation[item.breeds.secondary] = 1;
			// }

			//Store dog breeds at this location into dogDataByLocation
			// if(item.breeds == 'Dog') {
			// 	if(dogDataByLocation[item.breeds.primary])
			// 		dogDataByLocation[item.breeds.primary] += 1;
			// 	else
			// 		dogDataByLocation[item.breeds.primary] = 1;
				
			// 	if(dogDataByLocation[item.breeds.secondary])
			// 		dogDataByLocation[item.breeds.secondary] += 1;
			// 	else
			// 		dogDataByLocation[item.breeds.secondary] = 1;
			// }
		}
	}); 
	console.log("This is the cat data");
	console.log(catDataByLocation);
	// console.log("This is the dog data");
	// console.log(dogDataByLocation);

	var barGraphColors = [];
	var barGraphBorderColors = [];

	//Store cat breed data and dog breed data
	const catBreedResults = catDataByLocation;
	// const dogBreedResults = dogDataByLocation;
	Object.keys(catBreedResults).forEach((_) => {
		barGraphColors.push('#'+Math.floor(Math.random()*16777215).toString(16));
		barGraphBorderColors.push('#'+Math.floor(Math.random()*16777215).toString(16));
	});


var catBreedBarData = {
	labels :  Object.keys(catBreedResults),
	datasets: [{
		data: Object.values(catBreedResults),
    	backgroundColor: barGraphColors,
		borderColor: barGraphBorderColors,
    	borderWidth: 1
	}]
};

var ctx1 = document.getElementById('myChart').getContext('2d');
var catBreedChart = new Chart(ctx1, {
    type: 'bar',
	data: catBreedBarData,
	options: options
});

// var dogBreedBarData = {
// 	labels :  Object.keys(dogBreedResults),
// 	datasets: [{
// 		data: Object.values(dogBreedResults),
//     	backgroundColor: [
// 			'rgba(255, 99, 132, 0.2)',
// 		  'rgba(255, 205, 86, 0.2)',
// 		  'rgba(255, 159, 64, 0.2)',
// 			'rgba(75, 192, 192, 0.2)',
// 			'rgba(54, 162, 235, 0.2)',
// 			'rgba(153, 102, 255, 0.2)',
// 			'rgba(201, 203, 207, 0.2)'
// 	  	],
// 		borderColor: [
// 			'rgb(255, 99, 132)',
// 			'rgb(255, 159, 64)',
// 			'rgb(255, 205, 86)',
// 			'rgb(75, 192, 192)',
// 			'rgb(54, 162, 235)',
// 			'rgb(153, 102, 255)',
// 			'rgb(201, 203, 207)'
// 	  	],
// 	}]
// };

// var ctx2 = document.getElementById('dogBreedChart').getContext('2d');
// var dogBreedChart = new Chart(ctx2, {
//     type: 'bar',
// 	data: dogBreedBarData,
// 	options: {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         }
//     }
// });

}

getCatsDogs('Seattle');





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

