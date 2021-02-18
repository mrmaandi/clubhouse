import React, { FC, useEffect } from 'react';
import { Box, Button, CircularProgress, Container, Divider, Grid, Hidden, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import { useRootStore } from './Wrapper';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { IEventSubmission, IPreviousEvent } from '../store/PreviousEventsStore';
import { ReactJkMusicPlayerAudioListProps } from 'react-jinke-music-player';
import SearchField from './Search';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

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
                {previousEventsStore.showSearchResults ? renderSearchResults() : renderPreviousEvents()}
            </Container>
        </div>
    );
};

const renderSearchResults = (): JSX.Element => {
    const { searchStore, audioPlayerStore } = useRootStore();

    if (searchStore.searchValue.length < 3) {
        return <Box pb={2}>Type at least 3 characters to find results.</Box>;
    }

    return (
        <Box pb={2}>
            {searchStore.searchResults.map((e, i) => (
                <div key={i}>
                    <IconButton
                        aria-label="search"
                        size="small"
                        onClick={async () => {
                            await audioPlayerStore.clearAudioList();
                            audioPlayerStore.setAudioList([{ name: e.user, musicSrc: e.fileUrl }]);
                        }}
                    >
                        <PlayCircleFilledIcon />
                    </IconButton>
                    {e.user} - {e.eventName}
                </div>
            ))}
        </Box>
    );
};

const renderTitleAndSearchBar = (): JSX.Element => {
    const { previousEventsStore, audioPlayerStore } = useRootStore();

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
                            <Typography align="right">
                                <Button
                                    startIcon={<PlayArrowIcon />}
                                    variant="text"
                                    color="inherit"
                                    onClick={() => onPlayAllButtonClick()}
                                >
                                    Play everything
                                </Button>
                            </Typography>
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
