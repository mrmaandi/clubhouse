import { PreviousEventsStore } from './PreviousEventsStore';
import { AudioPlayerStore } from './AudioPlayerStore';
import { NextEventsStore } from './NextEventStore';

export class RootStore {
    previousEventsStore: PreviousEventsStore;
    audioPlayerStore: AudioPlayerStore;
    nextEventsStore: NextEventsStore;

    constructor() {
        this.previousEventsStore = new PreviousEventsStore(this);
        this.audioPlayerStore = new AudioPlayerStore(this);
        this.nextEventsStore = new NextEventsStore(this);
    }
}
