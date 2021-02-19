import React, { FC } from 'react';
import { useRootStore } from './Wrapper';
import { Box, Grid, Hidden, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { observer } from 'mobx-react';

const SearchResults: FC = () => {
    const { searchStore, audioPlayerStore } = useRootStore();

    if (searchStore.searchValue.length < 2) {
        return (
            <Box pb={2}>
                <Typography align="center">Type at least 2 characters to find results.</Typography>
            </Box>
        );
    }

    return (
        <Box pb={3}>
            <Typography variant="h6">Found {searchStore.searchResults.length} results</Typography>
            {searchStore.searchResults.length > 0 && (
                <Table aria-label="simple table" size="medium" padding="none">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <Hidden xsDown>
                                <TableCell></TableCell>
                            </Hidden>
                            <TableCell>
                                <Typography variant="caption" color="textSecondary">
                                    TITLE
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="caption" color="textSecondary">
                                    NAME
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {searchStore.searchResults.reverse().map((e, i) => (
                            <TableRow key={i}>
                                <TableCell component="th" scope="row">
                                    <IconButton
                                        aria-label="search"
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
                                </TableCell>
                                <Hidden xsDown>
                                    <TableCell>
                                        <Grid container alignItems="center">
                                            <Grid item>
                                                <img src={e.coverArt} width="46px" height="46px" />
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                </Hidden>
                                <TableCell>{e.eventName}</TableCell>
                                <TableCell>{e.user}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </Box>
    );
};

export default observer(SearchResults);
