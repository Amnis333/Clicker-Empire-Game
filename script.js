function displayBlock(elem){
    elem.classList.add("d-block");
    elem.classList.remove("d-none");
}

function displayNone(elem){
    elem.classList.add("d-none");
    elem.classList.remove("d-block");
}

const config = {
    loginPage : document.getElementById("loginPage"),
    mainPage : document.getElementById("mainPage"),
    purchasePage : document.getElementById("purchasePage")
}

class Item{
    constructor(itemName, price, img, numberPurchased, amountOfEarning, maxPurchases, type){
        this.itemName = itemName;
        this.price = price;
        this.img = img;
        this.numberPurchased = numberPurchased;
        this.amountOfEarning = amountOfEarning;
        this.maxPurchases = maxPurchases;
        this.type = type
    }
}

const itemList = [
    new Item("Flip machine", 15000, "./flip_machine.png", 0, 25, 500, "/click"),
    new Item("ETF Stock", 300000, "./etf.png", 0, 0.1, Infinity, "/s"),
    new Item("ETF Bonds", 300000, "./etf.png", 0, 0.07, Infinity, "/s"),
    new Item("Lemonade Stand", 30000, "./lemonade.png", 0, 30, 1000, "/s"),
    new Item("Ice Cream Truck", 100000, "./ice_cream.webp", 0, 120, 500, "/s"),
    new Item("House", 20000000, "./house.webp", 0, 32000, 100, "/s"),
    new Item("TownHouse", 40000000, "./town_house.webp", 0, 64000, 100, "/s"),
    new Item("Condominium", 250000000, "./condominium.webp", 0, 500000, 20, "/s"),
    new Item("Industrial Space", 100000000, "./factory.webp", 0, 2200000, 10, "/s"),
    new Item("Hotel Skyscraper", 10000000000, "./skyscraper.webp", 0, 25000000, 5, "/s"),
    new Item("Bullet-Speed Sky Railway", 10000000000000, "./train.webp", 0, 30000000000, 1, "/s")
]


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
    

    increaseMoney(item){
        if(item === itemList[0]){
            //itemがflip_machineの場合
            this.money += 25 + item.amountOfEarning * item.numberPurchased;
        }
        else if(item === itemList[1] || item === itemList[2]){
            //itemがETFの場合
            this.money *= 1.1;
        }
        else{
            this.money += item.amountOfEarning * item.numberPurchased;
        }
    }

    purchaseItem(item){
        this.money -= item.price;
        item.numberPurchased ++;
    }
}



function drawTwoBtns(btn1, btn2){
    let container = document.createElement("div");
    container.innerHTML = `
    <div class="d-flex col-12 justify-content-between">
        <div class="col-6 d-flex justify-content-center">
            <button class="btn btn-primary btn-1">${btn1}</button>
        </div>
        <div class="col-6 d-flex justify-content-center">
            <button class="btn btn-primary btn-2">${btn2}</button>
        </div>
    </div>
    `;
    return container
}


function initializePlayerInfo(){
    //localStrageにconfig.loginPage.querySelectorAll("input")[0].valueがあるかどうか
    
    let player = new PlayerInfo(
        config.loginPage.querySelectorAll("input")[0].value,
        20,
        0,
        50000,
        0
    );
    displayNone(config.loginPage);
    //config.loginPage.classList.add("d-none");
    config.mainPage.append(drawMainPage(player));
}

