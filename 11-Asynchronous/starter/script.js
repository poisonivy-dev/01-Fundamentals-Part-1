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
  countriesContainer.style.opacity = 1;
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

//FETCH DOES THE SAME TASK AS MAKING A REQUEST
const request = fetch('https://restcountries.com/v3.1/name/pakistan');
// THE FETCH API RETURNS A PROMISE -- ALSO CALLED BUILDING A PROMISE
console.log(request);

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
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbor = data[0].borders[0];
      if (!neighbor) return;

      return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data[0], 'neighbour'));
};
getCountryData('pakistan');
