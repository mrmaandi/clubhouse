import { RootStore } from './RootStore';
import { makeAutoObservable } from 'mobx';

export class AddChallengesStore {
    challengeId = '';
    challengeName = '';
    startDate: Date | null = new Date();
    endDate: Date | null = new Date();

    constructor(private rootStore: RootStore) {
        makeAutoObservable(this);
    }

    setChallengeId = (id: string): void => {
        this.challengeId = id;
    };

    setChallengeName = (name: string): void => {
        this.challengeName = name;
    };

    setStartDate = (date: Date | null) => {
        this.startDate = date;
    };

    setEndDate = (date: Date | null) => {
        this.endDate = date;
    };
}
