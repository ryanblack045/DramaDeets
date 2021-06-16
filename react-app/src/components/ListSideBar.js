import React, {useEffect} from 'react';
import {
  ListItemText,
  ListItemIcon,
  ListItem,
  ListSubheader,
  Paper,
  Collapse,
  List,
} from '@material-ui/core';
import { PhotoCamera, Face, LocationCity, MovieFilter, Business, Group, PlayCircleFilled, Star } from '@material-ui/icons';
import { getBusiness } from "../services/businesses";
import { setCurrentBusiness } from '../store/actions/session'
import { setLandingPage } from '../store/actions/ui'
import { useSelector, useDispatch } from "react-redux";
import BusinessForm from './forms/BusinessForm'
import BusinessTypeForm from './forms/BusinessTypeForm'
import ListSideBarStyles from '../styles/ListSideBarStyles'
import { MyModal } from './Modal'
import BusinessSideBar from './BusinessSideBar'


export default function ListSideBar() {
  const useStyles = ListSideBarStyles()
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);
  const [open6, setOpen6] = React.useState(false);
  const dispatch = useDispatch();

  const businessById = useSelector((state) => (state.entities.businesses.byId));
  const currentUserId = useSelector((state) => (state.session.currentUser.id));

  const businessTypes = Object.values(useSelector((state) => (state.entities.businessTypes.byId)))


  //This will handle the click of a business and set it to
  //the current business so that it may be rendered in another component
  const businessClick = async (id) => {
    dispatch(setLandingPage(false));
    const business = await getBusiness(id);
    dispatch(setCurrentBusiness(business))
  }

  // These handle opening and closing the side bar subcomoponents

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClick2 = () => {
    setOpen2(!open2);
  };

  const handleClick3 = () => {
    setOpen3(!open3);
  };

  const handleClick4 = () => {
    setOpen4(!open4);
  };

  const handleClick5 = () => {
    setOpen5(!open5);
  };

  const handleClick6 = () => {
    setOpen6(!open6);
  };

  /*This function businessesSortedByType renders all of the business types and
  all of the businesses associated with those types in alphabetical order
  */
  function businessesSortedByType() {
    let iconArray = [MovieFilter, LocationCity, Face, PhotoCamera, PlayCircleFilled, Group, Star]

    return(
    businessTypes.map((type) => {
      const Icon = iconArray[type.id-1]
      let businessArray = []
      type.businesses?.forEach((business) => {
        businessArray.push(businessById[business.business_id])
      })

      let sortedBusinessArray = businessArray.sort((a, b) => a.name.localeCompare(b.name))
      return (
        <BusinessSideBar
          type={type}
          sortedBusinessArray={sortedBusinessArray}
          businessClick={businessClick}
          Icon={Icon}
        />
      )
    })
    )
  }

  return (
    <List
    component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
          className={classes.sidebarHeader}
        >
          Types of Businesses
        </ListSubheader>
      }
      className={classes.root}
    >
       {currentUserId === 1 ?
            <>
              <ListItem
                button onClick={handleClick5}
                className={classes.businessButton}>
                Add Business
              </ListItem>
              <MyModal
                open={open5}
                setOpen={setOpen5}
                onClose={handleClick}
                aria-labelledby="Create Business"
                aria-describedby="Create businesss form"
                Form={BusinessForm}

          />
              <ListItem
                button onClick={handleClick6}
                className={classes.businessButton}>
                Add Business Type
              </ListItem>
              <MyModal
                open={open6}
                setOpen={setOpen6}
                onClose={handleClick}
                aria-labelledby="Create Business Type"
                aria-describedby="Create businesss type form"
                Form={BusinessTypeForm}
              />
              </>
            :
             null
      }
      {businessesSortedByType()}
    </List>
  );
}
