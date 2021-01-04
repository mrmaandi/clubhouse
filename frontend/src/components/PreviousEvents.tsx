import React from 'react';
import { Typography } from '@material-ui/core';
import AudioPlayer from './AudioPlayer';
import { ReactJkMusicPlayerAudioListProps } from 'react-jinke-music-player';
import { BACKEND_URL } from '../helpers/Constants';

interface IEventSubmission {
    user: string;
    type: string;
    fileUrl: string;
}

interface IPreviousEvent {
    id?: string;
    name?: string;
    start: number;
    description?: IEventSubmission[];
}

interface IPreviousEventsState {
    previousEvents: IPreviousEvent[];
    audioList: ReactJkMusicPlayerAudioListProps[];
}

class PreviousEvents extends React.Component<unknown, IPreviousEventsState> {
    constructor() {
        super({});

        this.state = {
            previousEvents: [],
            audioList: [],
        };
    }

    componentDidMount(): void {
        fetch(BACKEND_URL + '/calendar/previous', { mode: 'cors' })
            .then((response) => response.json())
            .then((json) => {
                const audioList: ReactJkMusicPlayerAudioListProps[] = [];
                json.forEach((event: IPreviousEvent) => {
                    event.description
                        ?.filter((submission: IEventSubmission) => submission.type === 'music')
                        .map((submittion) => {
                            const track: ReactJkMusicPlayerAudioListProps = {
                                name: submittion.user,
                                musicSrc: submittion.fileUrl,
                                cover: event.description?.filter(
                                    (submission: IEventSubmission) => submission.type === 'art',
                                )[0].fileUrl,
                            };
                            audioList.push(track);
                        });
                });
                this.setState({ previousEvents: json, audioList: [] });
            });
    }

    render(): JSX.Element {
        if (this.state.previousEvents.length == 0) {
            return <>No previous events</>;
        }

        return (
            <>
                <div className="audio-player">
                    <AudioPlayer audioLists={this.state.audioList} />
                </div>

                <Typography variant="h5" className="title-padding">
                    Previous Events
                </Typography>

                <div className="playlist-wrapper">
                    {this.state.previousEvents.map((previousEvent: IPreviousEvent) => {
                        const cover = previousEvent.description?.filter(
                            (submission: IEventSubmission) => submission.type === 'art',
                        )[0].fileUrl;

                        return (
                            <div>
                                <img
                                    src={cover}
                                    alt={previousEvent.name}
                                    onClick={this.onChangeAudioList(previousEvent)}
                                />
                                <Typography variant="subtitle1" align="center">
                                    {previousEvent.name}
                                </Typography>
                                <Typography variant="subtitle2" align="center" color="textSecondary">
                                    {previousEvent.start && new Date(previousEvent.start).toUTCString()}
                                </Typography>
                            </div>
                        );
                    })}
                </div>
            </>
        );
    }

    onChangeAudioList = (previousEvent: IPreviousEvent) => (e: any) => {
        const audioList: ReactJkMusicPlayerAudioListProps[] = [];
        previousEvent.description
            ?.filter((submission: IEventSubmission) => submission.type === 'music')
            .map((submission) => {
                const entry: ReactJkMusicPlayerAudioListProps = {
                    name: submission.user,
                    musicSrc: submission.fileUrl,
                    cover: previousEvent.description?.filter(
                        (submission: IEventSubmission) => submission.type === 'art',
                    )[0].fileUrl,
                };
                audioList.push(entry);
            });
        this.setState({ audioList: audioList });
    };
}

export default PreviousEvents;
