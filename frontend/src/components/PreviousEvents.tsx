import React from 'react';
import { GridList, GridListTile, GridListTileBar, Typography } from '@material-ui/core';
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
        fetch('http://localhost:8080/calendar/previous', { mode: 'cors' })
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
                <AudioPlayer audioLists={this.state.audioList} />
                <Typography variant="h6" style={{ paddingTop: '15px' }}>
                    Previous Events
                </Typography>

                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-around',
                        overflow: 'hidden',
                    }}
                >
                    <GridList
                        style={{
                            flexWrap: 'nowrap',
                            // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
                            transform: 'translateZ(0)',
                        }}
                        cellHeight={180}
                        cols={3.5}
                    >
                        {this.state.previousEvents.map((previousEvent: IPreviousEvent) => {
                            const cover = previousEvent.description?.filter(
                                (submission: IEventSubmission) => submission.type === 'art',
                            )[0].fileUrl;

                            return (
                                <GridListTile key={previousEvent.id} onClick={this.onChangeAudioList(previousEvent)}>
                                    <img src={cover} alt={previousEvent.name} />
                                    <GridListTileBar title={previousEvent.name} />
                                </GridListTile>
                            );
                        })}
                    </GridList>
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
