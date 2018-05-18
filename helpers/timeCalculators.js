function getMinutesInMiliseconds (numberOfMinutes) {
    return numberOfMinutes ? parseInt(numberOfMinutes) * 60 * 1000 : 0;
}

module.exports = {
    getMinutesInMiliseconds
}