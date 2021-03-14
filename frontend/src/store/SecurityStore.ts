import { RootStore } from './RootStore';
import { action, makeObservable, observable } from 'mobx';

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
