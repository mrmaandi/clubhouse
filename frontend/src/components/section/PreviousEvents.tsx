import React, { FC, useEffect } from 'react';
import {
    Box,
    Button,
    Chip,
    CircularProgress,
    Container,
    Divider,
    Grid,
    Grow,
    Hidden,
    Typography,
} from '@material-ui/core';
import { observer } from 'mobx-react';
import { useRootStore } from './Wrapper';
import { ReactJkMusicPlayerAudioListProps } from 'react-jinke-music-player';
import SearchField from '../search/SearchField';
import SearchResults from '../search/SearchResults';
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
import AlbumIcon from '@material-ui/icons/Album';
import { IChallenge } from '../../store/ChallengesStore';
import { IEntry } from '../../store/EntriesStore';
import missingCoverArt from '../../assets/missing-cover.png';

const PreviousEvents: FC = () => {
    const { challengesStore, previousEventsStore, entriesStore } = useRootStore();

    useEffect(() => {
        challengesStore.fetchChallenges();
        entriesStore.fetchEntries();
    });

    return (
        <div className="events-section">
            <Box pt={3} pb={3}>
                <Container maxWidth="lg">
                    {renderTitleAndSearchBar()}
                    {previousEventsStore.showSearchResults ? <SearchResults /> : renderPreviousEventBoxes()}
                </Container>
            </Box>
        </div>
    );
};

const renderTitleAndSearchBar = (): JSX.Element => {
    const { searchStore, entriesStore, audioPlayerStore, usersStore, challengesStore } = useRootStore();

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
            <Button
                startIcon={<PlayArrowOutlinedIcon />}
                variant="outlined"
                onClick={() => onPlayAllButtonClick()}
                size="large"
                fullWidth
            >
                <Typography color="inherit">Play all sample flips</Typography>
            </Button>
        );
    };

    const onPlayAllButtonClick = (): void => {
        const artList = entriesStore.entries.payload
            ? entriesStore.entries.payload.filter((entry) => entry.entryType === 'ART')
            : [];
        const audioList: ReactJkMusicPlayerAudioListProps[] = [];

        entriesStore.musicEntries.forEach((entry: IEntry) =>
            audioList.push(
                audioPlayerStore.mapToAudioList({
                    artistName: usersStore.users.payload!.find((user) => user.id === entry.userId)!.name,
                    eventName: challengesStore.getChallengeFromEntry(entry).name,
                    musicSrc: entry.fileUrl,
                    cover: artList.find((art) => art.challengeNumber === entry.challengeNumber)?.fileUrl,
                }),
            ),
        );
        audioPlayerStore.setAudioList(audioList);
    };

    const renderQuickFilters = (): JSX.Element => {
        return (
            <Grid container alignItems="center" spacing={1}>
                <Grid item>
                    <Typography color="textSecondary" variant="subtitle1">
                        Quick filters
                    </Typography>
                </Grid>
                {renderQuickSearchFilter('Bustre', '🐵')}
                <Hidden xsDown>
                    {renderQuickSearchFilter('Fox Stevenson', '🦊')}
                    {renderQuickSearchFilter('Oli Scott', '🎙')}
                    {renderQuickSearchFilter('Eric Spike', '🕺')}
                    {renderQuickSearchFilter('Blooom', '😍')}
                    {renderQuickSearchFilter('Kaasschaaf', '🧀')}
                </Hidden>
            </Grid>
        );
    };

    const renderQuickSearchFilter = (filterValue: string, icon?: string): JSX.Element => {
        return (
            <Grid item>
                <Button color="inherit" onClick={() => searchStore.onQuickFilterClick(filterValue)}>
                    {icon && icon + ' '}
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
                    <Grid item xs>
                        {sectionTitle()}
                    </Grid>
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
    const { audioPlayerStore, challengesStore, entriesStore, usersStore } = useRootStore();
    const { challenges } = challengesStore;

    const onChangeAudioList = (challenge: IChallenge, artEntry?: IEntry) => (e: any): void => {
        const audioList: ReactJkMusicPlayerAudioListProps[] = [];
        const audioEntries: IEntry[] = entriesStore.entries.payload!.filter(
            (entry) => entry.challengeNumber === challenge.challengeNumber,
        );
        audioEntries
            .filter((entry) => entry.entryType === 'MUSIC')
            .map((entry) => {
                audioList.push(
                    audioPlayerStore.mapToAudioList({
                        artistName: usersStore.users.payload!.find((user) => user.id === entry.userId)!.name,
                        eventName: entry.fileName,
                        musicSrc: entry.fileUrl,
                        cover: artEntry && artEntry.fileUrl,
                    }),
                );
            });

        audioPlayerStore.setAudioList(audioList);
    };

    if (challenges.isInitialLoading) {
        return (
            <Box p={1} pb={3} mx="auto">
                <Typography variant="body1" align="center" color="textPrimary">
                    <p>Loading previous events data...</p>
                    <CircularProgress color="inherit" />
                </Typography>
            </Box>
        );
    }

    if (challenges.hasError) {
        return (
            <Box p={1} mx="auto">
                <Typography variant="body1" align="center" color="textPrimary">
                    There was a problem loading previous events data
                </Typography>
            </Box>
        );
    }

    if (!challenges.payload || challenges.payload.length == 0) {
        return (
            <Box p={1} mx="auto">
                <Typography variant="body1" align="center" color="textPrimary">
                    No previous events or there was an issue loading events. :(
                </Typography>
            </Box>
        );
    }

    if (!entriesStore.entries.payload) {
        return <></>;
    }

    return (
        <div>
            <div className="playlist-flex">
                {challenges.payload
                    .slice()
                    .sort((a: IChallenge, b: IChallenge) => {
                        return Date.parse(b.startTime) - Date.parse(a.startTime);
                    })
                    .filter((challenge: IChallenge) => Date.parse(challenge.startTime) < Date.now())
                    .map((challenge: IChallenge, i: number) => {
                        const artEntry = entriesStore.entries.payload?.filter(
                            (entry) => entry.entryType === 'ART' && entry.challengeNumber === challenge.challengeNumber,
                        )[0];
                        const cover = artEntry ? artEntry.fileUrl : missingCoverArt;

                        return (
                            <Grow key={i} in={true} style={{ transformOrigin: '0 0 0' }} {...{ timeout: i * 200 }}>
                                <div>
                                    <div className="previous-event-box-container">
                                        <img
                                            src={cover}
                                            alt={challenge.name}
                                            onClick={onChangeAudioList(challenge, artEntry)}
                                        />
                                        {artEntry && (
                                            <div className="bottom-center">
                                                <Chip
                                                    variant="outlined"
                                                    size="small"
                                                    label={entriesStore.getUserNameFromId(artEntry.userId)}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <Typography variant="subtitle1" align="center">
                                        {challenge.name} (#{challenge.challengeNumber})
                                    </Typography>
                                    <Typography variant="subtitle2" align="center" color="textSecondary">
                                        {challenge.startTime && new Date(challenge.startTime).toUTCString()}
                                    </Typography>
                                </div>
                            </Grow>
                        );
                    })}
            </div>
        </div>
    );
};

export default observer(PreviousEvents);
