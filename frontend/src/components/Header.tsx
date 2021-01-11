import React from 'react';
import { AppBar, Box, Container, Toolbar, Typography } from '@material-ui/core';
import logo from '../assets/monke.png';

class Header extends React.Component {
    render(): JSX.Element {
        return (
            <div className="main-header">
                <AppBar position="static" color="inherit">
                    <Container maxWidth="lg">
                        <Toolbar>
                            <img src={logo} alt="Clubhouse" />
                            <Typography variant="h4">
                                <Box fontWeight={500}>Clubhouse</Box>
                            </Typography>
                        </Toolbar>
                    </Container>
                </AppBar>
            </div>
        );
    }
}

export default Header;
