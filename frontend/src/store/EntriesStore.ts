import { RootStore } from './RootStore';
import { makeAutoObservable } from 'mobx';
import { EntryType, getEntries } from '../helpers/Requests';
import { Loadable } from '../helpers/Loadable';

export interface IEntry {
    challengeNumber: number;
    userId: number;
    entryType: EntryType;
    fileName: string;
    fileUrl: string;
}

export class EntriesStore {
    entries: Loadable<IEntry[]> = new Loadable<IEntry[]>();

    constructor(private rootStore: RootStore) {
        makeAutoObservable(this);
    }

    async fetchEntries(): Promise<void> {
        if (!this.entries.isInitial) {
            await this.entries.promise;
            return;
        }
        const entries: Promise<IEntry[]> = getEntries();
        this.setEntries(Loadable.toLoadable(entries));
        await entries;
    }

    public get musicEntries(): IEntry[] {
        if (!this.entries.payload) {
            return [];
        }
        return this.entries.payload.filter((entry) => entry.entryType === 'MUSIC');
    }

    public getUserNameFromId(userId: number): string {
        const users = this.rootStore.usersStore.users.payload;

        if (!users) {
            return '';
        }

        return users.find((user) => user.id === userId)!.name;
    }

    setEntries = (entries: Loadable<IEntry[]>): void => {
        this.entries = entries;
    };
}
