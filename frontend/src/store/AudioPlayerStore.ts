import { RootStore } from './RootStore';
import { action, makeObservable, observable } from 'mobx';
import { ReactJkMusicPlayerAudioListProps } from 'react-jinke-music-player';

export interface AudioList {
    eventName: string;
    artistName: string;
    musicSrc: string;
    cover?: string;
}

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

    setAudioList = async (audioList: ReactJkMusicPlayerAudioListProps[]): Promise<any> => {
        await this.clearAudioList();
        this.audioList = audioList;
    };

    mapToAudioList = (audioList: AudioList): ReactJkMusicPlayerAudioListProps => {
        return {
            name: audioList.artistName + ' - ' + audioList.eventName,
            musicSrc: audioList.musicSrc,
            cover: audioList.cover,
        };
    };
}
