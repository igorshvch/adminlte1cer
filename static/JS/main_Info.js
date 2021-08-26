import {
    STORAGE_INFOPAGE_HEADER,
    STORAGE_INFOPAGE_BODY,
} from './components/storageAPI.js'

const header = document.querySelector("#info-header");
const body = document.querySelector("#info-body");

if (STORAGE_INFOPAGE_HEADER) {
    header.innerHTML = '';
    header.append(STORAGE_INFOPAGE_HEADER)
}
if (STORAGE_INFOPAGE_BODY) {
    body.innerHTML = '';
    body.append(STORAGE_INFOPAGE_BODY);
}