import React, { FC, useEffect } from 'react';
import { Button, Container, Divider, Grid, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import { useRootStore } from './Wrapper';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { IEventSubmission, IPreviousEvent } from '../store/PreviousEventsStore';
import { ReactJkMusicPlayerAudioListProps } from 'react-jinke-music-player';

const PreviousEvents: FC = () => {
    const { previousEventsStore } = useRootStore();

    useEffect(() => {
        previousEventsStore.fetchPreviousEvents();
    });

    return render();
};

const render = (): JSX.Element => {
    const { previousEventsStore, audioPlayerStore } = useRootStore();
    const { previousEvents } = previousEventsStore;

    const onChangeAudioList = (previousEvent: IPreviousEvent) => (e: any): void => {
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

        audioPlayerStore.setAudioList(audioList);
    };

    const onPlayAllButtonClick = (): void => {
        const audioList: ReactJkMusicPlayerAudioListProps[] = [];
        previousEventsStore.previousEvents.payload!.map((previousEvent: IPreviousEvent) => {
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
        audioPlayerStore.setAudioList(audioList);
    };

    if (!previousEvents.payload) {
        return <></>;
    }

    if (previousEvents.payload.length == 0) {
        return (
            <Typography align="center" variant="body2" color="textSecondary">
                No previous events or there was an issue loading events. :(
            </Typography>
        );
    }

    return (
        <div className="events-section">
            <Container maxWidth="lg">
                <Grid justify="space-between" container alignItems="center">
                    <Grid item>
                        <Typography variant="h5" className="title-padding">
                            Previous Events
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button startIcon={<PlayArrowIcon />} variant="outlined" onClick={() => onPlayAllButtonClick()}>
                            Play all
                        </Button>
                    </Grid>
                </Grid>

                <Divider light style={{ marginBottom: '20px' }} />

                <div className="playlist-wrapper">
                    <div className="playlist-flex">
                        {previousEvents.payload
                            .slice()
                            .sort((a: IPreviousEvent, b: IPreviousEvent) => {
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
                                    <div key={previousEvent.id}>
                                        <img
                                            src={cover}
                                            alt={previousEvent.name}
                                            onClick={onChangeAudioList(previousEvent)}
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
            </Container>
        </div>
    );
};

export default observer(PreviousEvents);
