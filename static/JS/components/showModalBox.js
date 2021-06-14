let popUpBtn = document.querySelector(".custom-pop-up-btn");
let popUpBox = document.querySelector("#pop-up-box");
let closeBtn = document.querySelector("#close-btn");

popUpBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    popUpBox.style.display = "block";
})

closeBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    popUpBox.style.display = "none";
})

window.addEventListener("click", (e) => {
    if (e.target == popUpBox) {
        console.log(e.target);
        popUpBox.style.display = "none";
    }
})