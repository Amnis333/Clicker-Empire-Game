const config = {
    loginPage : document.getElementById("loginPage"),
    mainPage : document.getElementById("mainPage"),
    purchasePage : document.getElementById("purchasePage")
}

class PlayerInfo{
    defalutAge = 20;
    defalutDays = 0;
    defaultMoney = 50000;
    defaultClicking = 0;

    constructor(playerName, age, days, money, clicking){
        this.playerName = playerName;
        this.age = age;
        this.days = days;
        this.money = money;
        this.clicking = clicking; //クリック回数
    }
}

function makingBtns(btn1, btn2){
    let container = document.createElement("div");
    container.innerHTML = `
    <div class="d-flex col-12 justify-content-between">
        <div class="col-6">
            <button class="btn btn-primary btn-1">${btn1}</button>
        </div>
        <div class="col-6 ">
            <button class="btn btn-primary btn-2">${btn2}</button>
        </div>
    </div>
    `;
    return container
}

function initializePlayerInfo(){
    let player = new PlayerInfo(
        config.loginPage.querySelectorAll("input")[0].value,
        this.defalutAge,
        this.defalutDays,
        this.defaultMoney,
        this.defaultClicking
    )
    console.log(player);
    config.loginPage.classList.add("d-none");
    //config.mainPage.append(drawingMainPage(player));
}

function drawingMainPage(player){

}