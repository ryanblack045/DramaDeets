import React, {useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Grid, Paper } from '@material-ui/core';
import { setCurrentBusiness } from '../store/actions/session'
import Map from './Map'
import BusinessStyles from '../styles/BusinessStyles'
import { EditBusinessForm } from './EditBusinessForm'
import Reviews from './Reviews'

export default function BusinessDetail({ currentReviews2 }) {
  const [edit, setEdit] = React.useState(false);
  const useStyles = BusinessStyles()
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
