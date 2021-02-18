import { RootStore } from './RootStore';
import { action, makeObservable, observable } from 'mobx';
import { ReactJkMusicPlayerAudioListProps } from 'react-jinke-music-player';

export class AudioPlayerStore {
    audioList: ReactJkMusicPlayerAudioListProps[] = [];

    constructor(private rootStore: RootStore) {
        makeObservable(this, {
            audioList: observable,
            setAudioList: action,
        });
    }

    clearAudioList = async (): Promise<any> => {
        this.audioList = [];
        return Promise.resolve();
    };

    setAudioList(audioList: ReactJkMusicPlayerAudioListProps[]): void {
        this.audioList = audioList;
    }
}
