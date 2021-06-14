import {
    URL_NEW_TASK_CARD,
    API_TASK_TABLE,
    API_MENU
} from './locations/locations.js'
 
import {
    createTable
} from './components/createTable.js'

function redirectToNewPage(url=NEW_TASK_CARD) {
    location.href = url;
}

const TOKEN = `${sessionStorage.getItem('token') || localStorage.getItem('token')}`;

const URL_PARAMS = {
    all: "?type=all",
    actual: "?type=actual",
    agreeOnAPrice: "?type=agreeOnAPrice"
}


let addBtn = document.querySelector("#add-new-task");
addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    redirectToNewPage(URL_NEW_TASK_CARD);
})

let btnActual = document.querySelector("#nav-link-tasks-actual");
let btnAgree = document.querySelector("#nav-link-tasks-agree");
let btnAll = document.querySelector("#nav-link-tasks-all")


function loadData(url) {
    fetch(url, {
        method: 'GET',
        mode: 'cors', // no-cors, *cors, same-origin
        //credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${TOKEN}`,
            //'Connection': 'keep-alive',
            //'Accept-Encoding': 'gzip, deflate, br',
            //'Accept': '*/*'
        }
    })
    .then((response) => {
        let data = response.json(); // parses JSON response into native JavaScript objects
        return data;
    })
    .then((data) => {
        console.log(data);
        createTable(data);
    })
    .then(() => {        
        $(document).ready(function() {
            $('#main_tasks_table').DataTable({
                //responsive: true,
                info: false,
                paging: false,
                searching: false
            });
        });
    })
}

loadData(API_TASK_TABLE + URL_PARAMS.actual);

function loadMenu(url) {
    fetch(url, {
        method: 'GET',
        mode: 'cors', // no-cors, *cors, same-origin
        //credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${TOKEN}`,
            //'Connection': 'keep-alive',
            //'Accept-Encoding': 'gzip, deflate, br',
            //'Accept': '*/*'
        }
    })
    .then((response)=>{
        let data = response.json(); // parses JSON response into native JavaScript objects
        return data;
    })
    .then(()=>{
        tasksBtns = data["buttons"];

    })
}