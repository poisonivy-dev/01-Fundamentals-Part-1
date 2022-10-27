'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
//----------------------------ASYNCHRONOUS JS---------------------------
/*
    1.To do long running tasks that run in the background
    2.task runs in the background. When task finishes then the asynchronous code is executed
    Example: callback with timer (not all callbacks are asynchronous)
    setting src attribute in images are asynchronous
    USE CASE: fetch data from remote servers, AJAX calls

    MAKING AJAX CALLS TO APIS
    AJAX :  (ASYNCHRONOUS JS AND XML)  allows us to communicate with web servers in asynchronous way. With AJAX calls, we can request data from web servers dynamically.
    
    API: piece of software that can be used by another piece of software in order to talk to each other
*/

//XML HTTP REQUEST FUNCTION
//OLD WAY

//function to add html
const renderCountry = function (data, className = '') {
  const html = `<article class="country ${className}">
    <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}M people</p>
      <p class="country__row"><span>🗣️</span>${
        Object.values(data.languages)[0]
      }</p>
      <p class="country__row"><span>💰</span>${
        Object.values(data.currencies)[0].name
      }</p>
    </div>
  </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
};

//RENDER ERROR
const renderError = function (err) {
  countriesContainer.innerHTML = '';
  countriesContainer.insertAdjacentText(
    'beforeend',
    `Something went wrong ... ${err.message}`
  );
};
const checkForNoData = function (response) {
  if (!response.ok) throw new Error(`Country not found (${response.status})`);
  return response.json();
};

//main request handler
const getCountryAndNeighbor = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  //cannot do : data = request,send()
  //Register callback for load event
  request.addEventListener('load', function () {
    console.log(this.responseText);
    //destructuring
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    renderCountry(data);

    //Get neighbor
    const [neighbor] = data.borders;
    if (!neighbor) return;

    //AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbor}`);
    request2.send();

    request2.addEventListener('load', function () {
      console.log(this.responseText);
      //destructuring
      const [data] = JSON.parse(this.responseText);
      console.log(data);
      renderCountry(data, 'neighbour');
    });
  });
};

//data can't be in SAME order --TRY RELOADING PAGE
// getCountryAndNeighbor('pakistan');
// getCountryAndNeighbor('usa');
// getCountryAndNeighbor('india');

//-----------------SEQUENCE OF AJAX CALLS--------------------------//
//we have to put second request inside first
//also called callback hell - not easy to understand and reason
// setTimeout(function () {
//   console.log('1 second passed');
//   setTimeout(function () {
//     console.log('2 second passed');
//     setTimeout(function () {
//       console.log('3 second passed');
//       setTimeout(function () {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

//---------------------------PROMISES AND THE FETCH API---------------//

//ES6 FEATURE

// //FETCH DOES THE SAME TASK AS MAKING A REQUEST
// const request = fetch('https://restcountries.com/v3.1/name/pakistan');
// // THE FETCH API RETURNS A PROMISE -- ALSO CALLED BUILDING A PROMISE
// console.log(request);

/*
A PROMISE IS AN OBJECT THAT IS USED AS A PLACEHOLDER FOR THE FUTURE RESULT OF AN ASYNCHRONOUS OPERATION

WE NO LONGER NEED TO RELY ON EVENTS AND CALLBACKS PASSED INTO ASYNC FUNCTIONS TO HANDLE ASYNC RESULTS

INSTEAD OF NESTING CALLBACKS, WE CAN CHAIN PROMISES FOR A SEQUENCE OF ASYNC OPERATIONS ESCAPING CALLBACK HELL
*/

/*
-------------------------------STATES OF PROMISES------------------------
WE HAVE DIFFERENT STATES
PENDING -> BEFORE FUTURE VALUE IS AVAILABLE
SETTLED : FINISHED -->VAL AVAILABLE , REJECTED--> ERR HAPPENED 
PROMISES ARE ONLY SETTLED ONCE
*/

