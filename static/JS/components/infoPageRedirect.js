import {
    URL_INFO,
    redirectToNewPage
} from '../locations/locations.js'

import {
    STORAGE
} from './storageAPI.js'

export function redirectToInfoPage(data) {
    STORAGE.setItem('infopage_header', data.errorPageHeading);
    STORAGE.setItem('infopage_body', data.errorPageText);
    redirectToNewPage(URL_INFO);
}