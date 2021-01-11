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
                    theme={'auto'}
                />
            </div>
        );
    }
}

export default AudioPlayer;
