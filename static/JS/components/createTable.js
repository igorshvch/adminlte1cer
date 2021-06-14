export function createTable(data) {
    let header, footer, colNameStore;
    let table = document.querySelector("#main_tasks_table");
    [header, colNameStore] = createHeaderFooter(data, "head");
    table.append(header);
    [footer, colNameStore] = createHeaderFooter(data, "foot");
    table.append(footer);
    let tbody = createRow(data.list, colNameStore, badges)
    table.append(tbody);
    return table;
}

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
    let tbody = document.createElement("tbody");
    for (let row_data of data_object) {
        let row = document.createElement("tr");
        for (let key of colNameStore) {
            let cell = document.createElement('td');
            if ((row_data[key] in badges) && (key === "status")) {
                cell.innerHTML = badges[row_data[key]];
            }
            else {
                cell.append(row_data[key]);
            }
            row.append(cell);
        }
        tbody.append(row);
    }
    return tbody;
}

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