import { RootStore } from './RootStore';
import { action, makeObservable, observable } from 'mobx';
import { ReactJkMusicPlayerAudioListProps } from 'react-jinke-music-player';

export class ModalStore {
    isModalOpen = false;

    constructor(private rootStore: RootStore) {
        makeObservable(this, {
            isModalOpen: observable,
            handleClose: action,
            handleOpen: action,
        });
    }

    handleClose = (): void => {
        this.isModalOpen = false;
    };

    handleOpen = (): void => {
        this.isModalOpen = true;
    };
}
