import {
    API_TASK_TABLE,
    API_MENU,
    URL_PROXI_API
} from './locations/locations.js'

import {
    btnBrandLogo,
} from './components/commonBtns.js'

import {
    STORAGE
} from './components/storageAPI.js'

import {
    loadMenu
} from './components/MenuBtnsLoader.js'

import {
    loadTaskTable
} from './components/loadTaskTable.js'

import {
    popUpBoxLoading
} from './components/popUpBoxes.js'

const mainHeader = document.querySelector("#main-header");
const tableContainer = document.querySelector("#overflow_endpoint");


if (!STORAGE.getItem("tasksViewHeader")) {
    STORAGE.setItem("tasksViewHeader", "Актуальные");
    STORAGE.setItem("tasksView", "ticket/list?type=actual");
}

const menuContainer = document.querySelector("#menu-btn-container");
loadMenu(API_MENU, menuContainer)

loadTaskTable(`${URL_PROXI_API}${STORAGE.getItem("tasksView")}`, tableContainer)
mainHeader.innerHTML = (STORAGE.getItem("tasksViewHeader"));
