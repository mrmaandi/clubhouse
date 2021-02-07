import React from 'react';
import { Box, Container, Typography } from '@material-ui/core';

class InfoBar extends React.Component {
    render(): JSX.Element {
        return (
            <div className="info-bar">
                <Container maxWidth="lg">
                    <Box m={2} mx="auto" />
                    <Typography align="center" variant="body2" color="textSecondary">
                        In the process of migrating this site from AWS to another server. There might be some downtime.
                    </Typography>
                    <Box m={2} mx="auto" />
                </Container>
            </div>
        );
    }
}

export default InfoBar;
