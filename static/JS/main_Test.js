console.log("TEST SCRIPT");

let btn = document.querySelector("#pop-up-btn");
let realPopUp = document.querySelector("#real-pop-up");
let closeBtn = document.querySelector("#close-btn");

btn.addEventListener("click", (e)=>{
    e.preventDefault();
    realPopUp.style.display = "block";
})

closeBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    realPopUp.style.display = "none";
})

window.addEventListener("click", (e) => {
    if (e.target == realPopUp) {
        console.log(e.target);
        realPopUp.style.display = "none";
    }
})