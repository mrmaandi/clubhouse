import { IPreviousEvent } from '../store/PreviousEventsStore';
import { IEvent } from '../store/NextEventStore';

const getRequest = (url: string): Promise<any> => {
    return fetch(url).then(handleRequest);
};

const handleRequest = (response: Response): Promise<any> => {
    return response.json().catch((res) => {
        throw new Error('Request failed. ' + res);
    });
};

export const getPreviousEvents = (): Promise<IPreviousEvent> => {
    return getRequest('/api/calendar/previous');
};

export const getNextEvents = (): Promise<IEvent[]> => {
    return getRequest('/api/calendar/next');
};
