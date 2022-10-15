'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2022-10-11T23:36:17.929Z',
    '2022-10-15T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions
//Calculate Days Passed
const daysPassed = (date1, date2) =>
  Math.round(Math.abs(date1 - date2) / (1000 * 24 * 60 * 60));

//display formatted number
const formattedNumber = (mov, locale) =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
  }).format(mov);

//----SETTING COUNTDOWN TIMER-----//
const startLogOutTimer = function () {
  const tick = function () {
    const minutes = Math.trunc(time / 60)
      .toString()
      .padStart(2, 0);
    const seconds = Math.trunc(time % 60)
      .toString()
      .padStart(2, 0);
    //in each call, print the remaining time to UI
    labelTimer.textContent = `${minutes}:${seconds}`;
    //when 0 seconds,stop timer
    if (time === 0) {
      clearInterval(counter);
      //log out
      labelWelcome.textContent = `Login to Get Started`;
      containerApp.style.opacity = 0;
    }
    //decrease time
    time--;
  };
  //set time to five minutes
  let time = 300;

  //call the timer every second
  tick();
  const counter = setInterval(tick, 1000);
  return counter;
};
//Displaying the movements of account
const displayMovements = function (acc, sortedList = null) {
  //set the previously inserted html in container movements to empty
  containerMovements.innerHTML = '';
  (sortedList !== null ? sortedList : acc.movements).forEach(function (mov, i) {
    const date = new Date(acc.movementsDates[i]);
    //adding currency
    const formattedMov = new Intl.NumberFormat(acc.locale, {
      style: 'currency',
      currency: 'EUR',
    }).format(mov);
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = ` <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">${displayDates(date, acc.locale)}</div>
    <div class="movements__value">${formattedNumber(mov, acc.locale)}</div>
  </div>`;
    //takes the html to add and the position
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//compute username for each user
const user = 'Steven Thomas Williams';
const createUsername = function (accts) {
  accts.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(function (word) {
        return word[0];
      })
      .join('');
  });
};
//calculate and print balance
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((sum, currVal) => sum + currVal, 0);
  labelBalance.textContent = formattedNumber(acc.balance, acc.locale);
};

//calculate the summary of account
const calcSummary = function (movements, interestRate) {
  //INCOME
  const income = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formattedNumber(income, acc.locale);
  //OUTGOING
  const out = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formattedNumber(Math.abs(out), acc.locale);

  const interest = movements
    .filter(mov => mov > 0)
    .map(mov => {
      const int = (mov * interestRate) / 100;
      if (int >= 1) return int;
      else return 0;
    })
    .reduce((acc, mov) => mov + acc, 0);
  labelSumInterest.textContent = formattedNumber(interest, acc.locale);
};
//Displaying the dates
const displayDates = function (date = new Date(), locale = 'en-US') {
  const interval = daysPassed(new Date(), date);
  if (interval === 0) return 'Today';
  if (interval === 1) return 'Yesterday';
  if (interval <= 7) return `${interval} days ago`;
  //--old technique
  // return `${date.getDate().toString().padStart(2, 0)}/${(date.getMonth() + 1)
  //   .toString()
  //   .padStart(2, 0)}/${date.getFullYear()}`;
  //using Intl
  return new Intl.DateTimeFormat(locale).format(date);
};
// GET DATE FROM INTL API
const getCurrDate = function (acc) {
  //EXPERIMENTING THE INTERNATIONALIZATION API

  //INTL NAMESPACE, ACCEPTS LOCALE AND OPTIONS OBJECT:OPTIONAL
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    // weekday: 'short',
  };
  //we can get locale from users browser
  // const locale = navigator.language;
  labelDate.textContent = new Intl.DateTimeFormat(acc.locale, options).format(
    new Date()
  );
};
// UPDATE UI
const updateUI = function (acc) {
  //calling functions
  displayMovements(acc);
  calcDisplayBalance(acc);
  calcSummary(acc.movements, acc.interestRate);
  getCurrDate(acc);
  if (counter) clearInterval(counter);
  counter = startLogOutTimer();
};

//------------------declaring current account-----------------------------//
let acc, counter;

