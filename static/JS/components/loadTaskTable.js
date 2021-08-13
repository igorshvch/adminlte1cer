import {
    createTable
} from './createTable.js'

import {
    TOKEN
} from './storageAPI.js'

import {
    popUpBoxLoading
} from './popUpBoxes.js'

export function loadTaskTable(url, tableContainer) {
    popUpBoxLoading.style.display = "block";
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${TOKEN}`,
            'Connection': 'keep-alive',
        }
    })
    .then((response) => {
        let data = response.json();
        return data;
    })
    .then((data) => {
        let table = createTable(data);
        tableContainer.append(table);
    })
    .then(() => {        
        $(document).ready(function() {
            $('#main_tasks_table').DataTable({
                //responsive: true,
                info: true,
                paging: true,
                searching: false,
                language: {
                    "processing": "Подождите...",
                    "search": "Поиск:",
                    "lengthMenu": "Показать _MENU_ записей",
                    "info": "Записи с _START_ до _END_ из _TOTAL_ записей",
                    "infoEmpty": "Записи с 0 до 0 из 0 записей",
                    "infoFiltered": "(отфильтровано из _MAX_ записей)",
                    "loadingRecords": "Загрузка записей...",
                    "zeroRecords": "Записи отсутствуют.",
                    "emptyTable": "В таблице отсутствуют данные",
                    "paginate": {
                        "first": "Первая",
                        "previous": "Предыдущая",
                        "next": "Следующая",
                        "last": "Последняя"
                    },
                }
            })
            /*
                autoWidth: true,
            }).columns.adjust();
            */
        });
        popUpBoxLoading.style.display = "none";
    })
}