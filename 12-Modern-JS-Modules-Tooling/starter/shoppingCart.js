//exporting module

console.log('exporting module');

//scoped to current module
const shoppingCost = 10;
export const cart = [];

//TWO TYPES OF EXPORT
//1.Named export --used when we want to export multiple things
export const addToCart = function (prod, quant) {
  cart.push({ prod, quant });
  console.log(`${quant} ${prod} added to the cart`);
};

//exporting multiple things using named modules
const totalPrice = 247;
const totalQuantity = 500;

export { totalPrice, totalQuantity as tq };

//3.Export Default -used when we want to export one thing per module

//use the value not the name
//put default after export
//we can give any name to it during import

export default function (prod, quant) {
  cart.push({ prod, quant });
  console.log(`${quant} ${prod} added to the cart`);
}
