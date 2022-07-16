async function geocodingLocation(city, state, country) {
    try {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&appid=2a896af0add10ce545b2b79922b2e72a`);
        const json = await response.json();
        return {
            lat: json[0].lat, 
            lon: json[0].lon,
        };
    } catch(err) {
        console.error(err);
        return err;
    }
}

async function getWeatherData(location) {
    const response = await fetch(`urlToBeFilled${location}`);
    return response;
}

export {
    geocodingLocation,
    getWeatherData
}
