import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';
import Wrapper from './components/Wrapper';
import CssBaseline from '@material-ui/core/CssBaseline';

declare global {
    interface Window {
        Twitch: any;
    }
}

function App(): JSX.Element {
    const darkTheme = createMuiTheme({
        palette: {
            type: 'dark',
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Wrapper />
        </ThemeProvider>
    );
}

export default App;
