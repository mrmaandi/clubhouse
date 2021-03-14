import { RootStore } from './RootStore';
import { makeAutoObservable } from 'mobx';
import { IEntry } from './EntriesStore';

export class PreviousEventsStore {
    constructor(private rootStore: RootStore) {
        makeAutoObservable(this);
    }

    get showSearchResults(): boolean {
        return this.rootStore.searchStore.searchValue !== '';
    }

    get totalMusicCount(): number {
        const entries = this.rootStore.entriesStore.entries.payload;
        if (!entries) {
            return 0;
        }
        return entries.filter((entry: IEntry) => entry.entryType === 'MUSIC').length;
    }
}
