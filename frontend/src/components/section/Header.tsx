import React, { FC } from 'react';
import { Box, Button, Container, Grid, IconButton, Link, Tooltip, Typography } from '@material-ui/core';
import logo from '../../assets/monke.png';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { useRootStore } from './Wrapper';
import { observer } from 'mobx-react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import TodayIcon from '@material-ui/icons/Today';

const Header: FC = () => {
    const { modalStore, searchStore } = useRootStore();

    const addNewChallengeButton = (): JSX.Element => {
        return (
            <Box pr={1} display="inline">
                <Button
                    size="small"
                    color="secondary"
                    type="button"
                    variant="contained"
                    disabled
                    onClick={modalStore.handleOpen}
                    startIcon={<TodayIcon />}
                >
                    Add new challenge
                </Button>
            </Box>
        );
    };

    const addFlipsButton = (): JSX.Element => {
        return (
            <Box pr={1} display="inline">
                <IconButton
                    size="small"
                    color="default"
                    onClick={modalStore.handleOpen}
                ><CloudUploadIcon /></IconButton>
            </Box>
        );
    };

    const downloadAll = (): JSX.Element => {
        return (
            <Box pr={2} display="inline" fontWeight={800}>
                <Link href="https://drive.google.com/drive/folders/1DVWqHa1sXWTYW2lv0c1-LZPmHJ2etf44?usp=sharing" color="inherit" variant="button">
                    Link for offline listening
                </Link>
            </Box>
        );
    };


    const authenticationButton = (): JSX.Element => {
        return (
            <Tooltip
                title="You will be able to authenticate yourself with Discord to create playlists, view your personal sample flips, etc. This is a work in progress. It will come when it's ready."
                placement="bottom"
            >
                <Box display="inline">
                    <Button
                        disabled
                        variant="contained"
                        size="small"
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.reload();
                        }}
                        startIcon={<LockOpenIcon />}
                    >
                        <Box display="inline">Authenticate with Discord</Box>
                    </Button>
                </Box>
            </Tooltip>
        );
    };

    return (
        <div className="main-header">
            <div className="header-content">
                <Container maxWidth="lg">
                    <div className="background-art" />
                    <Box>
                        <Grid container alignItems="center">
                            <Grid item>
                                <img src={logo} alt="Clubhouse" />
                            </Grid>
                            <Grid item xs>
                                <Button
                                    color="inherit"
                                    size="large"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        searchStore.clearSearchValue();
                                    }}
                                >
                                    <Typography display="inline">
                                        <Box display="inline" fontSize={28} fontWeight={800}>
                                            Club
                                        </Box>
                                        <Box display="inline" fontSize={28}>
                                            house
                                        </Box>
                                    </Typography>
                                </Button>
                            </Grid>
                            <Grid item>
                                {downloadAll()}
                                {addFlipsButton()}
                                {/*{addNewChallengeButton()}
                                {authenticationButton()}*/}
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </div>
        </div>
    );
};

export default observer(Header);
