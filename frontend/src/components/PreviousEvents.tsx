import React from 'react';
import { Box, Divider, Typography } from '@material-ui/core';
import AudioPlayer from './AudioPlayer';
import { ReactJkMusicPlayerAudioListProps } from 'react-jinke-music-player';

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
                <Box display="flex" alignItems="center">
                    <Typography variant="h5" className="title-padding">
                        Previous Events
                    </Typography>
                    {/*<FormControl style={{ minWidth: '150px', marginLeft: '20px' }}>
                        <InputLabel id="demo-simple-select-label">Filter By</InputLabel>
                        <Select labelId="demo-simple-select-label" id="demo-simple-select">
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>*/}
                </Box>

                <Divider light style={{ marginBottom: '20px' }} />

                <div className="playlist-wrapper">
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
