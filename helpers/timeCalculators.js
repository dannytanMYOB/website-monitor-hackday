function getMinutesInMilliseconds (numberOfMinutes) {
    return numberOfMinutes ? parseInt(numberOfMinutes) * 60 * 1000 : 0;
}

module.exports = {
    getMinutesInMilliseconds
}