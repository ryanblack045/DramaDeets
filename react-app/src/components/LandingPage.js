import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AOS from 'aos';
import { useSelector} from "react-redux";
import 'aos/dist/aos.css';


const useStyles = makeStyles((theme) => ({
  img1: {
    backgroundImage: 'url("https://drama-deets.s3.amazonaws.com/landingPage1.png")',
    height: "100vh",
    marginLeft: "5%",
    width: "auto",
    backgroundRepeat: "no-repeat"
  },
  img2: {
    backgroundImage: 'url("https://drama-deets.s3.amazonaws.com/adminLanding.png")',
    height: "100vh",
    marginLeft: "5%",
    width: "auto",
    backgroundRepeat: "no-repeat"
}
}))



export default function LandingPage() {
  AOS.init()
  const classes = useStyles();
  const currentUserId = useSelector((state) => (state.session.currentUser.id))
  return (
    <>
      {currentUserId !== 1 ?
        <div
          data-aos="fade-up"
          data-aos-delay="50"
          data-aos-duration="1000"
          className={classes.img1}
        />
      : <div
          data-aos="fade-up"
          data-aos-delay="50"
          data-aos-duration="1000"
          className={classes.img2}
        />}
    </>
  )

}
