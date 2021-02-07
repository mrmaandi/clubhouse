import React from 'react';
import MainContent from './MainContent';
import Header from './Header';
import Footer from './Footer';
import InfoBar from './InfoBar';

class Wrapper extends React.Component {
    render(): JSX.Element {
        return (
            <>
                <InfoBar />
                <Header />
                <MainContent />
                <Footer />
            </>
        );
    }
}

export default Wrapper;
