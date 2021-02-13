/*
import { action, makeObservable, observable } from 'mobx';
import {Loadable} from "./Loadable";

export class LoadableArray<T> {
    _payload?: T[] = undefined;
    state: 'initial' | 'loading' | 'success' | 'error' = 'initial';
    private _promise?: Promise<any> = undefined;

    constructor() {
        makeObservable(this, {
            _payload: observable,
            state: observable,
            setSuccess: action,
        });
    }

    setSuccess(payload: T): void {
        this.state = 'success';
        this._payload = payload;
    }

    setLoading(): void {
        this.state = 'loading';
        this._payload = undefined;
    }

    setError(): void {
        this.state = 'error';
        this._payload = undefined;
    }

    static toLoadable<Incoming, Result>(
        promise: Promise<Incoming>,
        transform: (incoming: Incoming) => Result = (value: any) => value,
    ): Loadable<Result> {
        const loadable = new Loadable<Result>();
        loadable.setLoading();
        loadable._promise = promise;
        promise
            .then((result) => {
                loadable.setSuccess(transform(result));
            })
            .catch((e) => {
                loadable.setError();
                console.error('Failed to load data. Error: ', e);
            });
        return loadable;
    }
}
*/
