var Interval = setInterval(FindingSend, 1000);
console.log('FindingSend interval called')

function FindingSend() {
    console.log('FindingSend interval started')
    var SendButton = document.getElementById("send");
    if (SendButton) {
        SendButton.onclick = function () {
            myFunction()
        };
        console.log("Send Button found");
        myStopFunction();
    }
}

function myStopFunction() {
    clearInterval(Interval);
}

function myFunction() {
    var whatsappNumber = document.querySelector('#contact').value;
    console.log('Phone number is: ' + whatsappNumber);

    var myHeaders = new Headers();
    myHeaders.append("accept", "*/*");
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxY2I3OWVjZi04MTJkLTQyOGItYTFhMi04ZTE5MTk5ZWI5Y2IiLCJ1bmlxdWVfbmFtZSI6ImphaG5hdmlAY2xhcmUuYWkiLCJuYW1laWQiOiJqYWhuYXZpQGNsYXJlLmFpIiwiZW1haWwiOiJqYWhuYXZpQGNsYXJlLmFpIiwiYXV0aF90aW1lIjoiMTAvMTAvMjAyMiAwNjo1Mzo1MiIsImRiX25hbWUiOiJ3YXRpX2RlbW81IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiRVhURVJOQUxfQURNSU5JU1RSQVRPUiIsImV4cCI6MjUzNDAyMzAwODAwLCJpc3MiOiJDbGFyZV9BSSIsImF1ZCI6IkNsYXJlX0FJIn0.IrIPIjYmVOFE3Vnp5erAS8ikMhqA5nio6sDdRl-7lhM");
    myHeaders.append("Content-Type", "application/json-patch+json");

    var raw = JSON.stringify({
        "template_name": "shipping_template_test",
        "broadcast_name": "API Docs Test",
        "receivers": [
            {
                "whatsappNumber": whatsappNumber,
                "customParams": [
                    {
                        "name": "phone_number",
                        "value": whatsappNumber
                    }
                ]
            }
        ]
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://wati-server-demo5.clare.ai/api/v1/sendTemplateMessages", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    document.querySelector('#contact').value = '';
    alert('You will receive the WhatsApp Notification in: 1 minute')
}