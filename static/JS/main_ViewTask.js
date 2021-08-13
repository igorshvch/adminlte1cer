import {
    API_MENU,
    API_CHAT_UPDATE,
    API_CHAT_SEND_MESSAGE,
    API_OPEN_TASK,
    API_ADD_NEW_TASK,
    URL_TASKLIST,
    URL_VIEW_TASK_CARD,
    redirectToNewPage
} from './locations/locations.js'

import {
    popUpBoxMessage,
    popUpBoxLoading,
    messageText
} from './components/popUpBoxes.js'

import {
    sendMessage,
    updateChat,
    ChatMessage
} from './components/ChatWrapper.js'

import {
    btnBrandLogo,  
} from './components/commonBtns.js'

import {
    STORAGE,
    TOKEN,
} from './components/storageAPI.js'

import {
    loadMenu,
} from './components/MenuBtnsLoader.js'

import {
    FileBoxConstructonr
} from './components/FileBox.js'

const u = new URL(location.href);
STORAGE.setItem('currentTask', u.pathname.split("/").slice(-1))

const CURRENT_TASK = STORAGE.getItem('currentTask');

const menuContainer = document.querySelector("#menu-btn-container");
loadMenu(API_MENU, menuContainer)

const mainHeader = document.querySelector("#main-header");
const subHeader = document.querySelector("#sub-header");
const taskMaster = document.querySelector("#task-master");
const taskDivision = document.querySelector("#task-division");
const endDataBox = document.querySelector("#reservation");
const taskName = document.querySelector("#task-name");
const executionTimer = document.querySelector("#execution-time");
const taskAssesment = document.querySelector("#task-assessment");

const leftCard = document.querySelector("#card-body-left-column");


const selectOptionsConfig = document.querySelector('#select-options-config');
const selectOptionsType = document.querySelector("#select-options-type");
const selectOptionsPriority = document.querySelector("#select-options-priority");


const buttonsContainer = document.querySelector("#buttons-container");

const CHAT_MESSAGE_BOX = document.querySelector("#direct-chat-message-box");
const Messenger = new ChatMessage(undefined, parent=CHAT_MESSAGE_BOX);
const inputMessageField = document.querySelector('#message-input');
const sendMessageBtn = document.querySelector('#message-send');
sendMessageBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    const text = inputMessageField.value;
    inputMessageField.value = '';
    if (text) {
        sendMessage(Messenger, CURRENT_TASK, API_CHAT_SEND_MESSAGE, text);
    }
});
updateChat(Messenger, CURRENT_TASK, API_CHAT_UPDATE);
//setInterval(()=>{updateChat(Messenger, CURRENT_TASK, API_CHAT_UPDATE);}, 1500);

function chooseNumeral(char) {
    const integer = parseInt(char);
    if (integer === 0) {
        return " дней";
    } else if (integer === 1) {
        return " день";
    } else if (integer < 5) {
        return " дня";
    } else {
        return " дней";
    }
}

function unpackSelectField(dataObj, parent) {
    const mainOption = document.createElement('option');
    mainOption.selected = true;
    mainOption.append(dataObj.value.name);
    mainOption.value = dataObj.value.id;
    parent.append(mainOption);

    parent.disabled = !dataObj.edit;

    if (dataObj.listOfValues) {
        for (let preOptionObj of dataObj.listOfValues) {
            const otherOption = document.createElement('option');
            otherOption.append(preOptionObj.name);
            otherOption.value = preOptionObj.id;
            parent.append(otherOption);
        }
    }
}

function saveNewTask(url, redirectUrl, dataObj) {
    fetch(url, {
        method: "POST",
        headers: {
            "Authorization": `Token ${TOKEN}`,
        },
        body: JSON.stringify(dataObj),
    })
    .then((resp)=>{
        let data = resp.json();
        return data;
    })
    .then((data)=>{
        if (data.error) {
            console.log(data);
            popUpBoxLoading.style.display = "none";
            messageText.innerHTML = data.errortext;
            popUpBoxMessage.style.display = "block";
        } else {
            STORAGE.setItem('currentTask', data.id);
            //popUpBoxLoading.style.display = "none";
            redirectToNewPage(redirectUrl);
        }
    });
}

function loadData(url) {
    const tableConstructor = new FileBoxConstructonr();
    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${TOKEN}`,
            'Connection': 'keep-alive'
        },
        body: JSON.stringify({id: STORAGE.getItem("currentTask")})
    })
    .then((resp)=>{
        let data = resp.json();
        return data;
    })
    .then((data)=>{
        if (data.error) {
            console.log(data);
            messageText.innerHTML = data.errortext;
            popUpBoxLoading.style.display = "none";
            popUpBoxMessage.style.display = "block";
        }
        console.log(data);
        mainHeader.innerHTML = data.formValues.status.value;
        subHeader.innerHTML = data.formValues.headerStatusDescription.value;

        taskMaster.value = data.formValues.user.value.name;
        taskMaster.disabled = !data.formValues.user.edit;

        taskDivision.value = data.formValues.subdivision.value.name;
        taskDivision.disabled = !data.formValues.subdivision.edit;

        if (data.formValues.deadLine.value && data.formValues.deadLine.value.length > 2) {
            const d = new Date(data.formValues.deadLine.value);
            endDataBox.value = d.toLocaleDateString();
        }
        endDataBox.disabled = !data.formValues.deadLine.edit;

        taskName.value = data.formValues.title.value;
        taskName.disabled = !data.formValues.title.edit;

        const str = data.formValues.timeSpent.value;
        const numeral = chooseNumeral(str[str.length-1]);
        executionTimer.value = str + numeral;
        executionTimer.disabled = !data.formValues.timeSpent.edit;

        taskAssesment.value = data.formValues.assessment.value
        taskAssesment.disabled = !data.formValues.assessment.edit;

        if (!data.formValues.text.edit) $('#summernote1').summernote("disable");
        $('#summernote1').summernote('code', data.formValues.text.value);

        if (!data.formValues.textOfDeveloper.edit) $('#summernote2').summernote("disable");
        $('#summernote2').summernote('code', data.formValues.textOfDeveloper.value);

        if (data.formValues.files.length > 0) {
            const tb = tableConstructor.create(data.formValues.files);
            leftCard.append(tb);
        }

        unpackSelectField(data.formValues.configuration, selectOptionsConfig);
        unpackSelectField(data.formValues.type, selectOptionsType);
        unpackSelectField(data.formValues.priority, selectOptionsPriority);
        
        for (let preBtnObject of data.buttons) {
            let button = document.createElement("button");
            button.classList.add("btn", "btn-primary");
            button.id = preBtnObject.id;
            button.append(preBtnObject.name);
            buttonsContainer.append(button);
            button.addEventListener("click", (e)=> {
                e.preventDefault();
                popUpBoxLoading.style.display = "block";
                saveNewTask(API_ADD_NEW_TASK, URL_VIEW_TASK_CARD+"/"+CURRENT_TASK, {
                    newStatus: e.target.id,
                    configurationId: selectOptionsConfig.value,
                    title: taskName.value,
                    id: STORAGE.getItem("currentTask"),
                    text: $('#summernote1').summernote('code')
                });
            })
        }
        popUpBoxLoading.style.display = "none";
    })
}

loadData(API_OPEN_TASK);