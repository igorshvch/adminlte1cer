import {
    URL_COMPANY_SETTINGS,
    API_REGISTRATION_ACTIVATION,
    redirectToNewPage
} from './locations/locations.js'

import {
    STORAGE
} from './components/storageAPI.js'

import {
    redirectToInfoPage
} from './components/infoPageRedirect.js'

const u = new URL(location.href);

console.log(API_REGISTRATION_ACTIVATION + u.search);

fetch('.'+ API_REGISTRATION_ACTIVATION + u.search, {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        'Connection': 'keep-alive',
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive'
    },
}).then((resp)=> {
    let data = resp.json();
    return data;
}).then((data)=>{
    if (data.errorPageRedirect) {
        redirectToInfoPage(data)
    } else {
        STORAGE.setItem('token', data.token);
        redirectToNewPage(URL_COMPANY_SETTINGS);
    }
})