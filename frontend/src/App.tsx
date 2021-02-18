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
            background: {
                default: '#191919',
                paper: '#141414',
            },
        },
        typography: {
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
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
