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
as parameters ('avgDolphins' and 'avgKoalas'), and then logs the winner 
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

//---------------------------CODING CHALLENGE 2---------------------------//
/*
Steven is still building his tip calculator, using the same rules as before: Tip 15% of 
the bill if the bill value is between 50 and 300, and if the value is different, the tip is 
20%.
Your tasks:
1. Write a function 'calcTip' that takes any bill value as an input and returns 
the corresponding tip, calculated based on the rules above (you can check out 
the code from first tip calculator challenge if you need to). Use the function 
type you like the most. Test the function using a bill value of 100
2. And now let's use arrays! So create an array 'bills' containing the test data 
below
3. Create an array 'tips' containing the tip value for each bill, calculated from 
the function you created before
4. Bonus: Create an array 'total' containing the total values, so the bill + tip
Test data: 125, 555 and 44
*/

const calcTip = (bill) => {
  return bill >= 50 && bill <= 300 ? 0.15 * bill : 0.2 * bill;
};
const calcGrandTotal = (bill, tip) => bill + tip;
console.log("Tip for a bill of 100: ", calcTip(100));
const bills = [125, 555, 44];
const tips = new Array();
const total = new Array();

tips.push(calcTip(bills[0]));
tips.push(calcTip(bills[1]));
tips.push(calcTip(bills[2]));

console.log(bills);
console.log(tips);

total.push(calcGrandTotal(bills[0], tips[0]));
total.push(calcGrandTotal(bills[1], tips[1]));
total.push(calcGrandTotal(bills[2], tips[2]));
console.log(total);

//----------------------------OBJECTS-------------------------------
//key-value pairs
const john = {
  firstName: "John",
  lastName: "Doe",
  birthYear: 1999,
  friends: ["Michael", "Lisa", "Jimmy"],
};

// Two notations to access object attributes , dot and bracket notation
console.log(john.firstName);
console.log(john["lastName"]); //we can put any expression here which will be evaluated then.
//Example when to use bracket notation
// const interestedIn = prompt(
//   "Choose what would you want to know about John. Select one from job,birthYear,friends,lastName"
// );
// console.log(john.interestedIn);
// console.log(john[interestedIn]);

//Adding new attributes to objects
john["location"] = "USA";
john.twitter = "@johnDoe";
// console.log(john);

//-------------------MINI CHALLENGE--------------------------------------
console.log(
  `${john.firstName} has ${john.friends.length} friends and his best-friend is ${john.friends[0]}`
);

//----------------USING FUNCTION INSIDE OBJECT AND USE OF THIS KEYWORD------------

// value as expression of a function
john.calcAge = function () {
  this.age = 2022 - this.birthYear;
  return this.age;
};
console.log(john);
//can calculate age once
console.log(john.calcAge());
//use the value of age for next times
console.log(john.age);
console.log(john.age);

// ------ Mini Challenge -------
//write summary from the object
john.hasDriversLicense = false;
john.job = "engineer";
john.calcSummary = function () {
  return `${this.firstName} is a ${this.calcAge()} years old ${
    this.job
  } and he has ${this.hasDriversLicense ? "a" : "no"} drivers license`;
};
console.log(john.calcSummary());

//--------------------------CODING CHALLENGE 3---------------------------//
/*
Let's go back to Mark and John comparing their BMIs! This time, let's use objects to 
implement the calculations! Remember: BMI = mass / height ** 2 = mass 
/ (height * height) (mass in kg and height in meter)
Your tasks:
1. For each of them, create an object with properties for their full name, mass, and 
height (Mark Miller and John Smith)
2. Create a 'calcBMI' method on each object to calculate the BMI (the same 
method on both objects). Store the BMI value to a property, and also return it 
from the method
3. Log to the console who has the higher BMI, together with the full name and the 
respective BMI. Example: "John's BMI (28.3) is higher than Mark's (23.9)!"
Test data: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m 
tall
*/

const mark = {
  firstName: "Mark",
  lastName: "Miller",
  mass: 78,
  height: 1.69,
  calcBMI: function () {
    this.BMI = this.mass / this.height ** 2;
    return this.BMI;
  },
};

const John = {
  firstName: "John",
  lastName: "Smith",
  mass: 92,
  height: 1.95,
  calcBMI: function () {
    this.BMI = this.mass / this.height ** 2;
    return this.BMI;
  },
};

const highestBMIHolder = mark.calcBMI() > John.calcBMI() ? "Mark" : "John";

console.log(
  `${highestBMIHolder}'s BMI (${
    highestBMIHolder == "Mark" ? mark.BMI : John.BMI
  }) is greater than ${highestBMIHolder != "Mark" ? "Mark" : "John"}'s BMI (${
    highestBMIHolder != "Mark" ? mark.BMI : John.BMI
  })`
);

//-----------------------FOR LOOPS ------------------------------------//
//iteration of john
const johnDoe = ["John", "Doe", 2022, 18, ["Michael", "23", "male"]];
const types = new Array();
console.log(johnDoe.length);
for (let i = 0; i < johnDoe.length; i++) {
  console.log(johnDoe[i]);
  types[i] = typeof johnDoe[i];
}
console.log(types);

//-------------CONTINUE AND BREAK STATEMENTS---------------------//
//CONTINUE lets you skip the current iteration while break exits from the whole loop

for (let i = 0; i < johnDoe.length; i++) {
  if (typeof johnDoe[i] === "number") continue;
  if (typeof johnDoe[i] === "object") break;
  console.log(johnDoe[i]);
}

//------------------WHILE LOOP--------------------------------//
/*
Consider using while loop when you do not know how many times you have to run the loop.-> do not know the counter loop value
Example:
*/
let dice = Math.trunc(Math.random() * 6 + 1);
console.log(dice);
while (dice !== 6) {
  console.log(`You rolled a ${dice}`);
  dice = Math.trunc(Math.random() * 6 + 1);
}

//-----------------------CODING CHALLENGE 4---------------------------------------//
/*
Let's improve Steven's tip calculator even more, this time using loops!
Your tasks:
1. Create an array 'bills' containing all 10 test bill values
2. Create empty arrays for the tips and the totals ('tips' and 'totals')
3. Use the 'calcTip' function we wrote before (no need to repeat) to calculate 
tips and total values (bill + tip) for every bill value in the bills array. Use a for
loop to perform the 10 calculations!
Test data: 22, 295, 176, 440, 37, 105, 10, 1100, 86 and 52

Bonus:
4. Bonus: Write a function 'calcAverage' which takes an array called 'arr' as 
an argument. This function calculates the average of all numbers in the given 
array. This is a difficult challenge (we haven't done this before)! Here is how to 
solve it:
4.1. First, you will need to add up all values in the array. To do the addition, 
start by creating a variable 'sum' that starts at 0. Then loop over the 
array using a for loop. In each iteration, add the current value to the 
'sum' variable. This way, by the end of the loop, you have all values 
added together
4.2. To calculate the average, divide the sum you calculated before by the 
length of the array (because that's the number of elements)
4.3. Call the function with the 'totals' array
*/
const bill = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tip = new Array();
const totals = new Array();

for (let i = 0; i < bill.length; i++) {
  tip[i] = calcTip(bill[i]);
  totals[i] = calcGrandTotal(bill[i], tip[i]);
}
console.log(tip);
console.log(totals);

//Bonus
const calcArrAverage = function (arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  const average = sum / arr.length;
  return average;
};

console.log(calcArrAverage(totals));
