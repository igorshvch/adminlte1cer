export function tryFetchData(key, func, ...args) {
    if (localStorage.getItem(key)) {
        //console.log(`key ${key} was found in localStorage! Value: ${localStorage.getItem(key)}`);
    } else if (sessionStorage.getItem(key)) {
        //console.log(`key ${key} was found in sessionStorage! Value: ${sessionStorage.getItem(key)}`);
    } else {
        //console.log(`key ${key} wasn\'t found on the client. Try server call`);
        func(...args);
    }
}