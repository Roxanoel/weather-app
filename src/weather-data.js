/* eslint-disable no-useless-catch */
async function geocodingLocation(parsedInput) {
    try {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${parsedInput.city},${parsedInput.state},${parsedInput.country}&appid=2a896af0add10ce545b2b79922b2e72a`);
        const json = await response.json();
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
            datalist: [
                { id: json.list[0].weather[0].id,
                  descr: json.list[0].weather[0].description,
                  temp: json.list[0].main.temp,
                  humidity: json.list[0].main.humidity,
                  feelsLike: json.list[0].main.feels_like,
                  timestamp: json.list[0].dt_txt,
                }, 
                { id: json.list[2].weather[0].id,
                    descr: json.list[2].weather[0].description,
                    temp: json.list[2].main.temp,
                    humidity: json.list[2].main.humidity,
                    feelsLike: json.list[2].main.feels_like,
                    timestamp: json.list[2].dt_txt,
                }, 
                { id: json.list[4].weather[0].id,
                    descr: json.list[4].weather[0].description,
                    temp: json.list[4].main.temp,
                    humidity: json.list[4].main.humidity,
                    feelsLike: json.list[4].main.feels_like,
                    timestamp: json.list[4].dt_txt,
                }, 
                { id: json.list[6].weather[0].id,
                    descr: json.list[6].weather[0].description,
                    temp: json.list[6].main.temp,
                    humidity: json.list[6].main.humidity,
                    feelsLike: json.list[6].main.feels_like,
                    timestamp: json.list[6].dt_txt,
                }, 
                { id: json.list[8].weather[0].id,
                    descr: json.list[8].weather[0].description,
                    temp: json.list[8].main.temp,
                    humidity: json.list[8].main.humidity,
                    feelsLike: json.list[8].main.feels_like,
                    timestamp: json.list[8].dt_txt,
                }, 
                { id: json.list[10].weather[0].id,
                    descr: json.list[10].weather[0].description,
                    temp: json.list[10].main.temp,
                    humidity: json.list[10].main.humidity,
                    feelsLike: json.list[10].main.feels_like,
                    timestamp: json.list[10].dt_txt,
                }
            ],
            
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
