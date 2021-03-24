import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { useRootStore } from './Wrapper';
import { Box, Container, Grid, Typography } from '@material-ui/core';
import NextEventCountdown from '../etc/NextEventCountdown';

const Spotlight: FC = () => {
    const render = (): JSX.Element => {
        const { entriesStore } = useRootStore();

        const previousChallenge = (): JSX.Element => {
            if (entriesStore.latestChallenge !== null) {
                if (!entriesStore.latestChallengeArtEntry) {
                    return <>Loading</>;
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
                                    <Grid container alignItems="center" spacing={3}>
                                        <Grid item justify="center">
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
                                                {entriesStore.latestChallenge.challenge.name}
                                            </Typography>
                                            <Box>
                                                <Typography variant="subtitle1" color="textSecondary">
                                                    Sample flips: {entriesStore.latestChallenge.entries.length}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="subtitle1" color="textSecondary">
                                                    Time:{' '}
                                                    {new Date(
                                                        entriesStore.latestChallenge.challenge.startTime,
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
            }
            return <>Loading</>;
        };

        return <>{previousChallenge()}</>;
    };

    return render();
};

export default observer(Spotlight);
