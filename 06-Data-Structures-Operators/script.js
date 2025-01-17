"use strict";

// Data needed for a later exercise
const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

// Data needed for first part of the section
const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  orderDelivery: function ({ starterIndex, mainIndex, time, address }) {
    console.log(
      `${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} ordered for you.`
    );
  },
  orderPasta: function (ing1, ing2, ing3) {
    console.log(ing1, ing2, ing3);
  },
};
//--------3-Using destructuring in functions------------------//
//since in objects order does not matter , we can take advantage of that and call the function without passing in the arguments in order.
//the names passed to object should match
restaurant.orderDelivery({
  time: "22:30",
  address: "Via del Sole,21",
  mainIndex: 2,
  starterIndex: 3,
});
//------------10- SETS---------------------------------------//
// New data structure that has no indexes and has unique values
//they are iterables

//Example:
//new set -declaration
let orderedSet = new Set([
  "Pizza",
  "Pizza",
  "Pizza",
  "Pasta",
  "Rissotto",
  "Pasta",
]);
//Set has a size attribute similar to length of array
console.log(orderedSet.size, orderedSet);
// order does not matter in sets
//add value to set -- Similar to push
orderedSet.add("Noodles");
console.log(orderedSet);
//we can remove elements
orderedSet.delete("Pizza");
console.log(orderedSet);
//we can empty a set using clear() function
//we can check if the value exists or not using has() method, this is similar to includes() in arrays
console.log(orderedSet.has("Noodles"));

// Real World Example
// what if we want to extract unique elements from an array and then take values in an array
//Array
let positions = ["chef", "manager", "waiter", "chef", "waiter", "receptionist"];
//step 1 find unique elements -- convert to set
const newPositions = new Set(positions);
//Step 2 : unpack it and assign it to the previous array
positions = [...newPositions];
console.log(positions);
//Doing it in one step
// const position = [
//   ...new Set(["chef", "manager", "waiter", "chef", "waiter", "receptionist"]),
// ];
// console.log(position);

//if we only want to know the size of unique elements we can do this
console.log(
  new Set(["chef", "manager", "waiter", "chef", "waiter", "receptionist"]).size
);
console.log(new Set("johndoe").size);

//--------------------11- MAPS---------------------------------//
//maps can have any datatype as keys including boolean and arrays
//example
const rest = new Map();
//adding values to map
rest.set("name", "classical Italiano");
rest.set(1, "Firenze, Italy");
rest.set(2, "Portugal");

//we can add it together as
rest
  .set("categories", ["Italian", "Organic", "vegetarian"])
  .set("open", 11)
  .set("close", 23)
  .set(true, "We are opened")
  .set(false, "We are closed");
console.log(rest);

//Retrieving elements
const time = 21;
//it will return true and false and fetch those keys based on time
console.log(rest.get(time > rest.get("open") && time < rest.get("close")));

//Other methods
// rest.delete('categories');
// rest.clear();
// rest.has('categories');
// console.log(rest.size);

//using array as map keys
const mapKey = [1, 2];
console.log(rest.set(mapKey, "test"));
console.log(rest.get(mapKey));

// setting a query as key
const query = document.querySelector("h1");
console.log(query);
console.log(rest.set(query, "Heading"));

//----------------Maps Iteration -------------------------//
const question = new Map([
  ["q", "What is the best programming language"],
  [1, "C++"],
  [2, "Java"],
  [3, "Javascript"],
  ["correct", "Javascript"],
  [true, "🎉Correct!"],
  [false, "False"],
]);

//The structure is similar to object thus we can easily convert object to map if we already have an object
const openingHoursMap = new Map(Object.entries(restaurant.openingHours));
console.log("new map", openingHoursMap);

// Iterating the map
console.log(question.get("q"));
//destructure directly from map because it is iterable
for (const [key, val] of question) {
  if (typeof key === "number") console.log(`Answer ${key}: ${val}`);
}
// const ans = Number(prompt("What is your answer?"));
const ans = 3;
console.log(question.get(question.get(ans) === question.get("correct")));

//Sometimes, we need to convert Map back to an array
console.log("values to array: ", [...question]);

//--------------12-Which Data Structure Should I use?---------//

//-------------9- How to loop over objects------------------//
//we can loop over iterables -- but how to loop over objects which are not
//using the Object.key function
const totalDays = Object.keys(restaurant.openingHours);
let str = `we are open in ${totalDays.length} days: `;

