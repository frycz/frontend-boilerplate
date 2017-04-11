import * as Gapi from "google-client-api"

export function initGapi() {
    return Gapi();
}

export function loadClientAuth(gapi) {
    return new Promise(function(resolve, reject) {
        gapi.load('client:auth2', resolve);
    });
}

export function initClient(gapi) {
    return gapi.client.init({
        'apiKey': '',
        'clientId': '',
        'scope': 'https://www.googleapis.com/auth/drive',
    })
}

export function authenticateUser(gapi) {
    return gapi.auth2.getAuthInstance().signIn({
        scope: 'https://www.googleapis.com/auth/drive'
    })
}

export function uploadFile(gapi, title, text) {
    const boundary = 'iv4qtco527t8uifggsbmmjs6296qu3ou';
    const delimiter = "\r\n--" + boundary + "\r\n";
    const close_delim = "\r\n--" + boundary + "--";

    var contentType = 'application/vnd.google-apps.document';
    var metadata = {
        'name': title,
        'mimeType': contentType
    };

    var base64Data = btoa(text);
    var multipartRequestBody =
        delimiter +
        'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
        JSON.stringify(metadata) +
        delimiter +
        'Content-Type: text/plain\r\n' +
        'Content-Transfer-Encoding: base64\r\n' +
        '\r\n' +
        base64Data +
        close_delim;

    return gapi.client.request({
        'path': 'https://www.googleapis.com/upload/drive/v3/files',
        'method': 'POST',
        'params': {'uploadType': 'multipart'},
        'headers': {
        'Content-Type': 'multipart/related; boundary=' + boundary,
        'Content-Length': multipartRequestBody.length
        },
        'body': multipartRequestBody

    })
}