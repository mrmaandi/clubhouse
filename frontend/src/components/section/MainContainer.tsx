import React, { FC } from 'react';
import NextEvent from './NextEvent';
import PreviousEvents from './PreviousEvents';

export const MainContainer: FC = () => {
    return (
        <>
            <NextEvent />
            <PreviousEvents />
        </>
    );
};
