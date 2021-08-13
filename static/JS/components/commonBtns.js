import {
    STORAGE
} from './storageAPI.js'

import {
    URL_TASKLIST,
    URL_NEW_TASK_CARD,
    redirectToNewPage
} from '../locations/locations.js'

export const btnBrandLogo = document.querySelector("#brand-link");
btnBrandLogo.addEventListener("click", (e)=>{
    STORAGE.setItem("tasksViewHeader", "Актуальные");
    STORAGE.setItem("tasksView", "ticket/list?type=actual");
    redirectToNewPage(URL_TASKLIST);
})
btnBrandLogo.style.textAlign = "center";
btnBrandLogo.style.cursor = "pointer";

/*
export const btnAdd = document.querySelector("#add-new-task");
btnAdd.addEventListener("click", (e) => {
    e.preventDefault();
    redirectToNewPage(URL_NEW_TASK_CARD);
})
*/

export const btnsNav = [
    document.querySelector("#nav-link-tasks-actual"),
    document.querySelector("#nav-link-tasks-agree"),
    document.querySelector("#nav-link-tasks-all")
]