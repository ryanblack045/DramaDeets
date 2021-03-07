  import { makeStyles } from '@material-ui/core/styles';

  export default function ReviewFormStyles(theme) {
    const useStyles = makeStyles((theme) => ({
        button: {
          background: "red",
          color: "white",
          marginTop: "1em",
          "&:hover": {
            backgroundColor: "#780202"
          },
        },
        input: {
          borderRadius: "1em",
          backgroundColor: "white",
          marginTop: ".5em",
          marginBottom: ".5em"
        },
        formControl: {
          margin: theme.spacing(1),
          minWidth: "15em",
        },
        reviewForm: {
          marginTop: "1.5em",
          marginBottom: "1em"
        },
        reviewSubheader: {
          fontSize: "1.3em"
        },
        reviewSubheaderBold: {
          fontSize: "1.3em",
          fontWeight: "bold",
          textDecoration: "underline"
        },
        reviewTitle: {
          fontSize: "3em",
          lineHeight: ".75em",
          fontFamily: "brandon-grotesque, sans-serif",
          marginBottom: ".5em",
        },

    }));
    return (
      useStyles
      )
}
