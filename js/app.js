"use strict";

// Third party module

if (screen.width >= 1280) {
  particlesJS.load("particles-js", "assets/particles.json", null);
} else {
  particlesJS.load("particles-js", "assets/particles-mobile.json", null);
}

// Main app
const botaoC = document.getElementById("buttonC");
const botaoL = document.getElementById("buttonL");
const botaoR = document.getElementById("buttonR");
const moneyText = document.getElementById("moneyText");
const infoText = document.getElementById("info");
const clickAudio = document.getElementById("click");
const bgAudio = document.getElementById("bgMusic");

clickAudio.volume = "0.1";
bgAudio.volume = "0.1";

bgAudio.src = 'assets/bgMusic.ogg';
bgAudio.play();

let money = 0;
let increment = 1;
let idleProfit = 0;

let priceInc = 20;
let priceIdl = 100;

let incrementBonus = 1;
let idleBonus = 1;

infoText.innerText =
  "$ por click: " + increment + " | " + " $ por segundo: " + idleProfit * 5;

function playClick() {
  clickAudio.play();
}

function addIdle() {
  if (deduct(priceIdl)) {
    idleProfit += idleBonus;
    idleBonus = idleBonus * 2;
    priceIdl = priceIdl * 4;
    botaoR.innerText = "$" + priceIdl;
  }
}

function idle() {
  money += idleProfit;
  moneyText.innerText = "$" + money;
  infoText.innerText =
    "$ por click: " + increment + " | " + " $ por segundo: " + idleProfit * 5;
}

function add() {
  money += increment;
  moneyText.innerText = "$" + money;
}

function addIncrement() {
  if (deduct(priceInc)) {
    increment += incrementBonus;
    incrementBonus = incrementBonus * 2;
    priceInc = priceInc * 4;
    botaoL.innerText = "$" + priceInc;
  }
}

function deduct(price) {
  if (money >= price) {
    window.navigator.vibrate(20);
    money = money - price;
    moneyText.innerText = "$" + money;
    infoText.innerText =
      "$ por click: " + increment + " | " + " $ por segundo: " + idleProfit * 5;
    playClick();
    return true;
  }
}

setInterval(idle, 200);

window.addEventListener("click", add);
botaoC.addEventListener("click", add);
botaoL.addEventListener("click", addIncrement);
botaoR.addEventListener("click", addIdle);

window.addEventListener("keyup", function checkKey() {
  let key = this.event.key;
  switch (key) {
    case "ArrowLeft":
      addIncrement();
      break;
    case "ArrowRight":
      addIdle();
      break;
    default:
      add();
      break;
  }
});
