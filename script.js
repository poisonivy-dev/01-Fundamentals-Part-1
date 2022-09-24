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
let mass=78;
let height=1.69;
let markBMI = mass / height ** 2;
mass=92;
height=1.95;
let johnBMI = mass / height ** 2;
let markHigherBMI = markBMI > johnBMI;
console.log(markHigherBMI);

// Test Data 2
mass=95;
height=1.88;
markBMI = mass / height ** 2;
mass=85;
height=1.76;
johnBMI = mass / height ** 2;
markHigherBMI = markBMI > johnBMI;
console.log(markHigherBMI);


//------------------------------STRINGS AND TEMPLATE LITERALS------------------------//

// USE `` THESE SIGNS FOR TEMPLATE LITERALS
// It will consider white-spaces and allows us to input variables without concatenation

const name ='John';
const currentYear = 2022;
const johnAge = currentYear - 1999;
const job = 'developer';

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
mass=78;
height=1.69;
markBMI = mass / height ** 2;
mass=92;
height=1.95;
johnBMI = mass / height ** 2;
markHigherBMI = markBMI > johnBMI;
if(markHigherBMI)
    console.log(`Mark's BMI (${markBMI}) is higher than John's BMI (${johnBMI})`);
else
    console.log(`John's BMI (${johnBMI}) is higher than Mark's BMI (${markBMI})`);

// Test Data 2
mass=95;
height=1.88;
markBMI = mass / height ** 2;
mass=85;
height=1.76;
johnBMI = mass / height ** 2;
markHigherBMI = markBMI > johnBMI;
if(markHigherBMI)
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
string ="200" + "30";
string-= 30;
console.log(string);
string = '20' *'20';
console.log(string);


// -------------TRUTHY AND FALSY VALUES ------------------------//

/*  
There are five falsy values that become false when they are converted to boolean
    0, '' , null, NaN , and undefined
All the other values are truthy values.
*/

console.log("NaN converted to Boolean, ",Boolean(NaN));
console.log("Empty parenthesis converted to Boolean,", Boolean({}));

let money =0;
if(money){
    console.log(`You have $${money}💰`);
}else{
    console.log("You should get a job!");
}

//Time lapse: 3:17:09