import React from 'react';
import ListSideBar from './ListSideBar'
import BusinessDetail from './BusinessDetails'
import Grid from '@material-ui/core/Grid';
import { useSelector } from "react-redux";



export default function Home() {
  const landingPage = useSelector((state) => (state.ui.landingPage));
  console.log(landingPage)
  return (
    <>
       <Grid container  spacing={0}>
        <Grid item xs={3}>
          <ListSideBar />
        </Grid>
        <Grid item xs={9}>
          {!landingPage ?
            <BusinessDetail />
            : <h1>Testing</h1>
          }
        </Grid>
      </Grid>
    </>
  )
}
