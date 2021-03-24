import { RootStore } from './RootStore';
import { makeAutoObservable } from 'mobx';
import { getChallenges } from '../helpers/Requests';
import { Loadable } from '../helpers/Loadable';
import { IEntry } from './EntriesStore';

export interface IChallenge {
    challengeNumber: number;
    name: string;
    startTime: string;
    endTime: string;
}

export class ChallengesStore {
    challenges: Loadable<IChallenge[]> = new Loadable<IChallenge[]>();

    constructor(private rootStore: RootStore) {
        makeAutoObservable(this);
    }

    public async fetchChallenges(): Promise<void> {
        if (!this.challenges.isInitial) {
            await this.challenges.promise;
            return;
        }
        const challenges: Promise<IChallenge[]> = getChallenges();
        this.setChallenges(Loadable.toLoadable(challenges));
        await challenges;
    }

    public get latestChallenge(): IChallenge | null {
        if (!this.challenges.payload) {
            return null;
        }
        return this.challenges.payload
            .slice()
            .sort((a: IChallenge, b: IChallenge) => Date.parse(b.startTime) - Date.parse(a.startTime))[0];
    }

    public getChallengeFromEntry = (entry: IEntry): IChallenge => {
        return this.challenges.payload!.find((challenge) => challenge.challengeNumber === entry.challengeNumber)!;
    };

    private setChallenges = (challenges: Loadable<IChallenge[]>): void => {
        this.challenges = challenges;
    };
}
