import React from 'react';
import { Box, Typography } from '@material-ui/core';

class Footer extends React.Component {
    render(): JSX.Element {
        return (
            <div className="main-footer">
                <Box m={3} mx="auto">
                    <Typography align="center" variant="body2" color="textSecondary">
                        VILLEM / KUKUALLA © 2021
                    </Typography>
                </Box>
            </div>
        );
    }
}

export default Footer;
