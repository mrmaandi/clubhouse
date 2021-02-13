import React, { FC, useEffect } from 'react';
import { Box, Container, Typography } from '@material-ui/core';
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

    if (!nextEvents.payload) {
        return <></>;
    }

    const nextEvent = nextEvents.payload[0];

    const isEventActive = (): boolean => {
        if (!nextEvents) {
            return false;
        }
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

    const eventCountdownView = (): JSX.Element => {
        return (
            <>
                <video className="videoTag" autoPlay loop muted>
                    <source src={sample} type="video/mp4" />
                </video>
                <div className="overlay">
                    {!nextEvent ? (
                        <Box fontWeight="500" fontSize={24}>
                            <Typography align="center" color="textSecondary">
                                Currently no new events are planned
                            </Typography>
                        </Box>
                    ) : (
                        <>
                            <Box fontSize={22}>
                                <Typography align="center" color="textSecondary">
                                    New Production Challenge In:
                                </Typography>
                            </Box>
                            {!nextEvent ? <>Loading</> : <Countdown date={new Date(nextEvent.start)} />}
                        </>
                    )}
                    {/*                    <Typography align="center" color="textSecondary">
                        <TwitchLogo />
                    </Typography>*/}
                </div>
            </>
        );
    };

    return <div className="backdrop">{isEventActive() ? activeEventView() : eventCountdownView()}</div>;
};

export default observer(NextEvent);
