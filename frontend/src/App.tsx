import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';
import Wrapper from './components/Wrapper';
import CssBaseline from '@material-ui/core/CssBaseline';

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
