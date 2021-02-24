import { RootStore } from './RootStore';
import { action, computed, makeObservable, observable } from 'mobx';
import { IEventSubmission, IPreviousEvent } from './PreviousEventsStore';
import { ISearchEvent } from '../components/section/PreviousEvents';

export class SecurityStore {
    securityToken = '';

    constructor(private rootStore: RootStore) {
        makeObservable(this, {
            securityToken: observable,
            setSecurityToken: action,
        });
    }

    setSecurityToken = (value: string) => {
        this.securityToken = value;
    };
}
