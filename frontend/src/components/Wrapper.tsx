import React from 'react';
import {Breadcrumb, DatePicker, Layout, Menu} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";

class Wrapper extends React.Component {
    render(): JSX.Element {
        return (
            <Layout>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal">
                        <Menu.Item key="1">Clubhouse</Menu.Item>
                    </Menu>
                </Header>
                <Content className="site-layout" style={{ marginTop: 64 }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                        Content
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Clubhouse ©2020 Created by Villem</Footer>
            </Layout>
        );
    }
}

export default Wrapper;