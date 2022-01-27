const find = require('local-devices');
const lights = require('./lights/lights');

const PHONE_IP = process.env.PHONE_INTERNAL_IP;


const deviceScanning = () => {
    find().then(devices => {
        console.log(devices.find(device => device.ip === PHONE_IP));
        const found = devices.find(device => device.ip === PHONE_IP);
        if (found) {
            lights.turnOnAllLights();
        } else {
            lights.turnOffAllLights();
        }
    })
};

// run deviceScanning every 5 seconds
module.exports = {
    deviceScanning: deviceScanning
}

