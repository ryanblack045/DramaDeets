import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  gradientBackground: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  fontFamily: "Helvetica",

    palette: {
      primary: {
        main: '#b7e4c7',
        contrastText:'#1b4332'
      },
      secondary: {
        main: '#1b4332',
      },
    },

  typography: {
    fontFamily: "Helvetica"
  }
});
const Theme = props => {
  return (
    <ThemeProvider theme={theme}>
      {props.children}
    </ThemeProvider>
  )
}

export default Theme;
