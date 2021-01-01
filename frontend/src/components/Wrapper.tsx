import React from 'react';
import MainContent from './MainContent';
import MainHead from './MainHead';

class Wrapper extends React.Component {
    render(): JSX.Element {
        return (
            <>
                <MainHead />
                <MainContent />
            </>
        );
    }
}

export default Wrapper;
