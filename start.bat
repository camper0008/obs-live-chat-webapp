@echo off
set /p domain="Enter domain name (ex. teamslivechat): "

echo Server is now starting. Use browser source in OBS with ip of "127.0.0.1:80/local" to display chat.
start /b cmd /k "title Tunnel & npx localtunnel --port 80 --subdomain %domain%"
start /b cmd /k "title Local Server & node ./server/back.js"