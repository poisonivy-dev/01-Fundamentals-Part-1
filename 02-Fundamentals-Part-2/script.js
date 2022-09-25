"use strict";

//-------------Functions----------------------

//function declaration -- can  use them even if the function is called before initialization
function calculateAge(birthYear) {
  return 2022 - birthYear;
}

//function expression -- anonymous functions -- cannot use them before they are initialized
const age = function (birthYear) {
  return 2022 - birthYear;
};

//Arrow Functions -- no this keyword
const calcAge = (birthYear) => 2022 - birthYear;

const calculateRetirement = (birthYear, firstName) => {
  const age = 2022 - birthYear;
  const retirement = 65 - age;
  return `${firstName} will retire in ${retirement} years`;
};

console.log(
  calculateAge(1999),
  age(1999),
  calcAge(1999),
  calculateRetirement(1999, "John")
);

//timelapse 1.15.00 vid 2
