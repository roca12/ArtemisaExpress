const axios = require("axios");

exports.obtenerFechasCalendario = async function () {
    try {
        const date = new Date();
        const data = await axios.get(' https://www.googleapis.com/calendar/v3/calendars/k23j233gtcvau7a8ulk2p360m4@group.calendar.google.com/events', {
            params: {
                key: 'AIzaSyBNlYH01_9Hc5S1J9vuFmu2nUqBZJNAXxs',
                timeMin: new Date(date.setMonth(date.getMonth() - 2)),
                timeMax: new Date(date.setMonth(date.getMonth() + 2)),
                timeZone: 'America/Bogota',
            }
        });
        return data['data'];
    } catch (e) {
        throw e;
    }
}
