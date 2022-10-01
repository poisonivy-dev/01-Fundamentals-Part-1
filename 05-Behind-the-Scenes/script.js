"use strict";
//Practice of various kinds of scopes
function calcAge(birthYear) {
  const age = 2022 - birthYear;
  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millennial = true;
      //creating new variable with same name as outer scope's variable
      const firstName = "Steven";

      //reassigning outer scope's variable
      output = "new output";
      const str = `Oh and you're a millennial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
    }
    // console.log(str);
    //could result in hoisting if code if not executed
    console.log(millennial);
    //function is blocked scope -- strict mode
    // console.log(add(2, 3));
  }
  printAge();

  return age;
}

const firstName = "Jonas";
calcAge(1992);
//cannot access age because of local scope of age
// console.log(age);
//printAge() cant be found because it is defined inside another function and called in global scope
// printAge();

//--------------Practicing Hoisting and TDZ-------------------------
console.log(me);
// console.log(job);
// console.log(year);
var me = "Jonas";
let job = "teacher";
const year = 1991;

// console.log(addExpr(2, 3));
console.log(addDecl(2, 3));
//with var variable assigning to a function
// console.log(addArrow(2, 3));
//we can only use it before declaration
function addDecl(aa, b) {
  return aa + b;
}
const addExpr = function (a, b) {
  return a + b;
};

var addArrow = (a, b) => a + b;

//Example :pitfall of hoisting
//don't use var
if (!numProducts) deleteShoppingCart();
var numProducts = 10;
function deleteShoppingCart() {
  console.log(`All products deleted!`);
}

//window is a global object
//when we create variables with var, a property is added to the window object
let x = 0;
var y = 2;
const z = 4;

console.log(x === window.x);
console.log(y === window.y);
console.log(z === window.z);

//---------------Practicing this keyword----------//

//simple functions
console.log(this);
const printName = function (name) {
  console.log(`hi ${name}`);
  console.log(this);
};
printName("Harry");

function printNameDec(name) {
  console.log(`hi ${name}`);
  console.log(this);
}
printNameDec("Harry");
//arrow function

const printNameArrow = (name) => {
  console.log(`hi ${name}`);
  console.log(this);
};
printNameArrow("Harry");

// this keyword pointing to the object calling the function
var fName = "matilda";
const jonas = {
  fName: "Jonas",
  year: 1999,
  calcAge: function () {
    //check for millennial
    //preserving this because it will be undefined inside a normal function

    //Solution 1
    // const self = this;
    // //this is the normal function definition
    // const isMillennial = function () {
    //   //here this is undefined thus using the preserved var --> self
    //   console.log(self);
    //   console.log(self.year >= 1981 && self.year <= 1996);
    // };
    //ES6 solution --> use arrow function that uses parents this
    const isMillennial = () => {
      console.log(self);
      console.log(self.year >= 1981 && self.year <= 1996);
    };
    isMillennial();
    return this.year;
  },
  greet: () => {
    console.log(this);
    console.log(`Hey! ${this.fName}`);
  },
};
console.log(jonas.calcAge());
//arrow function this keyword error
//This does not exist in arrow functions--they inherit from parent function
console.log(jonas.greet());

//arguments object is not created in arrow function
const funcArg = function (arg1, arg2) {
  console.log(arguments);
};
const funcArgArr = (arg1, arg2) => {
  console.log(arguments);
};
funcArg(2, 3);
// funcArgArr(2, 3);
//method borrowing

const matilda = {
  year: 2018,
};
matilda.calcAge = jonas.calcAge;

console.log(matilda.calcAge());
