import { RootStore } from './RootStore';
import { action, computed, makeObservable, observable } from 'mobx';
import { getPreviousEvents } from '../helpers/ApiService';
import { Loadable } from '../helpers/Loadable';

export interface IEventSubmission {
    user: string;
    type: string;
    fileUrl: string;
}

export interface IPreviousEvent {
    id?: string;
    name: string;
    start: number;
    description: IEventSubmission[];
}

export class PreviousEventsStore {
    previousEvents: Loadable<IPreviousEvent[]> = new Loadable<IPreviousEvent[]>();

    constructor(private rootStore: RootStore) {
        makeObservable(this, {
            previousEvents: observable,
            setPreviousEvents: action,
            fetchPreviousEvents: action,
            showSearchResults: computed,
            totalMusicCount: computed,
        });
    }

    setPreviousEvents(previousEvents: Loadable<IPreviousEvent[]>): void {
        this.previousEvents = previousEvents;
    }

    async fetchPreviousEvents(): Promise<void> {
        if (!this.previousEvents.isInitial) {
            await this.previousEvents.promise;
            return;
        }
        const previousEventsPromise: Promise<IPreviousEvent> = getPreviousEvents();
        this.setPreviousEvents(Loadable.toLoadable(previousEventsPromise));
        await previousEventsPromise;
    }

    get showSearchResults(): boolean {
        return this.rootStore.searchStore.searchValue !== '';
    }

    get totalMusicCount(): number {
        let count = 0;
        this.previousEvents.payload?.forEach((event) =>
            event.description.filter((sf) => sf.type === 'music').forEach(() => (count += 1)),
        );
        return count;
    }
}
