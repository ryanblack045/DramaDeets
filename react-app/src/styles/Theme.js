import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  gradientBackground: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  fontFamily: "Helvetica",

    palette: {
      primary: {
        main: '#311b92',
      },
      secondary: {
        main: '#5e35b1',
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
