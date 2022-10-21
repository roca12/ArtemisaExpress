const axios = require("axios");

exports.obtenerFechasCalendario = async function () {
    try {
        const date = new Date();
        const listCalendars = [
            '6hcrjjammn1cn1sjuemq7pj7qs@group.calendar.google.com',
            'c_llj9mtgu3mq6mhd3ukgltbiv7s@group.calendar.google.com',
            'c_qagkahsh11os6grsr12qat0gbo@group.calendar.google.com',
            'codechef.com_3ilksfmv45aqr3at9ckm95td5g@group.calendar.google.com',
            'efcajlnqvdqjeoud2spsiphnqk@group.calendar.google.com',
            'k23j233gtcvau7a8ulk2p360m4@group.calendar.google.com',
            'l9tpkt9bn64puhsa97ftocng90@group.calendar.google.com'
        ];
        return await Promise.all(
            listCalendars.map(async (e) => {
                const params = {
                    key: 'AIzaSyBNlYH01_9Hc5S1J9vuFmu2nUqBZJNAXxs',
                    singleEvents: true,
                    maxAttendees: 1,
                    maxResults: 250,
                    timeMin: new Date(new Date().setMonth(date.getMonth() - 3)).toISOString(),
                    timeMax: new Date(new Date().setMonth(date.getMonth() + 3)).toISOString(),
                    timeZone: 'America/Bogota',
                };
                const url = `https://clients6.google.com/calendar/v3/calendars/${e}/events?calendarId=${e}&singleEvents` +
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
