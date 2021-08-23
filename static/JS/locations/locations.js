
export const URL_LOCALHOST = "/";

export const URL_INFO = `${URL_LOCALHOST}info`;
export const URL_TASKLIST = `${URL_LOCALHOST}tasklist`;
export const URL_NEW_TASK_CARD = `${URL_LOCALHOST}task_new`;
export const URL_VIEW_TASK_CARD = `${URL_LOCALHOST}ticket/view`;

const URL_PROXY_CORS_SERVER = 'https://fast-retreat-13273.herokuapp.com/';
const URL_API = "http://185.92.151.213/helpdesktest/hs/helpdesk/";

export const URL_PROXI_API = '/api/'//`${URL_PROXY_CORS_SERVER}${URL_API}`;

export const API_LOGIN = `${URL_PROXI_API}user/login`;
export const API_TASK_TABLE = `${URL_PROXI_API}ticket/list`;
export const API_MENU = `${URL_PROXI_API}user/menu`;
export const API_NEW_TASK_FORM = `${URL_PROXI_API}ticket/meta`;
export const API_TEST_CURRENT_TOKEN = `${URL_PROXI_API}user/current`;
export const API_ADD_FILE = `${URL_PROXI_API}ticket/addFile`;
export const API_ADD_NEW_TASK = `${URL_PROXI_API}ticket/save`;
export const API_OPEN_TASK = `${URL_PROXI_API}ticket/open`;
export const API_REMOVE_FILE = `${URL_PROXI_API}ticket/removeFile`

export const API_CHAT_UPDATE = `${URL_PROXI_API}chat/update`;
export const API_CHAT_SEND_MESSAGE = `${URL_PROXI_API}chat/send`;

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