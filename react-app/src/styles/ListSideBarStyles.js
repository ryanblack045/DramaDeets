import { makeStyles } from '@material-ui/core/styles';

export default function ListSideBarStyles(theme) {
  const useStyles = makeStyles((theme) => ({
    businessButton: {
      backgroundColor: "#52b788",
      color: "white",
      justifyContent: "center",
      fontWeight: "bold",
      "&:hover": {
        backgroundColor: "#2d6a4f",
        color: "white"
      },
    },
    nested: {
      paddingLeft: theme.spacing(4),
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
    primeIcons: {
      color: "blue",
      marginLeft: "1em"
    },
    root: {
      marginTop: '.5px',
      width: '100%',
      height: '100%',
      maxHeight: '1000vh',
      minHeight: '100vh',
      maxWidth: 360,
      minWidth:260,
      backgroundColor: theme.palette.background.paper,
    },
    sidebarHeader: {
      fontWeight: "bold",
      fontSize: "1.25em",
      textAlign: "center"
    },
    signupHeader: {
      backgroundColor: theme.palette.background.paper,
      height: "100%",
    },
  }));
  return (
    useStyles
  )
}
