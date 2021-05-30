const searchBar = document.getElementById('searchBar');
let dataY = [];

function submitContent()
{
   const city = document.getElementById('searchBar').value;
  // console.log(searchString);
  // return searchString;

// searchBar.addEventListener('keyup', (e) => {
//   // console.log(e.target.value);
//   const inputString = e.target.value;
//   const filteredOrgs = Object.keys(pets).filter( (org) => {
//     return(
//        org.contact.address.city.includes(inputString)
//     );
//   });
//   console.log(filteredOrgs);
// });

// const city = searchBar.addEventListener('keyup', (e) => {
//     // console.log(e.target.value);
//     const searchString = e.target.value;
//     // const filteredPet = dataY.filter( eachPet => {
//     //   return eachPet.contact.address.city.includes(searchString);
//     // });
//     // console.log(filteredPet);
//     return searchString;
// });

// const city = searchBar.addEventListener('keyup', (e) => {
//   console.log(e.target.value);
  
//   // const searchString = e.target.value;
//   // return searchString;
// });


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
        if(item.contact.address.city == city){

        if(pets[item.organization_id]) {
          pets[item.organization_id] += 1;
        } else {
          pets[item.organization_id] = 1;
        } 
         
      }
    }); 
  
    console.log(pets);

  var colors = [];
  var borderColors = [];
  // var result  = await getPets();
  const result = pets;
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

// Get the context of the canvas element we want to select
var chart = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(chart, {
  type: 'pie',
  data: doughnutData,
  options: options,

});
                    
                    // if( item.organization_id === "NJ333")
                    //     {
                    // console.log(
                    //         item.species
                    //         // item.contact.address.postcode
                        
                    //     );
                    // }

                    // pets = `${item.contact.address.postcode}`

                    // pets = data[0].contact.address.postcode;
                    // console.log(pets);
            

            // data.forEach((item) => {
            //     if(count[`${item.age}`]) {
            //       count[`${item.age}`] +=1
            //      }
            //      else {
            //         count[`${item.age}`] = 1
            //      }
            //   })
          
            //    Object.keys(count).forEach((key) => {
            //     const number = count[key]
            //     if (number >= 2 || key === 'None') {
            //       result[key] = count[key]
            //     } 
            //   });
          
            //   return result;
           
          

               

        // .then(data => {
           
        //     const petList = createPetList() 
        // })
}

// search bar 
getPets(city);
}

// module.exports = listings;

// let url = 'https://thronesapi.com/api/v2/Characters';

// async function getHouses() {
//   var result = {};
//   const count = {};
//   const response = await fetch(url);
//   const data = await response.json();
//   data.forEach((item) => {
//       if(count[`${item.family}`]) {
//         count[`${item.family}`] +=1
//        }
//        else {
//           count[`${item.family}`] = 1
//        }
//     })

//      Object.keys(count).forEach((key) => {
//       const number = count[key]
//       if (number >= 2 || key === 'None') {
//         result[key] = count[key]
//       } 
//     });

//     return result

// }


// legends




// async function theChart () {
//   var colors = [];
//   var borderColors = [];
//   var result  = await getPets();
//   result.forEach((_) => {
//     colors.push('#'+Math.floor(Math.random()*16777215).toString(16));
//     borderColors.push('#'+Math.floor(Math.random()*16777215).toString(16));
//   });
  
// var doughnutData = {
//   labels :  Object.keys(result),
//   datasets: [{
//       data: Object.values(result),
//       backgroundColor:colors,
//       borderColor: colors
//   }]
// };

// console.log(doughnutData);
// // Get the context of the canvas element we want to select
// var chart = document.getElementById("myChart").getContext("2d");
// var myChart = new Chart(chart, {
//   type: 'doughnut',
//   data: doughnutData,
//   options: options,

// });
// }

// theChart();