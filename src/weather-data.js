/* eslint-disable no-useless-catch */
async function geocodingLocation(parsedInput) {
    try {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${parsedInput.city},${parsedInput.state},${parsedInput.country}&appid=2a896af0add10ce545b2b79922b2e72a`);
        const json = await response.json();
        console.log(json);
        return {
            lat: json[0].lat, 
            lon: json[0].lon,
        };
    } catch(err) {
        throw err;
    }
}

async function getWeatherData(location, tempUnits) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=2a896af0add10ce545b2b79922b2e72a&units=${tempUnits}`);
        const json = await response.json();
        return {
            location: `${json.city.name}, ${json.city.country}`,
            datalist: json.list,
            
            /* description: json.weather[0].description,
            id: json.weather[0].id,
            temp: json.main.temp,
            humidity: json.main.humidity,
            feelsLike: json.main.feels_like, */
        };
    } catch(err) {
        console.error('Problem with getting weather data! Perhaps later I will want a UI thing to happen here.');
        throw err;
    }
}

export {
    geocodingLocation,
    getWeatherData
}
