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
    /**
     * getIsolatedCountries will take the isolatedAgents object and reduce to return their
     * respective countries
     * @type {function(*): *}
     */
    const getIsolatedCountries = (isolatedAgents => {
        return isolatedAgents.reduce((accumulator, {country}) => {
            accumulator[country] = accumulator[country] ? accumulator[country] + 1 : 1;
            return accumulator;
        }, {});
    });

    //getting a set of isolated countries as paired object.
    let countriesIsolationLevelObject = getIsolatedCountries(getIsolatedAgentsArray(agents));

    //the highest number of isolation found in the object above
    //so Math.max.apply - apply allows me to send Math.max array items as params
    let maxIsolationFound = Math.max.apply(
        null,
        Object.keys(countriesIsolationLevelObject)
            .map(function (x) {
                return countriesIsolationLevelObject[x]
            })
    );

    //getting the key (country name) for the max value found above.
    let highestIsolatedCountry = Object.keys(countriesIsolationLevelObject)
        .filter(function(x){
            return countriesIsolationLevelObject[x] === maxIsolationFound;
        });

    return `The highest isolated country is ${highestIsolatedCountry}`;
};