for (const day of totalDays) {
  str += `${day},`;
}
console.log(str);

// Using object.values function to get the original values
const valuesOfOpeningHours = Object.values(restaurant.openingHours);
console.log(valuesOfOpeningHours);

//now if we want to use both we will use the Object.entries function
for (const [i, { open, close }] of Object.entries(restaurant.openingHours)) {
  console.log(`On ${i} we open at ${open} and close at ${close}`);
}

//-------------8- The New Object Literal syntax-------------//

//1-----we can  now directly put a new object inside an object without using key-value pair assignment
//example
const openingHours1 = {
  thu: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};
const restaurant1 = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  //new way
  openingHours1,
  //old way
  // openingHours1:openingHours1,
  orderDelivery: function ({ starterIndex, mainIndex, time, address }) {
    console.log(
      `${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} ordered for you.`
    );
  },
  // 2---we can use function without explicitly using the function keyword
  orderPasta(ing1, ing2, ing3) {
    console.log(ing1, ing2, ing3);
  },
};
//----3 we can put an expression instead of key and calculate what would be the name of key
//example

const days = {
  [`day ${0 + 1}`]: "Monday",
};
console.log(days);
//-------------9- Optional Chaining-------------------------------------//
//if the property exists of not
//example
//we would do
//if(restaurant.openingHours.mon) console.log(restaurant.openingHours.mon.open)

//now we can do
//this will immediately return undefined if the property does not exist --can use it on multiple properties
console.log(restaurant.openingHours?.mon?.open);

//Another Example
const weekday = ["mon", "tues", "wed", "thu", "fri", "sat", "sun"];
for (const day of weekday) {
  const open = restaurant.openingHours[day]?.open ?? "closed";

  console.log(`we open on ${day} at ${open}`);
}

//Methods
console.log(restaurant.order?.(0, 1) ?? "method does not exist");
console.log(restaurant.orderBurger?.(0, 1) ?? "method does not exist");

//Arrays
//checks if value of array exists or not

const user = [{ name: "jonas", email: "Jonas@mail.com" }];
console.log(user[0]?.name ?? "Array is empty");

//-------------7- The For of loop----------------------//
const menuItems = [...restaurant.mainMenu, ...restaurant.starterMenu];
// for (const item of menuItems) {
//   console.log(item);
// }
//how do we get the index -------- we use the ENTRIES() function
//it gives an array of items and index --which we can destructure

// the for of loop still lets us use the CONTINUE AND BREAK STATEMENTS
// There are other for loops which do not lets us use that
for (const [i, el] of menuItems.entries()) {
  if (el === "Focaccia") continue;
  console.log(`${0 + i}. ${el}`);
}
//------------6- SHORT CIRCUITING(short circuit evaluation) && and || operators-----------------------//
//both operators can use any datatypes
// ---OR Operator
console.log(3 || "Jonas"); //if first element is a truthy value js will not even look at the other value
console.log(undefined || null);
console.log("" || "max");
const num = restaurant.numGuests || 30;
console.log(num);

//--AND Operator
console.log("hello" && "max" && null && "jonas");

//(??)NULLISH coalescing operator
//works same as OR operator but also considers zero and '' as truthy value
//will only consider falsy value on null or undefined
const numGuests = 0;
const val = numGuests ?? 20;
console.log("nullish operator " + val);

// OR ASSIGNMENT OPERATOR --compound assignment with OR
const rest1 = {
  name: "Restaurant 1",
  numGuests: 20,
};
const rest2 = {
  name: "Restaurant 2",
};
rest1.numGuests = 0;

//logical assignment will ignore zero --because it's considered a falsy value
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

//instead use nullish coalescing operator
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

// AND ASSIGNMENT OPERATOR --compound assignment with AND
rest1.owner = "Jonas";

//assign anonymous if value is there else do nothing
rest1.owner &&= "<ANON>";
rest2.owner &&= "<ANON>";

console.log(rest1, rest2);

console.log(rest1, rest2);
//------------5- Rest Pattern and Rest Operator-------//
//works exactly the opposite to how spread operator works
//When it is on the left hand side of assignment, it is considered rest
//it must be the last element
//---1 used on functions (on variable names)
//---2 used in array creation (on variable names)
const [pizza, , risotto, ...otherItems] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherItems);

//rest on object
//select the name of property that you want to fetch
const { sat, ...weekdays } = restaurant.openingHours;
console.log(sat, weekdays);

