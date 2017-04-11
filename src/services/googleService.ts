import * as Gapi from "google-client-api"

export function initGapi() {
    return Gapi();
}

export function loadClientAuth(gapi) {
    return gapi.load('client:auth2', function() {})
}

// working file upload example

/*
const gapi = yield Gapi();

gapi.load('client:auth2', function() {
    gapi.client.init({
        'apiKey': '',
        'clientId': '',
        'scope': 'https://www.googleapis.com/auth/drive',
    }).then(function() {

        return gapi.auth2.getAuthInstance().signIn({
            scope: 'https://www.googleapis.com/auth/drive'
        }).then(function(){
            console.log(gapi.auth2.getAuthInstance());
            console.log(gapi.auth2.getAuthInstance().currentUser.get());

            const boundary = '314159265358979323846';
            const delimiter = "\r\n--" + boundary + "\r\n";
            const close_delim = "\r\n--" + boundary + "--";

            var contentType = 'application/vnd.google-apps.document';
            var metadata = {
                'name': 'sfdftest1234',
                'mimeType': contentType
            };

            var base64Data = btoa('vtwetwer\r\ntetsdfsf');
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

            gapi.client.request({
                'path': 'https://www.googleapis.com/upload/drive/v3/files',
                'method': 'POST',
                'params': {'uploadType': 'multipart'},
                'headers': {
                'Content-Type': 'multipart/related; boundary=' + boundary,
                'Content-Length': multipartRequestBody.length
                },
                'body': multipartRequestBody

            }).then(function(){
                console.log('flies listed');
            })
        })

        
    })
}) */