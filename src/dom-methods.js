function updateLocationName(locationName) {
    document.querySelector('h1').textContent = locationName;
}

function updateTemperature(temp, tempUnits) {
    const tempText = document.querySelector('.current-weather .temperature');
    const unitSymbol = (tempUnits === 'metric') ? '&deg;C' : '&deg;F';

    tempText.innerHTML = `${Math.round(temp)}${unitSymbol}`;
}

function updateUi(weatherData, tempUnits) {
    updateLocationName(weatherData.location);
    updateTemperature(weatherData.temp, tempUnits);
}

export {
    // eslint-disable-next-line import/prefer-default-export
    updateUi,
};