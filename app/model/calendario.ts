import axios, {AxiosResponse} from 'axios';

interface IDateItem {
    'dateTime': string,
    'timeZone': string,
}

interface IItems {
    kind: string,
    etag: string
    id: string,
    status: string,
    htmlLink: string,
    created: string,
    updated: string,
    summary: string,
    description: string,
    start: IDateItem,
    end: IDateItem,
    url: string
    location?: string,
}

interface ICalendarGoogle {
    kind: string,
    etag: string,
    summary: string,
    updated: string,
    timeZone: string,
    accessRole: string,
    nextSyncToken: string,
    items?: Array<IItems>,
}

async function promise(callback: Function): Promise<any> {
    try {
        return await callback();
    } catch (e) {
        throw e
    }
}


class Calendario {

    private envCalendar: string;
    private readonly keyCalendar: string;
    private readonly apiGoogleCalendar: string;

    constructor() {
        this.envCalendar = process.env.LIST_CALENDAR ?? '';
        this.keyCalendar = process.env.KEY_CALENDAR ?? '';
        this.apiGoogleCalendar = process.env.API_GOOGLE_CALENDAR ?? '';
    }

    private validateUrlItem(item: IItems): string {
        if (item?.location) {
            return (item.location.includes('http')) ? item.location : '';
        }
        return '';
    }

    private async getDataCalendars(): Promise<Array<ICalendarGoogle>> {
        return await promise(async (): Promise<Array<ICalendarGoogle>> => {
            const date: Date = new Date();
            const listCalendars: Array<string> = this.envCalendar.split(',');
            return await Promise.all(
                listCalendars.map(async (e): Promise<ICalendarGoogle> => {
                    const params = {
                        key: this.keyCalendar,
                        singleEvents: true,
                        maxAttendees: 1,
                        maxResults: 250,
                        timeMin: new Date(new Date().setMonth(date.getMonth() - 3)).toISOString(),
                        timeMax: new Date(new Date().setMonth(date.getMonth() + 3)).toISOString(),
                        timeZone: 'America/Bogota',
                    };
                    const url: string = `${this.apiGoogleCalendar}/${e}/events?calendarId=${e}&singleEvents` +
                        `=true&timeZone=${params['timeZone']}&maxAttendees=${params['maxAttendees']}&maxResults=` +
                        `${params['maxResults']}&sanitizeHtml=true` +
                        `&timeMin=${params['timeMin']}&timeMax=${params['timeMax']}&key=${params['key']}`
                    const data: AxiosResponse = await axios.get(url);
                    return data.data;
                }));
        })
    }

    public async obtenerFechasCalendario(): Promise<Array<ICalendarGoogle>> {
        return await promise(async (): Promise<Array<ICalendarGoogle>> => {
            const data: Array<ICalendarGoogle> = await this.getDataCalendars();
            for (const i of data) {
                (i?.items) && (i.items.length) && ((): void => {
                    const info: Array<IItems> = i.items;
                    for (const j of info) {
                        j.url = this.validateUrlItem(j);
                    }
                })();

            }
            return data;
        });
    }
}

const calendar = new Calendario();

export default calendar;
