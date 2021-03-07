import React from 'react';
import ListSideBar from '../components/ListSideBar'
import BusinessDetail from '../components/BusinessDetails'
import Grid from '@material-ui/core/Grid';
import { useSelector } from "react-redux";
import LandingPage from '../components/LandingPage';
import Footer from '../components/Footer';

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
      <Footer />
    </>
  )
}
