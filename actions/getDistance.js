const apiKey = '&key=' + process.env.GOOGLE_API_KEY;
const axios = require('axios');
const url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=';


module.exports = function (agents, origins) {
    let destinations = '&destinations=' + agents.map(agent => agent.address).join('|');
    let minMaxResponse = [];

    //todo: use later if needed
    // const thousands_separators = (num => {
    //     var num_parts = num.toString().split(".");
    //     num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //     return num_parts.join(".");
    // });


    /**
     * //todo: reusable, segregate.
     * The asynchronous call to google maps.
     * @returns {Promise<*>}
     */
    const getDistances = async () => {
        try {
            return await axios.get(url + origins + destinations + apiKey)
        } catch (error) {
            console.error(error)
        }
    };

    /**
     * Awaiting Axios call and sending an array of 2 distance types.
     * @returns {Promise<Array>}
     */
    const distancesResponse = async () => {
        const distances = await getDistances()
        let distanceMatrix = [];

        //parsing the GM response
        if (distances.data) {
            let data = distances.data;
            let rows = data.rows;
            if (data && rows.length > 0) {
                data.destination_addresses.forEach((destination_item, i) => {
                    let currentRow = rows[0].elements[i];
                    let status = currentRow.status;
                    let distance = currentRow.distance;
                    let destinationOrStatus = distance ? distance.value : status;
                    distanceMatrix.push(
                        {[destination_item]: destinationOrStatus}
                    );
                });
            }
        }

        //filtering min/max via Math Object for 2 distance type values
        let filteredMatrix = distanceMatrix.filter(entry => !isNaN(+Object.values(entry)[0]));
        let max = Math.max.apply(Math, filteredMatrix.map(function (o) {
            return Object.values(o);
        }));
        let min = Math.min.apply(Math, filteredMatrix.map(function (o) {
            return Object.values(o);
        }));

        //setting the response array
        for (let i = 0; i < filteredMatrix.length; i++) {
            let location = Object.keys(filteredMatrix[i])[0];
            let distance = Object.values(filteredMatrix[i])[0];
            if (distance === max) {
                minMaxResponse.push({longest: {location, distance}})
            } else if (distance === min) {
                minMaxResponse.push({shortest: {location, distance}})
            }
        }

        return minMaxResponse
    };
    return distancesResponse();
};
