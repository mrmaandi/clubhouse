import { PreviousEventsStore } from './PreviousEventsStore';
import { AudioPlayerStore } from './AudioPlayerStore';
import { SearchStore } from './SearchStore';
import { ModalStore } from './ModalStore';
import { DropzoneStore } from './DropzoneStore';
import { SecurityStore } from './SecurityStore';
import { AddChallengesStore } from './AddChallengesStore';
import { ChallengesStore } from './ChallengesStore';
import { UsersStore } from './UsersStore';
import { EntriesStore } from './EntriesStore';

export class RootStore {
    previousEventsStore: PreviousEventsStore;
    audioPlayerStore: AudioPlayerStore;
    searchStore: SearchStore;
    modalStore: ModalStore;
    dropzoneStore: DropzoneStore;
    securityStore: SecurityStore;
    addChallengesStore: AddChallengesStore;
    challengesStore: ChallengesStore;
    usersStore: UsersStore;
    entriesStore: EntriesStore;

    constructor() {
        this.previousEventsStore = new PreviousEventsStore(this);
        this.audioPlayerStore = new AudioPlayerStore(this);
        this.searchStore = new SearchStore(this);
        this.modalStore = new ModalStore(this);
        this.dropzoneStore = new DropzoneStore(this);
        this.securityStore = new SecurityStore(this);
        this.addChallengesStore = new AddChallengesStore(this);
        this.challengesStore = new ChallengesStore(this);
        this.usersStore = new UsersStore(this);
        this.entriesStore = new EntriesStore(this);
    }
}
