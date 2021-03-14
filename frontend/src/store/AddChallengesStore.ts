import { RootStore } from './RootStore';
import { action, makeObservable, observable } from 'mobx';

export class AddChallengesStore {
    challengeId = '';
    challengeName = '';
    startDate: Date | null = new Date();
    endDate: Date | null = new Date();

    constructor(private rootStore: RootStore) {
        makeObservable(this, {
            challengeId: observable,
            challengeName: observable,
            startDate: observable,
            endDate: observable,
            setChallengeId: action,
            setChallengeName: action,
            setStartDate: action,
            setEndDate: action,
        });
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
