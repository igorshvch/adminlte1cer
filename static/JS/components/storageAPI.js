export const STORAGE = localStorage.getItem('token') ? localStorage : sessionStorage;
export const TOKEN = STORAGE.getItem('token');

///////////////////////////////////////////////////

export const STORAGE_INFOPAGE_HEADER = STORAGE.getItem('infopage_header');
export const STORAGE_INFOPAGE_BODY = STORAGE.getItem('infopage_body');

export const STORAGE_USER_NAME = STORAGE.getItem('userName');
export const STORAGE_USER_ID = STORAGE.getItem('userId');
export const STORAGE_COMPANY_ID = STORAGE.getItem('companyId');
export const STORAGE_SUBDIVISION_ID = STORAGE.getItem('subdivisionId');
export const STORAGE_USER_EMAIL = STORAGE.getItem('userEmail');
export const STORAGE_PASSWORD_LENGTH = STORAGE.getItem('passwordLength');
export const STORAGE_TIME = STORAGE.getItem('time');


export const STORAGE_CURRENTTASK = STORAGE.getItem('currentTask');

export const STORAGE_TASKSVIEW_HEADER = STORAGE.getItem("tasksViewHeader")
export const STORAGE_TASKSVIEW = STORAGE.getItem("tasksView")