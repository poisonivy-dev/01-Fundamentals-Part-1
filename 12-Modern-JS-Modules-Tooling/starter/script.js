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
import { cart } from './shoppingCart.js';
import add from './shoppingCart.js';
add('bread', 4);
add('banana', 4);
add('apple', 4);

// live connection of import and export
//imports point to same place in memory --they are not copies
console.log(cart);

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
