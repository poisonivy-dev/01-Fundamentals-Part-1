// importing module
// All imported modules are hoisted to the top
// import './shoppingCart.js';
console.log('Importing module');
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// addToCart('apple', 6);
// console.log(price, tq);

//importing everything as an object
// import * as ShoppingCart from './shoppingCart.js';

// console.log(ShoppingCart);

//importing default import

//not advisable
// import add, {addToCart, totalPrice as price, tq } from './shoppingCart.js';
// import { cart } from './shoppingCart.js';
import add from './shoppingCart.js';
add('bread', 4);
add('banana', 4);
add('apple', 4);

// live connection of import and export
//imports point to same place in memory --they are not copies
// console.log(cart);

//--------OLD WAY------------------//
//MODULE PATTERN

const ShoppingCart = (function () {
  const shoppingCost = 10;
  const cart = [];
  const addToCart = function (prod, quant) {
    cart.push({ prod, quant });
    console.log(`${quant} ${prod} added to the cart`);
    console.log(cart);
  };

  return {
    addToCart,
    shoppingCost,
  };
})();

ShoppingCart.addToCart('bread', 50);
ShoppingCart.addToCart('apple', 20);
ShoppingCart.addToCart('bread', 50);

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es';
const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};

//deep copy not works
const stateClone = Object.assign({}, state);
console.log(stateClone);
//Using library here
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;
console.log(stateClone);

console.log(stateDeepClone);

//using parcel
//use npx
//npx parcel i index.html
//use npm script
//in package.json
//add script ,write
//parcel index.html
//use command npm run scriptName in command line

//------------CONFIGURING BABEL AND POLYFILLING------------//
//BABEL: CONVERTING ES6 CODE BACK TO ES5 SO THAT OLD BROWSERS CAN SUPPORT THE JS SCRIPT
//PARCEL AUTOMATICALLY USES BABEL
//babeljs.io
//WORKS WITH PLUGINS AND PRESETS THAT CAN BOTH BE CONFIGURED
//PLUGIN-->SPECIFIC JS FEATURE THAT WE WANT TO CONVERT
//preset--> BUNCH OF PLUGINS BUNDLED TOGETHER

//FIND FUNCTION--ES6 feature -->not converted(Transpiled)
console.log(state.cart.find(el => el.quantity >= 2));
Promise.resolve('Test').then(x => console.log(x));

//WE HAVE TO POLYFILL THE NEW FEATURES
//MANUALLY IMPORT LIBRARY
import 'core-js/stable/array/find';

//Polyfilling async functions
import 'regenerator-runtime/runtime';
