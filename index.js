const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server); 
const lights = require('./services/lights');
const wifi = require('./services/wifi');
const scan = require('./services/devices');

const port = 3000;


app.get('/', (req, res) => res.sendFile(__dirname + '/pages/index.html'));
app.get('/lights', lights.getAllLights);
app.get('/lights/:id', lights.getLight);
app.put('/lights/:id', lights.turnOfforOnLight);
app.put('/lights', lights.turnOfforOnAllLights);
app.get('/wifi', wifi.listWifi);


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('turn on', (msg) => {
        io.emit('turn on', msg);
        lights.turnOnAllLights();

    })
    socket.on('turn off', (msg) => {
        io.emit('turn off', msg);
        lights.turnOffAllLights();
        });
});


server.listen(port, () => {
    console.log('Listen on port ' + port);
    /* scan.deviceScanning(); */
    /* setInterval(scan.deviceScanning, 5000); */
})
