import { RootStore } from './RootStore';
import { makeAutoObservable } from 'mobx';

export class SecurityStore {
    securityToken = '';

    constructor(private rootStore: RootStore) {
        makeAutoObservable(this);
    }

    setSecurityToken = (value: string) => {
        this.securityToken = value;
    };
}
