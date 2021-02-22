import React from 'react';
import { Box, Button, Container, Grid, Tooltip, Typography } from '@material-ui/core';
import logo from '../assets/monke.png';
import LockOpenIcon from '@material-ui/icons/LockOpen';

class Header extends React.Component {
    render(): JSX.Element {
        return (
            <div className="main-header">
                <Container maxWidth="lg">
                    <Box>
                        <Grid container alignItems="center">
                            <Grid item>
                                <img src={logo} alt="Clubhouse" />
                            </Grid>
                            <Grid item xs>
                                <Button
                                    color="inherit"
                                    size="large"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.location.reload();
                                    }}
                                >
                                    <Typography display="inline">
                                        <Box display="inline" fontSize={28} fontWeight={800}>
                                            Club
                                        </Box>
                                        <Box display="inline" fontSize={28}>
                                            house
                                        </Box>
                                    </Typography>
                                </Button>
                            </Grid>
                            <Grid item>
                                <Tooltip
                                    title="You will be able to authenticate yourself with Discord to create playlists, view your personal sample flips, etc. This is a work in progress. It will come when it's ready."
                                    placement="bottom"
                                >
                                    <Box>
                                        <Button
                                            disabled
                                            size="medium"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                window.location.reload();
                                            }}
                                            variant="outlined"
                                            startIcon={<LockOpenIcon />}
                                        >
                                            <Box display="inline">Authenticate with Discord</Box>
                                        </Button>
                                    </Box>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </div>
        );
    }
}

export default Header;
