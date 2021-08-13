import {
    STORAGE,
    TOKEN
} from './storageAPI.js'

import {
    API_CHAT_UPDATE,
    API_CHAT_SEND_MESSAGE
} from '../locations/locations.js'

export function updateChat (messenger, currentTask, url=API_CHAT_UPDATE) {
    let requestBody;
    if (messenger.messageCounter>0) {
        requestBody = {id: currentTask, messageID: messenger.messageCounter};
    } else {
        requestBody = {id: currentTask};
    }
    console.log(requestBody)
    fetch(url, {
        method: "POST",
        headers: {
            "Authorization": `Token ${TOKEN}`,
            "Connection": "keep-alive",
        },
        body: JSON.stringify(requestBody)
    })
    .then((resp)=>{
        let data = resp.json();
        return data;
    })
    .then((data)=>{
        if (data.error) {
            console.log("THIS IS UPDATE!", data)
            return null;
        } else if (!data) {
            console.log(data);
            console.log("No new messages!")
        } else {
            for (const message of data) {
                const userId = message.user.id;
                const userName = message.user.name;
                const postTime = message.created;
                const text = message.message;
                const messageNum = message.messageId
                if (userId === STORAGE.getItem("userId")) {
                    messenger.post(text, userName, postTime, 'right', messageNum);
                } else {
                    messenger.post(text, userName, postTime, 'left', messageNum);
                }
            }
        }
    });
}

export function sendMessage (messenger, currentTask, url=API_CHAT_SEND_MESSAGE, message="TEST") {
    messenger.post(message, STORAGE.getItem("userName"), undefined, "right", messenger.messageCounter);
    fetch(url, {
        method: "POST",
        headers: {
            "Authorization": `Token ${TOKEN}`
        },
        body: JSON.stringify({
            id: currentTask,
            message: message,
        })
    })
    .then((resp)=>{
        let data = resp.json();
        return data;
    })
    .then((data)=>{
        if (data.error) {
            console.log(data);
        }
    });
}

export class ChatMessage {
    static boxAllClassRight = ["direct-chat-msg", "right"];
    static boxAllClassLeft = ["direct-chat-msg"];
    static boxHeaderClass = ["direct-chat-infos", "clearfix"];
    static boxHeaderNameClass = ["direct-chat-name"];
    static boxHeaderTimeStampClass = ["direct-chat-timestamp"];
    static boxImgClass = ["direct-chat-img"];
    static boxTextClass = ["direct-chat-text"];
    static TimeStampOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        //second: 'numeric'
    }
    static rightMargin = "margin-left: 50px; margin-right: 5px;"
    static leftMargin = "margin-left: 5px; margin-right: 50px;"

    constructor(imgSource=undefined, parent=undefined) {
        this.imgSource = imgSource;
        this.parent = parent;
        this.htmlTemplate = document.createElement("template");
        this.messageCounter = 0;
    }

    post(text, personName=STORAGE.getItem("userName"), time=undefined, mode="right", count=0) {
        this.messageCounter = ++count;
        const postTime = time ? new Date(time) : new Date();
        const img = (
            this.imgSource ?
            `<img class="${ChatMessage.boxImgClass.join(' ')}" src="${this.imgSource}"></img>`
            : ''
        )
        const Box = mode==="right" ? ChatMessage.boxAllClassRight.join(' ') : ChatMessage.boxAllClassLeft.join(' ');
        const Margin = mode==="right" ? ChatMessage.rightMargin : ChatMessage.leftMargin;
        const Floating = mode==="right" ? ["float-right", "float-left"] : ["float-left", "float-right"];
        const str = (
            `<div class="${Box}">
                <div class="${ChatMessage.boxHeaderClass.join(' ')}">
                    <span class="${ChatMessage.boxHeaderNameClass.join(' ')} ${Floating[0]}">${personName}</span>
                    <span class="${ChatMessage.boxHeaderTimeStampClass.join(' ')} ${Floating[1]}">${postTime.toLocaleString("ru", ChatMessage.TimeStampOptions)}</span>
                </div>
                ${img}
                <div class="${ChatMessage.boxTextClass.join(' ')}" style="${Margin};">${text}</div>
            </div>`.replace(/\>\s+\</g, '\>\<')
        );
        this.htmlTemplate.innerHTML = str;
        const result = this.htmlTemplate.content.firstChild;
        if (this.parent) {
            this.parent.append(result);
            //console.log("height", this.parent.scrollHeight);
            this.parent.scrollTop = this.parent.scrollHeight;
            //result.scrollIntoView({behavior: "smooth"});
        } else {
            console.log(result);
        }
    }
}