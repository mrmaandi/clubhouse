import { PreviousEventsStore } from './PreviousEventsStore';
import { AudioPlayerStore } from './AudioPlayerStore';
import { NextEventsStore } from './NextEventStore';
import { SearchStore } from './SearchStore';

export class RootStore {
    previousEventsStore: PreviousEventsStore;
    audioPlayerStore: AudioPlayerStore;
    nextEventsStore: NextEventsStore;
    searchStore: SearchStore;

    constructor() {
        this.previousEventsStore = new PreviousEventsStore(this);
        this.audioPlayerStore = new AudioPlayerStore(this);
        this.nextEventsStore = new NextEventsStore(this);
        this.searchStore = new SearchStore(this);
    }
}
