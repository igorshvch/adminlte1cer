export const popUpBoxMessage = document.querySelector("#pop-up-box");
export const popUpBoxLoading = document.querySelector("#pop-up-box-loading");
export const messageText = document.querySelector("#pop-up-box-message-text");

const closeBtn = document.querySelector("#close-btn");

if (closeBtn) {
    closeBtn.addEventListener("click", (e)=>{
        e.preventDefault();
        popUpBoxMessage.style.display = "none";
    })
}

window.addEventListener("click", (e) => {
    if (e.target == popUpBoxMessage) {
        console.log(e.target);
        popUpBoxMessage.style.display = "none";
    }
})