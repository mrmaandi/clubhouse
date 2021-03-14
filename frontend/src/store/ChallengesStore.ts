import { RootStore } from './RootStore';
import { action, makeObservable, observable } from 'mobx';
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
        makeObservable(this, {
            challenges: observable,
            setChallenges: action,
        });
    }

    async fetchChallenges(): Promise<void> {
        if (!this.challenges.isInitial) {
            await this.challenges.promise;
            return;
        }
        const challenges: Promise<IChallenge[]> = getChallenges();
        this.setChallenges(Loadable.toLoadable(challenges));
        await challenges;
    }

    setChallenges = (challenges: Loadable<IChallenge[]>): void => {
        this.challenges = challenges;
    };

    getChallengeFromEntry = (entry: IEntry): IChallenge => {
        return this.challenges.payload!.find((challenge) => challenge.challengeNumber === entry.challengeNumber)!;
    };
}
