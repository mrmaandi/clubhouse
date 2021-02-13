import React from 'react';
import { Box, Link, Typography } from '@material-ui/core';

class Footer extends React.Component {
    render(): JSX.Element {
        return (
            <div className="main-footer">
                <Box m={3} mx="auto">
                    <Typography align="center" variant="body2" color="textSecondary">
                        <Link color="inherit" href="https://www.linkedin.com/in/villem-maandi-0b0b48189/">
                            VILLEM / KUKUALLA © 2021
                        </Link>
                    </Typography>
                </Box>
            </div>
        );
    }
}

export default Footer;
