import {
    API_REMOVE_FILE
} from '../locations/locations.js'
import { STORAGE, TOKEN } from './storageAPI.js';

export class FileBoxConstructonr {
    static label = "Прикрепленные файлы:";
    static boxClassList = ["form"];
    static tableClassList = ["table"];
    static buttonCellClassList = ["text-right", "py-0", "align-middle"];
    static buttonContainerClassList = ["btn-group", "btn-group"];
    static buttonClassList = ["btn", "btn-primary"];
    static buttonIconClassList = ["far", "fa-trash-alt"];
    constructor() {};

    createRaw(fileData) {
        const row = document.createElement("tr");

        const cellIcon = document.createElement("td");
        cellIcon.classList.add(...FileBoxConstructonr.buttonCellClassList);
        cellIcon.style.cursor = "default";
        cellIcon.innerHTML = iconsStore[fileData.name.split(".").slice(-1)] ? iconsStore[fileData.name.split(".").slice(-1)] : iconsStore["default"];

        const cellFileName = document.createElement("td");
        cellFileName.append(fileData.name);
        cellFileName.style.cursor = "text";

        const cellBtn = document.createElement("td");
        cellBtn.classList.add(...FileBoxConstructonr.buttonCellClassList);

        const btnWrapper = document.createElement("div");
        btnWrapper.classList.add(...FileBoxConstructonr.buttonContainerClassList);

        const btn = document.createElement("a");
        btn.classList.add(...FileBoxConstructonr.buttonClassList);
        btn.href = "#";
        btn.id = fileData.id;

        btn.addEventListener("click", (e)=>{
            e.preventDefault();
            if (row.parentElement.children.length === 1) {
                row.parentElement.parentElement.remove();
            } else {
                row.remove();
            }
            removeFile(API_REMOVE_FILE, e.target.id, STORAGE.getItem("currentTask").split("=")[1]);
        });

        const icon = document.createElement("i");
        icon.classList.add(...FileBoxConstructonr.buttonIconClassList);

        btn.append(icon);
        btnWrapper.append(btn);
        cellBtn.append(btnWrapper);
        row.append(cellIcon, cellFileName); //row.append(cellFileName, cellBtn);
        return row
    }

    create(data) {
        const box = document.createElement("div");
        box.classList.add(...FileBoxConstructonr.boxClassList);

        const label = document.createElement("label");
        label.append(FileBoxConstructonr.label);

        const table = document.createElement("table");
        table.classList.add(...FileBoxConstructonr.tableClassList);

        for (let fileData of data) {
            const row = this.createRaw(fileData)
            table.append(row);
        }
        box.append(label, table);
        return box;
    }
}

function removeFile(url, fileID, taskID) {
    fetch(url, {
        method: "POST",
        headers: {
            "Authorization": `Token ${TOKEN}`
        },
        body: JSON.stringify(
            { id: taskID, file: { id: fileID } }
        )
    })
    .then((resp)=>{
        const data = resp.json();
        return data;
    })
    .then((data)=>{
        console.log(data);
    })
}

const iconsStore = {
    txt: '<i class="far fa-file-alt"></i>',
    pdf: '<i class="far fa-file-pdf"></i>',
    doc: '<i class="far fa-file-word"></i>',
    docx: '<i class="far fa-file-word"></i>',
    rtf: '<i class="far fa-file-alt"></i>',
    img: '<i class="far fa-file-image"></i>',
    jpg: '<i class="far fa-file-image"></i>',
    jpeg: '<i class="far fa-file-image"></i>',
    png: '<i class="far fa-file-image"></i>',
    gif: '<i class="far fa-file-image"></i>',
    xls: '<i class="far fa-file-excel"></i>',
    xlsx: '<i class="far fa-file-excel"></i>',
    rar: '<i class="far fa-file-archive"></i>',
    zip: '<i class="far fa-file-archive"></i>',
    default: '<i class="far fa-file-alt"></i>',
}