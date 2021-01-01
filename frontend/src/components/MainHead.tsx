import React from 'react';
import { AppBar, Container, Toolbar, Typography } from '@material-ui/core';
import logo from '../assets/logo.svg';

class MainHead extends React.Component {
    render(): JSX.Element {
        return (
            <div className="main-header">
                <AppBar position="sticky" color="inherit">
                    <Container maxWidth="md">
                        <Toolbar>
                            <img src={logo} alt="Clubhouse" />
                            <Typography variant="h6">Clubhouse</Typography>
                        </Toolbar>
                    </Container>
                </AppBar>
            </div>
        );
    }
}

export default MainHead;
