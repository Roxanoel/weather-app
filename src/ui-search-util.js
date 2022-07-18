function parseSearchInput(searchInput) {
    // Turn input into array by splitting at commas 
    const split = searchInput.split(',');
    // Check length of array to determine what to do (might need to add empty strings to make it total 3 so it fits well in function call)
    while(split.length < 3) {
        split.push('');
    }
    return split;
}

export {
    // eslint-disable-next-line import/prefer-default-export
    parseSearchInput,
}