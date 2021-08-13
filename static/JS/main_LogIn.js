import {
    URL_TASKLIST,
    URL_ERROR,
    API_LOGIN,
    API_TEST_CURRENT_TOKEN,
    redirectToNewPage
} from './locations/locations.js'

import {
    popUpBoxMessage,
    popUpBoxLoading,
    messageText
} from './components/popUpBoxes.js'

const userNameField = document.querySelector("#grab-input-email");
const passwordField = document.querySelector("#grab-input-password");
const STORAGE = localStorage.getItem('token') ? localStorage : sessionStorage;
const TOKEN = STORAGE.getItem('token');

if (TOKEN) {
    popUpBoxLoading.style.display = "block";
    userNameField.value = STORAGE.getItem('username');
    passwordField.value = "*".repeat(parseInt(STORAGE.getItem('passwordLength')));
    fetch (API_TEST_CURRENT_TOKEN, {
        method: "GET",
        headers: {
            "Authorization": TOKEN,
        }
    })
    .then((resp)=>{
        let data = resp.json();
        return data;
    })
    .then((data) => {
        if (data.error) {
            STORAGE.clear();
            redirectToNewPage(URL_ERROR);
        } else {
            STORAGE.setItem('userName', data.userName);
            redirectToNewPage(URL_TASKLIST)
        }
    })
}

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

function getLogInData () {
    const name = userNameField;
    const pass = passwordField;
    const data = {
        username: name.value,
        password: pass.value
    };
    return data
}

let loginBtn = document.querySelector("#login-btn")
loginBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    let externalData = getLogInData();
    if (!externalData.username || !externalData.password) {
        messageText.append("Укажите корректные данные для авторизации");
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
            console.log(data);
            console.log(messageText);
            messageText.append(data.errortext);
            console.log(messageText);
            popUpBoxMessage.style.display = "block";
            popUpBoxLoading.style.display = "none";
            //redirectToNewPage(URL_ERROR);
        }
        else {
            STORAGE.setItem("token", data.token);
            STORAGE.setItem('userName', data.userName);
            STORAGE.setItem('userId', data.userId ? data.userId : data.UserId);
            STORAGE.setItem('companyId', data.companyId);
            STORAGE.setItem('subdivisionId', data.subdivisionId);
            STORAGE.setItem("username", externalData.username);
            STORAGE.setItem("passwordLength", externalData.password.split('').length);
            const d = new Date();
            const timeStapm = d.toISOString();
            STORAGE.setItem("time", timeStapm);
            redirectToNewPage(URL_TASKLIST);
        }
    })
})