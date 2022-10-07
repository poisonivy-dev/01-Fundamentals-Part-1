"use strict";
const bookings = [];

//----setting default values
const createBookings = function (
  flightNum,
  //could be a single value
  numPassengers = 1,
  //or an expression
  price = 80 * numPassengers
) {
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  bookings.push(booking);
  return bookings;
};

console.log(createBookings("LH123"));
//if you want to skip a value, pass undefined
console.log(createBookings("LH123", undefined));

//---- How passing arguments work in JS
//JS only pass arguments by value only

const checkIn = function (flightNum, passenger) {
  flightNum = "222h";

  if (passenger.passport === 24659856321) alert("Welcome");
  else alert("error");
};

const changePassport = function (passenger) {
  passenger.passport = Math.trunc(Math.random() * 1000000000);
};

const jonas = {
  name: "Jonas",
  passport: 24659856321,
};

const flightNum = "223b";

// passed by value, jonas contains the address in which the value of object is stored in heap
//basically the address is copied and sent to the function which , still will change the original obj
// checkIn(flightNum, jonas);
// console.log(flightNum, jonas);

//this will change the original object value
// changePassport(jonas);
// console.log(jonas);

//---- First class functions and Higher Order Functions

//JS treat functions as first class citizen
//It means they are simply treated as values --so they can be assigned to a variable, object attribute, passed in as arguments and returned from a function
// They are simply a type of object in JS, which could have their own attributes and methods

//If a language support first class feature, we can make higher order function
// A higher order function is a one that receives func as arg or return a function or does both

const oneWordUpper = function (str) {
  const [first, ...rest] = str.split(" ");
  return [first.toUpperCase(), ...rest].join(" ");
};

const oneWord = function (str) {
  return str.toLowerCase().replace(/ /g, "");
};

//How a higher order function looks like
const transform = function (str, fn) {
  console.log(`${str}--->Original String`);
  console.log(`${fn(str)}--->Transformed String`);
  console.log(`${fn.name}--->Transformer Function Name `);
};

transform("Hello! This is me, Jonas !!!", oneWord);
transform("Hello! This is me, Jonas !!!", oneWordUpper);

//The function is also called callback function which higher order function calls later.
//Callback functions create a level of abstraction --> hide detail of code implementation from one function. That's why they are called higher order because they are on a higher level of abstraction
//They also make the code reusable and inter-connected

//They are used in JS a lot

//example
// document.body.addEventListener('click',oneWord("HI"));
// const sayHi = function () {
//   console.log("Hi! 👋");
// };
// ["jonas", "SMITH", "JEremy"].forEach(sayHi);

//---- Return a function from a function
