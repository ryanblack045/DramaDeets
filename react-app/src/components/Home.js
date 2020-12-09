import React from 'react';
import { useSelector } from "react-redux";
import ListSideBar from './ListSideBar'
import BusinessDetail from './BusinessDetails'
import Grid from '@material-ui/core/Grid';



export default function Home() {


  return (
    <>
       <Grid container  spacing={0}>
        <Grid item xs={3}>
          <ListSideBar />
        </Grid>
        <Grid item  xs={9}>
          <BusinessDetail />
        </Grid>
      </Grid>
    </>
  )
}
