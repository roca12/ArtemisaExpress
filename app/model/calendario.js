const axios = require("axios");

async function promise(callback) {
  try {
    return await callback();
  } catch (e) {
    throw e;
  }
}

async function getDataCalendars() {
  return await promise(async () => {
    const date = new Date();
    const listCalendars = process.env.LIST_CALENDAR.toString().split(",");
    return await Promise.all(
      listCalendars.map(async (e) => {
        const params = {
          key: process.env.KEY_CALENDAR,
          singleEvents: true,
          maxAttendees: 1,
          maxResults: 250,
          timeMin: new Date(
            new Date().setMonth(date.getMonth() - 3),
          ).toISOString(),
          timeMax: new Date(
            new Date().setMonth(date.getMonth() + 3),
          ).toISOString(),
          timeZone: "America/Bogota",
        };
        const url =
          `${process.env.API_GOOGLE_CALENDAR}/${e}/events?calendarId=${e}&singleEvents` +
          `=true&timeZone=${params["timeZone"]}&maxAttendees=${params["maxAttendees"]}&maxResults=` +
          `${params["maxResults"]}&sanitizeHtml=true` +
          `&timeMin=${params["timeMin"]}&timeMax=${params["timeMax"]}&key=${params["key"]}`;
        const data = await axios.get(url);
        return data["data"];
      }),
    );
  });
}

exports.obtenerFechasCalendario = async function () {
  return await promise(async () => {
    const data = await getDataCalendars();
    for (const i of data) {
      i?.items &&
        i.items.length &&
        (() => {
          const info = i["items"];
          for (const j of info) {
            const validateUrl = () => {
              if (j?.location) {
                return j["location"].includes("http") ? j["location"] : "";
              }
              return "";
            };
            j["url"] = validateUrl();
          }
        })();
    }
    return data;
  });
};
