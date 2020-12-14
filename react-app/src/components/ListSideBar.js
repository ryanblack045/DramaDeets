
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import { PhotoCamera, Face, LocationCity, MovieFilter } from '@material-ui/icons';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { getBusiness } from "../services/businesses";
import { setCurrentBusiness } from '../store/actions/session'
import { setLandingPage } from '../store/actions/ui'
import { useSelector, useDispatch } from "react-redux";


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '.5px',
    width: '100%',
    height: '100%',
    maxHeight: '1000vh',
    minHeight: '100vh',
    maxWidth: 360,
    minWidth:260,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  primeIcons: {
    color: "blue"
  },
  sidebarHeader: {
    fontWeight: "bold",
    fontSize: "1.25em",
    textAlign: "center"
  }
}));

export default function ListSideBar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const dispatch = useDispatch();


  const businessTypes = useSelector((state) => (state.entities.businesses.byId))
// a function built to grab businesses out of redux by a certain type id, logic should be reused
  function typeFinder(id) {
     return Object.values(businessTypes).filter(data => {
      let typeArray = data.types.filter(eachType => {
        if (eachType.type_id === id) {
          return eachType
        }
        return null
      })
       if (typeArray.length > 0) {
         console.log(data, "data")
         return data
       }
       return null
     })
  }

  //This will handle the click of a business and set it to
  //the current business so that it may be rendered in another component
  const businessClick = async (id) => {
    dispatch(setLandingPage(false));
    const business = await getBusiness(id);
    dispatch(setCurrentBusiness(business))
  }

// These are grabbing all businesses by certain types out of the redux store
  const photographers = typeFinder(1).sort(function (a, b) {
    return a.name.localeCompare(b.name);
  })
  const onCameraClasses = typeFinder(2).sort(function (a, b) {
    return a.name.localeCompare(b.name);
  })
  const actingSchools = typeFinder(3).sort(function (a, b) {
    return a.name.localeCompare(b.name);
  })
  const sceneStudys = typeFinder(4).sort(function (a, b) {
    return a.name.localeCompare(b.name);
  })

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
      <ListItem button onClick={handleClick2}>
        <ListItemIcon>
          <MovieFilter className={classes.primeIcons}/>
        </ListItemIcon>
        <ListItemText primary="On Camera Classes" />
        {open2 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {onCameraClasses.map((onCameraClass) => {
            return(
            <>
                <ListItem
                  button
                  onClick={() => businessClick(onCameraClass.id)}
                  className={classes.nested}>
                  <ListItemText
                    primary={onCameraClass.name}
                    secondary={<div>{onCameraClass.city}, { onCameraClass.state}</div> }/>
              </ListItem>
            </>
            )
          })}
        </List>
      </Collapse>
      <ListItem button onClick={handleClick3}>
        <ListItemIcon>
          <LocationCity className={classes.primeIcons} />
        </ListItemIcon>
        <ListItemText primary="Acting Schools" />
        {open3 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open3} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {actingSchools.map((actingSchool) => {
            return(
            <>
                <ListItem
                  button
                  onClick={() => businessClick(actingSchool.id)}
                  className={classes.nested}>
                  <ListItemText
                    primary={actingSchool.name}
                    secondary={<div>{actingSchool.city}, { actingSchool.state}</div> }/>
              </ListItem>
            </>
            )
          })}
        </List>
      </Collapse>
      <ListItem button onClick={handleClick4}>
        <ListItemIcon>
          <Face className={classes.primeIcons} />
        </ListItemIcon>
        <ListItemText primary="Scene Study" />
        {open4 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open4} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {sceneStudys.map((sceneStudy) => {
            return(
            <>
                <ListItem
                  button
                  onClick={() => businessClick(sceneStudy.id)}
                  className={classes.nested}>
                  <ListItemText
                    primary={sceneStudy.name}
                    secondary={<div>{sceneStudy.city}, { sceneStudy.state}</div> }/>
              </ListItem>
            </>
            )
          })}
        </List>
      </Collapse>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <PhotoCamera className={classes.primeIcons} />
        </ListItemIcon>
        <ListItemText primary="Photographers" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {photographers.map((photographer) => {
            return(
            <>
                <ListItem button
                  onClick={() => businessClick(photographer.id)}
                  className={classes.nested}>
                  <ListItemText
                    primary={photographer.name}
                    secondary={<div>{photographer.city}, { photographer.state}</div> }/>
              </ListItem>
            </>
            )
          })}
        </List>
      </Collapse>
    </List>
  );
}
