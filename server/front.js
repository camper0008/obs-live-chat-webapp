let chatlog = document.getElementById('chatlog')

fetch('/chat') 
.then(response => response.json())
.then(data => {
    chatlog.innerHTML = ''
    for (let i = 0; i < data.length; i++) {
        chatlog.innerHTML += data[i].time + ' ' + '['+data[i].username+']: ' + data[i].message + '\n';
    }
})
.catch((error) => {
    chatlog.innerHTML = ('error occured fetching chatlog:' + error)
});