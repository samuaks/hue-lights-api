const axios = require('axios');
const lights = 'http://192.168.100.13/api/kJJv3CYyunKsYOvUV77hzvjXy1iBV8ZQ2CmOEwrC/lights';


// Get status of all lights
const getAllLights = async (req, res) => {
    try {
        const response = await axios.get(lights);
        res.send(response.data);
    } catch (error) {
        console.log(error);
    }
}

// get status of one light
const getLight = async (req, res) => {
    try {
        const response = await axios.get(`${lights}/${req.params.id}`);
        res.send(response.data);
    } catch (error) {
        console.log(error);
    }
}

// turn on one light
const turnOfforOnLight = async (req, res) => {
    try {
        // first get the status of the light
        const response = await axios.get(`${lights}/${req.params.id}`);
        // change status of the light
        const newStatus = response.data.state.on ? false : true;
        const response2 = await axios.put(`${lights}/${req.params.id}/state`, { on: newStatus });
        res.send(response2.data);
    } catch (error) {
        console.log(error);
    }
}

// turn on or off all lights
const turnOfforOnAllLights = async (req, res) => {
    try {
        const response = await axios.get(lights);
        // map json object into array of light ids
        const lightIds = Object.keys(response.data);
        // turn on all lights iteratively
        for (let i = 0; i < lightIds.length; i++) {
            const newStatus = response.data[lightIds[i]].state.on ? false : true;
            const response2 = await axios.put(`${lights}/${lightIds[i]}/state`, { on: newStatus });
        }
        res.send(lightIds);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllLights: getAllLights,
    getLight: getLight,
    turnOfforOnLight: turnOfforOnLight,
    turnOfforOnAllLights: turnOfforOnAllLights
}