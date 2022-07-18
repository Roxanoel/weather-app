async function geocodingLocation(city, state, country) {
    try {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&appid=2a896af0add10ce545b2b79922b2e72a`);
        const json = await response.json();
        return {
            lat: json[0].lat, 
            lon: json[0].lon,
        };
    } catch(err) {
        console.error('Problem with geocoding! Perhaps later I will want a UI thing to happen here.');
        throw err;
    }
}

async function getCurrentWeatherData(location) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=2a896af0add10ce545b2b79922b2e72a&units=metric`);
        const json = await response.json();
        return {
            location: json.name,
            description: json.weather[0].description,
            temp: json.main.temp,
            humidity: json.main.humidity,
            feels_like: json.main.feels_like,
        };
    } catch(err) {
        console.error('Problem with getting weather data! Perhaps later I will want a UI thing to happen here.');
        throw err;
    }
}

export {
    geocodingLocation,
    getCurrentWeatherData
}
