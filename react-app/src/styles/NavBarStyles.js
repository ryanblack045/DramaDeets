import { makeStyles } from '@material-ui/core/styles';
import Background from '../assets/DramaDeetsLogo.png'
export default function NavBarStyles(theme) {
  const useStyles = makeStyles((theme) => ({
    businessFormHolder: {
      maxHeight: "5em",
      overflow: "scroll"
    },
    button: {
      background: "black",
      color: "white",
      marginTop: "1em",
      "&:hover": {
        backgroundColor: "#1b4332"
      },
    },
    demoButton: {
      background: "#52b788",
      color: "white",
      marginTop: "1em",
      "&:hover": {
        backgroundColor: "#1b4332"
      },
    },
    headerBody: {
      marginTop: "2em",
    },
    input: {
      borderRadius: "1em",
      backgroundColor: "white",
      marginTop: ".5em",
      marginBottom: ".5em"
    },
    login: {
      background: "white",
      color: "blue",
      marginRight: "2em",
      "&:hover": {
        backgroundColor: "black",
        color: "white"
      },
    },
    loginForm: {
      marginTop: "2.5em",
      marginBottom: "1em"
    },
    logo: {
      textAlign:"center",
      cursor: "pointer",
      marginTop: "-3.1em",
      marginBottom: "-3.5em",
      marginLeft:"2.71em"
    },
    loginTitle: {
      fontSize: "3em",
      lineHeight: "1.25em",
      fontFamily: "brandon-grotesque, sans-serif",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    navbar: {
      background: "transparent"
    },
    newLogo: {
      background:"blue",
      backgroundImage: `url(${Background})`,
      height: "10em",
      width: "10em",
      cursor:"pointer"
    },
    paper: {
      position: 'absolute',
      width: 400,
      height: 600,
      backgroundColor: "#1b4332",
      outline: "none",
      borderRadius: 16,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      textAlign: "center"
    },
    root: {
      flexGrow: 1,
    },
    signup: {
      background: "white",
      marginRight: "2em",
      color: "blue",
      "&:hover": {
        backgroundColor: "black",
        color: "white"
      },
    },
    signupHeader: {
      backgroundColor: theme.palette.background.paper,
      height: "100%",
    },
    signupSubheader: {
      fontSize: "1.1em"
    },
    signupSubheaderBold: {
      fontSize: "1.1em",
      fontWeight: "bold",
      textDecoration: "underline"
    },
    signupTitle: {
      fontSize: "3em",
      lineHeight: ".75em",
      fontFamily: "brandon-grotesque, sans-serif",
      marginBottom: ".25em",
    },
    textButton: {
      textDecoration: "underline",
      fontWeight: "bold",
      cursor:"pointer",
    },
    title: {
      flexGrow: 1,
    },
    toolbar: {
      height: "3em"
    }
  }));
  return (
    useStyles
  )
}
