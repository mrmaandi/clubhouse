import React from 'react';
import MainContent from './MainContent';
import Header from './Header';

class Wrapper extends React.Component {
    render(): JSX.Element {
        return (
            <>
                <Header />
                <MainContent />
            </>
        );
    }
}

export default Wrapper;
