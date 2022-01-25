const express = require('express');
const lights = require('./services/lights');
const wifi = require('./services/wifi');
const scan = require('./services/devices');

const app = express();
const port = 3000;


app.get('/', (req, res) => res.send('Hello World!'));
app.get('/lights', lights.getAllLights);
app.get('/lights/:id', lights.getLight);
app.put('/lights/:id', lights.turnOfforOnLight);
app.put('/lights', lights.turnOfforOnAllLights);
app.get('/wifi', wifi.listWifi);


app.listen(port, () => {
    console.log('Listen on port ' + port);
    scan.deviceScanning();
    setInterval(scan.deviceScanning, 5000);
})
