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
                const data = await axios.get(`https://www.googleapis.com/calendar/v3/calendars/${e}/events`, {
                    params: {
                        key: 'AIzaSyBNlYH01_9Hc5S1J9vuFmu2nUqBZJNAXxs',
                        singleEvents: true,
                        timeMin: new Date(date.setMonth(date.getMonth() - 12)),
                        timeMax: new Date(date.setMonth(date.getMonth() + 13)),
                        timeZone: 'America/Bogota',
                    }
                });
                return data['data'];
            }));
    } catch (e) {
        throw e;
    }
}
