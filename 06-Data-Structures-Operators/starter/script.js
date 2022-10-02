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
