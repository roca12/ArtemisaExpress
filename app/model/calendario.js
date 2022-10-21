const axios = require("axios");

exports.obtenerFechasCalendario = async function () {
    try {
        const date = new Date();
        const listCalendars = process.env.LIST_CALENDAR.toString().split(',');
        return await Promise.all(
            listCalendars.map(async (e) => {
                const params = {
                    key: process.env.KEY_CALENDAR,
                    singleEvents: true,
                    maxAttendees: 1,
                    maxResults: 250,
                    timeMin: new Date(new Date().setMonth(date.getMonth() - 3)).toISOString(),
                    timeMax: new Date(new Date().setMonth(date.getMonth() + 3)).toISOString(),
                    timeZone: 'America/Bogota',
                };
                const url = `${process.env.API_GOOGLE_CALENDAR}/${e}/events?calendarId=${e}&singleEvents` +
                    `=true&timeZone=${params['timeZone']}&maxAttendees=${params['maxAttendees']}&maxResults=` +
                    `${params['maxResults']}&sanitizeHtml=true` +
                    `&timeMin=${params['timeMin']}&timeMax=${params['timeMax']}&key=${params['key']}`
                const data = await axios.get(url);
                return data['data'];
            }));
    } catch (e) {
        throw e;
    }
}
