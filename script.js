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
    mainPage : document.getElementById("mainPage")
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


class PlayerInfo{

    constructor(playerName, age, days, money, clicking,itemList){
        this.playerName = playerName;
        this.age = age;
        this.days = days;
        this.money = money;
        this.clicking = clicking; //クリック回数
        this.itemList = itemList;//アイテムの保持状況
        this.intervalId = null;
    }

    clickBurger(){
        this.clicking += 1;
        return this.clicking;
    }
    
    increaseMoney(item){
        if(item === this.itemList[0]){
            //itemがflip_machineの場合
            this.money += 25 + item.amountOfEarning * item.numberPurchased;
        }
        else if(item === this.itemList[1]){
            //itemがETF Stockの場合
            this.money += (1.001 * item.numberPurchased * item.price);
        }
        else if(item === this.itemList[2]){
            //itemがETF Bondsの場合
            this.money += (1.0007 * item.numberPurchased * item.price);
        }
        else{
            this.money += item.amountOfEarning * item.numberPurchased;
        }
    }

    purchaseItem(item){
        this.money -= item.price;
        item.numberPurchased ++;
        //ETF Stockは購入するたびに価格が10%増える
        if(item === this.itemList[1]){
            item.price *= 1.1;
        }
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

function createNewPlayer(){
    let inputName = config.loginPage.querySelectorAll("input")[0].value;
    //Newボタンを押した時の処理
    if(inputName === "" || inputName === " " || inputName === "　"){
        alert("名前を入力してください");
    }
        //特殊プレイヤー：musk Tech Company買収可能
    else if(localStorage.getItem(inputName) === null && inputName === "musk"){
        let player = new PlayerInfo(
            inputName,50,0,10000000,0,[
            new Item("Flip machine", 15000, "./img/flip_machine.png", 0, 25, 500, "/click"),
            new Item("ETF Stock", 300000, "./img/etf.png", 0, 0.1, Infinity, "/s"),
            new Item("ETF Bonds", 300000, "./img/etf.png", 0, 0.07, Infinity, "/s"),
            new Item("Lemonade Stand", 30000, "./img/lemonade.png", 0, 30, 1000, "/s"),
            new Item("Ice Cream Truck", 100000, "./img/ice_cream.webp", 0, 120, 500, "/s"),
            new Item("House", 20000000, "./img/house.webp", 0, 32000, 100, "/s"),
            new Item("TownHouse", 40000000, "./img/town_house.webp", 0, 64000, 100, "/s"),
            new Item("Condominium", 250000000, "./img/condominium.webp", 1, 500000, 20, "/s"),
            new Item("Industrial Space", 100000000, "./img/factory.webp", 1, 2200000, 10, "/s"),
            new Item("Hotel Skyscraper", 10000000000, "./img/skyscraper.webp", 1, 25000000, 5, "/s"),
            new Item("Bullet-Speed Sky Railway", 10000000000000, "./img/train.webp", 0, 30000000000, 1, "/s"),
            new Item("Tech Company", 44000000000000,"./img/tech_company.png",0,100000000000,1,"/s")
        ])
        startGame(player);
    }
    else if(localStorage.getItem(inputName) === null){
        let player = new PlayerInfo(
            inputName, 20, 0, 50000, 0,[
                new Item("Flip machine", 15000, "./img/flip_machine.png", 0, 25, 500, "/click"),
                new Item("ETF Stock", 300000, "./img/etf.png", 0, 0.1, Infinity, "/s"),
                new Item("ETF Bonds", 300000, "./img/etf.png", 0, 0.07, Infinity, "/s"),
                new Item("Lemonade Stand", 30000, "./img/lemonade.png", 0, 30, 1000, "/s"),
                new Item("Ice Cream Truck", 100000, "./img/ice_cream.webp", 0, 120, 500, "/s"),
                new Item("House", 20000000, "./img/house.webp", 0, 32000, 100, "/s"),
                new Item("TownHouse", 40000000, "./img/town_house.webp", 0, 64000, 100, "/s"),
                new Item("Condominium", 250000000, "./img/condominium.webp", 0, 500000, 20, "/s"),
                new Item("Industrial Space", 100000000, "./img/factory.webp", 0, 2200000, 10, "/s"),
                new Item("Hotel Skyscraper", 10000000000, "./img/skyscraper.webp", 0, 25000000, 5, "/s"),
                new Item("Bullet-Speed Sky Railway", 10000000000000, "./img/train.webp", 0, 30000000000, 1, "/s")
            ]);
        startGame(player);        
    }
    else{
        alert(`${inputName}は既に存在します。Loadボタンを押してください。`);
    }    
}

function loadPlayer(){
    let inputName = config.loginPage.querySelectorAll("input")[0].value;
    if(inputName === "" || inputName === " " || inputName === "　"){
        alert("名前を入力してください");
    }
    else if(localStorage.getItem(inputName) !== null){
        let loginInfo = JSON.parse(localStorage.getItem(inputName))
        let player = new PlayerInfo(loginInfo.playerName, loginInfo.age, loginInfo.days, loginInfo.money, loginInfo.clicking,loginInfo.itemList);
        startGame(player);
    }
    else{
        alert(` ${inputName}は存在しません。Newボタンを押してください。`);
    }
}

function drawMainPage(player){
    let container = document.createElement("div");
    container.innerHTML = `
    <div class="vh-100 d-md-flex justify-content-center container">
        <div class="bg-secondary col-md-11 col-12 d-md-flex p-5 m-4">
            <div class="col-md-5 col-12 m-md-2 p-1 px-3 bg-dark" id="mainPageLeft">
                <div class="text-center my-3 bg-secondary p-2 text-light">
                    <h5 id="numberOfBurger">${player.clicking} Burgers</h5>
                    <h5>One click $${(player.itemList[0].numberPurchased + 1) * 25}</h5>
                </div>
                <div class="col-12">
                    <img src="./img/burger.png" class="burger" id="burgerImg">
                </div>
            </div>
            <div class="col-md-7 col-12 my-md-2" id="mainPageRight">
                <div class="bg-dark p-3 text-light">
                    <div class="d-md-flex text-center p-1">
                        <h5 class="col-md-6 col-12 mx-1 bg-secondary">${player.playerName}</h5>
                        <h5 class="col-md-6 col-12 mx-1 bg-secondary" id="age">${player.age} years old</h5>
                    </div>
                    <div class="d-md-flex text-center p-1">
                        <h5 class="col-md-6 col-12 bg-secondary mx-1" id="days">${player.days} days</h5>
                        <h5 class="col-md-6 col-12 bg-secondary mx-1" id="totalmoney">$${player.money}</h5>
                    </div>
                </div>
                <div class="scroll my-3 bg-dark">
                    <div id="items"></div>    
                </div>
                <div class="save-reset m-4">
                </div>
            </div>
        </div>

    </div>
    `;

    container.querySelectorAll("#burgerImg")[0].addEventListener("click",function(){
        //ハンバーガーをクリックした時の処理
        container.querySelector("#numberOfBurger").innerHTML = ``;
        player.clickBurger();
        container.querySelector("#numberOfBurger").innerHTML = player.clicking + " Burgers";
        player.increaseMoney(player.itemList[0]);
        container.querySelector("#totalmoney").innerHTML = ``;
        container.querySelector("#totalmoney").innerHTML = `$${player.money}`;
    })
    container.querySelectorAll(".save-reset")[0].append(drawTwoBtns("Save","Ending"));
    container.querySelectorAll(".btn")[0].classList.add("btn-dark","save");
    container.querySelectorAll(".btn")[1].classList.add("btn-dark","reset");
    container.querySelectorAll("#items")[0].append(drawItems(player.itemList, player));
    
    container.querySelector(".save").addEventListener("click", function(){
        //Saveを押した時の処理
        alert("セーブして終了します。");
        let jsonPlayer = JSON.stringify(player);
        localStorage.setItem(player.playerName, jsonPlayer);
        clearInterval(player.intervalId);
        alert("intervalId is " + player.intervalId);
        config.mainPage.innerHTML = ``;
        displayBlock(config.loginPage);

    });
    container.querySelector(".reset").addEventListener("click", function(){
        //Endingを押した時の処理
        alert("clicked Ending button");
        localStorage.removeItem(`${player.playerName}`);
        clearInterval(player.intervalId);
        alert("intervalId is " + player.intervalId);
        config.mainPage.innerHTML = ``;
        displayBlock(config.loginPage);
    });
    
    return container;
}

function startGame(player){
    displayNone(config.loginPage);
    displayBlock(config.mainPage);
    config.mainPage.innerHTML = ``;
    config.mainPage.append(drawMainPage(player));
    player.intervalId = setInterval(function(){
        player.days++;
        config.mainPage.querySelector("#days").innerHTML = ``;
        config.mainPage.querySelector("#days").innerHTML = `${player.days} days`;

        if(player.days % 365 == 0){
            player.age++;
            config.mainPage.querySelector("#age").innerHTML = ``;
            config.mainPage.querySelector("#age").innerHTML = `${player.age} years old`;
        }
        
        for(let i = 1; i < player.itemList.length; i++){
            player.money += player.itemList[i].numberPurchased * player.itemList[i].amountOfEarning;
        }
        config.mainPage.querySelector("#totalmoney").innerHTML = ``;
        config.mainPage.querySelector("#totalmoney").innerHTML = `$${player.money}`;
    },1000);

    alert("intervalId is " + player.intervalId);
}

//アイテムを描く関数
function drawItems(itemList, player){
    let container = document.createElement("div");
    
    for(let i = 0; i < itemList.length; i++){
        let itemDiv = document.createElement("div");
        itemDiv.innerHTML += `
        <div class="d-md-flex bg-dark text-light p-3">
            <div class="col-md-2 d-md-block d-none">
                <img src=${itemList[i].img} class="itemImg col-md-12">
            </div>
            <div class="col-md-6 col-12">
                <div class="justify-content-center d-md-flex">
                    <h5>${itemList[i].itemName}</h5>
                </div>
                <div class="justify-content-center d-md-flex">
                    <h5>$${itemList[i].price}</h5>
                </div>
            </div>
            <div class="col-md-4 col-12">
                <div class="justify-content-center d-md-flex">
                    <h5>${itemList[i].numberPurchased}</h5>
                </div>
                <div class="justify-content-center d-md-flex">
                    <h5>$${itemList[i].amountOfEarning} ${itemList[i].type}</h5>
                </div>
            </div>
        </div>
        `;
        container.append(itemDiv);

        itemDiv.addEventListener("click", function(){
            displayNone(config.mainPage.querySelectorAll("#items")[0]);
            config.mainPage.querySelectorAll(".scroll")[0].append(drawItemDetail((itemList[i]), player));
        });
    }
    return container;
}

//itemをクリックすると詳細が表示される関数
function drawItemDetail(item, player){
    let container = document.createElement("div");
    container.classList.add("bg-danger");
    let detailDiv = document.createElement("div");
    detailDiv.innerHTML = `
    <div class="container py-3 bg-dark text-light">
        <div class="d-flex ">
            <div class="col-md-8 col-12">
                <h5>${item.itemName}</h5>
                <h5>Max purchases: ${item.maxPurchases}</h5>
                <h5>Price: $${item.price}</h5>
                <h5>Get: $${item.amountOfEarning} ${item.type}</h5>
            </div>
            <div class="col-4 d-md-block d-none m-2">
                <img src=${item.img} class="itemDetailImg">
            </div>
        </div>
        <div class="d-flex justify-content-start my-md-3 m-4">
            <h5>How many would you like to buy?</h5>
        </div>
        <div>
            <input type="number" class="form-control text-left" id="purchase-form" placeholder = 0  min = 1 max = ${item.maxPurchases - item.numberPurchased}>
        </div>
        <div class="my-3" id = "total">
        </div>
    </div>
    `;

    detailDiv.querySelector(".container").append(drawTwoBtns("Go Back", "Purchase"));
    container.append(detailDiv);

    //総額を表示
    container.querySelector("input").addEventListener("change", function(){
        let total = document.createElement("h5");
        let totalAmount = item.price * container.querySelector("#purchase-form").value;
        detailDiv.querySelector("#total").innerHTML = ``;
        total.innerHTML = `total: $${totalAmount}`;
        detailDiv.querySelector("#total").append(total);
    });

    container.querySelectorAll(".btn-1")[0].addEventListener("click", function(){
        //GoBackボタンが押されたときの処理
        displayNone(container);
        displayBlock(config.mainPage.querySelectorAll("#items")[0]);
    });

    container.querySelectorAll(".btn-2")[0].addEventListener("click", function(){
        //Purchaseボタンが押された時の処理
        let numberOfitem = container.querySelector("#purchase-form").value;
        let totalAmount = item.price * numberOfitem;
        if(numberOfitem > 0 && totalAmount <= player.money && numberOfitem + item.numberPurchased <= item.maxPurchases){
            for(let i = 1; i <= numberOfitem; i++){
                player.purchaseItem(item);
            }
        }
        else if(totalAmount > player.money){
            alert("所持金が不足しています");
        }
        else if(numberOfitem < 1){
            alert("購入する場合は1以上の値を入力してください");
        }
        else{
            alert(`購入上限数の${item.maxPurchases}個を超えるため買うことができません。残り${item.maxPurchases - item.numberPurchased}個まで買うことができます`);
        }
        config.mainPage.innerHTML = ``;
        config.mainPage.append(drawMainPage(player));
    });

    return container;
}