module.exports = function (agents) {
    const getIsolatedAgentsArray = (data) => {
        //fetching and counting duplicate agents which signifies !isolated.
        const getDupes = data.reduce((accumulator, {agent}) => {
            //start to accumulate agent key:value and count occurrences
            accumulator[agent] = (accumulator[agent] || 0) + 1;
            return accumulator;
        }, {});

        return data.filter(({agent}) => {
            return getDupes[agent] === 1;
        });
    };

    //now we have all isolated agent objects set and we can start counting
    // their respective countries.
    const getIsolatedCountries = (isolatedAgents => {
        return isolatedAgents.reduce((accumulator, {country}) => {
            accumulator[country] = accumulator[country] ? accumulator[country] + 1 : 1;
            return accumulator;
        }, {});
    });

    return getIsolatedCountries(getIsolatedAgentsArray(agents));
};