//------------rest arguments----------------------//
const add = function (...argument) {
  let sum = 0;
  for (let i = 0; i < argument.length; i++) {
    sum += argument[i];
  }
  console.log(sum);
};

add(3, 4, 5, 6);
add(2, 3);
//------------4- The Spread Operator----------------//

//Spread operator only works
//    1. While creating arrays (on values)
//    2. while passing arguments (on values)

//how to concatenate a previous array with a new array and new values
const arrays = [4, 5, 6, [2, 3, 4]];

//spread operator will extract each element and put it to new array
const newArr = [2, "five", ...arrays];
console.log(newArr);
//--we can use it to copy an array--similar to assign() function
const newCopy = [...arrays];
console.log(newCopy);
//----Copying two arrays
const newCopyArr = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(newCopyArr);

//passing arguments using spread operator
// const ingredients = [
//   prompt("ingredient 1"),
//   prompt("ingredient 2"),
//   prompt("ingredient 3"),
// ];
// restaurant.orderPasta(...ingredients);

//iterables: maps,sets, arrays but not objects --we can extract each character using spread operator
const letters = [..."jonas"];
console.log(letters);

//---------Spread operator on Objects---------------------//
//Since es2018 we can use spread operator on objects as well
const updatedRestaurant = { foundedIn: 1999, ...restaurant, jobVacancy: true };
console.log(updatedRestaurant);

//we can copy the object as well
const oldCopyRestaurant = { ...updatedRestaurant };
oldCopyRestaurant.jobVacancy = false;
console.log(oldCopyRestaurant.jobVacancy);
console.log(updatedRestaurant.jobVacancy);
// ---------------2-De structuring objects-----------//
//put the exact name of property which you want to extract

// const { starterMenu, openingHours, categories } = restaurant;
// console.log(starterMenu, openingHours, categories);

//what if you want to change the name
const {
  starterMenu: menu,
  openingHours: timing,
  categories: restCat,
} = restaurant;
console.log(menu, timing, restCat);

//how to define default values of objects
const { starterMenu = [], openingHours } = restaurant;
console.log(starterMenu, openingHours);
const {
  menu: sMenu = [],
  openingHours: h = [],
  categories: c = [],
} = restaurant;
//here sMenu will be empty not undefined
console.log(sMenu, h, c);

//Mutating Object
let a1 = 23;
let b2 = 55;
const ob1 = { a1: 432, b2: 654, c3: 321 };
//enclose the in parenthesis _____reminder
({ a1, b2 } = ob1);
console.log(a1, b2);

//nested object
// way1
// let open = 2;
// let close = 4;
// ({ open, close } = restaurant.openingHours.fri);
//way2
// const { open, close } = restaurant.openingHours.fri;
//way3
const {
  fri: { open, close },
} = openingHours;
console.log(open, close);
/*

//----------------1-Normal way of de-structuring an array----------------------------------//
const arr = [5, 20, 23];
const a = arr[0];
const b = arr[1];

//-----------------ES6 Method------------------------------------------//
const [x, y, z] = arr;
console.log(x, y, z);

//-------------- Can fetch all of few--------//

const [cat1, cat2] = restaurant.categories;
console.log(cat1, cat2);

//--------------In order to skip certain elements leave holes---//

const [c1, c2, , c3] = restaurant.categories;
console.log(c1, c2, c3);

//---------Usual way to swap variables--------//
let [starter, main] = restaurant.categories;
console.log(starter, main);
// const temp = starter;
// starter = main;
// main = temp;
// console.log(starter, main);

//----------ES6 Method-------------//

[main, starter] = [starter, main];
console.log(starter, main);

//-----------returning multiple values from function-------------//

const [dish1, dish2] = restaurant.order(0, 2);
console.log(dish1, dish2);

//nested arrays
const arr2 = [2, 3, 4, [55, 66]];
const [aa, bb, , [, c]] = arr2;
console.log(aa, bb, c);

// how to pre-define values
const arr3 = [2, 3];
const [aaa = 1, bbb = 1, ccc = 1] = arr3;
console.log(aaa, bbb, ccc);
*/

