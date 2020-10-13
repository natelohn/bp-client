export const formatMobileNumber = (text) => {
    let formated = text.replace(/\D/g, "");
    const length = formated.length
    if (length >= 1) {
        formated = "(" + formated
    } 
    if (length >= 4) {
        formated = formated.slice(0, 4) + ") " + formated.slice(4);
    }
    if (length >= 7) {
        formated = formated.slice(0, 9) + "-" + formated.slice(9);
    }
    return formated;
}

export const usPhoneNumber = (phone) => {
    return '+1' + phone
}


/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 * Found here: 
 * https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
 */
export const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}