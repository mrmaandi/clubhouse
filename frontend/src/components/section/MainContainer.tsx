import React, { FC } from 'react';
import PreviousEvents from './PreviousEvents';
import Spotlight from './Spotlight';
import Analytics from './Analytics';

export const MainContainer: FC = () => {
    return (
        <>
            <Spotlight />
            <PreviousEvents />
            <Analytics />
        </>
    );
};
