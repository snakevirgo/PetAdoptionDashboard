const searchBar = document.getElementById('searchBar');
const message = document.getElementsByClassName('extra-msg');
let dataY = [];
let count = 0;
let chart = document.getElementById("myChart").getContext("2d");


function submitContent() {

  //refresh the page every time when there's new input
  document.querySelector('.form-control')
  .addEventListener('click', () => {
     window.location.reload(true);
  })
  
  let temp = document.getElementById('searchBar').value;
  const city = temp.charAt(0).toUpperCase() + temp.slice(1);
 
  // get url from /jsonDATA
  let url = "/jsonDATA";
  async function getPets() {
    let pets = {};
    let catDataByLocation = {};
    let dogDataByLocation = {};
    let petDataByType = {};


    const response = await fetch(url);
    const dataY = await response.json();
        
    //check if city input is undefined
    if(city == undefined){
      console.log("Error, data undefined!");
    }
    
    //store data in pets[] for the donut chart
    dataY.forEach((item) => {
      if(item.contact.address.city === city){
        count += 1;
        if(pets[item.organization_id]) {
          pets[item.organization_id] += 1;
        } else {
          pets[item.organization_id] = 1;
        } 
      }
      else{
        count += 0;
      }
    });
   
    //if no city found then output error msg, else display charts and graphs
    if(count === 0) {
      message.innerHTML = "Sorry, no results found. Try again!"
    }
    else
    {
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
    }

    //Bar graph for pets by types
    dataY.forEach((item) => {
      if(item.contact.address.city === city){

        if(petDataByType[item.type]) 
          petDataByType[item.type] += 1;
        else 
          petDataByType[item.type] = 1;
      } 
    });

    let options = {};
    if(count === 0) {
      options = {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          position: "top",
          text: "Sorry, No Pet Rescue Organizations found in the City of " + city + " . Try again!",
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
    } else {
      options = {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          position: "top",
          text: "Pet Rescue Organizations in the City of " + city,
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
    }
  

    let colors = [];
    let borderColors = [];
 
    const result = pets;
    Object.keys(result).forEach((_) => {
      colors.push('#'+Math.floor(Math.random()*16777215).toString(16));
      borderColors.push('#'+Math.floor(Math.random()*16777215).toString(16));
    });
  
    let pieData = {
      labels :  Object.keys(result),
      datasets: [{
        data: Object.values(result),
        backgroundColor:colors,
        borderColor: colors,
        hoverOffset: 4,
        hoverBorderWidth:3
      }]
    };

    // Get the context of the canvas element we want to select
    let myChart = new Chart(chart, {
      type: 'doughnut',
      data: pieData,
      options: options
    });

    const catBreedResults = catDataByLocation;
    const dogBreedResults = dogDataByLocation;
    const petTypeResults = petDataByType;


    //Secondary color choice, currrently not used
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
    
    // BAR GRAPHS FOR DIFFERENT TYPES //

    //Cat breed bar graph
    let catBreedBarData = {
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

    let ctx1 = document.getElementById('catBreedBar').getContext('2d');
    let catBreedChart;

    // if there are any pets to display, make charts
    if(count != 0) {
      catBreedChart = new Chart(ctx1, {
        type: 'bar',
        data: catBreedBarData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
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
    }

    //Dog breed bar graph data
    let dogBreedBarData = {
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

    let ctx2 = document.getElementById('dogBreedBar').getContext('2d');
    let dogBreedChart;

    // if there are any pets to display, make charts
    if(count != 0) {
      dogBreedChart = new Chart(ctx2, {
        type: 'bar',
        data: dogBreedBarData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
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
    }

    //Pets by type bar graph
    let petsByTypeData = {
	    labels :  Object.keys(petTypeResults),
	    datasets: [{
		    data: Object.values(petTypeResults),
        borderColor: colors,
        backgroundColor: colors,
        borderWidth: 1,
        barPercentage: 0.5,
        barThickness: 4,
        maxBarThickness: 4,
        minBarLength: 2
	    }]
    };

    let ctx3 = document.getElementById('petTypeBar').getContext('2d');
    let petTypeChart;
    // if there are any pets to display, make charts
    if(count != 0) {
      petTypeChart = new Chart(ctx3, {
        type: 'bar',
        data: petsByTypeData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
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
    }     
  }

  // search bar 
  getPets(city);
}