//-----------------------------------CODING CHALLENGE 1 --------------------------------------------------------//
/*
We're building a football betting app (soccer for my American friends �)!
Suppose we get data from a web service about a certain game ('game' variable on 
next page). In this challenge we're gonna work with that data.
Your tasks:
1. Create one player array for each team (variables 'players1' and 
'players2')
2. The first player in any player array is the goalkeeper and the others are field 
players. For Bayern Munich (team 1) create one variable ('gk') with the 
goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 
field players
3. Create an array 'allPlayers' containing all players of both teams (22 
players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a 
new array ('players1Final') containing all the original team1 players plus 
'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 
'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player 
names (not an array) and prints each of them to the console, along with the 
number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which 
team is more likely to win, without using an if/else statement or the ternary 
operator.
Test data for 6.: First, use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. 
Then, call the function again with players from game.scored
*/
const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
  printGoal: function (...players) {
    console.log(`Goals scored: ${players.length}`);
    for (let i = 0; i < players.length; i++) console.log(players[i]);
  },
};

//creating player array for each
const [player1, player2] = game.players;
console.log(player1, player2);

//creating a goal keeper and rest of players
const [gk, ...fieldPlayers] = [...player1];
console.log(gk, fieldPlayers);

//creating an array of all players
const allPlayers = [...player1, ...player2];
console.log(allPlayers);

// final team 1 players

const players1Final = ["Thiago", "Coutinho", "Perisic", ...player1];
console.log(players1Final);

// three variables based on game.odd
const { team1, x: draw, team2 } = game.odds;
console.log(team1, draw, team2);

//print goal function call
game.printGoal(...game.scored);

team1 < team2 && console.log("Team 1 is most likely to win");
team2 < team1 && console.log("team 2 is most likely to win");

//------------------------------------CODING CHALLENGE 2--------------------------------------
/*
Let's continue with our football betting app! Keep using the 'game' variable from 
before.
Your tasks:
1. Loop over the game.scored array and print each player name to the console, 
along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already 
studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
Odd of victory Bayern Munich: 1.33
Odd of draw: 3.25
Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them 
(except for "draw"). Hint: Note how the odds and the game objects have the 
same property names �
4. Bonus: Create an object called 'scorers' which contains the names of the 
players who scored as properties, and the number of goals as the value. In this 
game, it will look like this:
{
 Gnarby: 1,
 Hummels: 1,
 Lewandowski: 2
}
*/

//1. lOOPING OVER THE PLAYER NAME
for (const [i, player] of Object.entries(game.scored)) {
  console.log(`Goal ${Number(i) + 1}: ${player}`);
}

//2. Calculating the average odd
const oddArr = Object.values(game.odds);
let sum = 0;
for (const odd of oddArr) {
  sum += odd;
}
console.log(`Average = ${sum / oddArr.length}`);

//3.
for (const [i, odd] of Object.entries(game.odds)) {
  console.log(`Odd of ${game[i] || "draw"} : ${odd}`);
}

//4---creating object

const scorers = {};
//for each player who scored
for (const player of game.scored) {
  //if the key is present then increment its value else assign one goal point to it
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}

console.log(scorers);

//------------------------------------CODING CHALLENGE 3----------------------------------//
/*
Let's continue with our football betting app! This time, we have a map called 
'gameEvents' (see below) with a log of the events that happened during the 
game. The values are the events themselves, and the keys are the minutes in which 
each event happened (a football game has 90 minutes plus some extra time).
Your tasks:
1. Create an array 'events' of the different game events that happened (no 
duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 
was unfair. So remove this event from the game events log.
3. Compute and log the following string to the console: "An event happened, on 
average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over 'gameEvents' and log each element to the console, marking 
whether it's in the first half or second half (after 45 min) of the game, like this:
[FIRST HALF] 17: ⚽ GOAL
*/
const gameEvents = new Map([
  [17, "⚽ GOAL"],
  [36, "� Substitution"],
  [47, "⚽ GOAL"],
  [61, "� Substitution"],
  [64, "� Yellow card"],
  [69, "� Red card"],
  [70, "� Substitution"],
  [72, "� Substitution"],
  [76, "⚽ GOAL"],
  [80, "⚽ GOAL"],
  [92, "� Yellow card"],
]);

//1-CREATING AN ARRAY OF EVENTS HAPPENED
const events = [...new Set(gameEvents.values())];
console.log(events);

//2-remove minutes 64 from gameEvents
gameEvents.delete(64);
console.log(gameEvents);

//3- Calculate after how many minutes an event occured on average

console.log(`An event happened, on 
average, every ${90 / gameEvents.size} minutes`);

//4-iterating the map
for (const [time, event] of gameEvents) {
  console.log(
    time <= 45
      ? `[FIRST HALF] ${time}: ${event}`
      : `[SECOND HALF] ${time}: ${event}`
  );
}
