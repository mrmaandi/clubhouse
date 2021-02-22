import { RootStore } from './RootStore';
import { action, computed, makeObservable, observable } from 'mobx';
import { getNextEvents } from '../helpers/ApiService';
import { Loadable } from '../helpers/Loadable';

export interface IEvent {
    start: number;
    end: number;
}

export class NextEventsStore {
    nextEvents: Loadable<IEvent[]> = new Loadable<IEvent[]>();

    constructor(private rootStore: RootStore) {
        makeObservable(this, {
            nextEvents: observable,
            setNextEvents: action,
            fetchNextEvents: action,
            isEventActive: computed,
        });
    }

    setNextEvents(nextEvents: Loadable<IEvent[]>): void {
        this.nextEvents = nextEvents;
    }

    async fetchNextEvents(): Promise<void> {
        if (!this.nextEvents.isInitial) {
            await this.nextEvents.promise;
            return;
        }
        const nextEventsPromise: Promise<IEvent[]> = getNextEvents();
        this.setNextEvents(Loadable.toLoadable(nextEventsPromise));
        await nextEventsPromise;
    }

    get isEventActive(): boolean {
        const nextEventPayload = this.nextEvents.payload;

        if (!nextEventPayload || nextEventPayload?.length === 0) {
            return false;
        }
        const nextEvent = nextEventPayload![0];
        //fix this
        if (new Date().getTime() > nextEvent.end) {
            return false;
        }
        return new Date().getTime() > nextEvent.start && new Date().getTime() < nextEvent.end;
    }
}
