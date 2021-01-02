import React from 'react';
import { AppBar, Container, Toolbar, Typography } from '@material-ui/core';
import logo from '../assets/logo.svg';

class Header extends React.Component {
    render(): JSX.Element {
        return (
            <div className="main-header">
                <AppBar position="sticky" color="inherit">
                    <Container maxWidth="lg">
                        <Toolbar>
                            <img src={logo} alt="Clubhouse" />
                            <Typography variant="h5">Clubhouse</Typography>
                        </Toolbar>
                    </Container>
                </AppBar>
            </div>
        );
    }
}

export default Header;
