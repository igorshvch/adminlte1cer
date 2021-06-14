let badges = {
    "Создана": '<span class="badge bg-secondary">Создана</span>', //
    "Получена оценка": '<span class="badge bg-indigo">Получена оценка</span>', // к согласованию
    "Передана в разработку": '<span class="badge bg-primary">Передана в разработку</span>', //
    "Отменена": '<span class="badge bg-navy">Отменена</span>', //
    "Передана на оценку": '<span class="badge bg-fuchsia">Передана на оценку</span>', //
    "Выполнена": '<span class="badge bg-olive">Выполнена</span>', // кроме этой все остальное в актуальные
    "Получена оценка": '<span class="badge bg-lime">Получена оценка</span>', //
    "Ошибка": '<span class="badge bg-danger">Ошибка</span>', //
    "Разрабатывается": '<span class="badge bg-warning">Разрабатывается</span>', //
    "Ожидает подтверждения": '<span class="badge bg-success">Ожидает подтверждения</span>', //
}

///////////////////////////////////////////////////

function loadData(url) {
    fetch(url, {
        method: 'GET',
        mode: 'cors', // no-cors, *cors, same-origin
        //credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token eB6M7oC3DnCzJIfX7POuiNJqMW3BaJr2',
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
        let header, footer, colNameStore;
        table = document.querySelector("#main_tasks_table");
        [header, colNameStore] = createHeaderFooter(data, "head");
        table.append(header);
        [footer, colNameStore] = createHeaderFooter(data, "foot");
        table.append(footer);
        [tbody, total] = createRow(data.list, colNameStore, badges)
        table.append(tbody);
        document.querySelector("#total-tasks").innerHTML = total;
    })
    .then(() => {
        $(document).Toasts('create', {
            title: 'Этот сайт использует cookie',
            body: 'Посещая настоящий сайт Вы даете согласие на использование файлов cookie',
            position: 'bottomLeft'
        });
        
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


console.log("NEW REQUEST!");
loadData('https://fast-retreat-13273.herokuapp.com/http://185.92.151.213/helpdesktest/hs/helpdesk/ticket/list');


function createHeaderFooter(data, pos){
    let colNameStore = [];
    let thead = document.createElement(`t${pos}`);
    let row = document.createElement("tr");
    for (let field of data.fields) {
        let cell_head = document.createElement('th');
        if (field.heading === "Номер")
            cell_head.append("№");
        else
            cell_head.append(field.heading);
        colNameStore.push(field.name);
        row.append(cell_head);
    }
    thead.append(row);
    return [thead, colNameStore];
}

function createRow(data_object, colNameStore, badges) {
    let total = 0;
    let tbody = document.createElement("tbody");
    for (let row_data of data_object) {
        let row = document.createElement("tr");
        total++;
        for (let key of colNameStore) {
            //let item = document.createElement('i');
            //item.classList.add('nav-icon');
            //item.classList.add('fas');
            //item.classList.add('fa-plus-circle')
            let cell = document.createElement('td');
            if ((row_data[key] in badges) && (key === "status")) {
                cell.innerHTML = badges[row_data[key]];
            }
            else {
                cell.append(row_data[key]); //(item, row_data[key]);
            }
            row.append(cell);
        }
        tbody.append(row);
    }
    return [tbody, total];
}
