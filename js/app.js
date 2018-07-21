"use strict";

const botaoC = document.getElementById("buttonC");
const botaoL = document.getElementById("buttonL");
const botaoR = document.getElementById("buttonR");
const botaoSave = document.getElementById("saveButton");
const botaoLoad = document.getElementById("loadButton");
const moneyText = document.getElementById("moneyText");
const infoText = document.getElementById("info");
const clickAudio = document.getElementById("click");
const bgAudio = document.getElementById("bgMusic");

clickAudio.volume = "0.1";
bgAudio.volume = "0.1";

let musicOn = false;

let money = 0;
let clickProfit = 1;
let idleProfit = 0;

let priceInc = 20;
let priceIdl = 100;

let nvIdl = 1;
let nvInc = 1;


if (screen.width >= 1280) {
  particlesJS.load("particles-js", "assets/particles.json", null);
} else {
  particlesJS.load("particles-js", "assets/particles-mobile.json", null);
}

function saveGame() {
  localStorage.setItem("save-money", money);
  localStorage.setItem("save-nv-clickprofit", nvInc);
  localStorage.setItem("save-nv-idle", nvIdl);
  localStorage.setItem("save-clickprofit", clickProfit);
  localStorage.setItem("save-idleprofit", idleProfit);
  localStorage.setItem("save-clickprice", priceInc);
  localStorage.setItem("save-idleprice", priceIdl);
}

function loadSave() {
  let moneySave = localStorage.getItem("save-money");
  let incSave = localStorage.getItem("save-nv-clickprofit");
  let idlSave = localStorage.getItem("save-nv-idle");
  let clickProfitSave = localStorage.getItem("save-clickprofit");
  let idleProfitSave = localStorage.getItem("save-idleprofit");
  let clickPriceSave = localStorage.getItem("save-clickprice");
  let idlePriceSave = localStorage.getItem("save-idleprice");
  if (moneySave && incSave && idlSave && clickProfitSave && idleProfitSave && clickPriceSave && idlePriceSave) {
    console.log("Save encontrado!");
    console.log("Money: ", moneySave);
    console.log("Nível do Click: ", incSave);
    console.log("Nível Idle: ", idlSave);
    console.log("Valor do click: ", clickProfitSave);
    console.log("Lucro por segundo: ", idleProfitSave);
	money = parseFloat(moneySave);
	clickProfit = parseFloat(clickProfitSave)
	idleProfit = parseFloat(idleProfitSave)
    nvInc = parseFloat(incSave);
	nvIdl = parseFloat(idlSave);
	priceInc = parseFloat(clickPriceSave);
	priceIdl = parseFloat(idlePriceSave);
  } else {
    console.log("Save não encontrado!");
  }
}
function updateText() {
  moneyText.innerText = "$ " + money.toFixed(1);
  botaoR.innerText = "$" + priceIdl;
  botaoL.innerText = "$" + priceInc;
  infoText.innerText =
    "Nv: " +
    nvInc +
    " | $ por click: " +
    clickProfit.toFixed(1) +
    " | " +
    " $ por segundo: " +
    idleProfit.toFixed(1) * 5 +
    " | Nv: " +
    nvIdl;
}
function add() {
  money += clickProfit;
  updateText();
}
function addClickProfit() {
  if (deduct(priceInc)) {
    nvInc += 1;
    clickProfit += clickProfit * 1.1;
    priceInc = priceInc * 3;
    updateText();
  }
}
function idle() {
  money += idleProfit;
  updateText();
}
function addIdle() {
  if (deduct(priceIdl)) {
    nvIdl += 1;
    if (idleProfit == 0) {
      idleProfit++;
    }
    idleProfit = idleProfit * 2;
    priceIdl = priceIdl * 4;
    updateText();
  }
}
function deduct(price) {
  if (money >= price) {
    window.navigator.vibrate(20);
    money = money - price;
    updateText();
    playShopSound();
    return true;
  }
}
function playShopSound() {
  clickAudio.play();
}
function toggleBgMusic() {
  if (musicOn === false) {
    musicOn = true;
    bgAudio.play();
  } else {
    musicOn = false;
    bgAudio.pause();
  }
}

setInterval(idle, 200);

botaoSave.addEventListener("click", saveGame);
botaoLoad.addEventListener("click", loadSave);
botaoC.addEventListener("click", add);
botaoL.addEventListener("click", addClickProfit);
botaoR.addEventListener("click", addIdle);
window.addEventListener("keyup", function checkKey() {
  let key = event.key;
  this.console.log(key);
  switch (key) {
    case "ArrowLeft":
      addClickProfit();
      break;
    case "ArrowRight":
      addIdle();
      break;
    case "m":
      toggleBgMusic();
      break;
    case " ":
      add();
      break;
  }
});
