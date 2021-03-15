import { RootStore } from './RootStore';
import { makeAutoObservable } from 'mobx';
import { IEntry } from './EntriesStore';

export interface ISearchEvent {
    user: string;
    eventName: string;
    eventNumber: number;
    fileUrl: string;
    fileName: string;
    coverArt?: string;
}

export class SearchStore {
    searchValue = '';

    constructor(private rootStore: RootStore) {
        makeAutoObservable(this);
    }

    public setSearchValue = (value: string): void => {
        this.searchValue = value;
    };

    clearSearchValue = (): void => {
        this.searchValue = '';
    };

    onQuickFilterClick = (searchValue: string): void => {
        this.setSearchValue(searchValue);
    };

    get showClearButton(): boolean {
        return this.searchValue !== '';
    }

    get searchResults(): ISearchEvent[] {
        const searchResults: ISearchEvent[] = [];
        const entries = this.rootStore.entriesStore.entries;

        if (entries.isInitialLoading || !entries.payload) {
            return [];
        }

        const artList = entries ? entries.payload.filter((entry) => entry.entryType === 'ART') : [];

        entries.payload.filter(
            (entry: IEntry) =>
                entry.entryType === 'MUSIC' &&
                this.rootStore.usersStore.users
                    .payload!.find((user) => user.id === entry.userId)!
                    .name.toLowerCase()
                    .includes(this.searchValue.toLowerCase()) &&
                searchResults.push({
                    user: this.rootStore.usersStore.users.payload!.find((user) => user.id === entry.userId)!.name,
                    eventName: this.rootStore.challengesStore.getChallengeFromEntry(entry).name,
                    eventNumber: this.rootStore.challengesStore.getChallengeFromEntry(entry).challengeNumber,
                    fileUrl: entry.fileUrl,
                    coverArt: artList.find((art) => art.challengeNumber === entry.challengeNumber)?.fileUrl,
                    fileName: entry.fileName,
                }),
        );

        return searchResults;
    }
}
