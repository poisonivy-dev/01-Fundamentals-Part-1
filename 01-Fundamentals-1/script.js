/* --------------------------PRIMITIVE DATA TYPES-----------------------------

NUMBERS
STRINGS
BOOLEAN
UNDEFINED
NULL
SYMBOL
BIGINT

*/

// -----------------------Javascript Fundamentals Challenge 1---------------------- //
/*

Mark and John are trying to compare their BMI (Body Mass Index), which is 
calculated using the formula:
BMI = mass / height ** 2 = mass / (height * height) (mass in kg 
and height in meter).
Your tasks:
1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs using the formula (you can even implement both 
versions)
3. Create a Boolean variable 'markHigherBMI' containing information about 
whether Mark has a higher BMI than John.
Test data:
§ Data 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 
m tall.
§ Data 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76 
m tall.

*/

// Test Data 1
let mass = 78;
let height = 1.69;
let markBMI = mass / height ** 2;
mass = 92;
height = 1.95;
let johnBMI = mass / height ** 2;
let markHigherBMI = markBMI > johnBMI;
console.log(markHigherBMI);

// Test Data 2
mass = 95;
height = 1.88;
markBMI = mass / height ** 2;
mass = 85;
height = 1.76;
johnBMI = mass / height ** 2;
markHigherBMI = markBMI > johnBMI;
console.log(markHigherBMI);

//------------------------------STRINGS AND TEMPLATE LITERALS------------------------//

// USE `` THESE SIGNS FOR TEMPLATE LITERALS
// It will consider white-spaces and allows us to input variables without concatenation

const name = "John";
const currentYear = 2022;
const johnAge = currentYear - 1999;
const job = "developer";

let introOfMe = `Hello! 
This is ${name}, a ${johnAge} years old ${job}`;
console.log(introOfMe);

/*
    -----------------------------Coding Challenge #2---------------------------------

Use the BMI example from Challenge #1, and the code you already wrote, and 
improve it.
Your tasks:
1. Print a nice output to the console, saying who has the higher BMI. The message 
is either "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!"
2. Use a template literal to include the BMI values in the outputs. Example: "Mark's
BMI (28.3) is higher than John's (23.9)!"

*/
mass = 78;
height = 1.69;
markBMI = mass / height ** 2;
mass = 92;
height = 1.95;
johnBMI = mass / height ** 2;
markHigherBMI = markBMI > johnBMI;
if (markHigherBMI)
  console.log(`Mark's BMI (${markBMI}) is higher than John's BMI (${johnBMI})`);
else
  console.log(`John's BMI (${johnBMI}) is higher than Mark's BMI (${markBMI})`);

// Test Data 2
mass = 95;
height = 1.88;
markBMI = mass / height ** 2;
mass = 85;
height = 1.76;
johnBMI = mass / height ** 2;
markHigherBMI = markBMI > johnBMI;
if (markHigherBMI)
  console.log(`Mark's BMI (${markBMI}) is higher than John's BMI (${johnBMI})`);
else
  console.log(`John's BMI (${johnBMI}) is higher than Mark's BMI (${markBMI})`);

// ------------TYPE CONVERSION AND COERCION -----------------//

//type conversion
const value = Number(1999) + 22;
console.log(value);

//type coercion
let string = "10" - "2";
console.log(string);
string = "200" + "30";
string -= 30;
console.log(string);
string = "20" * "20";
console.log(string);

// -------------TRUTHY AND FALSY VALUES ------------------------//

/*  
There are five falsy values that become false when they are converted to boolean
    0, '' , null, NaN , and undefined
All the other values are truthy values.
*/

console.log("NaN converted to Boolean, ", Boolean(NaN));
console.log("Empty parenthesis converted to Boolean,", Boolean({}));

let money = 0;
if (money) {
  console.log(`You have $${money}💸`);
} else {
  console.log("You should get a job!");
}

//--------------------CODING CHALLENGE 3 -------------------//
/*
There are two gymnastics teams, Dolphins and Koalas. They compete against each 
other 3 times. The winner with the highest average score wins a trophy!
Your tasks:
1. Calculate the average score for each team, using the test data below
2. Compare the team's average scores to determine the winner of the competition, 
and print it to the console. Don't forget that there can be a draw, so test for that 
as well (draw means they have the same average score)
3. Bonus 1: Include a requirement for a minimum score of 100. With this rule, a 
team only wins if it has a higher score than the other team, and the same time a 
score of at least 100 points. Hint: Use a logical operator to test for minimum 
score, as well as multiple else-if blocks �
4. Bonus 2: Minimum score also applies to a draw! So a draw only happens when 
both teams have the same score and both have a score greater or equal 100 
points. Otherwise, no team wins the trophy
Test data:
§ Data 1: Dolphins score 96, 108 and 89. Koalas score 88, 91 and 110
§ Data Bonus 1: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 123
§ Data Bonus 2: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 106
*/
// const dolphinsAverageScore = (96 + 108 + 89) / 3;
// const koalasAverageScore = (88 + 91 + 110) / 3;
// const dolphinsAverageScore = (97 + 112 + 101) / 3;
// const koalasAverageScore = (109 + 95 + 123) / 3;
const dolphinsAverageScore = (97 + 112 + 101) / 3;
const koalasAverageScore = (109 + 95 + 106) / 3;
if (
  dolphinsAverageScore === koalasAverageScore &&
  dolphinsAverageScore >= 100
) {
  console.log("Draw!");
} else if (
  dolphinsAverageScore > koalasAverageScore &&
  dolphinsAverageScore >= 100
) {
  console.log(
    `Dolphins Average Score (${dolphinsAverageScore}) is greater than Koalas (${koalasAverageScore})`
  );
} else if (koalasAverageScore >= 100)
  console.log(
    `Koalas Average Score (${koalasAverageScore}) is greater than Dolphins (${dolphinsAverageScore})`
  );
else
  console.log(
    "No Team wins the trophy because they haven't met the minimum requirement"
  );

//------------------------------CODING CHALLENGE 4------------------------//
/*
Steven wants to build a very simple tip calculator for whenever he goes eating in a 
restaurant. In his country, it's usual to tip 15% if the bill value is between 50 and 
300. If the value is different, the tip is 20%.
Your tasks:
1. Calculate the tip, depending on the bill value. Create a variable called 'tip' for 
this. It's not allowed to use an if/else statement � (If it's easier for you, you can 
start with an if/else statement, and then try to convert it to a ternary 
operator!)
2. Print a string to the console containing the bill value, the tip, and the final value 
(bill + tip). Example: “The bill was 275, the tip was 41.25, and the total value 
316.25”
Test data:
§ Data 1: Test for bill values 275, 40 and 430
Hints:
§ To calculate 20% of a value, simply multiply it by 20/100 = 0.2
§ Value X is between 50 and 300, if it's >= 50 && <= 300 �
*/
let bill = 275;
// bill = 40;
// bill = 430;

const tip = bill >= 50 && bill <= 300 ? 0.2 * bill : 0.15 * bill;
console.log(`Total bill: ${bill}
Total tip: ${tip}
Grand total: ${bill + tip}`);

// ---------- Note----------//
/*
During the production phase, we use a process called transpiling and poly filling to convert the code in ES6 and above to ES5 which is supported by almost all the browsers. It is done so it is compatible for all users.(Not all users use latest version of their browsers which could cause an issue to them)
*/
