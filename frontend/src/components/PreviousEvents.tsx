import React, { FC, useEffect } from 'react';
import { Box, Button, CircularProgress, Container, Divider, Grid, Hidden, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import { useRootStore } from './Wrapper';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { IEventSubmission, IPreviousEvent } from '../store/PreviousEventsStore';
import { ReactJkMusicPlayerAudioListProps } from 'react-jinke-music-player';
import SearchField from './Search';
import SearchResults from './SearchResults';

export interface ISearchEvent {
    user: string;
    eventName: string;
    fileUrl: string;
    coverArt?: string;
}

const PreviousEvents: FC = () => {
    const { previousEventsStore } = useRootStore();

    useEffect(() => {
        previousEventsStore.fetchPreviousEvents();
    });

    return (
        <div className="events-section">
            <Container maxWidth="lg">
                {renderTitleAndSearchBar()}
                {previousEventsStore.showSearchResults ? <SearchResults /> : renderPreviousEvents()}
            </Container>
        </div>
    );
};

const renderTitleAndSearchBar = (): JSX.Element => {
    const { previousEventsStore, audioPlayerStore, searchStore } = useRootStore();

    const onPlayAllButtonClick = (): void => {
        const audioList: ReactJkMusicPlayerAudioListProps[] = [];
        previousEventsStore.previousEvents.payload!.map((previousEvent: IPreviousEvent) => {
            previousEvent.description
                ?.filter((submission: IEventSubmission) => submission.type === 'music')
                .map((submission) => {
                    audioList.push(
                        audioPlayerStore.mapToAudioList({
                            artistName: submission.user,
                            eventName: previousEvent.name,
                            musicSrc: submission.fileUrl,
                            cover: previousEvent.description?.filter(
                                (submission: IEventSubmission) => submission.type === 'art',
                            )[0].fileUrl,
                        }),
                    );
                });
        });
        audioPlayerStore.setAudioList(audioList);
    };

    const onPlayAllFromSearchButton = (): void => {
        const audioList: ReactJkMusicPlayerAudioListProps[] = [];
        searchStore.searchResults.forEach((searchResult) =>
            audioList.push(
                audioPlayerStore.mapToAudioList({
                    artistName: searchResult.user,
                    eventName: searchResult.eventName,
                    musicSrc: searchResult.fileUrl,
                    cover: searchResult.coverArt,
                }),
            ),
        );
        audioPlayerStore.setAudioList(audioList);
    };

    return (
        <>
            <Box pt={2}>
                <Grid container alignItems="center" spacing={3}>
                    <Grid item>
                        <Typography variant="h6">Previous Events</Typography>
                    </Grid>
                    <Grid item>
                        <SearchField />
                    </Grid>
                    <Grid item xs>
                        <Hidden smDown>
                            {searchStore.searchValue === '' ? (
                                <Typography align="right">
                                    <Button
                                        startIcon={<PlayArrowIcon />}
                                        variant="text"
                                        color="inherit"
                                        onClick={() => onPlayAllButtonClick()}
                                    >
                                        Play all
                                    </Button>
                                </Typography>
                            ) : (
                                searchStore.searchResults.length > 0 && (
                                    <Typography align="right">
                                        <Button
                                            startIcon={<PlayArrowIcon />}
                                            variant="text"
                                            color="inherit"
                                            onClick={() => onPlayAllFromSearchButton()}
                                        >
                                            Play everything in results
                                        </Button>
                                    </Typography>
                                )
                            )}
                        </Hidden>
                    </Grid>
                </Grid>
            </Box>
            <Box pt={2} pb={2}>
                <Divider light />
            </Box>
        </>
    );
};

const renderPreviousEvents = (): JSX.Element => {
    const { previousEventsStore, audioPlayerStore } = useRootStore();
    const { previousEvents } = previousEventsStore;

    const onChangeAudioList = (previousEvent: IPreviousEvent) => (e: any): void => {
        const audioList: ReactJkMusicPlayerAudioListProps[] = [];
        previousEvent.description
            ?.filter((submission: IEventSubmission) => submission.type === 'music')
            .map((submission) => {
                audioList.push(
                    audioPlayerStore.mapToAudioList({
                        artistName: submission.user,
                        eventName: previousEvent.name,
                        musicSrc: submission.fileUrl,
                        cover: previousEvent.description?.filter(
                            (submission: IEventSubmission) => submission.type === 'art',
                        )[0].fileUrl,
                    }),
                );
            });

        audioPlayerStore.setAudioList(audioList);
    };

    if (previousEvents.isInitialLoading || !previousEvents.payload) {
        return (
            <Box p={1} pb={3} mx="auto">
                <Typography variant="body1" align="center" color="textPrimary">
                    <p>Loading previous events data...</p>
                    <CircularProgress color="inherit" />
                </Typography>
            </Box>
        );
    }

    if (previousEvents.hasError) {
        return (
            <Box p={1} mx="auto">
                <Typography variant="body1" align="center" color="textPrimary">
                    There was a problem loading previous events data.
                </Typography>
            </Box>
        );
    }

    if (previousEvents.payload.length == 0) {
        return (
            <Box p={1} mx="auto">
                <Typography variant="body1" align="center" color="textPrimary">
                    No previous events or there was an issue loading events. :(
                </Typography>
            </Box>
        );
    }

    return (
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
                                <img src={cover} alt={previousEvent.name} onClick={onChangeAudioList(previousEvent)} />
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
    );
};

export default observer(PreviousEvents);
