import { action, makeObservable, observable } from 'mobx';

export class Loadable<T> {
    _payload?: T | undefined | null = null;
    state: 'initial' | 'loading' | 'success' | 'error' = 'initial';
    private _promise?: Promise<any> | undefined | null = null;

    constructor() {
        makeObservable(this, {
            _payload: observable,
            state: observable,
            setSuccess: action,
            setLoading: action,
            setError: action,
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

    public get payload(): T | undefined | null {
        return this._payload;
    }

    public get promise(): Promise<any> | undefined | null {
        return this._promise;
    }

    public get isInitial(): boolean {
        return this.state === 'initial';
    }

    public get isInitialLoading(): boolean {
        return this.state === 'initial' || this.state === 'loading';
    }

    public get hasError(): boolean {
        return this.state === 'error';
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
