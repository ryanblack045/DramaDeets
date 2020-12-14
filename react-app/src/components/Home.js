import React from 'react';
import ListSideBar from './ListSideBar'
import BusinessDetail from './BusinessDetails'
import Grid from '@material-ui/core/Grid';
import { useSelector } from "react-redux";
import LandingPage from './LandingPage';
import AOS from 'aos';



export default function Home() {
  const landingPage = useSelector((state) => (state.ui.landingPage));
  return (
    <>
       <Grid container  spacing={0}>
        <Grid item xs={3}>
          <ListSideBar />
        </Grid>
        <Grid item xs={9}>
          {!landingPage ?
            <BusinessDetail />
            : <LandingPage/>
          }
        </Grid>
      </Grid>
    </>
  )
}
