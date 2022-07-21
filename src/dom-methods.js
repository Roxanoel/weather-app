function updateLocationName(locationName) {
    document.querySelector('h1').textContent = locationName;
}

function updateTemperature(temp, tempUnits) {
    const tempText = document.querySelector('.current-weather .temperature');
    const unitSymbol = (tempUnits === 'metric') ? '&deg;C' : '&deg;F';

    tempText.innerHTML = `${Math.round(temp)}${unitSymbol}`;
}

function updateIcon(id) {
    const iconClassCode = `wi-owm-${id}`;
    const icon = document.querySelector('.hero i');
    // first, clear class list: 
    const iconClasses = icon.classList;
    while (iconClasses.length > 0) {
    iconClasses.remove(iconClasses.item(0));
    }
    // re-add the right classes
    iconClasses.add('wi');
    iconClasses.add(iconClassCode);
}

function updateHumidity(humidity) {
    document.querySelector('.current-weather .humidity .text').textContent = `Humidity: ${humidity}%`;
}

function updateFeelsLike(feelsLike, tempUnits) {
    const feelsLikeText = document.querySelector('.current-weather .feels-like .text');
    const unitSymbol = (tempUnits === 'metric') ? '&deg;C' : '&deg;F';

    feelsLikeText.innerHTML = `Feels like: ${Math.round(feelsLike)}${unitSymbol}`;
}

function updateUi(weatherData, tempUnits) {
    updateLocationName(weatherData.location);
    updateTemperature(weatherData.temp, tempUnits);
    updateIcon(weatherData.id);
    updateHumidity(weatherData.humidity);
    updateFeelsLike(weatherData.feelsLike, tempUnits);
}

export {
    // eslint-disable-next-line import/prefer-default-export
    updateUi,
};