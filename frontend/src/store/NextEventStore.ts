import { RootStore } from './RootStore';
import { action, makeObservable, observable } from 'mobx';
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
}
