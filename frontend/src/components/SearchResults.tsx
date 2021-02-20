import React, { FC } from 'react';
import { useRootStore } from './Wrapper';
import {
    Box,
    Button,
    Grid,
    Grow,
    Hidden,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { observer } from 'mobx-react';
import { ReactJkMusicPlayerAudioListProps } from 'react-jinke-music-player';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';

const SearchResults: FC = () => {
    const { searchStore, audioPlayerStore } = useRootStore();

    const onPlayAllFromSearchButton = (): void => {
        const audioList: ReactJkMusicPlayerAudioListProps[] = [];
        searchStore.searchResults.reverse().forEach((searchResult) =>
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

    const renderSearchResults = (): JSX.Element => {
        if (searchStore.searchResults.length > 0) {
            return (
                <Table aria-label="simple table" padding="none">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <IconButton
                                    onClick={() => onPlayAllFromSearchButton()}
                                    disableFocusRipple
                                    aria-label="play-all-search"
                                    size="small"
                                >
                                    <PlaylistPlayIcon fontSize="large" />
                                </IconButton>
                            </TableCell>
                            <TableCell>
                                <Typography variant="caption" color="textSecondary">
                                    #
                                </Typography>
                            </TableCell>
                            <Hidden xsDown>
                                <TableCell></TableCell>
                            </Hidden>
                            <TableCell>
                                <Typography variant="caption" color="textSecondary">
                                    CHALLENGE
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="caption" color="textSecondary">
                                    NAME
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {searchStore.searchResults.reverse().map((e, i) => (
                            <Grow
                                key={e.fileUrl + i}
                                in={true}
                                style={{ transformOrigin: '0 0 0' }}
                                {...{ timeout: 2 ^ (i * 100) }}
                            >
                                <TableRow>
                                    <TableCell width={1}>
                                        <Box pr={1}>
                                            <IconButton
                                                aria-label="search"
                                                size="small"
                                                onClick={() => {
                                                    audioPlayerStore.setAudioList([
                                                        audioPlayerStore.mapToAudioList({
                                                            eventName: e.eventName,
                                                            artistName: e.user,
                                                            musicSrc: e.fileUrl,
                                                            cover: e.coverArt,
                                                        }),
                                                    ]);
                                                }}
                                            >
                                                <PlayCircleOutlineIcon fontSize="large" />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                    <TableCell width={1}>
                                        <Box pr={2}>
                                            <Typography color="textSecondary">{i + 1}</Typography>
                                        </Box>
                                    </TableCell>
                                    <Hidden xsDown>
                                        <TableCell width={1}>
                                            <Box pr={3}>
                                                <Grid container alignItems="center">
                                                    <Grid item>
                                                        <img src={e.coverArt} width="46px" height="46px" />
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </TableCell>
                                    </Hidden>
                                    <TableCell>{e.eventName}</TableCell>
                                    <TableCell align="right">{e.user}</TableCell>
                                </TableRow>
                            </Grow>
                        ))}
                    </TableBody>
                </Table>
            );
        }
        return <></>;
    };

    if (searchStore.searchValue.length < 2) {
        return (
            <Box pb={2}>
                <Typography align="center">Type at least 2 characters to find results.</Typography>
            </Box>
        );
    }

    return (
        <Box pb={5}>
            <Box pb={2} pt={1}>
                <Grid container alignItems="center" spacing={3}>
                    <Grid item>
                        <Typography variant="subtitle1" color="textSecondary">
                            Found {searchStore.searchResults.length} results
                        </Typography>
                    </Grid>
                    <Grid item>
                        {searchStore.searchResults.length > 0 && (
                            <Button
                                startIcon={<PlayArrowOutlinedIcon />}
                                variant="outlined"
                                onClick={() => onPlayAllFromSearchButton()}
                                size="small"
                            >
                                Play all
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </Box>
            {renderSearchResults()}
        </Box>
    );
};

export default observer(SearchResults);
