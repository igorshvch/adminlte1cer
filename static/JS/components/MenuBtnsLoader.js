import {
    STORAGE,
    TOKEN
} from './storageAPI.js'

import {
    URL_NEW_TASK_CARD,
    URL_TASKLIST,
    URL_LOCALHOST,
    redirectToNewPage
} from '../locations/locations.js'

/*
import {
    popUpBoxLoading
} from './popUpBoxes.js'
*/

//const tableContainer = document.querySelector("#overflow_endpoint");

const logOutBtnContainer = document.querySelector("#logout-btn");

export class MenuButton {
    static listItemClassList = ["nav-item"];
    static anchorClassList = ["nav-link"];
    static iconClassList = ["nav-icon"];
    static spanClassList = ["badge", "badge-info", "left"];
    static btnHref = "#";
    constructor() {};

    createMenuBtn(preBtnObj, appendRight=false) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        const icon = document.createElement("i");
        const text = document.createElement("p");
        let pen = undefined;
        if (preBtnObj.pen) {
            pen = preBtnObj.pen.slice(1);
        }
        
        li.classList.add(...MenuButton.listItemClassList);
        if (preBtnObj.heading === "Задачи") {
            li.classList.add("menu-is-opening", "menu-open");
        }
        
        a.classList.add(...MenuButton.anchorClassList);
        icon.classList.add(...MenuButton.iconClassList);

        if (preBtnObj.heading === "Добавить задачу") {
            a.id="add-new-task";
            a.classList.add("active");
            //a.style.backgroundColor = preBtnObj.colour;
            if (preBtnObj.icon) {
                icon.classList.add(preBtnObj.icon);
            } else {
                icon.classList.add("fas", "fa-plus-circle");
            }
        } else {
            if (preBtnObj.icon) {
                icon.classList.add(...preBtnObj.icon);
            } else {
                if (preBtnObj.heading === "Задачи") {
                    icon.classList.add("fas", "fa-clipboard-list");
                } else {
                    icon.classList.add("far", "fa-circle");
                }
            }
        }

        if (preBtnObj.heading === "Выйти") {
            icon.style = "transform: rotate(180deg);"
        }

        const u = new URL(location.href);
        if (u.pathname === "/tasklist") {
            if (preBtnObj.heading === "Актуальные" && !STORAGE.getItem("tasksViewHeader")) {
                a.classList.add("active");
            } else if (preBtnObj.heading === STORAGE.getItem("tasksViewHeader")) {
                a.classList.add("active");
            }
        }

        a.href = "#";

        if (pen) {
            a.addEventListener("click", (e)=>{
                e.preventDefault();
                if (preBtnObj.heading !== "Добавить задачу") {
                    STORAGE.setItem("tasksViewHeader", preBtnObj.heading);
                    STORAGE.setItem("tasksView", pen);
                }
                if (pen === "ticket/add") {
                    console.log(pen);
                    redirectToNewPage(URL_NEW_TASK_CARD);
                } else {
                    redirectToNewPage(URL_TASKLIST);
                }
            })
        }

        if (appendRight) {
            text.innerHTML = preBtnObj.heading+'<i class="right fas fa-angle-left"></i>'
        }
        else {
            text.append(preBtnObj.heading+" ");
        }

        text.style.marginRight = "1rem"; 

        
        a.append(icon, text);
        if (preBtnObj.span) {
            for (const preSpanObj of preBtnObj.span) {
                const span = this.createSpanBox(preSpanObj);
                a.append(span);
            }
        }
        li.append(a);
        return li;        
    }

    createSpanBox(badge) {
        const span = document.createElement("span");
        span.classList.add(...MenuButton.spanClassList);
        span.append(badge.number);
        span.style.backgroundColor = badge.colour;
        span.style.marginRight = "3px";
        return span;
    }
}

export function loadMenu(url, container) {
    popUpBoxLoading.style.display = "block";
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${TOKEN}`,
            'Connection': 'keep-alive',
        }
    })
    .then((response)=>{
        let btns = response.json();
        return btns;
    })
    .then((btns)=>{
        const MB = new MenuButton();
        for (const preBtnObj of btns.buttons) {
            if (!preBtnObj.isGroup) {
                container.append(MB.createMenuBtn(preBtnObj));
            }
            else {
                const btn = MB.createMenuBtn(preBtnObj, true);
                const ul = document.createElement("ul");
                ul.classList.add("nav", "nav-treeview");
                for (const innerBtnObj of preBtnObj.buttons) {
                    ul.append(MB.createMenuBtn(innerBtnObj));
                }
                btn.append(ul);
                container.append(btn);
            }
        }
        const logOutBtn = MB.createMenuBtn({heading: "Выйти", icon: ["fas", "fa-sign-out-alt"]});
        logOutBtn.addEventListener("click", (e)=>{
            e.preventDefault();
            STORAGE.clear();
            redirectToNewPage(URL_LOCALHOST);
        })
        logOutBtnContainer.append(logOutBtn);
        popUpBoxLoading.style.display = "none";
    });
}

function dumbFunc(param) {
    console.log(param);
}