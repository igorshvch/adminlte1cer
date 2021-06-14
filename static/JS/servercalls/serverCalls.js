export const TEST_LOGIN = {
    username: "testuser",
    password: "testuser"
}

export function callGET(url=URL_TASK_TABLE, token='eB6M7oC3DnCzJIfX7POuiNJqMW3BaJr2') {
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
            'Connection': 'keep-alive'
        }
    })
    .then((response) => {
        let data = response.json(); // parses JSON response into native JavaScript objects
        return data;
    })
    .then((data) => {
        console.log(data);
    });
}

export function callPOST(url=URL_LOGIN, externalData=TEST_LOGIN) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Connection': 'keep-alive',
        },
        body: JSON.stringify(externalData)
        /*{
            "username": "testuser", //sessionStorage.email,
            "password": "testuser"//sessionStorage.password,
        }*/
    }).then((resp) => {
        let data = resp.json();
        return data;
    }).then((data) => {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("username", externalData.username);
        sessionStorage.setItem("passwordLength", externalData.password.split('').length);
        const d = new Date();
        const timeStapm = d.toISOString();
        sessionStorage.setItem("time", timeStapm);
        console.log("token:", data.token);
        console.log("timeStamp:", timeStapm);
    });
}

export function callPOSTthenDo(url=URL_LOGIN, externalData=TEST_LOGIN, func, ...args) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Connection': 'keep-alive',
        },
        body: JSON.stringify(externalData)
        /*{
            "username": "testuser", //sessionStorage.email,
            "password": "testuser"//sessionStorage.password,
        }*/
    }).then((resp) => {
        let data = resp.json();
        return data;
    }).then((data) => {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("username", externalData.username);
        sessionStorage.setItem("passwordLength", externalData.password.split('').length);
        const d = new Date();
        const timeStapm = d.toISOString();
        sessionStorage.setItem("time", timeStapm);
        console.log("token:", data.token);
        console.log("timeStamp:", timeStapm);
    }).then(()=>{
        func(...args);
    });
}