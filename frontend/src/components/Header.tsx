import React from 'react';
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@material-ui/core';
import logo from '../assets/monke.png';
import AlbumIcon from '@material-ui/icons/Album';

class Header extends React.Component {
    render(): JSX.Element {
        return (
            <div className="main-header">
                <AppBar position="static" color="inherit">
                    <Container maxWidth="lg">
                        <Toolbar>
                            <img src={logo} alt="Clubhouse" />
                            <Button
                                color="inherit"
                                size="large"
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.location.reload();
                                }}
                            >
                                <Box>
                                    <Typography display="inline">
                                        <Box display="inline" fontSize={28} fontWeight={800}>
                                            Club
                                        </Box>
                                        <Box display="inline" fontSize={28}>
                                            house
                                        </Box>
                                    </Typography>
                                </Box>
                            </Button>
                        </Toolbar>
                    </Container>
                </AppBar>
            </div>
        );
    }
}

export default Header;
