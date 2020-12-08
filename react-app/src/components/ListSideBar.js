
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '1px',
    width: '100%',
    height: '100%',
    maxHeight: '100vh',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function ListSideBar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const businessTypes = useSelector((state) => (state.entities.businesses.byId))

  function typeFinder(id) {
     return Object.values(businessTypes).filter(data => {
      let typeArray = data.types.filter(eachType => {
        if (eachType.type_id == id) {
          // console.log(eachType, "herre")
          return eachType
        }
      })
       if (typeArray.length > 0) {
         console.log(data, "data")
         return data
        //  return data.sort(function (a, b) {
        //   return a.data.name.localeCompare(b.data.name);
        // })
      }
    })
      }

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

  console.log(onCameraClasses)

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Types of Businesses
        </ListSubheader>
      }
      className={classes.root}
    >
      <ListItem button onClick={handleClick2}>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="On Camera Classes" />
        {open2 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {onCameraClasses.map((onCameraClass) => {
            return(
            <>
              <ListItem button className={classes.nested}>
                <ListItemText primary={onCameraClass.name} secondary={onCameraClass.state} />
              </ListItem>
            </>
            )
          })}
        </List>
      </Collapse>
      <ListItem button onClick={handleClick3}>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Acting Schools" />
        {open3 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open3} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {actingSchools.map((actingSchool) => {
            return(
            <>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary={actingSchool.name} />
              </ListItem>
            </>
            )
          })}
        </List>
      </Collapse>
      <ListItem button onClick={handleClick4}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Scene Study" />
        {open4 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open4} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {sceneStudys.map((sceneStudy) => {
            return(
            <>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary={sceneStudy.name} />
              </ListItem>
            </>
            )
          })}
        </List>
      </Collapse>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Photographers" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {photographers.map((photographer) => {
            return(
            <>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary={photographer.name} />
              </ListItem>
            </>
            )
          })}
        </List>
      </Collapse>
    </List>
  );
}
