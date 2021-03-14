import { RootStore } from './RootStore';
import { makeAutoObservable } from 'mobx';
import { getUsers } from '../helpers/Requests';
import { Loadable } from '../helpers/Loadable';

export interface IUser {
    id: number;
    name: string;
}

export class UsersStore {
    users: Loadable<IUser[]> = new Loadable<IUser[]>();

    constructor(private rootStore: RootStore) {
        makeAutoObservable(this);
    }

    async fetchUsers(): Promise<void> {
        if (!this.users.isInitial) {
            await this.users.promise;
            return;
        }
        const users: Promise<IUser[]> = getUsers();
        this.setUsers(Loadable.toLoadable(users));
        await users;
    }

    setUsers = (users: Loadable<IUser[]>): void => {
        this.users = users;
    };
}
