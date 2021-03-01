import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from "react-redux";
import { Grid, Paper } from '@material-ui/core';
import { setCurrentBusiness } from '../store/actions/session'
import Map from './Map'
import { EditBusinessForm } from './EditBusinessForm'
import Reviews from './Reviews'

const useStyles = makeStyles((theme) => ({
  actionFooter: {
      justifyContent:"center"
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
  card: {
    textAlign:"center"
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
    wordWrap:"break-word"
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


export default function BusinessDetail({ currentReviews2 }) {
  const [edit, setEdit] = React.useState(false);
  const classes = useStyles();
  const businesses = useSelector((state)=>(state.entities.businesses))
  const currentBusiness = useSelector((state) => (state.session.currentBusiness));
  const currentBusinessId = useSelector((state) => (state.session.currentBusiness.id));
  const currentUserId = useSelector((state) => (state.session.currentUser.id));

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCurrentBusiness(currentBusiness))
  }, [businesses])
//https://github.com/facebook/react/issues/14476#issuecomment-471199055 take a look into this





  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item className={classes.buinessContainer} spacing={0} xs={12}>
          <Paper className={classes.paper}>
            <EditBusinessForm
              edit={edit}
              setEdit={setEdit}
              currentUserId={currentUserId}
              currentBusiness={currentBusiness}
            />
            <Map className={classes.map} />
            <div className={classes.pageBreak} />
            <Reviews
              currentBusiness={currentBusiness}
              currentUserId={currentUserId}
              edit={edit}
              setEdit={setEdit}
              currentBusinessId={currentBusinessId}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
