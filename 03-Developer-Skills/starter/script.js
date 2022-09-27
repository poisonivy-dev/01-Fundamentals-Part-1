// Remember, we're gonna use strict mode in all scripts now!
"use strict";
//Install node live-server or use extension in vsCode
//--------------------------Problem solving--------------------------------//
/*
we work for a company building a smart home thermometer. Our most recent task is :"Given an array of temperatures of one day, calculate the temperature amplitude. Keep in mind that sometimes there might be a sensor error."
*/

const temperatures = [3, -2, -6, -1, "error", 9, 13, 17, 15, 14, 9, 5];

//1. Understanding the problem
//what is temperature amplitude? Answer: difference between highest and lowest temperature.
//how to compute max and mix temperature
//what is sensor error what to do with it.

//2. Sub problem division
//find max temperature
//find min temperature
//how to ignore errors
//Subtract max with min temperature

const calcTempAmplitude = (temperatures) => {
  let min = temperatures[0];
  let max = temperatures[0];
  for (let i = 0; i < temperatures.length; i++) {
    if (typeof temperatures[i] !== "number") continue;
    if (temperatures[i] > max) {
      max = temperatures[i];
    }
    if (temperatures[i] < min) {
      min = temperatures[i];
    }
  }
  return max - min;
};

console.log(
  `Amplitude of Temperatures is : ${calcTempAmplitude(temperatures)}`
);

//----------Problem 2-------------
/*
Next problem is that we can have to pass more than one temperature arrays

1. Understanding the problem
we should not perform the min max of both temperatures separately.instead we could combine the data of both arrays
2.Sub-problem
 2.1 merge array
*/
const calcTempAmplitude2 = (t1, t2) => {
  const temperatures = t1.concat(t2);
  let min = temperatures[0];
  let max = temperatures[0];
  for (let i = 0; i < temperatures.length; i++) {
    if (typeof temperatures[i] !== "number") continue;
    if (temperatures[i] > max) {
      max = temperatures[i];
    }
    if (temperatures[i] < min) {
      min = temperatures[i];
    }
  }
  return max - min;
};

console.log(
  `Amplitude of Temperatures is : ${calcTempAmplitude2(
    temperatures,
    [50, 20, 10]
  )}`
);

//--------------------CODING CHALLENGE-----------------------------------//
/*
Given an array of forecasted maximum temperatures, the thermometer displays a 
string with the given temperatures. Example: [17, 21, 23] will print "... 17ºC in 1 
days ... 21ºC in 2 days ... 23ºC in 3 days ..."
Your tasks:
1. Create a function 'printForecast' which takes in an array 'arr' and logs a 
string like the above to the console. Try it with both test datasets.
2. Use the problem-solving framework: Understand the problem and break it up 
into sub-problems!
Test data:
§ Data 1: [17, 21, 23]
§ Data 2: [12, 5, -5, 0, 4]
*/
/*
1. Understanding the problem
--what is x days: index +1
--transform variables into string
2. sub-problem
-transform temp to string
-transform index+1 as days
-add rest of string values
*/
let maxTemperatures = [17, 21, 23];
maxTemperatures = [12, 5, -5, 0, 4];

const printForecast = function (maxTemperatures) {
  let finalString = "...";
  for (let i = 0; i < maxTemperatures.length; i++) {
    finalString += ` ${maxTemperatures[i]}ºC in ${i + 1} days ...`;
  }
  console.log(finalString);
};
printForecast(maxTemperatures);
