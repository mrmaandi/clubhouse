import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { useRootStore } from './Wrapper';
import { Box, CircularProgress, Container, Grid, Typography } from '@material-ui/core';
import NextEventCountdown from '../etc/NextEventCountdown';

const Spotlight: FC = () => {
    const render = (): JSX.Element => {
        const { entriesStore, challengesStore } = useRootStore();

        const previousChallenge = (): JSX.Element => {
            if (challengesStore.challenges.isInitialLoading) {
                return (
                    <Box p={1} pb={3} mx="auto">
                        <Typography variant="body1" align="center" color="textPrimary">
                            <p>Loading previous challenge ...</p>
                            <CircularProgress color="inherit" />
                        </Typography>
                    </Box>
                );
            }

            if (!entriesStore.latestChallengeArtEntry) {
                return (
                    <Box p={1} pb={3} mx="auto">
                        <Typography variant="body1" align="center" color="textPrimary">
                            <p>Finding art ...</p>
                            <CircularProgress color="inherit" />
                        </Typography>
                    </Box>
                );
            }

            const backgroundProps = {
                style: {
                    backgroundImage: `url("${entriesStore.latestChallengeArtEntry.fileUrl}")`,
                },
            };

            return (
                <Box className="spotlight-wrapper">
                    <div {...backgroundProps} className="background" />
                    <div className="content">
                        <Container maxWidth="lg">
                            <Box justifyContent="center" alignItems="center">
                                <Grid container alignItems="center" spacing={3} justify="center">
                                    <Grid item>
                                        <img
                                            className="cover effect6"
                                            src={entriesStore.latestChallengeArtEntry.fileUrl}
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <Typography variant="h5" color="textPrimary">
                                            <Box display="inline" fontWeight={800}>
                                                Previous Challenge
                                            </Box>
                                        </Typography>
                                        <Typography variant="h6" color="textSecondary">
                                            {entriesStore.previousChallenge.challenge.name}
                                        </Typography>
                                        <Box>
                                            <Typography variant="subtitle1" color="textSecondary">
                                                Sample flips: {entriesStore.previousChallenge.entries.length}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="subtitle1" color="textSecondary">
                                                Time:{' '}
                                                {new Date(
                                                    entriesStore.previousChallenge.challenge.startTime,
                                                ).toUTCString()}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <NextEventCountdown />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Container>
                    </div>
                </Box>
            );
        };

        return <>{previousChallenge()}</>;
    };

    return render();
};

export default observer(Spotlight);
