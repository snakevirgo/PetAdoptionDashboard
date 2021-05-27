// chart
// function loaded(){
//define a function 
// declare const pet[]
//fontend - make an object, store all info i need in a dictionary, map from organization to pets, display
// const pets=[]
// const fetch = require('node-fetch');
// require('dotenv').config();
// const secret_key = process.env.SECRET_KEY;
// const key = process.env.KEY;
// fetch('https://api.petfinder.com/v2/oauth2/token', {
//     method: 'POST',
//     body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret_key,
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//     }
// }).then(function (resp) {

//     // Return the response as JSON
//     return resp.json();

// }).then(function (data) {

//     // Log the API data
//     // console.log('token', data);

//     // Store token data
//     token = data.access_token;
//     token_type = data.token_type;
//     expires = new Date().getTime() + (data.expires_in * 1000);

//     fetch('https://api.petfinder.com/v2/animals', {
//         headers: {
//             'Authorization': token_type + ' ' + token,
//             'Content-Type': 'application/x-www-form-urlencoded'
//         }
    

//         }).then(function (resp) {

//             // Return the API response as JSON
//             return resp.json();

//         }).then(function (data) {
//             DATA = data.animals;
//             // Log the pet data
//             // your content will be here
//             data.animals.forEach(val => {
//                 console.log(val);
//                 // if (val.name === 'sdf') {
//                 // addToDOM('div', val);
//                 // }
//                 // 
//             });

//             // send back html dom to the browser
//             // dom will be the place to store html
//             // response.send(dom.serialize());
//         }).catch(function (err) {
//             // Log any errors
//             console.log('ERROR!! Something not working!', err);
//         });
// });

// fetch('http://localhost:8080/')
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(myJson) {
//     console.log(JSON.stringify(myJson));
//   });

console.log("hello world")
const getPets = () => {
    fetch("http://localhost:8080/jsonDATA")
        .then(response => response.json()).then(data => console.log(data));
}

getPets();


// async function getPets() {
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


// //legends
// var options = {
//   responsive: true,
//   title: {
//     display: true,
//     position: "top",
//     text: "Doughnut Chart",
//     fontSize: 18,
//     fontColor: "#111"
//   },
//   legend: {
//     display: true,
//     position: "bottom",
//     labels: {
//       fontColor: "#333",
//       fontSize: 16
//     }
//   }
// };



// async function theChart () {
//   var colors = [];
//   var borderColors = [];
//   var result  = await getPets();
//   Object.keys(result).forEach((_) => {
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