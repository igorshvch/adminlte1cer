import {
    API_MENU,
    API_NEW_TASK_FORM,
    API_ADD_NEW_TASK,
    URL_VIEW_TASK_CARD,
    redirectToNewPage
} from './locations/locations.js'

import {
    popUpBoxMessage,
    popUpBoxLoading,
    messageText
} from './components/popUpBoxes.js'

import {
    myDropzone,
} from './components/customDropZone.js'

import {
    btnBrandLogo,
} from './components/commonBtns.js'

import {
    STORAGE,
    TOKEN,
} from './components/storageAPI.js'

import {
    loadMenu
} from './components/MenuBtnsLoader.js'

const menuContainer = document.querySelector("#menu-btn-container");
loadMenu(API_MENU, menuContainer);

const subHeader = document.querySelector("#sub-header");
const selectOptionsConfig = document.querySelector('#select-options-config');
const selectOptionsType = document.querySelector("#select-options-type");
const selectOptionsPriority = document.querySelector("#select-options-priority");
const taskName = document.querySelector("#task-name");
const endDataBox = document.querySelector("#reservation");

const buttonsContainer = document.querySelector("#buttons-container");

function parseToDateTimeStamp(string) {
    let str = string.trim();
    const spl = str.split('.');
    const d = new Date(spl[2], parseInt(spl[1])-1, spl[0]);
    return d.toISOString().split('T')[0]
}

function getData() {
    const inputVals = new Object();
    inputVals.priorityId = selectOptionsPriority.value;
    inputVals.text = $('#summernote').summernote('code');
    inputVals.configurationId = selectOptionsConfig.value;
    inputVals.newStatus = '' // get from button press from button id
    inputVals.typeId = selectOptionsType.value;
    inputVals.userName = "Тестовый пользователь"
    inputVals.title = taskName.value;
    inputVals.subdivisionName = "Руководители"
    inputVals.addedFiles = []; // from /save with file
    inputVals.objectId = '' // from /save with file
    inputVals.deadLine = endDataBox.value ? parseToDateTimeStamp(endDataBox.value) : '';
    return inputVals;
}

function loadData(url) {
    fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${TOKEN}`,
            'Connection': 'keep-alive'
        }
    })
    .then((resp)=>{
        let data = resp.json();
        return data;
    })
    .then((data)=>{
        let flags = [false, false, false];
        console.log(data);
        subHeader.innerHTML = data.formValues.headerStatusDescription.value;
        /*
        for (let selectBox of [selectOptionsPriority, selectOptionsConfig, selectOptionsType]) {
            let option = document.createElement('option');
            option.disabled = true;
            option.selected = true;
            option.append("Введите значение");
            selectBox.append(option); 
        }
        */
        for (let item of data.formValues.priority.listOfValues) {
            let option = document.createElement('option');
            option.name = item.name;
            option.value = item.id;
            option.append(item.name);
            if (data.formValues.priority.value && data.formValues.priority.value.id === item.id) {
                option.selected = true;
                flags[0] = true;
            }
            selectOptionsPriority.append(option);
        }
        if (!flags[0]) {
            selectOptionsPriority.append(defaultOption());
        }
            for (let item of data.formValues.configuration.listOfValues) {
            let option = document.createElement('option');
            option.name = item.name;
            option.value = item.id;
            option.append(item.name);
            if (data.formValues.configuration.value && data.formValues.configuration.value.id === item.id) {
                option.selected = true;
                flags[1] = true;
            }
            selectOptionsConfig.append(option);
        }
        if (!flags[1]) {
            selectOptionsConfig.append(defaultOption());
        }
        for (let item of data.formValues.type.listOfValues) {
            let option = document.createElement('option');
            option.name = item.name;
            option.value = item.id;
            option.append(item.name);
            if (data.formValues.type.value && data.formValues.type.value.id === item.id) {
                option.selected = true;
                flags[2] = true;
            }
            selectOptionsType.append(option);
        }
        if (!flags[2]) {
            selectOptionsType.append(defaultOption());
        }
        for (let preBtnObject of data.buttons) {
            let button = document.createElement("button");
            button.classList.add("btn", "btn-primary");
            button.id = preBtnObject.id;
            button.append(preBtnObject.name);
            buttonsContainer.append(button);
            button.addEventListener("click", (e)=> {
                e.preventDefault();
                prepareAndLoadData(e);
            })
        }
        if (data.formValues.deadLine.value) {
            const d = new Date(data.formValues.deadLine.value);
            endDataBox.value = d.toLocaleDateString();
            endDataBox.disabled = !data.formValues.deadLine.edit;
        } else {
            //endDataBox.disabled = !data.formValues.deadLine.edit;
        }
    })
}
console.log(API_ADD_NEW_TASK);
loadData(API_NEW_TASK_FORM);

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
            redirectToNewPage(redirectUrl+"/"+data.id);
        }
    });
}

function prepareAndLoadData(event) {
    popUpBoxLoading.style.display = "block";
    const inputVals = getData();
    inputVals.newStatus = event.target.id
    myDropzone.enqueueFiles(myDropzone.getFilesWithStatus(Dropzone.ADDED));
    if (myDropzone.getQueuedFiles().length > 0) {
        myDropzone.on("complete", (e)=> {
            inputVals.addedFiles.push(JSON.parse(e.xhr.response).id);
        });
        myDropzone.on("queuecomplete", (e)=> {
            saveNewTask(API_ADD_NEW_TASK, URL_VIEW_TASK_CARD, inputVals);
        });
    } else {
        saveNewTask(API_ADD_NEW_TASK, URL_VIEW_TASK_CARD, inputVals);
    }
}


function defaultOption() {
    let option = document.createElement('option');
    option.disabled = true;
    option.selected = true;
    option.append("Введите значение");
    return option;
}