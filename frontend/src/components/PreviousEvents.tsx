import React from 'react';
import { Button, Divider, Grid, Typography } from '@material-ui/core';
import AudioPlayer from './AudioPlayer';
import { ReactJkMusicPlayerAudioListProps } from 'react-jinke-music-player';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';

interface IEventSubmission {
    user: string;
    type: string;
    fileUrl: string;
}

interface IPreviousEvent {
    id?: string;
    name?: string;
    start: number;
    description: IEventSubmission[];
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
        fetch('/api/calendar/previous', { mode: 'cors' })
            .then((response) => response.json())
            .then((json) => {
                const audioList: ReactJkMusicPlayerAudioListProps[] = [];
                json.forEach((event: IPreviousEvent) => {
                    event.description &&
                        event.description
                            .filter((submission: IEventSubmission) => submission.type === 'music')
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
            return <>No previous events or there was an issue loading events. :(</>;
        }

        return (
            <>
                <div className="audio-player">
                    <AudioPlayer audioLists={this.state.audioList} />
                </div>
                <Grid justify="space-between" container alignItems="center">
                    <Grid item>
                        <Typography variant="h5" className="title-padding">
                            Previous Events
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button
                            startIcon={<PlayArrowIcon />}
                            variant="outlined"
                            onClick={() => this.onPlayAllButtonClick()}
                        >
                            Play all
                        </Button>
                    </Grid>
                </Grid>

                <Divider light style={{ marginBottom: '20px' }} />

                <div className="playlist-wrapper">
                    <div className="playlist-flex">
                        {this.state.previousEvents
                            .sort((a, b) => {
                                return b.start - a.start;
                            })
                            .filter((previousEvent: IPreviousEvent) => previousEvent.description.length !== 0)
                            .map((previousEvent: IPreviousEvent) => {
                                if (!previousEvent.description) {
                                    return;
                                }
                                const cover = previousEvent.description.filter(
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

    onPlayAllButtonClick = () => {
        const audioList: ReactJkMusicPlayerAudioListProps[] = [];
        this.state.previousEvents.map((previousEvent: IPreviousEvent) => {
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
        });
        this.setState({ audioList: audioList });
    };
}

export default PreviousEvents;
