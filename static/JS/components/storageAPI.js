export const STORAGE = localStorage.getItem('token') ? localStorage : sessionStorage;
export const TOKEN = STORAGE.getItem('token');

export const TASK_TYPES = {
    all: {
        name: "all",
        url: "?type=all",
        header: "Все задачи",
        id: "#nav-link-tasks-all"
    },
    actual: {
        name: "actual",
        url: "?type=actual",
        header: "Актуальные задачи",
        id: "#nav-link-tasks-actual"
    },
    agreeOnAPrice: {
        name: "agreeOnAPrice",
        url: "?type=agreeOnAPrice",
        header: "К cогласованию",
        id: "#nav-link-tasks-agree"
    },
}