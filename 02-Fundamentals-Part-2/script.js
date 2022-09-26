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

//---------------CODING CHALLENGE 1-----------------------------//
/*
Back to the two gymnastics teams, the Dolphins and the Koalas! There is a new 
gymnastics discipline, which works differently.
Each team competes 3 times, and then the average of the 3 scores is calculated (so 
one average score per team).
A team only wins if it has at least double the average score of the other team. 
Otherwise, no team wins!
Your tasks:
1. Create an arrow function 'calcAverage' to calculate the average of 3 scores
2. Use the function to calculate the average for both teams
3. Create a function 'checkWinner' that takes the average score of each team 
as parameters ('avgDolhins' and 'avgKoalas'), and then logs the winner 
to the console, together with the victory points, according to the rule above. 
Example: "Koalas win (30 vs. 13)"
4. Use the 'checkWinner' function to determine the winner for both Data 1 and 
Data 2
5. Ignore draws this time
Test data:
§ Data 1: Dolphins score 44, 23 and 71. Koalas score 65, 54 and 49
§ Data 2: Dolphins score 85, 54 and 41. Koalas score 23, 34 and 27
*/
const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;
const checkWinner = function (team1average, team2Average) {
  if (team1average >= 2 * team2Average)
    console.log(
      `Dolphins wins (${dolphinsAverageScore} vs ${koalasAverageScore})`
    );
  else if (team2Average >= 2 * team1average)
    console.log(
      `Koalas wins (${dolphinsAverageScore} vs ${koalasAverageScore})`
    );
  else console.log("No team wins!", dolphinsAverageScore, koalasAverageScore);
};
let dolphinsAverageScore = calcAverage(44, 23, 71);
let koalasAverageScore = calcAverage(65, 54, 49);
dolphinsAverageScore = calcAverage(85, 54, 41);
koalasAverageScore = calcAverage(23, 34, 27);
checkWinner(dolphinsAverageScore, koalasAverageScore);

// -------------------------- ARRAYS AND BASIC ARRAY MANIPULATION FUNCTIONS -----------------//
/*
Two Ways to declare arrays:
 1.Literal Notation
 2. Using new keyword
*/
const friends = ["John", "Peter", "Alex"];
friends.push("Max"); // pushes at the end
console.log(friends);
friends.pop(); //pops from the end
console.log(friends);
friends.unshift("Lisa"); // adds element to start
console.log(friends);
friends.shift(); // removes element from start
console.log(friends);
//indexOf() returns the index of the element if it exists else returns -1
if (friends.indexOf("John") >= 0) {
  console.log("You have a friend named John");
}
//includes() returns boolean value depending on the existence of element in array
if (friends.includes("Lisa")) {
  console.log("you have a friend named Lisa");
} else {
  console.log("Lisa not found in friend list");
}
