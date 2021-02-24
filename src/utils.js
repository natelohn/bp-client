import { BRONZE, GOLD, PRIMARY_COLOR, SILVER } from './styles/global';


export const formatDisplayMobileNumber = (text) => {
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

export const formatSubmitMobileNumber = (text) => {
    let formated = text.replace(/\D/g, "");
    return '+1' + formated
}

export const validUSPhoneNumber = (text) => {
    const formated = formatSubmitMobileNumber(text);
    return formated.length === 12;
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

// This function takes in a number of seconds and returns a formatted string
// Inspired by:
// https://dev.to/abdulbasit313/how-to-develop-a-stopwatch-in-react-js-with-custom-hook-561b
export const formatTime = (deciseconds) => {
    if (deciseconds === 0) {
        return '00:00:00.0'
    }
    const seconds = Math.floor(deciseconds / 10);
    const getSeconds = `0${(seconds % 60)}.${deciseconds % 10}`.slice(-4)
    const minutes = `${Math.floor(seconds / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(seconds / 3600)}`.slice(-2)

    return `${getHours}:${getMinutes}:${getSeconds}`
}

// TODO: finish formatting this
export const formatResultTime = (deciseconds) => {
    if (deciseconds === 0) {
        return 'Forfeit'
    }
    const modDeciseconds = deciseconds % 10;
    const seconds = Math.floor(deciseconds / 10)
    const modSeconds = seconds % 60;
    const modMinutes = Math.floor(seconds / 60) % 60;
    const modHours = Math.floor(seconds / 3600);
    const getDeciseconds = modDeciseconds > 0 ? `.${modDeciseconds}` : '';
    const getSeconds = `0${modSeconds}`.slice(-2)
    const getMinutes = modHours > 0 ? `0${modMinutes}:`.slice(-3) : `${modMinutes}:`;
    const getHours = modHours > 0 ? `${modHours}:` : '';
    return `${getHours}${getMinutes}${getSeconds}${getDeciseconds}`
}


// TODO: Ensure time is proper across timezones
export const formatDate = (dateString) => {
    let dateObject = new Date(dateString);
    var options = { hour: "numeric", minute: "numeric", weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = dateObject.toLocaleDateString("en-US", options);
    return formattedDate
}

export const formatShortDate = (dateString) => {
    let dateObject = new Date(dateString);
    const formattedDate = dateObject.toLocaleDateString("en-US");
    return formattedDate
}

export const calculateRecord = (pushOff, challengerId) => {
    const myPush = pushOff.pushes.find(p => p.challenger.id === challengerId)
    let wins = 0;
    let losses = 0;
    for (let push of pushOff.pushes) {
        if (myPush.id != push.id) {
            if (myPush.duration > push.duration) {
                wins = wins + 1;
            } else if (myPush.duration < push.duration) {
                losses = losses + 1;
            }
        }
    }
    return { wins, losses }
}

export const getTotalAndVSRecords = (records, opponentId) => {
    let won = 0;
    let lost = 0;
    let draw = 0;
    let opponentRecord = { won, lost, draw }
    for( let record of records) {
        won = won + record.won;
        lost = lost + record.lost
        draw = draw + record.draw
        if (record.opponent.id === opponentId){
            opponentRecord = record;
        }
    }
    const total = {won, lost, draw};
    return {total, opponentRecord}
}

// TODO: Find data driven solution
export const isRoboId = ( id ) => {
    const roboIds = [
        '07c25243-23da-4963-a953-39512d113d50',
        '6622d741-a4f6-4435-b518-7c3ec627caca',
        '349e5b16-f0cc-44eb-aaa7-e1c96dbbf6c8'
    ];
    return roboIds.some(roboId => roboId === id);
}


// Found here: https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number
export const addOrdinalSuffix = (i) => {
    let j = i % 10
    let k = i % 100;
    if (j === 1 && k != 11) {
        return i + "st";
    }
    if (j === 2 && k != 12) {
        return i + "nd";
    }
    if (j === 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}


export const getPushOffResultIcon = (rank, pushOff) => {
    if (!pushOff.final) {
        return { title: "question", color: PRIMARY_COLOR }
    } else if (rank === pushOff.pushes.length) {
        return { title: "sad-cry", color: PRIMARY_COLOR }
    } else if (rank <= 3) {
        const medals = [GOLD, SILVER, BRONZE]
        return { title: "medal", color: medals[rank - 1] }
    } else {
        return { title: "meh", color: PRIMARY_COLOR }
    }
}

export const getDisplayUsername = (username, overrideLength) => {
    const maxLength = overrideLength ? overrideLength : 22;
    if(username.length > maxLength){
        return username.slice(0, maxLength).concat('...')
    } else {
        return username;
    }
}
