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
/*
HOW CAN ASYNCHRONOUS CODE BE EXECUTED IN A NON-BLOCKING WAY, IF THERE IS ONLY ONE THREAD OF EXECUTION?

THIS is because async tasks happen in the web api environment.The callback function is then queued to the callback stack.Event loop looks up in the call stack.if the stack is empty,it pushes the callback function there.

NOTE: addEventListener only registers callback in the web API environment.
*/

//TWO QUEUES FOR HANDLING CALLBACKS
//1. REGULAR CALLBACK QUEUE
//2. MICROTASKS QUEUE

//MICROTASKS QUEUE HAS PRIORITY OVER REGULAR CALLBACK QUEUE. SO, IF A PROMISE QUEUE HAS LARGE TASK TO BE COMPLETED, IT COULD STARVE THE OTHER CALLBACK QUEUE

//SEE EXAMPLE BELOW

//what would be the order of print
// console.log('test start');
// //normal callback queue
// setTimeout(() => console.log('0 sec timer'), 0);
//--promise that resolves immediately
//microtasks callback has higher priority
// Promise.resolve('Resolved promise 1').then(res => console.log(res));
// Promise.resolve('Promise 2 resolved').then(res => {
//   for (let i = 0; i < 10000000; i++) console.log(res);
// });
// console.log('task end');

//================BUILDING SIMPLE PROMISE================//

// new Promise()
//takes an executor function which will then be called by promise constructor as soon as it runs

//executor callback has 2 argument functions: resolve and fulfilled
//it will be used to change the state of promise

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log(`Lottery draw is happening 🔮`);
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       //marks promise as fulfilled
//       resolve('Congratulations 🎉, You won');
//     } else {
//       reject('You lost your money 💩');
//     }
//   }, 2000);
// });

//CONSUME PROMISE
// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

//promisify setTimeout

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

//consuming promise
// wait(1)
//   .then(() => {
//     console.log('I waited 1 seconds');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('I waited 1 seconds');
//     return wait(1);
//   });

//-------------CREATING FULFILLED PROMISE IMMEDIATELY--------//
// Promise.resolve('resolved value').then(val => {
//   console.log(val);
// });
//-------------CREATING REJECTED PROMISE IMMEDIATELY--------//
// Promise.reject(new Error('Error')).then(val => {
//   console.error(val);
// });

//-------------------------CHALLENGE 2------------------------//
/*
Your tasks:
Tasks are not super-descriptive this time, so that you can figure out some stuff by 
yourself. Pretend you're working on your own 
PART 1
1. Create a function 'createImage' which receives 'imgPath' as an input. 
This function returns a promise which creates a new image (use 
document.createElement('img')) and sets the .src attribute to the 
provided image path
2. When the image is done loading, append it to the DOM element with the 
'images' class, and resolve the promise. The fulfilled value should be the 
image element itself. In case there is an error loading the image (listen for 
the'error' event), reject the promise
3. If this part is too tricky for you, just watch the first part of the solution
PART 2
4. Consume the promise using .then and also add an error handler
5. After the image has loaded, pause execution for 2 seconds using the 'wait'
function we created earlier
6. After the 2 seconds have passed, hide the current image (set display CSS 
property to 'none'), and load a second image (Hint: Use the image element 
returned by the 'createImage' promise to hide the current image. You will 
need a global variable for that �)
7. After the second image has loaded, pause execution for 2 seconds again
8. After the 2 seconds have passed, hide the current image
Test data: Images in the img folder. Test the error handler by passing a wrong 
image path. Set the network speed to “Fast 3G” in the dev tools Network tab, 
otherwise images load too fast
*/
const imageContainer = document.querySelector('.images');
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const image = document.createElement('img');
    fetch(imgPath)
      .then(res => {
        if (!res.ok) reject(new Error(`Image not found(${res.status})`));
        image.setAttribute('src', imgPath);
        //adding element as node
        imageContainer.append(image);
        resolve(image);
      })
      .catch(() => reject(new Error('No Internet')));
  });
};
let currImage;
createImage('img\\img-1.jpg')
  .then(res => {
    currImage = res;
    return wait(2);
  })
  .then(function () {
    currImage.style.display = 'none';
    return createImage('img\\img-2.jpg');
  })
  .then(res => {
    currImage = res;
    return wait(2);
  })
  .then(function () {
    currImage.style.display = 'none';
    return createImage('img\\img-3.jpg');
  })
  .catch(err => console.log(`${err} `));

//-------------------ASYNC AWAIT-----------//

//SYNTACTIC SUGAR OVER THE CONSUMING PROMISE FUNCTIONALITY
//ES2017 FEATURE
//ADD ASYNC KEYWORD TO MAKE FUNCTION ASYNCHRONOUS
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    const pos = await getPosition();
    const { latitude, longitude } = pos.coords;
    const resGeo = await fetch(
      `https://geocode.xyz/${latitude},${longitude}?json=1`
    );
    if (!resGeo.ok) throw new Error('Problem getting location data');

    const dataGeo = await resGeo.json();
    //add an await keyword to pause execution in asynchronous function
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('Problem getting country');
    //add res.json
    const data = await res.json();
    console.log(data[0]);
    renderCountry(data[0]);
    return `You are in ${dataGeo.country}, ${dataGeo.city}`;
  } catch (err) {
    console.log(err.message);
    renderError(err);
    //rejecting promise returned from async function
    //rethrowing error to outer block
    throw err;
  } finally {
    countriesContainer.style.opacity = 1;
  }
};

//=---------------------RETURNING VALUES FROM ASYNC FUNCTION----------//

//CANNOT CALL FUNCTION LIKE THIS -WOULD RETURN PROMISE
// const city = whereAmI();
// console.log(city);

//THE RETURN VALUE WOULD BE THE FULFILLED VALUE OF PROMISE WHICH WE CAN ACCESS AS:
// whereAmI()
//   .then(city => console.log(city))
//   .catch(err => console.log(err));

(async function () {
  try {
    const city = await whereAmI();
    console.log(city);
  } catch (err) {
    console.log(err.message);
  }
})();
try {
  let y = 1;
  const x = 2;
  x = 3;
} catch (err) {
  console.log(err.message);
}
const getJson = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};
const get3Countries = async function (c1, c2, c3) {
  try {
    //this will run the promise one after another
    // const [data1] = await getJson(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJson(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJson(`https://restcountries.com/v3.1/name/${c3}`);

    //Running promise in parallel
    //Promise.all -- a helper function that takes all promises and runs in parallel

    //one rejected promise will reject them all
    const data = await Promise.all([
      getJson(`https://restcountries.com/v3.1/name/${c1}`),
      getJson(`https://restcountries.com/v3.1/name/${c3}`),
      getJson(`https://restcountries.com/v3.1/name/${c3}`),
    ]);

    console.log(data.map(city => city[0].capital));
  } catch (err) {
    console.log(err);
  }
};

get3Countries('portugal', 'canada', 'tanzania');
