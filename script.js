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
}

function backPurchaseBtns(back, purchase){
    let container = document.createElement("div");
    container.innerHTML = `
    <div class="d-flex col-12 justify-content-between">
        <div class="col-6">
            <button class="btn btn-primary btn-1">${back}</button>
        </div>
        <div class="col-6 ">
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
    config.mainPage.append(drawingMainPage(player));
}

function drawingMainPage(player){
    let container = document.createElement("div");
    container.innerHTML = `
    <div class="vh-100 d-flex justify-content-center container">
        <div class="bg-light col-md-10 d-flex">
            <div class="col-md-5">
                <div id="burgerClick" class="text-center">
                    <h5>${player.clicking} Burgers</h5>
                    <h5>One click $25</h5>
                    <img src="./burger.png" class="burgerImg">
                </div>    
            </div>
            <div class="col-md-7 bg-danger">
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
            </div>
        </div>

    </div>
    `;
    return container;
}