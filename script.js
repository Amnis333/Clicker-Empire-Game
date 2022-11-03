const config = {
    loginPage : document.getElementById("loginPage"),
    mainPage : document.getElementById("mainPage"),
    purchasePage : document.getElementById("purchasePage")
}

class PlayerInfo{

    constructor(playerName, age, days, money, clicking){
        this.playerName = playerName;
        this.age = age;
        this.days = days;
        this.money = money;
        this.clicking = clicking; //クリック回数
    }

    clickBurger(){
        this.clicking += 1;
        return this.clicking;
    }
}

class Item{
    constructor(itemName, price, img, numberOwned, earnPerSecond){
        this.itemName = itemName;
        this.price = price;
        this.img = img;
        this.numberOwned = numberOwned;
        this.earnPerSecond = earnPerSecond;
    }
}

const itemList = [
    new Item("Flip machine", 15000, "./flip_machine.png", 0, 25),
    new Item("ETF Stock", 300000, "./etf.png", 0, 0.1),
    new Item("ETF Bonds", 300000, "./etf.png", 0, 0.07),
    new Item("Lemonade Stand", 30000, "./lemonade.png", 0, 30)
]

function backPurchaseBtns(back, purchase){
    let container = document.createElement("div");
    container.innerHTML = `
    <div class="d-flex col-12 justify-content-between">
        <div class="col-6 d-flex justify-content-center">
            <button class="btn btn-primary btn-1 ">${back}</button>
        </div>
        <div class="col-6 d-flex justify-content-center">
            <button class="btn btn-primary btn-2">${purchase}</button>
        </div>
    </div>
    `;
    return container
}


function initializePlayerInfo(){
    //localStrageにconfig.loginPage.querySelectorAll("input")[0].valueがあるかどうか
    const defaultAge = 20;
    const defaultDays = 0; 
    const defaultMoney = 50000;
    const defaultClicking = 0;
    
    let player = new PlayerInfo(
        config.loginPage.querySelectorAll("input")[0].value,
        defaultAge,
        defaultDays,
        defaultMoney,
        defaultClicking
    )
    console.log(player);
    config.loginPage.classList.add("d-none");
    config.mainPage.append(drawMainPage(player));
}

function drawMainPage(player){
    let container = document.createElement("div");
    container.innerHTML = `
    <div class="vh-100 d-flex justify-content-center container">
        <div class="bg-light col-md-10 d-flex">
            <div class="col-md-5" id="mainPageLeft">
                <div class="text-center my-5">
                    <h5 id="numberOfBurger">${player.clicking} Burgers</h5>
                    <h5>One click $25</h5>
                    <img src="./burger.png" class="burger" id="burgerImg">
                </div>    
            </div>
            <div class="col-md-7" id="mainPageRight">
                <div>
                    <div class="d-flex text-center">
                        <h5 class="col-md-6">${player.playerName}</h5>
                        <h5 class="col-md-6">${player.age} years old</h5>
                    </div>
                    <div class="d-flex text-center">
                        <h5 class="col-md-6">${player.days} days</h5>
                        <h5 class="col-md-6">$${player.money}</h5>
                    </div>
                </div>
                <div id="items">
                    <div class="scroll">
                        <div class="container d-flex">
                            <div class="col-3 bg-dark">
                                <img src=${itemList[0].img} class="itemImg bg-success">
                            </div>
                            <div class="col-6 bg-warning">
                                <div class="justify-content-start d-flex">
                                    <h4>${itemList[0].itemName}</h4>
                                </div>
                                <div>
                                    <h5>$${itemList[0].price}</h5>
                                </div>
                            </div>
                            <div class="col-3 ">
                                <div class="justify-content-end d-flex">
                                    <h4>${itemList[0].numberOwned}</h4>
                                </div>
                                <div class="justify-content-end d-flex">
                                    <h5>${itemList[0].earnPerSecond}/click</h5>
                                </div>
                            </div>
                        </div>
                        ${drawItems(itemList)}    
                    </div>
                </div>
            </div>
        </div>

    </div>
    `;

    container.querySelectorAll("#burgerImg")[0].addEventListener("click",function(){
        player.clickBurger();
    })
    container.querySelectorAll("#mainPageLeft")[0].append(backPurchaseBtns("Save","Reset"));
    //container.querySelectorAll("#items")[0].append(drawItems(itemList));

    return container;
}


//Flip Machine以外のアイテムを描く関数
function drawItems(itemList){
    let container = document.createElement("div");
    container.innerHTML = ``;
    for(let i = 1; i < itemList.length; i++){
        container.innerHTML += `
        <div class="container d-flex">
            <div class="col-3 bg-dark">
                <img src=${itemList[i].img} class="itemImg bg-success">
            </div>
            <div class="col-6 bg-warning">
                <div class="justify-content-start d-flex">
                    <h4>${itemList[i].itemName}</h4>
                </div>
                <div>
                    <h5>$${itemList[i].price}</h5>
                </div>
            </div>
            <div class="col-3 ">
                <div class="justify-content-end d-flex">
                    <h4>${itemList[i].numberOwned}</h4>
                </div>
                <div class="justify-content-end d-flex">
                    <h5>${itemList[i].earnPerSecond}/click</h5>
                </div>
            </div>
        </div>
        `;
    }
    return container.innerHTML;
}