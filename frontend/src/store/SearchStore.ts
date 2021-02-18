import { RootStore } from './RootStore';
import { action, computed, makeObservable, observable } from 'mobx';
import { ReactJkMusicPlayerAudioListProps } from 'react-jinke-music-player';
import { IPreviousEvent } from './PreviousEventsStore';
import { ISearchEvent } from '../components/PreviousEvents';

export class SearchStore {
    searchValue = '';

    constructor(private rootStore: RootStore) {
        makeObservable(this, {
            searchValue: observable,
            setSearchValue: action,
            clearSearchValue: action,
            showClearButton: computed,
        });
    }

    setSearchValue(value: string): void {
        this.searchValue = value;
    }

    clearSearchValue = (): void => {
        this.searchValue = '';
    };

    get showClearButton(): boolean {
        return this.searchValue !== '';
    }

    get searchResults(): ISearchEvent[] {
        const searchResults: ISearchEvent[] = [];

        this.rootStore.previousEventsStore.previousEvents.payload?.forEach((event: IPreviousEvent) =>
            event.description.filter(
                (description) =>
                    description.type === 'music' &&
                    description.user.toLowerCase().includes(this.searchValue.toLowerCase()) &&
                    searchResults.push({
                        user: description.user,
                        eventName: event.name!,
                        fileUrl: description.fileUrl,
                        /*                    coverArt: event.description.filter((submission: IEventSubmission) => submission.type === 'art')[0]
                            .fileUrl,*/
                    }),
            ),
        );
        return searchResults;
    }
}
