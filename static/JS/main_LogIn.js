import {
    URL_TASKLIST,
    URL_ERROR,
    API_LOGIN,
    redirectToNewPage
} from './locations/locations.js'

import {
    callPOSTthenDo
} from './servercalls/serverCalls.js'

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

let popUpBoxMessage = document.querySelector("#pop-up-box");
let closeBtn = document.querySelector("#close-btn");
let popUpBoxLoading = document.querySelector("#pop-up-box-loading");

let userNameField = document.querySelector("#grab-input-email");
let passwordField = document.querySelector("#grab-input-password");

function getLogInData () {
    const name = userNameField;
    const pass = passwordField;
    const data = {
        username: name.value,
        password: pass.value
    };
    console.log(data);
    return data
}

let loginBtn = document.querySelector("#login-btn")
loginBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    let data;
    let externalData = getLogInData();
    if (!externalData.username || !externalData.password) {
        popUpBoxMessage.style.display = "block";
        return 0;
    }
    popUpBoxLoading.style.display = "block";
    fetch(API_LOGIN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Connection': 'keep-alive',
        },
        body: JSON.stringify(externalData)
    }).then((resp) => {
        let data = resp.json();
        return data;
    }).then((data) => {
        if (data.error) {
            redirectToNewPage(URL_ERROR);   
        }
        else {
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("username", externalData.username);
            sessionStorage.setItem("passwordLength", externalData.password.split('').length);
            const d = new Date();
            const timeStapm = d.toISOString();
            sessionStorage.setItem("time", timeStapm);
            console.log("token:", data.token);
            console.log("timeStamp:", timeStapm);
            redirectToNewPage(URL_TASKLIST);
        }
    })
})


closeBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    popUpBoxMessage.style.display = "none";
})


window.addEventListener("click", (e) => {
    if (e.target == popUpBoxMessage) {
        console.log(e.target);
        popUpBoxMessage.style.display = "none";
    }
})