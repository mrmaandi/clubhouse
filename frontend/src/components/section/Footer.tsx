import React from 'react';
import { Box, Link, Typography } from '@material-ui/core';

class Footer extends React.Component {
    render(): JSX.Element {
        return (
            <div className="main-footer">
                <Box my={3} pt={2}>
                    <Typography align="center" variant="body2" color="textSecondary">
                        Big thanks to everyone for their art and music
                        <br />
                        ❤
                        <br />
                        <Box fontWeight={800}>
                            <Link color="inherit" href="https://www.linkedin.com/in/villem-maandi-0b0b48189/">
                                VILLEM / KUKUALLA © 2021
                            </Link>
                        </Box>
                    </Typography>
                </Box>
            </div>
        );
    }
}

export default Footer;
