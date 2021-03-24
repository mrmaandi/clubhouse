import { RootStore } from './RootStore';
import { makeAutoObservable } from 'mobx';
import { EntryType, getEntries } from '../helpers/Requests';
import { Loadable } from '../helpers/Loadable';
import { IChallenge } from './ChallengesStore';

export interface IEntriesByChallenge {
    challenge: IChallenge;
    entries: IEntry[];
}

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

    public get artEntries(): IEntry[] {
        if (!this.entries.payload) {
            return [];
        }
        return this.entries.payload.filter((entry) => entry.entryType === 'ART');
    }

    public musicEntriesByChallengeNumber(challengeNumber: number): IEntry[] {
        return this.musicEntries.filter((entry) => entry.challengeNumber === challengeNumber);
    }

    public artEntriesByChallengeNumber(challengeNumber: number): IEntry[] {
        return this.artEntries.filter((entry) => entry.challengeNumber === challengeNumber);
    }

    public get groupedEntriesByChallengeId(): IEntriesByChallenge[] {
        if (!this.entries.payload || !this.rootStore.challengesStore.challenges.payload) {
            return [];
        }
        const groupedEntries: IEntriesByChallenge[] = [];
        this.rootStore.challengesStore.challenges.payload.forEach((challenge) =>
            groupedEntries.push({
                challenge,
                entries: this.musicEntriesByChallengeNumber(challenge.challengeNumber),
            }),
        );
        return groupedEntries.sort((a: IEntriesByChallenge, b: IEntriesByChallenge) => {
            return Date.parse(a.challenge.startTime) - Date.parse(b.challenge.startTime);
        });
    }

    public get latestChallenge(): IEntriesByChallenge {
        return this.groupedEntriesByChallengeId
            .slice()
            .sort(
                (a: IEntriesByChallenge, b: IEntriesByChallenge) =>
                    Date.parse(b.challenge.startTime) - Date.parse(a.challenge.startTime),
            )[0];
    }

    public get latestChallengeArtEntry(): IEntry | null {
        const latestChallenge = this.rootStore.challengesStore.latestChallenge;
        if (!latestChallenge) {
            return null;
        }
        const latestChallengeNumber = latestChallenge.challengeNumber;
        return this.artEntriesByChallengeNumber(latestChallengeNumber)[0];
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
