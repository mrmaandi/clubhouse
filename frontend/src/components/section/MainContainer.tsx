import React, { FC } from 'react';
import NextEvent from './NextEvent';
import PreviousEvents from './PreviousEvents';
import Spotlight from './Spotlight';
import Analytics from './Analytics';

export const MainContainer: FC = () => {
    return (
        <>
            <Spotlight />
            {/*<NextEvent />*/}
            <PreviousEvents />
            <Analytics />
        </>
    );
};
