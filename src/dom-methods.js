import formatRelative from 'date-fns/formatRelative';
import parseJSON from 'date-fns/parseJSON';

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function updateLocationName(locationName) {
    document.querySelector('h1').textContent = locationName;
}

function updateCardHeading(index, timestamp, timezone) {
    const heading = document.querySelector(`[data-index="${index}"] h2`);
    const now = new Date(Date.now());
    
    const parsedTimestamp = parseJSON(timestamp);
    const formattedTimestamp = formatRelative(parsedTimestamp, now).replace(' at ', ', ');

    heading.textContent = capitalizeFirstLetter(formattedTimestamp);
    console.log(parsedTimestamp);
}

function updateTemperature(index ,temp, tempUnits) {
    const tempText = document.querySelector(`[data-index="${index}"] .temperature`);
    const unitSymbol = (tempUnits === 'metric') ? '&deg;C' : '&deg;F';

    tempText.innerHTML = `${Math.round(temp)}${unitSymbol}`;
}

function updateIcon(index, id) {
    const iconClassCode = `wi-owm-${id}`;
    const icon = document.querySelector(`[data-index="${index}"] .hero i`);
    // first, clear class list: 
    const iconClasses = icon.classList;
    while (iconClasses.length > 0) {
    iconClasses.remove(iconClasses.item(0));
    }
    // re-add the right classes
    iconClasses.add('wi');
    iconClasses.add(iconClassCode);
}

function updateHumidity(index,humidity) {
    const humidityText = document.querySelector(`[data-index="${index}"] .humidity .text`);
    if (index === 0) {  // Current temp card displays a longer message.
        humidityText.textContent = `Humidity: ${humidity}%`;
    } else {
        humidityText.textContent = `${humidity}%`
    }
}

function updateFeelsLike(index, feelsLike, tempUnits) {
    const feelsLikeText = document.querySelector(`[data-index="${index}"] .feels-like .text`);
    const unitSymbol = (tempUnits === 'metric') ? '&deg;C' : '&deg;F';

    if (index === 0) {  // Current temp card displays a longer message.
        feelsLikeText.innerHTML = `Feels like: ${Math.round(feelsLike)}${unitSymbol}`;
    } else {
        feelsLikeText.innerHTML = `${Math.round(feelsLike)}${unitSymbol}`;
    }
}

function updateDescr(index, descr) {
    const descriptionText = document.querySelector(`[data-index="${index}"] .descr`);
    const capitalized = capitalizeFirstLetter(descr);
    descriptionText.textContent = capitalized;
}

function getAllCards() {
    return document.querySelectorAll('.card');
}

function updateUi(weatherData, tempUnits) {
    updateLocationName(weatherData.location);
    const cards = getAllCards();

    for (let i = 0; i < cards.length; i+=1) {
        // Setup a data attribute to use for querySelector
        cards[i].setAttribute('data-index', i);
        // Update display elements for this item of data.
        updateCardHeading(i, weatherData.datalist[i].timestamp, weatherData.timezone);
        updateTemperature(i, weatherData.datalist[i].temp, tempUnits);
        updateIcon(i, weatherData.datalist[i].id);
        updateDescr(i, weatherData.datalist[i].descr);
        updateHumidity(i, weatherData.datalist[i].humidity);
        updateFeelsLike(i, weatherData.datalist[i].feelsLike, tempUnits);
    }
}

export {
    // eslint-disable-next-line import/prefer-default-export
    updateUi,
};