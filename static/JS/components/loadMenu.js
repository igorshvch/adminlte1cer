import {
    btnsNav,
} from '../components/commonBtns.js'

import {
    STORAGE,
    TOKEN
} from './storageAPI.js'

import {
    URL_TASKLIST,
    redirectToNewPage
} from '../locations/locations.js'

const taskListMenu = document.querySelector("#task-list-menu");
const taskListMenuInnerTree = document.querySelector("#task-list-menu-inner");

export function loadMenu(url, btnFunction, stopLoadingAnimation=true) {
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
        let data = response.json();
        return data;
    })
    .then((data)=>{
        let tasksBtns = data["buttons"][1]["buttons"];
        for (let i=0;i<tasksBtns.length; i++) {
            let name = document.createElement('p');
            name.append(tasksBtns[i]["heading"]+"  ");
            for (let bdg of tasksBtns[i]["span"]) {
                let badge = document.createElement('span');
                badge.classList.add("badge", "badge-info", "left");
                badge.style.backgroundColor = bdg["colour"];
                badge.append(bdg["number"]);
                name.append(badge);
            }
            btnsNav[i].append(name);
            btnsNav[i].addEventListener("click", (e) => {
                e.preventDefault();
                btnFunction(tasksBtns[i]);
            })
        }
        taskListMenu.classList.add("menu-open");
        taskListMenuInnerTree.style.display = "block";
        if (stopLoadingAnimation) popUpBoxLoading.style.display = "none";
    })
}