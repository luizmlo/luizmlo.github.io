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

let musicOn = false;

let money = 0;
let clickProfit = 1;
let idleProfit = 0;

let priceInc = 20;
let priceIdl = 200;

let nvIdl = 1;
let nvInc = 1;

let caseState = 0;

clickAudio.volume = "0.1";
bgAudio.volume = "0.1";

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
  if (
    moneySave &&
    incSave &&
    idlSave &&
    clickProfitSave &&
    idleProfitSave &&
    clickPriceSave &&
    idlePriceSave
  ) {
    console.log("Save encontrado!");
    console.log("Money: ", moneySave);
    console.log("Nível do Click: ", incSave);
    console.log("Nível Idle: ", idlSave);
    console.log("Valor do click: ", clickProfitSave);
    console.log("Lucro por segundo: ", idleProfitSave);
    money = parseFloat(moneySave);
    clickProfit = parseFloat(clickProfitSave);
    idleProfit = parseFloat(idleProfitSave);
    nvInc = parseFloat(incSave);
    nvIdl = parseFloat(idlSave);
    priceInc = parseFloat(clickPriceSave);
    priceIdl = parseFloat(idlePriceSave);
  } else {
    console.log("Save não encontrado!");
  }
}

function updateMoney() {
  // let newMoneyTextValue;
  // const moneyTextPrefix = '$';
  // const moneyTextPostfix = ['', 'k', 'M', 'B', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  // const postfixRange = 1e3;

  // for (let i = 0; i < moneyTextPostfix.length; i++) {
  //   if (money <= postfixRange * Math.pow(postfixRange, i)) {
  //     // If the current amount of money is greater than `postfixRange`, reduce the current value
  //     // and add a new postfix to it. This is how cookie clicker games do to add a custom notation.
  //     const formatedMoney = money <= postfixRange? money.toFixed(1) : parseInt(money.toFixed(2)) / postfixRange;

  //     newMoneyTextValue = moneyTextPrefix + formatedMoney + moneyTextPostfix[i];
  //     break;
  //   }
  // }

  // moneyText.innerText = newMoneyTextValue;

  if (money >= 1) {
    moneyText.innerText = "$" + money.toFixed(1);
    if (money >= 1000) {
      //Kilos
      moneyText.innerText = "$" + (money / 1000).toFixed(2) + "k";
      if (money >= 1000000) {
        //Millions
        moneyText.innerText = "$" + (money / 1000000).toFixed(2) + "M";
        if (money >= 1000000000) {
          //Billions
          moneyText.innerText = "$" + (money / 1000000000).toFixed(2) + "B";
          if (money >= 1000000000000) {
            //Trillions
            moneyText.innerText =
              "$" + (money / 1000000000000).toFixed(2) + "a";
            if (money >= 1000000000000000) {
              //Quadrillions
              moneyText.innerText =
                "$" + (money / 1000000000000000).toFixed(2) + "b";
              if (money >= 1000000000000000000) {
                //Quintillions
                moneyText.innerText =
                  "$" + (money / 1000000000000000000).toFixed(2) + "c";
                if (money >= 1000000000000000000000) {
                  //Sextillions
                  moneyText.innerText =
                    "$" + (money / 1000000000000000000000).toFixed(2) + "d";
                  if (money >= 1000000000000000000000000) {
                    //Septillions
                    moneyText.innerText =
                      "$" +
                      (money / 1000000000000000000000000).toFixed(2) +
                      "e";
                    if (money >= 1000000000000000000000000000) {
                      //Octillions
                      moneyText.innerText =
                        "$" +
                        (money / 1000000000000000000000000000).toFixed(2) +
                        "f";
                      if (money >= 1000000000000000000000000000000) {
                        //Nonillions
                        moneyText.innerText =
                          "$" +
                          (money / 1000000000000000000000000000000).toFixed(2) +
                          "g";
                        if (money >= 1000000000000000000000000000000000) {
                          //Decillions
                          moneyText.innerText =
                            "$" +
                            (
                              money / 1000000000000000000000000000000000
                            ).toFixed(2) +
                            "h";
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
function updateButtons() {
  function updateButtonL() {
    if (priceInc >= 1) {
      botaoL.innerText = "$" + priceInc.toFixed(1);
      if (priceInc >= 1000) {
        botaoL.innerText = "$" + (priceInc / 1000).toFixed(1) + "k";
        if (priceInc >= 1000000) {
          botaoL.innerText = "$" + (priceInc / 1000000).toFixed(1) + "M";
          if (priceInc >= 1000000000) {
            botaoL.innerText = "$" + (priceInc / 1000000000).toFixed(1) + "B";
            if (priceInc >= 1000000000000) {
              botaoL.innerText = "$" + (priceInc / 1000000000000).toFixed(1) + "a";
              if (priceInc >= 1000000000000000) {
                botaoL.innerText = "$" + (priceInc / 1000000000000000).toFixed(1) + "b";
                if (priceInc >= 1000000000000000000) {
                  botaoL.innerText = "$" + (priceInc / 1000000000000000000).toFixed(1) + "c";
                  if (priceInc >= 1000000000000000000000) {
                    botaoL.innerText =
                      "$" + (priceInc / 1000000000000000000000).toFixed(1) + "d";
                    if (priceInc >= 1000000000000000000000000) {
                      botaoL.innerText =
                        "$" + (priceInc / 1000000000000000000000000).toFixed(1) + "e";
                      if (priceInc >= 1000000000000000000000000000) {
                        botaoL.innerText =
                          "$" + (priceInc / 1000000000000000000000000000).toFixed(1) + "f";
                        if (priceInc >= 1000000000000000000000000000000) {
                          botaoL.innerText =
                            "$" +
                            (priceInc / 1000000000000000000000000000000).toFixed(1) +
                            "g";
                          if (priceInc >= 1000000000000000000000000000000000) {
                            botaoL.innerText =
                              "$" +
                              (priceInc / 1000000000000000000000000000000000).toFixed(1) +
                              "h";
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  function updateButtonR() {
    if (priceIdl >= 1) {
		botaoR.innerText = "$" + priceIdl.toFixed(1);
		if (priceIdl >= 1000) {
			botaoR.innerText = "$" + (priceIdl / 1000).toFixed(1) + "k";
		  if (priceIdl >= 1000000) {
			botaoR.innerText = "$" + (priceIdl / 1000000).toFixed(1) + "M";
			if (priceIdl >= 1000000000) {
				botaoR.innerText = "$" + (priceIdl / 1000000000).toFixed(1) + "B";
			  if (priceIdl >= 1000000000000) {
				botaoR.innerText = "$" + (priceIdl / 1000000000000).toFixed(1) + "a";
				if (priceIdl >= 1000000000000000) {
					botaoR.innerText = "$" + (priceIdl / 1000000000000000).toFixed(1) + "b";
				  if (priceIdl >= 1000000000000000000) {
					botaoR.innerText = "$" + (priceIdl / 1000000000000000000).toFixed(1) + "c";
					if (priceIdl >= 1000000000000000000000) {
						botaoR.innerText =
						"$" + (priceIdl / 1000000000000000000000).toFixed(1) + "d";
					  if (priceIdl >= 1000000000000000000000000) {
						botaoR.innerText =
						  "$" + (priceIdl / 1000000000000000000000000).toFixed(1) + "e";
						if (priceIdl >= 1000000000000000000000000000) {
							botaoR.innerText =
							"$" + (priceIdl / 1000000000000000000000000000).toFixed(1) + "f";
						  if (priceIdl >= 1000000000000000000000000000000) {
							botaoR.innerText =
							  "$" +
							  (priceIdl / 1000000000000000000000000000000).toFixed(1) +
							  "g";
							if (priceIdl >= 1000000000000000000000000000000000) {
								botaoR.innerText =
								"$" +
								(priceIdl / 1000000000000000000000000000000000).toFixed(1) +
								"h";
							}
						  }
						}
					  }
					}
				  }
				}
			  }
			}
		  }
		}
	  }
  }
  updateButtonL();
  updateButtonR();
}
function updateStatus() {
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

function updateAll() {
  updateMoney();
  updateButtons();
  updateStatus();
}

function add() {
  money += clickProfit;
  updateAll();
}

function addClickProfit() {
  if (deduct(priceInc)) {
    nvInc += 1;
    clickProfit += clickProfit * 1.2;
    priceInc = priceInc * 3;
    updateAll();
  }
}

function idle() {
  money += idleProfit;
  updateAll();
}

function addIdle() {
  if (deduct(priceIdl)) {
    nvIdl += 1;
    if (idleProfit == 0) {
      idleProfit++;
    }
    idleProfit = idleProfit * 3;
    priceIdl = priceIdl * 4;
    updateAll();
  }
}

function deduct(price) {
  if (money >= price) {
    window.navigator.vibrate(20);
    money = money - price;
    updateAll();
    playShopSound();
    return true;
  }
}

function playShopSound() {
  clickAudio.pause();
  clickAudio.currentTime = 0;
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
