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

const greet = function (str) {
  //returning a function
  return function (name) {
    console.log(`${str}, ${name}`);
  };
};

//setting greeter to the new function inside greet
const greeter = greet("Good Evening");
//calling greeter

greeter("John");
//since greet returns a function, we can immediately call it like
greet("Good morning!")("Jonas");

//Implementing the above example using arrow functions

const greetSomeone = (str) => (name) => console.log(`${str}, ${name}`);
greetSomeone("Good Evening!!")("Sir");

//---- Using Call , apply and Bind Methods (How to manipulate this keyword)

//Consider a flight

const lufthansa = {
  name: "Lufthansa",
  iataCode: "LU",
  bookings: [],
  book(flightNum, name) {
    console.log(`${name} booked a seat on ${this.name} flight ${flightNum} `);
    this.bookings.push({ flight: this.name, name });
  },
};

lufthansa.book(234, "Sara");
console.log(lufthansa);

const eurowings = {
  name: "Eurowings",
  iataCode: "EW",
  bookings: [],
};

//since we can assign function to a variable
const book = lufthansa.book;

//how to change the this keyword and use it for eurowings
//we can use call() method for it, which call the book function and set the arguments and point the correct object

book.call(eurowings, 26548, "John");
console.log(eurowings);

//APPLY() method is same as call --not used in modern javascript anymore
//just takes the rest of arguments as array

const restArgs = [23145, "Sara"];
book.apply(eurowings, restArgs);
console.log(eurowings);

//BIND() method
// It does the same thing as apply and call function but instead it returns the function and does not immediately calls it.
// we can either pass in certain arguments for partial application(parts of application of original function are already applied) or pass it later when called.
//Example

//--1 Without Partial Application
const bookLU = book.bind(lufthansa);
const bookEW = book.bind(eurowings);

bookEW(452, "Jeremy");

//--2 With Partial Application
//It will automatically set the first arg to 234 and will only book for flight 234
const bookEW234 = book.bind(eurowings, 234);
bookEW234("Ana");
bookEW234("Matilda");

/***********Important Application of Bind method ***********/
//Using Object with Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

//we want to add on click event listener
//this would return a button ---- because this is pointing to the object calling the event listener in this case

// document.querySelector(".buy").addEventListener("click", lufthansa.buyPlane);

//we have to bind the function to an object to change this keyword and not immediately call it
//So, we will use bind keyword
document
  .querySelector(".buy")
  .addEventListener("click", lufthansa.buyPlane.bind(lufthansa));

//--Partial Application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

// make a new function derived from above with specific rate
//different from default parameter, it returns a new function
const addVAT = addTax.bind(null, 0.23);

console.log(addVAT(100));

//---Challenge : return addVAT from addTax Function

const calcTax = (rate) => {
  return function (value) {
    return value + value * rate;
  };
};
const value = 200;
console.log(calcTax(0.23)(value));

//----------------------------------------CODING CHALLENGE 1-------------------------
/*
 Let's build a simple poll app!
A poll has a question, an array of options from which people can choose, and an 
array with the number of replies for each option. This data is stored in the starter 
'poll' object below.
Your tasks:
1. Create a method called 'registerNewAnswer' on the 'poll' object. The 
method does 2 things:
1.1. Display a prompt window for the user to input the number of the 
selected option. The prompt should look like this:
What is your favorite programming language?
0: JavaScript
1: Python
2: Rust
3: C++
(Write option number)
1.2. Based on the input number, update the 'answers' array property. For 
example, if the option is 3, increase the value at position 3 of the array by 
1. Make sure to check if the input is a number and if the number makes 
sense (e.g. answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The 
method takes a string as an input (called 'type'), which can be either 'string'
or 'array'. If type is 'array', simply display the results array as it is, using 
console.log(). This should be the default option. If type is 'string', display a 
string like "Poll results are 13, 2, 4, 1".
4. Run the 'displayResults' method at the end of each 
'registerNewAnswer' method call.
5. Bonus: Use the 'displayResults' method to display the 2 arrays in the test 
data. Use both the 'array' and the 'string' option. Do not put the arrays in the poll 
object! So what should the this keyword look like in this situation?
The Complete JavaScript Course 21
Test data for bonus:
§ Data 1: [5, 2, 3]
§ Data 2: [1, 5, 3, 9, 6, 1]
*/
const poll = {
  question: "What is your favorite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const response = prompt(
      //use join function instead of looping through the array
      `${this.question}\n${this.options.join("\n")}\n(Write option number)`
    );
    if (response <= this.answers.length - 1 && response >= 0) {
      this.answers[response]++;
    } else {
      console.log("Not an option!");
    }
    this.displayResults("string");
  },
  displayResults(type) {
    if (type === "string") {
      console.log(`Poll results are: ${[...this.answers]}`);
    } else {
      console.log(this.answers);
    }
  },
};

document
  .querySelector(".poll")
  .addEventListener("click", poll.registerNewAnswer.bind(poll));

//Bonus
const displayOutsideResult = poll.displayResults;
//using string display
displayOutsideResult.call({ answers: [5, 2, 3] }, "string");
//using array display
displayOutsideResult.call({ answers: [1, 5, 3, 9, 6, 1] });