// Button login
btnLogin.addEventListener('click', function (e) {
  //this will prevent form from submitting
  e.preventDefault();
  const inputUsername = inputLoginUsername.value;
  const inputPin = Number(inputLoginPin.value);
  acc = accounts.find(acct => acct.username === inputUsername);
  //Optional Chaining --if account exists then find the pin
  if (acc?.pin === inputPin) {
    //Display UI and Welcome Message
    labelWelcome.textContent = `Welcome to Bankist ! ${
      acc.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    //Empty the fields
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    //Blur method to loose focus from field
    inputLoginPin.blur();
    updateUI(acc);
  }
});

//Transfer Amount
btnTransfer.addEventListener('click', function (e) {
  //prevent submit
  e.preventDefault();
  //fetching input field values
  const inputUsername = inputTransferTo.value;
  const amount = Number(inputTransferAmount.value);

  //get the requested username
  const receiverAccount = accounts.find(function (acc) {
    return acc.username === inputUsername;
  });
  //transfer the amount
  if (
    amount > 0 &&
    receiverAccount &&
    amount <= acc.balance &&
    receiverAccount?.username !== acc.username
  ) {
    //transfer balance
    acc.balance -= amount;
    receiverAccount.balance += amount;
    //update transactions
    receiverAccount.movements.push(amount);
    acc.movements.push(-amount);

    //add dates to transfer
    receiverAccount.movementsDates.push(new Date().toISOString());
    acc.movementsDates.push(new Date().toISOString());
    //empty field
    inputTransferTo.value = '';
    inputTransferAmount.value = '';
    inputTransferAmount.blur();
    //updateUI
    clearInterval(counter);
    updateUI(acc);
  }
});

//Delete Account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const inputUsername = inputCloseUsername.value;
  const pin = Number(inputClosePin.value);
  const index = accounts.findIndex(acc => acc.username === inputUsername);
  console.log(index);
  if (inputUsername === acc.username && pin === acc.pin) {
    const index = accounts.findIndex(acc => acc.username === inputUsername);
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

//Requesting Loan

//Some() function vs includes function
//some() function could search for value and returns T/F based on some condition
//every() function looks for each element satisfying the condition and return T/F based on that
//includes() only checks the value for equality

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmount = Math.floor(inputLoanAmount.value);
  if (loanAmount > 0 && acc.movements.some(mov => mov >= loanAmount * 0.1)) {
    setTimeout(function () {
      acc.balance += loanAmount;
      acc.movements.push(loanAmount);
      acc.movementsDates.push(new Date().toISOString());
      clearInterval(counter);
      updateUI(acc);
    }, 2500);
  }
  inputLoanAmount.value = '';
});

//sorting the movements
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  if (!sorted) {
    const sortedList = acc.movements.slice().sort((a, b) => a - b);
    displayMovements(acc, sortedList);
  } else displayMovements(acc);
  sorted = !sorted;
});

createUsername(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// //All Numbers are represented internally as floating values
// console.log(23 === 23.0);

// //All numbers are represented in Base 2
// //causes problems where some fractions are difficult to represent in base 2

// //Example:
// console.log(0.1 + 0.2);
// console.log(0.1 + 0.2 === 0.3); //err

// //Thus, we cannot do very precise scientific calculation in JS

// //strings to numbers
// console.log(Number('23'));
// console.log(+'23');

// //parsing parseInt(string,baseOfNumber)
// //has to start with number
// //otherwise it will return NaN

// console.log(Number.parseInt('30px'));
// console.log(Number.parseInt('e30'));

// //parseFloat()
// console.log(Number.parseFloat('2.4rem'));

// //isNaN()
// console.log(Number.isNaN(+'24gd'), typeof +'24gd');
// console.log(Number.isNaN('24gd'), typeof '24gd');

// //is not considering this use case
// console.log(Number.isNaN(20 / 0), typeof 20 / 0);

// //----isFinite(), isInteger()-->for int
// //A better approach
// console.log(Number.isFinite(+'24gd'), typeof +'24gd');
// console.log(Number.isFinite('24gd'), typeof '24gd');
// console.log(Number.isFinite(23));

// // -- Dividing by zero case ----
// console.log(Number.isFinite(20 / 0), typeof 20 / 0);

// //----sqrt()-------
// console.log(Math.sqrt(25), 25 ** 1 / 2);
// //--------CUBE ROOT-----
// console.log(8 ** 1 / 3);

// //-------max and min -------

// console.log(Math.max(23, 52, 65, 45, '23'));
// console.log(Math.max(23, 52, 65, 45, '23px'));
// console.log(Math.max(23, 52, 65, 45, 23));

// //-----Random b/w max and min val

// const randInt = (min, max) => Math.round(Math.random() * (max - min) + min);
// console.log(randInt(2, 6));

// //round(),ceil(),floor()

// //toFixed()
// //returns a string
// //methods works on objects while number is a primitive
// //JS converts number to object and applies method to it

// console.log((+'23.49658').toFixed(2));
// console.log(+(23.2).toFixed(2));

// //----THE REMAINDER OPERATOR---

// // btnLogin.addEventListener('click', function (e) {
// //   e.preventDefault;
// //   [...document.querySelectorAll('.movements__row')].forEach((row, i) =>
// //     (i + 1) % 2 === 0
// //       ? (row.style.backgroundColor = '#ccc')
// //       : (row.style.backgroundColor = '#fff')
// //   );
// // });

// //--Numeric separator (_)

// //can only be used in code to separate number

// //will not work while parsing string to number

// const n1 = 562_654_452;
// console.log(n1);

// //--------BIG INT -----
// //es2020 NEW PRIMITIVE

// console.log(2 ** 53 - 1); //largest int without err
// console.log(Number.MAX_SAFE_INTEGER);

// //bigInt
// const huge = 457634245763457693438634687634576873n;
// console.log(huge);

// //operations
// console.log(1000n + 100n);
// const num = 100;
// // console.log(1000n + num);
// // console.log(math.sqrt(16n))
// console.log(1000n + BigInt(num));

// //exceptions
// console.log(20 > 15);
// console.log(20n === 20);
// console.log(20n == 20);

// console.log(huge + 'is a huge number');

// //Division
// //cuts the decimal
// console.log(11n / 2n);
// console.log(11 / 2);

// //------------DATES AND TIME-------------------

// //create Date
// const now = new Date();
// console.log(now);

// //parse from string
// console.log(new Date('December 24,2015'));
// console.log(new Date('Aug 02 2020 18:05:41'));
// console.log(new Date(account1.movementsDates[0]));

// //pass parameter

// // 0 based months -> 10 == Nov
// console.log(new Date(2037, 10, 19, 15, 23, 5));
// // auto corrects month if the date is 31
// console.log(new Date(2037, 10, 31, 15, 23, 5));

// //time passed since unix time -- Jan 1,1970
// console.log(new Date(0));
// console.log(new Date(3 * 60 * 60 * 24 * 1000)); //after 3 days

// //working with dates
// const future = new Date(2037, 10, 19, 15, 23, 5);
// console.log(future);
// console.log(future.getFullYear());
// console.log(future.getMonth());
// console.log(future.getDate());
// console.log(future.getDay());
// console.log(future.getHours());
// //ISO string following international standard
// console.log(future.toISOString());
// //timestamp : time passed since jan1,1970 in mili-seconds
// console.log(future.getTime());

// console.log(new Date(2142238985000));
// //current timestamp
// console.log(Date.now());

// //setters
// future.setFullYear(2040);
// console.log(future);

// //-------CALCULATIONS ON DATES----
// //WHEN WE CONVERT A DATE TO A NUMBER -> RESULT IS IN MILlISECONDS WITH WHICH WE CAN PERFORM CALCULATIONS

// const future = new Date(2022, 10, 19, 15, 230);
// console.log(+future);

// // const daysPassed = (date1, date2) =>
// //   Math.round(Math.abs(date1 - date2) / (1000 * 24 * 60 * 60));

// console.log(daysPassed(+future, +new Date()));

// //---* FOR VERY PRECISE CALCULATIONS, WE CAN USE MOMENT.JS LIBRARY------------//

// //------------INTERNATIONALIZATION API---
// //FORMATTING DATES AND NUMBERS

// //Intl is the namespace for it

// //accepts a locale
// //options object:
// const options = {
//   hour: '2-digit',
//   minute: '2-digit',
//   day: 'numeric',
//   month: 'long',
//   year: 'numeric',
//   weekday: 'short',
// };
// const intlDate = new Intl.DateTimeFormat('en-US', options).format(new Date());
// console.log(intlDate);

// //Intl -- Numeric Formatting

// const num = 15213.56;

// //locale
// //options
// const opt = {
//   //currency,unit or percent
//   style: 'currency',
//   unit: 'celsius',
//   currency: 'EUR',
//   // useGrouping:false,
// };

// console.log(new Intl.NumberFormat(navigator.language, opt).format(num));
// console.log(new Intl.NumberFormat('en-UK', opt).format(num));

// //---------------**TIMERS**-------------//

// //SET-TIMEOUT
// //RUNS ONCE AFTER A CERTAIN TIME
// //REST CODE CONTINUES EXECUTION THIS BEHAVIOR ALSO CALLED ASYNCHRONOUS JS

// //firstArg: callback function
// //secondArg: time in ms
// //nextArg: input to callback functions as args
// //example
// const ingredient = ['spinach', 'olives'];
// const pizzaTimer = setTimeout(
//   (arg1, arg2) => console.log(`Here is you pizza with ${arg1} and ${arg2}🍕`),
//   3000,
//   ...ingredient
// );
// console.log('waiting...');

// //how to cancel timeout
// if (ingredient.includes('spinach')) clearTimeout(pizzaTimer);

// //SET-INTERVAL
// //RUNS FOREVER UNTIL WE STOP
// // setInterval(() => {
// //   console.log(
// //     new Intl.DateTimeFormat('en-US', {
// //       hour: 'numeric',
// //       minute: 'numeric',
// //       second: 'numeric',
// //     }).format(new Date())
// //   );
// // }, 2000);
// // setInterval(() => {
// //   const now = new Date();
// //   console.log(
// //     `Time: ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
// //   );
// // }, 5000);
