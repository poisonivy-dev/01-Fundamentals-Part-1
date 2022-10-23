"use strict";

//--------CONSTRUCTOR FUNCTIONS ----------//

//CONSTRUCTOR FUNCTIONS ARE USED SINCE THE BEGINNING TO SIMULATE THE CLASSES

//CONSTRUCTOR FUNCTIONS ARE CALLED USING THE NEW KEYWORD

//ARROW FUNCTIONS WILL NOT WORK BECAUSE WE DON'T HAVE THIS KEYWORD WITH ARROW FUNCTIONS

const Person = function (firstName, birthYear) {
  //instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;
  //never do this
  //it would create copies for each object
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

const jonas = new Person("jonas", 1999);

//1. New {} is created
//2. function is called and this ={}
//3. {} linked to prototype
//4. function automatically return {}

// INSTANCEOF OPERATOR -- CHECK IF OBJECT IS CREATED FROM THAT CONSTRUCTOR FUNCTION

console.log(jonas instanceof Person);

/////////////////////////////////////////
//-----PROTOTYPES

//each function has a prototype property including constructor function

//adding methods to prototype
Person.prototype.calcAge = function () {
  console.log(2022 - this.birthYear);
};

//each object has access to prototype property and methods so we can do this
jonas.calcAge();

//step 3
console.log(jonas.__proto__ === Person.prototype);

//attributes -- prototype property that all can access but not owned by objects
Person.prototype.species = "Homo Sapiens";
console.log(jonas.species);
console.log(jonas.hasOwnProperty("firstName"));
console.log(jonas.hasOwnProperty("species"));

console.log(jonas.__proto__.__proto__);

// other data structures and methods also have prototypes

console.dir((x) => x + 1);

///////////////////////////////////
//------------STATIC METHODS-----//
Person.hey = function () {
  //   console.log(this);
  console.log(`Hey there! 👋`);
};
//instances cannot inherit static methods
Person.hey();
// jonas.hey();

//////////////////////////////////////
//---------------- CODING CHALLENGE 1 --------------//
/*Your tasks:
1. Use a constructor function to implement a 'Car'. A car has a 'make' and a 
'speed' property. The 'speed' property is the current speed of the car in 
km/h
2. Implement an 'accelerate' method that will increase the car's speed by 10, 
and log the new speed to the console
3. Implement a 'brake' method that will decrease the car's speed by 5, and log 
the new speed to the console
4. Create 2 'Car' objects and experiment with calling 'accelerate' and 
'brake' multiple times on each of them
Test data:
§ Data car 1: 'BMW' going at 120 km/h
§ Data car 2: 'Mercedes' going at 95 km/h
*/

// Constructor Function
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

//Prototype Functions
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`'${this.make}' going at ${this.speed}km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`'${this.make}' going at ${this.speed}km/h`);
};

//Declaring Objects
const bmw = new Car("BMW", 110);
const mercedes = new Car("Mercedes", 100);

//Calling Functions in prototype
bmw.accelerate();
mercedes.brake();

//-----------ES6 CLASSES ------------------//

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  //Methods will be added to .prototype property
  calcAge() {
    console.log(2022 - this.birthYear);
  }
  get age() {
    return 2022 - this.birthYear;
  }
  //getter setter example 2:
  //set a property that already exists
  set fullName(name) {
    if (name.includes(" ")) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }
  ////////////////////
  //static methods
  static hey() {
    console.log("hey there!");
  }
}

const jessica = new PersonCl("Jessica David", 1999);
console.dir(jessica);
jessica.calcAge();
console.log(jessica.age);

PersonCl.prototype.greet = function () {
  console.log(`hey ${this.fullName}`);
};
jessica.greet();
console.log(jessica.fullName);
// PersonCl.hey();

/////////////////////////////////////////
//----NOTES-----------//
// 1. Classes are not hoisted
// 2. Classes are first-class citizens
// 3. Classes are executed in strict mode

//----------GETTERS AND SETTERS------------//

const account = {
  owner: "Jonas",
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

//Acts like properties --not function calls
console.log(account.latest);
//set the property with assignment
account.latest = 50;
console.log(account.movements);

//////////////////////////////////////
//--------------oBJECT.CREATE()-------
//no new operator
// arg passed would be the prototype of object
const PersonPrototype = {
  calcAge() {
    console.log(2022 - this.birthYear);
  },
  // we can create a function to create variables programmatically
  init(firstName, birthYear) {
    this.birthYear = birthYear;
    this.firstName = firstName;
  },
};

const steven = Object.create(PersonPrototype);

//using init
steven.init("steven", 1999);

//no prototype properties
// steven.name = "Steven";
// steven.birthYear = "1999";
steven.calcAge();

//No need of construction function and prototype property

console.log(steven.__proto__ === PersonPrototype);

const sarah = Object.create(PersonPrototype);
sarah.init("sarah", 1998);
sarah.calcAge();

////////////////////////////////////////////
// ---------CODING CHALLENGE 2-------------//
/*
Your tasks:
1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide 
by 1.6)
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but 
converts it to km/h before storing the value, by multiplying the input by 1.6)
4. Create a new car and experiment with the 'accelerate' and 'brake'
methods, and with the getter and setter.
Test data:
§ Data car 1: 'Ford' going at 120 km/h
*/

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }

  accelerate() {
    this.speed += 10;
    console.log(`'${this.make} going at ${this.speed}'`);
  }
  brake() {
    this.speed -= 5;
    console.log(`'${this.make} going at ${this.speed}'`);
  }
}

const ford = new CarCl("Ford", 120);
console.log(ford.speedUS);
ford.accelerate();

//----------------------------INHERITANCE BETWEEN CLASSES---------//

const Student = function (firstName, birthYear, course) {
  //this would point to empty object when we'll create a student instance and we want to change the name and birthYear of that object
  // we will pass this in the call function to change the value of this in Person function call

  Person.call(this, firstName, birthYear);
  this.course = course;
};

Student.prototype = Object.create(Person.prototype);
// Student.prototype = Person.prototype;
Student.prototype.introduce = function () {
  console.log(`Hi! This is ${this.firstName} and I am studying ${this.course}`);
};
const jess = new Student("Jessica David", 1998, "Computer Science");
jess.introduce();
jess.calcAge();

console.log(jess.__proto__);
console.log(jess.__proto__.__proto__);

console.log(jess instanceof Student);
console.log(jess instanceof Person);
console.log(jess instanceof Object);

//have to fix because Object.create() has changes the constructor to Person
Student.prototype.constructor = Student;
// console.log(Student.prototype.constructor);

console.log(jess);

////////////////////////////////////////////////////////////////
//---------------CODING CHALLENGE 3------------------------//
/*
Your tasks:
1. Use a constructor function to implement an Electric Car (called 'EV') as a child
"class" of 'Car'. Besides a make and current speed, the 'EV' also has the 
current battery charge in % ('charge' property)
2. Implement a 'chargeBattery' method which takes an argument 
'chargeTo' and sets the battery charge to 'chargeTo'
3. Implement an 'accelerate' method that will increase the car's speed by 20, 
and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 
km/h, with a charge of 22%'
4. Create an electric car object and experiment with calling 'accelerate', 
'brake' and 'chargeBattery' (charge to 90%). Notice what happens when 
you 'accelerate'! Hint: Review the definition of polymorphism �
Test data:
§ Data car 1: 'Tesla' going at 120 km/h, with a charge of 23%
*/

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

//Inheriting class Car
EV.prototype = Object.create(Car.prototype);
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `${this.make} going at ${this.speed}km/h with a charge of ${this.charge}`
  );
};

const tesla = new EV("Tesla", 120, 23);
tesla.accelerate();
tesla.chargeBattery(50);
tesla.accelerate();
tesla.brake();

/////////////////////////////////////////////////////////////////////////
//------------------INHERITANCE USING ES6 CLASSES---------------------//
