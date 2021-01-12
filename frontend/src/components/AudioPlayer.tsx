import React from 'react';
import ReactJkMusicPlayer, { ReactJkMusicPlayerAudioListProps } from 'react-jinke-music-player';

interface IAudioPlayerProps {
    audioLists: ReactJkMusicPlayerAudioListProps[];
}

class AudioPlayer extends React.Component<IAudioPlayerProps> {
    constructor(props: IAudioPlayerProps) {
        super(props);
    }

    render(): JSX.Element {
        if (!this.props.audioLists[0]) {
            return <></>;
        }

        return (
            <div key={this.props.audioLists[0].cover}>
                <ReactJkMusicPlayer
                    audioLists={this.props.audioLists}
                    mode="full"
                    showMediaSession
                    remove={false}
                    showThemeSwitch={false}
                    showLyric={false}
                    defaultPlayMode="shufflePlay"
                    showDownload={false}
                    theme="light"
                    showReload={false}
                    showDestroy={false}
                    defaultPlayIndex={this.getRndInteger(0, this.props.audioLists.length)}
                />
            </div>
        );
    }

    getRndInteger = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min)) + min;
    };
}

export default AudioPlayer;
