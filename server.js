const express = require("express");
const { join } = require('path');

const formattedCurrentTime = () => {
        const today = new Date();
        return time = 
        ('0' + today.getHours()).slice(-2) + ':' + 
        ('0' + today.getMinutes()).slice(-2) + ':' + 
        ('0' + today.getSeconds()).slice(-2);
}

const main = () => {
    const chat = [];

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));

    app.get('/local', (_, res) => res.sendFile(join(__dirname, '/public/local.html')));
    app.get('/api/chat', (_, res) => res.json(chat));
    app.post('/api/submit', (req, res) => {
        const { username, message } = req.body;

        if (username === '') {
            return res.status(400).json({message: "name cannot be blank"});
        } else if (message === '') {
            return res.status(400).json({message: "message cannot be blank"});
        }

        if (message.length > 256) {
            return res.status(400).json({message: "message cannot be over 256 characters long"});
        } else if (username.length > 32) {
            return res.status(400).json({message: "username cannot be over 32 characters long"});
        }
        
        const time = formattedCurrentTime();

        chat.push({
            username,
            message: message.trim().replaceAll("\n\t", ""),
            time,
        })

        res.status(200).json({message: "successfully sent message"});
    });

    app.get('/api/clear', (_, res) => {
        chat.splice(0, chat.length);
        res.status(200).json({message: "success"});
    });

    app.listen(80, () => {
        console.log('Server running on 127.0.0.1:80')
    });
}

main();
