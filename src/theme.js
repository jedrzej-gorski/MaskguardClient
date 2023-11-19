import { createTheme, ThemeProvider } from '@mui/material/styles';

const muiTheme = createTheme({
    palette: {
        primary: {
            main: '#160be0',
        },
        secondary: {
            main: '#0bb6e0',
        },
    },
});

export default muiTheme;