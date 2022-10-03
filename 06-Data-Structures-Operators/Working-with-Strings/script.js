"use strict";

//------------------------Working with Strings--------------------//
//we can read index of strings
const airline = "TAP Air Portugal";

console.log(airline[0]);
console.log("b1A25"[2]);

//check length of string
console.log(`Length of airline string is: ${airline.length}`);

//Methods of strings

//indexOf
console.log(`Index of P in airline var is: ${airline.indexOf("P")}`);

//lastIndexof()
console.log(airline.lastIndexOf("Po")); //for more than one character, it returns the starting index

//Both functions are case sensitive
//Returns -1 if not found

// Why need these functions
// Slice methods needs indexes as arguments so therefore it is useful to figure out the index of part of string and slice that.

//-----------The Slice FUnction---------------//
//Syntax: slice(startIndex,endIndex==optional)
console.log("slice:", airline.slice(4));

//extract first word of a string
console.log(airline.slice(0, airline.indexOf(" ")));
//last word of string
console.log(airline.slice(airline.lastIndexOf(" ") + 1));

//how to remove first and last character
//Example:
//we don't want the brackets of the variable
const stringA = "{['hello','This is me']}";

// Negative values returns values from the last index
console.log(stringA.slice(1, -1));

//---------------String Methods--------------------------------//

//Changing case of string
const nameA = "joNas";
console.log(nameA.toLowerCase());
console.log(nameA.toUpperCase());

//how to do capitalization
function capitalizeFirst(nameA) {
  console.log(nameA[0].toUpperCase() + nameA.slice(1).toLowerCase());
}

capitalizeFirst(nameA);

//Comparing Emails---trim() function
const email = "hello@jonas.io";
const compEmail = "   hellO@jonAs.Io   \n";

console.log(compEmail.toLowerCase().trim() === email);

//replace
const priceBG = "223,456£";
const priceUS = priceBG.replace(",", ".").replace("£", "$");
console.log(priceUS);

//replacing the word door with gate
const announcement =
  "All passengers come to boarding door 23 . Boarding door 23!";

//replace will only change the first occurrence instead use replaceAll()
console.log(announcement.replaceAll("door", "gate"));

//Another way is to use regular expressions
console.log(announcement.replaceAll(/door/g, "gate"));

//Booleans
//includes
//startsWith
//endsWith

const plane = "Airbus B213neo";
console.log(plane.includes("eo"));

plane.startsWith("Airbus") &&
  plane.endsWith("neo") &&
  console.log("New airbus family");

//check if baggage is allowed or not
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes("knife") || baggage.includes("gun"))
    console.log("you cannot go on board!");
  else console.log("welcome abroad");
};

checkBaggage(" I have a pack of chips, socks and a pocket Knife");
checkBaggage("I have some makeup and food");
checkBaggage("I have a gun for protectIon");

//-------------------The split function-----------------------//
//pass in the arguments on the basis of which you want to split
//it will return an array of substrings based on the divider string
const obj = "my+name+is+Jonas".split("+");

//the join method --works the opposite of the split function
const [first, last] = "John+Doe".split("+");
const obj2 = ["Mr.", first.toLowerCase(), last.toUpperCase()].join(" ");
console.log(obj2);

const capitalizeNames = function (name) {
  const names = name.split(" ");
  let nameUpper = [];
  for (const n of names) {
    // nameUpper.push(n[0].toUpperCase() + n.slice(1));
    nameUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(nameUpper.join(" "));
};

capitalizeNames("jessica john matilda amey");

//Padding a string
//padStart
//padEnd

//Example: hide credit card number
const maskCredit = function (number) {
  console.log(number.slice(-4).padStart(number.length, "*"));
};

maskCredit("6400 5201 6598 1111");

//repeat function

const nameB = "jonas";
console.log(nameB.repeat(5));

//----------------------------------------------CODING CHALLENGE 4-------------------------------//
/*
 Write a program that receives a list of variable names written in underscore_case 
and convert them to camelCase.
The input will come from a textarea inserted into the DOM (see code below to 
insert the elements), and conversion will happen when the button is pressed.
Test data (pasted to textarea, including spaces):
underscore_case
first_name
Some_Variable 
 calculate_AGE
delayed_departure
Should produce this output (5 separate console.log outputs):
underscoreCase ✅
firstName ✅✅
someVariable ✅✅✅
calculateAge ✅✅✅✅
delayedDeparture ✅✅✅✅✅
*/
document.body.append(document.createElement("textarea"));
document.body.append(document.createElement("button"));

//get the button query
const button = document.querySelector("button");

//listen to the event
button.addEventListener("click", function () {
  //get the text from textarea
  let varList = document.querySelector("textarea").value;
  varList = varList.split("\n");

  for (let [i, v] of varList.entries()) {
    //trim if whitespace in each word
    v = v.trim().toLowerCase();
    //get the index of next value after underscore
    const index = v.indexOf("_") + 1;
    //replace all the values
    console.log(
      v.replace("_" + v[index], v[index].toUpperCase()) + "✅".repeat(i + 1)
    );
  }
});
