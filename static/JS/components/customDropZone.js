import {
    API_ADD_FILE
} from '../locations/locations.js'

import {
    popUpBoxMessage,
    messageText
} from './popUpBoxes.js'

function showAlert() {
    messageText.append("Превышен максимальный размер файла! Файл не должен быть больше 3 мегабайт");
    popUpBoxMessage.style.display = "block";
}

Dropzone.autoDiscover = false

// Get the template HTML and remove it from the doumenthe template HTML and remove it from the doument
const previewNode = document.querySelector("#template")
previewNode.id = ""
const previewTemplate = previewNode.parentNode.innerHTML
previewNode.parentNode.removeChild(previewNode)

export const myDropzone = new Dropzone(document.querySelector(".callout"), { // Make the whole body a dropzone
    url: API_ADD_FILE, // Set the url
    headers: {
        "Authorization": `Token ${sessionStorage.getItem("token")}`,
    },
    paramName: "file",
    maxFilesize: 3,
    /*
    accept: function(file, showAlert) {
        console.log("Имя файла", file.name);
        console.log("Размер файла:", file.size)
        if (file.size > 2) {
            showAlert();
        }
    },
    */
    thumbnailWidth: 80,
    thumbnailHeight: 80,
    parallelUploads: 20,
    previewTemplate: previewTemplate,
    autoQueue: false, // Make sure the files aren't queued until manually added
    previewsContainer: "#previews", // Define the container to display the previews
    clickable: ".fileinput-button", // Define the element that should be used as click trigger to select files.
    init: function() {
        console.log('init');
        this.on("error", function(file){
            showAlert();
             this.removeFile(file);
        })
    },
})