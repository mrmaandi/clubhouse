import { RootStore } from './RootStore';
import { makeAutoObservable } from 'mobx';

export class ModalStore {
    isModalOpen = false;

    constructor(private rootStore: RootStore) {
        makeAutoObservable(this);
    }

    handleClose = (): void => {
        this.isModalOpen = false;
    };

    handleOpen = (): void => {
        this.isModalOpen = true;
    };
}
