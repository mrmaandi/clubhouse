import React, { FC, useEffect } from 'react';
import { Box, Button, CircularProgress, Container, Divider, Grid, Grow, Hidden, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import { useRootStore } from './Wrapper';

import { IEventSubmission, IPreviousEvent } from '../store/PreviousEventsStore';
import { ReactJkMusicPlayerAudioListProps } from 'react-jinke-music-player';
import SearchField from './SearchField';
import SearchResults from './SearchResults';
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
import AlbumIcon from '@material-ui/icons/Album';

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
            <Box pt={3}>
                <Container maxWidth="lg">
                    {renderTitleAndSearchBar()}
                    {previousEventsStore.showSearchResults ? <SearchResults /> : renderPreviousEventBoxes()}
                </Container>
            </Box>
        </div>
    );
};

const renderTitleAndSearchBar = (): JSX.Element => {
    const { previousEventsStore, audioPlayerStore, searchStore } = useRootStore();

    const onPreviousChallengesTitleClick = (e: any): void => {
        e.preventDefault();
        searchStore.clearSearchValue();
    };

    const sectionTitle = () => {
        return (
            <Button
                fullWidth
                startIcon={<AlbumIcon />}
                color="inherit"
                size="medium"
                onClick={onPreviousChallengesTitleClick}
            >
                <Box fontSize={20} fontWeight={800} letterSpacing={1}>
                    PREVIOUS CHALLENGES
                </Box>
            </Button>
        );
    };

    const playAllButton = () => {
        return (
            <Typography align="right" color="textSecondary">
                <Button
                    startIcon={<PlayArrowOutlinedIcon />}
                    variant="outlined"
                    onClick={() => onPlayAllButtonClick()}
                    size="large"
                >
                    Play every sample flip
                </Button>
            </Typography>
        );
    };

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

    const renderQuickFilters = (): JSX.Element => {
        return (
            <Grid container alignItems="center" spacing={2}>
                <Grid item>
                    <Typography color="textSecondary" variant="subtitle1">
                        Quick filters
                    </Typography>
                </Grid>
                {renderQuickSearchFilter('bustre')}
                {renderQuickSearchFilter('FoxStevenson')}
                <Hidden xsDown>
                    {renderQuickSearchFilter('scott')}
                    {renderQuickSearchFilter('ericspike')}
                    {renderQuickSearchFilter('Blooom')}
                    {renderQuickSearchFilter('Kaasschaaf')}
                    {renderQuickSearchFilter('Eldie')}
                </Hidden>
            </Grid>
        );
    };

    const renderQuickSearchFilter = (filterValue: string): JSX.Element => {
        return (
            <Grid item>
                <Button color="inherit" onClick={() => searchStore.onQuickFilterClick(filterValue)}>
                    {filterValue}
                </Button>
            </Grid>
        );
    };

    const renderDesktop = (): JSX.Element => {
        return (
            <>
                <Grid container alignItems="center" spacing={2}>
                    <Grid item>{sectionTitle()}</Grid>
                    <Grid item xs>
                        <SearchField />
                    </Grid>
                    <Grid item>{playAllButton()}</Grid>
                </Grid>
                {renderQuickFilters()}
                <Box pt={1} pb={2}>
                    <Divider light />
                </Box>
            </>
        );
    };

    const renderMobile = (): JSX.Element => {
        return (
            <>
                <Grid container alignItems="center">
                    <Grid item>{sectionTitle()}</Grid>
                    <Grid item xs>
                        {playAllButton()}
                    </Grid>
                </Grid>
                <Grid container alignItems="center">
                    <Grid item xs>
                        <Box pt={1} pb={2}>
                            <SearchField />
                        </Box>
                    </Grid>
                </Grid>
                {renderQuickFilters()}
                <Box pb={2}>
                    <Divider light />
                </Box>
            </>
        );
    };

    return (
        <>
            <Hidden smDown>{renderDesktop()}</Hidden>
            <Hidden mdUp>{renderMobile()}</Hidden>
        </>
    );
};

const renderPreviousEventBoxes = (): JSX.Element => {
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
                    .map((previousEvent: IPreviousEvent, i) => {
                        if (!previousEvent.description) {
                            return;
                        }
                        const cover = previousEvent.description.filter(
                            (submission: IEventSubmission) => submission.type === 'art',
                        )[0].fileUrl;

                        return (
                            <Grow key={i} in={true} style={{ transformOrigin: '0 0 0' }} {...{ timeout: i * 200 }}>
                                <div>
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
                            </Grow>
                        );
                    })}
            </div>
            <Box display="div" pt={2}>
                <Typography color="textSecondary" variant="subtitle2" align="center">
                    There are{' '}
                    <Typography display="inline" color="textPrimary">
                        {previousEventsStore.totalMusicCount}
                    </Typography>{' '}
                    sample flips in total.
                </Typography>
            </Box>
        </div>
    );
};

export default observer(PreviousEvents);
