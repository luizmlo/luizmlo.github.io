'use strict';

const botaoC = document.getElementById('buttonC');
const botaoL = document.getElementById('buttonL');
const botaoR = document.getElementById('buttonR');

const moneyText = document.getElementById('moneyText');

let money = 0;
let increment = 1;
let idleProfit = 0;

let priceInc = 20;
let priceIdl = 100;

let incrementBonus = 1;
let idleBonus = 1;

let totalInc = 0;
let totalIdl = 0;

function addIdle(){
    if (deduct(priceIdl)){
        idleProfit += idleBonus;
        idleBonus = idleBonus * 2;
        priceIdl = priceIdl * 2;
        totalIdl += 1;
        botaoR.innerText = totalIdl;
    }
}

function idle(){
    money += idleProfit;
    moneyText.innerText = "$" + money;
}

function add(){
    money += increment;
    moneyText.innerText = "$" + money;
}

function addIncrement(){
    if (deduct(priceInc)){
        increment += incrementBonus;
        incrementBonus = incrementBonus * 2;
        priceInc = priceInc * 2;
        totalInc += 1;
        botaoL.innerText = totalInc;
    }
}

function deduct(price){
    if (money >= price){
        window.navigator.vibrate(20);
        money = money - price;
        moneyText.innerText = "$" + money;
        return true;
    }
}

setInterval(idle, 200);

botaoL.addEventListener("click", addIncrement);
botaoC.addEventListener("click", add);
botaoR.addEventListener("click", addIdle);