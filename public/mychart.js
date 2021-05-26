// chart
// function loaded(){
  // URL to Game of Thrones API to fetch all characters
let url = 'https://thronesapi.com/api/v2/Characters';

async function getHouses() {
  var result = {};
  const count = {};
  const response = await fetch(url);
  const data = await response.json();
  data.forEach((item) => {
      if(count[`${item.family}`]) {
        count[`${item.family}`] +=1
       }
       else {
          count[`${item.family}`] = 1
       }
    })

     Object.keys(count).forEach((key) => {
      const number = count[key]
      if (number >= 2 || key === 'None') {
        result[key] = count[key]
      } 
    });

    return result

}


//legends
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



async function theChart () {
  var colors = [];
  var borderColors = [];
  var result  = await getHouses();
  Object.keys(result).forEach((_) => {
    colors.push('#'+Math.floor(Math.random()*16777215).toString(16));
    borderColors.push('#'+Math.floor(Math.random()*16777215).toString(16));
  });
  
var doughnutData = {
  labels :  Object.keys(result),
  datasets: [{
      data: Object.values(result),
      backgroundColor:colors,
      borderColor: colors
  }]
};

console.log(doughnutData);
// Get the context of the canvas element we want to select
var chart = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(chart, {
  type: 'doughnut',
  data: doughnutData,
  options: options,

});
}

theChart();