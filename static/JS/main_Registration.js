const agreeTerms = document.querySelector("#agreeTerms");
const registerButton = document.querySelector("#register-button");

agreeTerms.addEventListener("change", (e)=> {
    e.preventDefault();
    registerButton.disabled = !registerButton.disabled;
})