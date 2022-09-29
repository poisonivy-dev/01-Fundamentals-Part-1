"use strict";
const btnOpen = document.querySelectorAll(".open-model");
const btnClose = document.querySelector(".close-model");
const model = document.querySelector(".model");
const overlay = document.querySelector(".overlay");
let hidden = document.querySelectorAll(".hidden");
console.log(btnOpen);
//--------------METHOD 1--------------------
//for each element belonging to the open-model class
// for (let i = 0; i < btnOpen.length; i++) {
//   //listen to the event
//   btnOpen[i].addEventListener("click", function () {
//     //change all the hidden classes to visible
//     for (let i = 0; i < hidden.length; i++) {
//       hidden[i].style.display = "block";
//     }
//   });
// }

// btnClose.addEventListener("click", function () {
//   //change all the hidden classes back to hidden
//   for (let i = 0; i < hidden.length; i++) {
//     hidden[i].style.display = "none";
//   }
// });

//----------------Method 2------------------
//works better when a class has more than one attribute and we have to manipulate it on certain actions
const addHiddenClass = function () {
  model.classList.add("hidden");
  overlay.classList.add("hidden");
};
const removeHiddenClass = function () {
  model.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

for (let i = 0; i < btnOpen.length; i++) {
  btnOpen[i].addEventListener("click", removeHiddenClass);
}
btnClose.addEventListener("click", addHiddenClass);
overlay.addEventListener("click", addHiddenClass);

//Keyboard event handler
//A global event checked on a document
document.addEventListener("keydown", function (ev) {
  if (ev.key === "Escape" && !model.classList.contains("hidden")) {
    addHiddenClass();
  }
});
