import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from "react-redux";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Map from './Map'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: "1.5px",
    color: theme.palette.text.secondary,
  },
  businessTitle: {
    fontSize: "3em",
    textAlign: "center"
  },
  pageBreak: {
    width: "100%",
    borderBottom: "2px solid black",
  },
  reviewsHeader: {
    fontSize: "2em",
    textAlign: "center"
  },
  businessContainer: {
    width: "90"
  },
  businessCSZ: {
    textAlign: "center"
  },
  businessImg: {
    display: "block",
    textAlign: "center",
    height: "50%",
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto"
  }

}));

export default function BusinessDetail() {
  const classes = useStyles();
  const currentBusiness = useSelector((state) => (state.session.currentBusiness))
  const currentReviews = currentBusiness.reviews

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item className={classes.buinessContainer} spacing={0} xs={12}>
          <Paper className={classes.paper}>
            <img className={classes.businessImg} src={currentBusiness.imgURL} />
            <div className={classes.businessTitle}>{currentBusiness.name}</div>
            <div className={classes.businessCSZ}>{currentBusiness.address}</div>
            <div className={classes.businessCSZ}>
              {currentBusiness.city}, {currentBusiness.state} {currentBusiness.zipcode}
            </div>
            <Map className={classes.map} />
            <div className={classes.pageBreak} />
            <div className={classes.reviewsHeader}>Reviews</div>
            <Grid container spacing={3}>
              {currentReviews.map((currentReview) => {
                return (
                  <Grid item xs={6}>
                     <Card className={classes.card}>
                      <CardActionArea>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            "{currentReview.title}""
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                           {currentReview.body}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button size="small" color="primary">
                          Share
                        </Button>
                        <Button size="small" color="primary">
                          Learn More
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                )
              })
            }
            </Grid>
          </Paper>
        </Grid>
        {/* <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid> */}
      </Grid>
    </div>
  );
}
