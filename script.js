'use strict';

const botaoC = document.getElementById('buttonC');
const botaoL = document.getElementById('buttonL');
const botaoR = document.getElementById('buttonR');
const moneyText = document.getElementById('moneyText');
const infoText = document.getElementById('info');

let money = 0;
let increment = 1;
let idleProfit = 0;

let priceInc = 20;
let priceIdl = 100;

let incrementBonus = 1;
let idleBonus = 1;

infoText.innerText = '$ por click: ' + increment + ' | ' + ' $ por segundo: ' + (idleProfit * 5);

function addIdle(){
    if (deduct(priceIdl)){
        idleProfit += idleBonus;
        idleBonus = idleBonus * 2;
        priceIdl = priceIdl * 2;
        botaoR.innerText = "$" + priceIdl;
    }
}

function idle(){
    money += idleProfit;
    moneyText.innerText = "$" + money;
    infoText.innerText = '$ por click: ' + increment + ' | ' + ' $ por segundo: ' + (idleProfit * 5);
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
        botaoL.innerText = "$" + priceInc;
    }
}

function deduct(price){
    if (money >= price){
        window.navigator.vibrate(20);
        money = money - price;
        moneyText.innerText = "$" + money;
        infoText.innerText = '$ por click: ' + increment + ' | ' + ' $ por segundo: ' + (idleProfit * 5);
        return true;
    }
}

setInterval(idle, 200);

botaoL.addEventListener("click", addIncrement);
botaoC.addEventListener("click", add);
botaoR.addEventListener("click", addIdle);