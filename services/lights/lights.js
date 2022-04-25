const axios = require('axios');
const lights = process.env.BRIDGE_IP;


// Get status of all lights
const getAllLights = async (req, res) => {
    try {
        const response = await axios.get(lights);
        const lightIds = Object.keys(response.data);
        let lightStatus = [];
        for (let i = 0; i < lightIds.length; i++) {
            lightStatus.push({
                id: lightIds[i],
                status: response.data[lightIds[i]].state.on
            });
        }
        res.send(lightStatus);
    } catch (error) {
        console.log(error);
    }
}

// get all lights function
const getAllLightsFunction = () => {
    return new Promise((resolve, reject) => {
        axios.get(lights)
            .then(response => {
                const lightIds = Object.keys(response.data);
                let lightStatus = [];
                for (let i = 0; i < lightIds.length; i++) {
                    lightStatus.push({
                        id: lightIds[i],
                        status: response.data[lightIds[i]].state.on
                    });
                }
                resolve(lightStatus);
            })
            .catch(error => {
                console.log(error);
                reject(error);
            });
    });
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

// turn off or on light function
const turnOfforOnLightFunction = (lightId) => {
    return new Promise((resolve, reject) => {
        // first get the status of the light
        axios.get(`${lights}/${lightId}`)
            .then(response => {
                // change status of the light
                const newStatus = response.data.state.on ? false : true;
                axios.put(`${lights}/${lightId}/state`, { on: newStatus })
                    .then(() => {
                        resolve(newStatus);
                    })
                    .catch(error => {
                        console.log(error);
                        reject(error);
                    });
            })
            .catch(error => {
                console.log(error);
                reject(error);
            });
    });
}

// turn on or off all lights
const turnOfforOnAllLights = async (req, res) => {
    try {
        const response = await axios.get(lights);
        // map json object into array of light ids
        const lightIds = Object.keys(response.data);
        let newStatus = false;
        // turn on all lights iteratively
        for (let i = 0; i < lightIds.length; i++) {
            newStatus = response.data[lightIds[i]].state.on ? false : true;
            await axios.put(`${lights}/${lightIds[i]}/state`, { on: newStatus });
        }
        return newStatus;
    } catch (error) {
        console.log(error);
    }
}

// turn off all lights
const turnOffAllLights = async (req, res) => {
    try {
        const response = await axios.get(lights);
        // map json object into array of light ids
        const lightIds = Object.keys(response.data);
        // turn on all lights iteratively
        for (let i = 0; i < lightIds.length; i++) {
            const newStatus = false;
            await axios.put(`${lights}/${lightIds[i]}/state`, { on: newStatus });
        }
    } catch (error) {
        console.log(error);
    }
}

// turn on all lights
const turnOnAllLights = async (req, res) => {
    try {
        const response = await axios.get(lights);
        // map json object into array of light ids
        const lightIds = Object.keys(response.data);
        // turn on all lights iteratively
        for (let i = 0; i < lightIds.length; i++) {
            const newStatus = true;
            await axios.put(`${lights}/${lightIds[i]}/state`, { on: newStatus });
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllLights: getAllLights,
    getLight: getLight,
    turnOfforOnLight: turnOfforOnLight,
    turnOfforOnAllLights: turnOfforOnAllLights,
    turnOffAllLights: turnOffAllLights,
    turnOnAllLights: turnOnAllLights,
    getAllLightsFunction: getAllLightsFunction,
    turnOfforOnLightFunction: turnOfforOnLightFunction
}