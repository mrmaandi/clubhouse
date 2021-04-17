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
        this.setChallenges(challenges)
        await challenges;
    }

    public get latestChallenge(): IChallenge | null {
        if (!this.pastEvents) {
            return null;
        }

        return this.pastEvents[0];
    }

    get pastEvents(): IChallenge[] {
        return this.challenges.payload!
            .slice()
            .sort((a: IChallenge, b: IChallenge) => Date.parse(b.startTime) - Date.parse(a.startTime))
            .filter(challenge => Date.parse(challenge.startTime) < Date.now());
    }

    get upcomingEvent(): IChallenge | undefined {
        return this.challenges.payload?.find(challenge => Date.parse(challenge.startTime) >= Date.now())
    }

    public getChallengeFromEntry = (entry: IEntry): IChallenge => {
        return this.challenges.payload!.find((challenge) => challenge.challengeNumber === entry.challengeNumber)!;
    };

    private setChallenges = (challenges: Promise<IChallenge[]>): void => {
        this.challenges = Loadable.toLoadable(challenges);
    };
}
