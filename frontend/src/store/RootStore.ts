import { PreviousEventsStore } from './PreviousEventsStore';
import { AudioPlayerStore } from './AudioPlayerStore';
import { NextEventsStore } from './NextEventStore';
import { SearchStore } from './SearchStore';
import { ModalStore } from './ModalStore';
import { DropzoneStore } from './DropzoneStore';

export class RootStore {
    previousEventsStore: PreviousEventsStore;
    audioPlayerStore: AudioPlayerStore;
    nextEventsStore: NextEventsStore;
    searchStore: SearchStore;
    modalStore: ModalStore;
    dropzoneStore: DropzoneStore;

    constructor() {
        this.previousEventsStore = new PreviousEventsStore(this);
        this.audioPlayerStore = new AudioPlayerStore(this);
        this.nextEventsStore = new NextEventsStore(this);
        this.searchStore = new SearchStore(this);
        this.modalStore = new ModalStore(this);
        this.dropzoneStore = new DropzoneStore(this);
    }
}
