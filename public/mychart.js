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

  const response = await fetch(url);
  const dataY = await response.json();
        // .then(response => response.json())
        // .then(data => console.log(data))
        // .then(function(data){
  console.log(dataY);
 
  dataY.forEach((item) => {
        if(item.contact.address.city === city){

        if(pets[item.organization_id]) {
          pets[item.organization_id] += 1;
        } else {
          pets[item.organization_id] = 1;
        } 
         
      }
      
    
    }); 
  

    
var options = {
  responsive: true,
  title: {
    display: true,
    position: "bottom",
    text: "Pet Rescue Organizations in City of " + city,
    fontSize: 18,
    fontColor: "#111"
  },
  legend: {
    display: true,
    position: "top",
    
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
      offset: 2,
      hoverOffset: 5,
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


// }    //else comment             
 





}


// search bar 
getPets(city);
}


