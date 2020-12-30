import React from 'react';
import { Layout } from 'antd';
import { Footer, Header } from 'antd/es/layout/layout';
import MainContent from './MainContent';

class Wrapper extends React.Component {
    render(): JSX.Element {
        return (
            <Layout>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <div className="logo" />
                    Clubhouse
                </Header>
                <MainContent />
                <Footer style={{ textAlign: 'center' }}>Clubhouse ©2020 Created by Villem</Footer>
            </Layout>
        );
    }
}

export default Wrapper;
