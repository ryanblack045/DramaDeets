import React from 'react';
import { useSelector } from "react-redux";
import ListSideBar from './ListSideBar'
import BusinessDetail from './BusinessDetails'
import Grid from '@material-ui/core/Grid';



export default function Home() {


  return (
    <>
       <Grid container  spacing={3}>
        <Grid item xs={3}>
          <ListSideBar />
        </Grid>
        <Grid item style={{marginLeft:"10em"}}  xs={6}>
          <BusinessDetail />
        </Grid>
      </Grid>
    </>
  )
}
