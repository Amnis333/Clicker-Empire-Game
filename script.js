const config = {
    loginPage : document.getElementById("loginPage")
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

document.getElementById("loginBox").append(makingBtns("New","Login"));