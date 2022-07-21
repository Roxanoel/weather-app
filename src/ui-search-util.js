function parseSearchInput(searchInput) {
    // Turn input into array by splitting at commas 
    const split = searchInput.split(',');
    // If there are three elements in the array, assume the format is "city, state, country"
    if(split.length === 3) {
        return {
            city: split[0],
            state: split[1],
            country: split[2],
        }
    }
    // If there are two elements, assume the format is "city, country"
    if(split.length === 2) {
        return {
        city: split[0],
        state: '',
        country: split[1],
        }
    } 
    // Otherwise return the only string as the city name, and the rest as empty strings
    return {
        city: split[0],
        state: '',
        country: '',
    }
}

export {
    // eslint-disable-next-line import/prefer-default-export
    parseSearchInput,
}