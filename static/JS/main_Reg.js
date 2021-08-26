import {
    API_REGISTRATION_COMPANY,
    URL_INFO,
    redirectToNewPage
} from './locations/locations.js';

import {
    STORAGE
} from './components/storageAPI.js';

import {
    popUpBoxLoading,
} from './components/popUpBoxes.js'

import {
    redirectToInfoPage
} from './components/infoPageRedirect.js'

const RF_NAME = document.querySelector("#reg-form-name");
const RF_EMAIL = document.querySelector("#reg-form-email");
const RF_PASSWORD = document.querySelector("#reg-form-password");
const RF_PASSWORD_CONFIRM = document.querySelector("#reg-form-password-confirm");

const WARNING_01 = document.querySelector('#warning-01');
const WARNING_02 = document.querySelector('#warning-02');
const WARNING_03 = document.querySelector('#warning-03');
const WARNING_04 = document.querySelector('#warning-04');

const FORMS = document.querySelectorAll('.form-control');
const PICS = document.querySelectorAll('.input-group-text')

const AGREETERMS = document.querySelector("#agreeTerms");
const REGISTERBUTTON = document.querySelector("#register-button");

AGREETERMS.checked = true;
REGISTERBUTTON.disabled = !REGISTERBUTTON.disabled;

AGREETERMS.addEventListener("change", (e)=> {
    e.preventDefault();
    REGISTERBUTTON.disabled = !REGISTERBUTTON.disabled;
})

REGISTERBUTTON.addEventListener("click", (e)=> {
    e.preventDefault();
    popUpBoxLoading.style.display = "block";
    clearWarnings();
    changeBorder('#ced4da');
    fetch(API_REGISTRATION_COMPANY, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Connection': 'keep-alive',
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive'
        },
        body: JSON.stringify({
            userName: RF_NAME.value,
            mail: RF_EMAIL.value,
            password: RF_PASSWORD.value,
            passwordConfirm: RF_PASSWORD_CONFIRM.value,
            noCheckEmail: true
        })
    }).then((resp)=> {
        let data = resp.json();
        return data
    }).then((data)=>{
        if (data.errorPageRedirect) {
            redirectToInfoPage(data)
        }
        if (data.error) {
            processError(data.errorFields);
            popUpBoxLoading.style.display = "none";
        }
        else {
            console.log('SUCCESS!');
            popUpBoxLoading.style.display = "none";
        }
    })
})

function clearWarnings() {
    WARNING_01.innerHTML = '';
    WARNING_02.innerHTML = '';
    WARNING_03.innerHTML = '';
    WARNING_04.innerHTML = '';
}

function createWarning (alert) {
    return (
        `<h5 class="col-12" style="font-weight:normal; font-size: 0.9rem; color: red; margin-bottom: 0"><i class="icon fas fa-exclamation-triangle"></i> ${alert}</h5>`
    )
}

function processError(obj) {
    let warningText;
    if (obj.userName) {
        warningText = createWarning(obj.userName)
        WARNING_01.innerHTML = warningText;
        FORMS[0].style.borderColor = 'red';
        PICS[0].style.borderColor = 'red';
    }
    if (obj.mail) {
        warningText = createWarning(obj.mail)
        WARNING_02.innerHTML = warningText;
        FORMS[1].style.borderColor = 'red';
        PICS[1].style.borderColor = 'red';
    }
    if (obj.password) {
        warningText = createWarning(obj.password)
        WARNING_03.innerHTML = warningText;
        FORMS[2].style.borderColor = 'red';
        PICS[2].style.borderColor = 'red';
    }
    if (obj.passwordConfirm) {
        warningText = createWarning(obj.passwordConfirm)
        WARNING_04.innerHTML = warningText;
        FORMS[3].style.borderColor = 'red';
        PICS[3].style.borderColor = 'red';
    }
}

function changeBorder(color) {
    for (let item of FORMS) {
        item.style.borderColor = color;
    }
    for (let item of PICS) {
        item.style.borderColor = color;
    }
}