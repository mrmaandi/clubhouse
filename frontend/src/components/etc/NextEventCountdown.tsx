import React, { FC } from 'react';
import { Box, CircularProgress, Divider, Grid, Hidden, Typography } from '@material-ui/core';
import Countdown from './Countdown';
import { useRootStore } from '../section/Wrapper';
import { observer } from 'mobx-react';

const NextEventCountdown: FC = () => {
    const { challengesStore } = useRootStore();
    const { challenges, upcomingEvent } = challengesStore;

    const getShortcuts = (): JSX.Element => {
        return (
            <Box mt={2}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <a href="https://www.twitch.tv/its_bustre">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="#A970FF"
                        >
                            <path d="M9.97 18.492l2.03-2.03h3.821l2.388-2.388v-7.641h-11.463v10.03h3.224v2.029zm4.418-9.313h1.433v4.175h-1.433v-4.175zm-3.821 0h1.433v4.175h-1.433v-4.175zm8.433-9.179h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm.642 14.791l-4.179 4.179h-3.104l-2.031 2.03h-2.149v-2.03h-3.821v-11.224l1.075-2.746h14.209v9.791z" />
                        </svg>
                    </a>
                    <Box pl={1}>its_bustre</Box>&nbsp;&nbsp;
                    <a href="https://discord.gg/zqPEjFkc">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M22 24l-5.25-5l.63 2H4.5A2.5 2.5 0 0 1 2 18.5v-15A2.5 2.5 0 0 1 4.5 1h15A2.5 2.5 0 0 1 22 3.5V24M12 6.8c-2.68 0-4.56 1.15-4.56 1.15c1.03-.92 2.83-1.45 2.83-1.45l-.17-.17c-1.69.03-3.22 1.2-3.22 1.2c-1.72 3.59-1.61 6.69-1.61 6.69c1.4 1.81 3.48 1.68 3.48 1.68l.71-.9c-1.25-.27-2.04-1.38-2.04-1.38S9.3 14.9 12 14.9s4.58-1.28 4.58-1.28s-.79 1.11-2.04 1.38l.71.9s2.08.13 3.48-1.68c0 0 .11-3.1-1.61-6.69c0 0-1.53-1.17-3.22-1.2l-.17.17s1.8.53 2.83 1.45c0 0-1.88-1.15-4.56-1.15m-2.07 3.79c.65 0 1.18.57 1.17 1.27c0 .69-.52 1.27-1.17 1.27c-.64 0-1.16-.58-1.16-1.27c0-.7.51-1.27 1.16-1.27m4.17 0c.65 0 1.17.57 1.17 1.27c0 .69-.52 1.27-1.17 1.27c-.64 0-1.16-.58-1.16-1.27c0-.7.51-1.27 1.16-1.27z"
                                fill="#FFFFFF"
                            />
                            <rect x="0" y="0" width="24" height="24" fill="rgba(0, 0, 0, 0)" />
                        </svg>
                    </a>
                    <Box pl={1}>Bustre&apos;s Clubhouse</Box>
                </div>
            </Box>
        );
    };

    const render = () => {
        if (challenges.isInitialLoading) {
            return (
                <Typography align="center" color="textSecondary">
                    Loading next event data...
                    <br />
                    <CircularProgress color="inherit" />
                </Typography>
            );
        }

        if (challenges.hasError) {
            return (
                <Typography align="center">There was a problem loading next event info</Typography>
            );
        }

        
        if (!upcomingEvent) {
            return (
                <>
                    <Box fontWeight="500" fontSize={24}>
                        <Typography align="center">Sorry, currently no new events are added yet</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" align="center" color="textSecondary">
                            (they need to be manually added)
                        </Typography>
                    </Box>
                </>
            );
        }

        return (
            <Hidden smDown>
                <Box fontSize={22}>
                    <Typography align="center" color="textSecondary">
                        New Production Challenge In:
                    </Typography>
                </Box>
                <Countdown date={new Date(upcomingEvent.startTime)} />
                <Divider light style={{ marginBottom: '10px', marginTop: '10px' }} />
                {getShortcuts()}
            </Hidden>
        );
    };

    return render();
};

export default observer(NextEventCountdown);
