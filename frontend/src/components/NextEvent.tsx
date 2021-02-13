import React, { FC, useEffect } from 'react';
import { Box, CircularProgress, Container, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import { useRootStore } from './Wrapper';
import TwitchEmbed from './TwitchEmbed';
import sample from '../assets/club.mp4';
import Countdown from './Countdown';

/*import { ReactComponent as TwitchLogo } from '../assets/twitch.svg';*/

const NextEvent: FC = () => {
    const { nextEventsStore } = useRootStore();

    useEffect(() => {
        nextEventsStore.fetchNextEvents();
    });

    return render();
};

const render = (): JSX.Element => {
    const { nextEventsStore } = useRootStore();
    const { nextEvents } = nextEventsStore;

    const eventCountdownView = (): JSX.Element => {
        return (
            <>
                <video className="videoTag" autoPlay loop muted>
                    <source src={sample} type="video/mp4" />
                </video>
                <div className="overlay">
                    {nextEvents.isInitialLoading || !nextEvents.payload ? (
                        <Typography align="center" color="textSecondary">
                            <p>Loading next event data...</p>
                            <CircularProgress color="inherit" />
                        </Typography>
                    ) : !nextEvents.payload[0] ? (
                        <Box fontWeight="500" fontSize={24}>
                            <Typography align="center" color="textSecondary">
                                Currently no new events are added in the calendar
                            </Typography>
                        </Box>
                    ) : (
                        <>
                            <Box fontSize={22}>
                                <Typography align="center" color="textSecondary">
                                    New Production Challenge In:
                                </Typography>
                            </Box>
                            <Countdown date={new Date(nextEvents.payload[0].start)} />
                        </>
                    )}
                    {/*                    <Typography align="center" color="textSecondary">
                        <TwitchLogo />
                    </Typography>*/}
                </div>
            </>
        );
    };

    const isEventActive = (): boolean => {
        const nextEventPayload = nextEvents.payload;

        if (!nextEventPayload) {
            return false;
        }
        const nextEvent = nextEventPayload[0];
        //fix this
        if (new Date().getTime() > nextEvent.end) {
            return false;
        }
        return new Date().getTime() > nextEvent.start && new Date().getTime() < nextEvent.end;
    };

    const activeEventView = (): JSX.Element => {
        return (
            <Container maxWidth="lg">
                <TwitchEmbed />
            </Container>
        );
    };

    return <div className="backdrop">{isEventActive() ? activeEventView() : eventCountdownView()}</div>;
};

export default observer(NextEvent);
