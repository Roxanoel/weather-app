function updateLocationName(locationName) {
    document.querySelector('h1').textContent = locationName;
}

function updateUi(weatherData) {
    updateLocationName(weatherData.location);
}

export {
    // eslint-disable-next-line import/prefer-default-export
    updateUi,
};