//--------CONSUMING PROMISE----------------//

//then() function handles the response on promise
//runs as soon as promise is available
//accepts function as arg
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (
//       response //fulfilled value here
//     ) {
//       console.log(response);
//       //in order to read value, we have to call json() function on response

//       //json() is also an asynchronous function and returns a promise

//       return response.json();
//     })
//     .then(function (data) {
//       //calling then on the returned promise
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// ARROW FUNCTION VERSION
const getCountryData = function (country) {
  //flat chain of promises
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => checkForNoData(response))
    .then(data => {
      countriesContainer.innerHTML = '';
      renderCountry(data[0]);
      const neighbor = data[0].borders?.[0];
      if (!neighbor) throw new Error('Country not found');

      return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`);
    })
    .then(response => checkForNoData(response))
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      //promise is rejected when no internet is available
      renderError(err);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('usa');
});

//-------------HANDLING REJECTED PROMISES---------//

/*
REJECTED PROMISES CAN BE HANDLED BY PASSING IN ANOTHER FUNCTION TO THE then() function

we can add a catch() function at the end that acts as a global err handler

finally() function runs no matter promise is fulfilled or rejected
*/

// WITH ERROR 404 -- FETCH PROMISE IS STILL FULFILLED AND CATCH BLOCK CANNOT PICK UP THIS KIND OF ERROR

//---------------MANUALLY THROWING ERRORS-----------
//PROMISE STAGE IS SET FULFILLED WHEN WE ENCOUNTER ERRORS LIKE 404
//CATCH BLOCK IS NOT EXECUTED
//WE HAVE TO MANUALLY THROW ERROR AND MAKE PROMISE SET TO REJECTED STAGE
//ONLY THEN, CATCH() WILL GET EXECUTED
//NOTE: Any error will cause error to reject, causing execution of catch()
//SYNTAX: new throw Error(message);

//-----------------------------CODING CHALLENGE 1---------------//
/*
In this challenge you will build a function 'whereAmI' which renders a country 
only based on GPS coordinates. For that, you will use a second API to geocode 
coordinates. So in this challenge, you’ll use an API on your own for the first time 
Your tasks:
PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat') 
and a longitude value ('lng') (these are GPS coordinates, examples are in test 
data below).
2. Do “reverse geocoding” of the provided coordinates. Reverse geocoding means 
to convert coordinates to a meaningful location, like a city and country name. 
Use this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call 
will be done to a URL with this format: 
https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and 
promises to get the data. Do not use the 'getJSON' function we created, that 
is cheating 
3. Once you have the data, take a look at it in the console to see all the attributes 
that you received about the provided location. Then, using this data, log a 
message like this to the console: “You are in Berlin, Germany”
4. Chain a .catch method to the end of the promise chain and log errors to the 
console
5. This API allows you to make only 3 requests per second. If you reload fast, you 
will get this error with code 403. This is an error with the request. Remember, 
fetch() does not reject the promise in this case. So create an error to reject 
the promise yourself, with a meaningful error message
PART 2
6. Now it's time to use the received data to render a country. So take the relevant 
attribute from the geocoding API result, and plug it into the countries API that 
we have been using.
7. Render the country and catch any errors, just like we have done in the last 
lecture (you can even copy this code, no need to type the same code)
Test data:
§ Coordinates 1: 52.508, 13.381 (Latitude, Longitude)
§ Coordinates 2: 19.037, 72.873
§ Coordinates 3: -33.933, 18.474*/

// const whereAmI = function (lat, lng) {
//   const url = `https://geocode.xyz/${lat},${lng}?json=1`;
//   fetch(url)
//     .then(response => {
//       if (!response.ok) throw new Error(`Bad Request ${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(`You are in ${data.state},${data.country}`);
//       getCountryData(data.country);
//     })
//     .catch(err => {
//       console.log(`${err.message}`);
//     });
// };

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

//===============BEHIND THE SCENES OF ASYNC FUNCTION---------//
