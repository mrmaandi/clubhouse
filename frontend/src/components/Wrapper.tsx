import React from 'react';
import MainContent from './MainContent';
import Header from './Header';
import Footer from './Footer';

class Wrapper extends React.Component {
    render(): JSX.Element {
        return (
            <>
                <Header />
                <MainContent />
                <Footer />
            </>
        );
    }
}

export default Wrapper;
