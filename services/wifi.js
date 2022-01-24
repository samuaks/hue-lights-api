const wifi = require('node-wifi');

// list current wifi connections
const listWifi = (req, res) => {
    try {
        wifi.init({
            iface: null
        });
        wifi.getCurrentConnections((err, currentConnections) => {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.send(currentConnections);
            }
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    listWifi: listWifi
}