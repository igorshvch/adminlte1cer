const URL_LOCALHOST = "http://localhost:3000";
const URL_PROXY_CORS_SERVER = 'https://fast-retreat-13273.herokuapp.com/';
const URL_API = "http://185.92.151.213/helpdesktest/hs/helpdesk/";

export const URL_TASKLIST = `${URL_LOCALHOST}/tasklist`;
export const URL_ERROR = `${URL_LOCALHOST}/error`;
export const URL_NEW_TASK_CARD = `${URL_LOCALHOST}/new_task`;

export const API_LOGIN = `${URL_PROXY_CORS_SERVER}${URL_API}user/login`
export const API_TASK_TABLE = `${URL_PROXY_CORS_SERVER}${URL_API}ticket/list`
export const API_MENU = `${URL_PROXY_CORS_SERVER}${URL_API}user/menu`

export function redirectToNewPage(url_page) {
    location.href = url_page;
}

export function redirectIfUnAthorized(key="token", url_page=URL_LOCALHOST) {
    if (localStorage.getItem(key)) {
        console.log("using localStorage");
    } else if (sessionStorage.getItem(key)) {
        console.log("using localStorage");
    } else {
        console.error("failed to use WebStorage, redirecting...");
        redirectToNewPage(url_page); 
    }
}