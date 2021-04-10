let chat = [{username: 'CONSOLE', message: 'Chat started.', time: 
    ('0' + new Date().getHours()).slice(-2) + ':' + 
    ('0' + new Date().getMinutes()).slice(-2) + ':' + 
    ('0' + new Date().getSeconds()).slice(-2), ip: '127.0.0.1'},    
]

let app = require('express')();
app.get('/', (_, res) => res.sendFile(__dirname + '/index.html'));
app.get('/local', (_, res) => res.sendFile(__dirname + '/local.html'));
app.get('/chat', (_, res) => res.json(chat));
app.get('/front.js', (_, res) => res.sendFile(__dirname + '/front.js'));
app.get('/submit', (req, res) => {
    let username = req.query.username;
    let message = req.query.message;
    
    let today = new Date();
    let time = 
    ('0' + today.getHours()).slice(-2) + ':' + 
    ('0' + today.getMinutes()).slice(-2) + ':' + 
    ('0' + today.getSeconds()).slice(-2);

    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    chat.push({
        username: username,
        message: message,
        time: time,
        ip: ip
    })

    res.sendFile(__dirname + '/submit.html');
});
app.get('/clear', (_, res) => {
    chat = [{username: 'CONSOLE', message: 'Chat started.', time: 
    ('0' + new Date().getHours()).slice(-2) + ':' + 
    ('0' + new Date().getMinutes()).slice(-2) + ':' + 
    ('0' + new Date().getSeconds()).slice(-2)}];
    res.status(200);
})

app.listen(80, () => {
    console.log('Server running on 127.0.0.1:80')
});