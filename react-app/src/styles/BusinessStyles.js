import { makeStyles } from '@material-ui/core/styles';

export default function BusinessStyles(theme) {
  const useStyles = makeStyles((theme) => ({
    actionFooter: {
      justifyContent: "center"
    },
    bigSaveButton: {
      display: "block",
      width: "50%",
      marginLeft: "auto",
      marginRight: "auto",
      color: "white",
      background: "black",
      "&:hover": {
        backgroundColor: "#890909"
      },
    },
    body: {
      color: "black",
      marginTop: "1em",
      marginBottom: "1em"

    },
    businessContainer: {
      width: "90"
    },
    businessCSZ: {
      textAlign: "center",
      fontSize: "1.25em"
      // display: "inline",
      // float: "right"
    },
    businessFormHolder: {
      overflow: "scroll",
      height: "36.5em"
    },
    businessImg: {
      display: "inline-block",
      height: "20%",
      width: "20%",
      float: "middle",
      marginRight: "2em"
    },
    businessInfo: {
      width: "30em",
      margin: ".5em"
    },
    businessInfoContainer: {
      display: "inline-block",
      float: "middle",
    },
    businessInfoHolder: {
      flexDirection: "column",
      display: "flex",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center"
    },
    businessParentContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    businessRating: {
      textAlign: "center",
      fontWeight: "bold",
      fontSize: "1.25em"
    },
    businessTitle: {
      fontSize: "3em",
      textAlign: "center"
    },
    button: {
      background: "black",
      color: "white",
      marginTop: ".5em",
      marginBottom: ".5em",
      "&:hover": {
        backgroundColor: "#1b4332"
      },
    },
    card: {
      textAlign: "center"
    },
    cardContainer: {
      boxShadow: " 5px 10px 8px #888888",
    },
    deleteReview: {
      cursor: "pointer",
      marginLeft: "90%",
      marginTop: "-1em",
      marginBottom: "-1em",
      fontWeight: "bold",
    },
    deleteReviewButton: {
      color: "white",
      backgroundColor: "red",
      "&:hover": {
        backgroundColor: "#780202"
      },
    },
    dislikeButton: {
      color: "black",
      cursor: "pointer",
      // marginLeft: "2em",
    },
    dislikeButtonDisabled: {
      // marginLeft: "1em",
      color: "red",
      cursor: "pointer",
    },
    edit: {
      background: "black",
      height: "1.5em",
      color: "white",
      "&:hover": {
        //you want this to be the same as the backgroundColor above
        backgroundColor: "#2d6a4f"
      },
    },
    editContainer: {
      display: "flex",
      flexDirection: "column"
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
    likeButton: {
      color: "black",
      cursor: "pointer"
    },
    likeButtonDisabled: {
      color: "#74c69d",
      cursor: "pointer"
    },
    pageBreak: {
      width: "100%",
      borderBottom: "2px solid black",
    },
    paper: {
      padding: theme.spacing(2),
      marginTop: "1px",
      boxShadow: "none",
      borderRadius: "0",
      color: theme.palette.text.secondary,
    },
    ratingLabel: {
      fontWeight: "bold"
    },
    reviewButton: {
      display: "block",
      width: "50%",
      marginTop: ".5em",
      marginBottom: ".5em",
      marginLeft: "auto",
      marginRight: "auto",
      color: "white",
      background: "#74c69d",
      "&:hover": {
        //you want this to be the same as the backgroundColor above
        backgroundColor: "#2d6a4f"
      },
    },
    reviewsHeader: {
      fontSize: "2em",
      textAlign: "center"
    },
    root: {
      flexGrow: 1,
    },
    reviewBody: {
      wordWrap: "break-word"
    },
    saveButton: {
      background: "red",
      height: "1.5em",
      color: "white",
      "&:hover": {
        backgroundColor: "#890909"
      },
    }
  }));
  return (
    useStyles
  )
}
