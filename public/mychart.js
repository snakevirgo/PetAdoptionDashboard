const searchBar = document.getElementById('searchBar');
let dataY = [];


function submitContent()
{
   let temp = document.getElementById('searchBar').value;
   const city = temp.charAt(0).toUpperCase() + temp.slice(1);
   console.log(city);
  // console.log(searchString);
  // return searchString;


/// { org_id : 2, orgia_id_1: 1 }

let url = "http://localhost:8080/jsonDATA";
async function getPets() {
  var pets = {};
  var catDataByLocation = {};
  var dogDataByLocation = {};
  var petDataByType = {};


  const response = await fetch(url);
  const dataY = await response.json();
        // .then(response => response.json())
        // .then(data => console.log(data))
        // .then(function(data){
  // console.log(dataY);
 
  dataY.forEach((item) => {
        if(item.contact.address.city === city){

        if(pets[item.organization_id]) {
          pets[item.organization_id] += 1;
        } else {
          pets[item.organization_id] = 1;
        } 
        
      }
      
    
    });

  // console.log("This is the organization data");
  // console.log(pets);
    
  //get data for the breeds of cats and dogs
  dataY.forEach((item) => {
    if(item.contact.address.city == city){
        
      //Store cat breeds at this location into catDataByLocation
      if(item.type == 'Cat') {
        if(item.breeds.primary != null) {
          if(catDataByLocation[item.breeds.primary])
            catDataByLocation[item.breeds.primary] += 1;
          else
            catDataByLocation[item.breeds.primary] = 1;
        }


        if(item.breeds.secondary != null) {
          if(catDataByLocation[item.breeds.secondary])
            catDataByLocation[item.breeds.secondary] += 1;
          else
            catDataByLocation[item.breeds.secondary] = 1;
        }

      }

      //Store dog breeds at this location into dogDataByLocation
			if(item.type == 'Dog') {

        if(item.breeds.secondary != null) {
          if(dogDataByLocation[item.breeds.primary])
					  dogDataByLocation[item.breeds.primary] += 1;
				  else
				    dogDataByLocation[item.breeds.primary] = 1;   
        }

        
        if(item.breeds.secondary != null) {
          if(dogDataByLocation[item.breeds.secondary])
					  dogDataByLocation[item.breeds.secondary] += 1;
				  else
					  dogDataByLocation[item.breeds.secondary] = 1;
        }
			}
    }
  });
  // console.log("This is the cat data");
	// console.log(catDataByLocation);


  //Bar graph for pets by types
  dataY.forEach((item) => {
    if(item.contact.address.city === city){

      if(petDataByType[item.type]) 
        petDataByType[item.type] += 1;
      else 
        petDataByType[item.type] = 1;
    } 

  });
  

    
var options = {
  responsive: true,
  title: {
    display: true,
    position: "top",
    text: "Pet Rescue Organizations in City of " + city,
    fontSize: 18,
    fontColor: "#111"
  },
  legend: {
    display: true,
    position: "right",
    
    labels: {
      fontColor: "#333",
      fontSize: 16,
      padding: 10
      
    }
  }
};
  console.log(pets);

  var colors = [];
  var borderColors = [];
 
 
  // if(pets == {} ){
  //   console.log("Sorry!");
  //   var chart = document.getElementById("myChart").getContext("2d");
  // }
  // else{
  const result = pets;
  Object.keys(result).forEach((_) => {
    colors.push('#'+Math.floor(Math.random()*16777215).toString(16));
    borderColors.push('#'+Math.floor(Math.random()*16777215).toString(16));
    
  });
  
var pieData = {
  labels :  Object.keys(result),
  datasets: [{
      data: Object.values(result),
      backgroundColor:colors,
      // borderColor: colors,
      hoverOffset: 4,
      hoverBorderWidth:3
  }]
};

// Get the context of the canvas element we want to select

var chart = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(chart, {
  type: 'doughnut',
  data: pieData,
  options: options

});



const catBreedResults = catDataByLocation;
const dogBreedResults = dogDataByLocation;
const petTypeResults = petDataByType;

// BAR GRAPHS FOR DIFFERENT TYPES //

let backgroundColors = [
  'rgba(54, 162, 235, 0.8)',
  'rgba(255, 206, 86, 0.8)',
  'rgba(255, 99, 132, 0.8)',
  'rgba(75, 192, 192, 0.8)',
  'rgba(153, 102, 255, 0.8)',
  'rgba(255, 159, 64, 0.8)',
  'rgba(199, 199, 199, 0.8)',
  'rgba(83, 102, 255, 0.8)',
  'rgba(40, 159, 64, 0.8)',
  'rgba(210, 199, 199, 0.8)',
];

let backgroundColors2 = [
  '#f9d5e5',
  '#eeac99',
  '#e06377',
  '#c83349',
  '#5b9aa0',
  '#d6d4e0',
  '#b8a9c9',
  '#622569',
];



//Cat breed bar graph
var catBreedBarData = {
	labels :  Object.keys(catBreedResults),
	datasets: [{
		data: Object.values(catBreedResults),
    borderColor: colors,
    backgroundColor: colors,
    borderWidth: 1,
    barPercentage: 0.5,
    barThickness: 3,
    maxBarThickness: 4,
    minBarLength: 2,
	}]
};

var ctx1 = document.getElementById('catBreedBar').getContext('2d');
var catBreedChart = new Chart(ctx1, {
  type: 'bar',
	data: catBreedBarData,
	options: {
    responsive: true,
    title: {
      display: true,
      position: "top",
      text: "Cats by Breeds in " + city,
      fontSize: 18,
      fontColor: "#111"
    },
    legend: {
      display: false
    }
  }

});

//Dog breed bar graph
var dogBreedBarData = {
	labels :  Object.keys(dogBreedResults),
	datasets: [{
		data: Object.values(dogBreedResults),
    borderColor: colors,
    backgroundColor: colors,
    borderWidth: 1,
    barPercentage: 0.5,
    barThickness: 6,
    maxBarThickness: 8,
    minBarLength: 2
	}]
};

var ctx2 = document.getElementById('dogBreedBar').getContext('2d');
var catBreedChart = new Chart(ctx2, {
  type: 'bar',
	data: dogBreedBarData,
	options: {
    responsive: true,
    title: {
      display: true,
      position: "top",
      text: "Dogs by Breeds in " + city,
      fontSize: 18,
      fontColor: "#111"
    },
    legend: {
      display: false
    }
  }
});

//Pets by type bar graph
var petsByTypeData = {
	labels :  Object.keys(petTypeResults),
	datasets: [{
		data: Object.values(petTypeResults),
    borderColor: colors,
    backgroundColor: colors,
    borderWidth: 1,
    barPercentage: 0.5,
    barThickness: 6,
    maxBarThickness: 4,
    minBarLength: 2
	}]
};

var ctx3 = document.getElementById('petTypeBar').getContext('2d');
var petTypeChart = new Chart(ctx3, {
  type: 'bar',
	data: petsByTypeData,
	options: {
    responsive: true,
    title: {
      display: true,
      position: "top",
      text: "Pets by Type in " + city,
      fontSize: 18,
      fontColor: "#111"
    },
    legend: {
      display: false
    }
  }
});

// }    //else comment             
 

//Adding Bargraph cat and dog breed data to be displayed


}


// search bar 
getPets(city);
}


