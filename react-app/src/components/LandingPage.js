import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AOS from 'aos';
import 'aos/dist/aos.css';
const background = "/landingPage1.png"


const useStyles = makeStyles((theme) => ({
  img1: {
    backgroundImage: 'url("https://drama-deets.s3.amazonaws.com/landingPage1.png")',
    height: "100vh",
    marginLeft: "5%",
    // marginRight: "5%",
    width: "auto",
    backgroundRepeat: "no-repeat"
}
}))



export default function LandingPage() {
  AOS.init()
  const classes = useStyles();

  return (
    <>
      <div
        // data-aos="fade-up"
        // data-aos-delay="50"
        // data-aos-duration="1000"
        className={classes.img1}
      />
    {/* <img
      src="/landingPage1.png"
      className={classes.img1}
      /> */}
    </>
  )

}