function drawMainPage(player){
    //console.log(typeof player)
    let container = document.createElement("div");
    container.innerHTML = `
    <div class="vh-100 d-md-flex justify-content-center container">
        <div class="bg-light col-md-10 col-12 d-md-flex p-5 m-4">
            <div class="col-md-5 col-12 my-md-3" id="mainPageLeft">
                <div class="text-center my-5">
                    <h5 id="numberOfBurger">${player.clicking} Burgers</h5>
                    <h5>One click $25</h5>
                    <img src="./burger.png" class="burger" id="burgerImg">
                </div>    
            </div>
            <div class="col-md-7 col-12 my-md-3" id="mainPageRight">
                <div class="my-5">
                    <div class="d-flex text-center">
                        <h5 class="col-md-6 col-12">${player.playerName}</h5>
                        <h5 class="col-md-6 col-12">${player.age} years old</h5>
                    </div>
                    <div class="d-flex text-center">
                        <h5 class="col-md-6 col-12">${player.days} days</h5>
                        <h5 class="col-md-6 col-12" id="totalmoney">$${player.money}</h5>
                    </div>
                </div>
                <div class="scroll">
                    <div id="items"></div>    
                </div>
            </div>
        </div>

    </div>
    `;

    container.querySelectorAll("#burgerImg")[0].addEventListener("click",function(){
        //ハンバーガーをクリックした時の処理
        player.clickBurger();
        container.querySelector("#numberOfBurger").innerHTML = player.clicking + " Burgers";
        player.increaseMoney(itemList[0]);
        container.querySelector("#totalmoney").innerHTML = player.money;
    })
    container.querySelectorAll("#mainPageLeft")[0].append(drawTwoBtns("Save","Reset"));
    container.querySelectorAll("#items")[0].append(drawItems(itemList, player));

    return container;
}


//アイテムを描く関数
function drawItems(itemList, player){
    //console.log(player.playerName);
    let container = document.createElement("div");
    
    for(let i = 0; i < itemList.length; i++){
        let itemDiv = document.createElement("div");
        itemDiv.innerHTML += `
        <div class="d-flex bg-success p-3">
            <div class="col-md-4 col-6">
                <img src=${itemList[i].img} class="itemImg col-12">
            </div>
            <div class="col-md-5 col-4">
                <div class="justify-content-center d-flex">
                    <h4>${itemList[i].itemName}</h4>
                </div>
                <div class="justify-content-center d-flex">
                    <h5>$${itemList[i].price}</h5>
                </div>
            </div>
            <div class="col-md-3 col-2">
                <div class="justify-content-center d-flex">
                    <h4>${itemList[i].numberPurchased}</h4>
                </div>
                <div class="justify-content-center d-flex">
                    <h5>$${itemList[i].amountOfEarning} ${itemList[i].type}</h5>
                </div>
            </div>
        </div>
        `;
        container.append(itemDiv);

        itemDiv.addEventListener("click", function(){
            //container.innerHTML = ``;
            displayNone(config.mainPage.querySelectorAll("#items")[0]);
            config.mainPage.querySelectorAll(".scroll")[0].append(drawItemDetail((itemList[i]), player));
        });
    }
    return container;
}

//itemをクリックすると詳細が表示される関数
function drawItemDetail(item, player){
    let container = document.createElement("div");
    let detailDiv = document.createElement("div");
    detailDiv.innerHTML = `
    <div class="container py-3">
        <div class="d-flex">
            <div class="col-8">
                <h3>${item.itemName}</h3>
                <h5>Max purcahses: ${item.maxPurchases}</h5>
                <h5>Price: $${item.price}</h5>
                <h5>Get: $${item.amountOfEarning} ${item.type}</h5>
            </div>
            <div class="col-4">
                <img src=${item.img} class="itemImg">
            </div>
        </div>
        <div class="d-flex justify-content-start my-3">
            <h5>How many would you like to buy?</h5>
        </div>
        <div>
            <input type="number" class="form-control text-left" placeholder = 0>
        </div>
        <div class="my-3">
            <h5>total: $${item.price}</h5>
        </div>
    </div>
    `;
    detailDiv.querySelector(".container").append(drawTwoBtns("Go Back", "Purchase"));
    container.append(detailDiv);

    container.querySelectorAll(".btn-1")[0].addEventListener("click", function(){
        //GoBackボタンが押されたときの処理
        displayNone(container);
        displayBlock(config.mainPage.querySelectorAll("#items")[0]);
    });

    container.querySelectorAll(".btn-2")[0].addEventListener("click", function(){
        //Purchaseボタンが押された時の処理
        player.purchaseItem(item);
        config.mainPage.innerHTML = ``;
        config.mainPage.append(drawMainPage(player));
    });

    return container;
}

