import React from 'react';
import {
  ListItemText,
  ListItemIcon,
  ListItem,
  Collapse,
  List,
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListSideBarStyles from '../styles/ListSideBarStyles'


export default function BusinessSideBar({type, sortedBusinessArray, Icon, businessClick}) {
  const useStyles = ListSideBarStyles()
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  // These handle opening and closing the side bar subcomoponents

  const handleClick = () => {
    setOpen(!open);
  };

      return (
        <>
          <ListItem key={type.id+type.title} button onClick={handleClick}>
            <ListItemIcon >
              < Icon className={classes.primeIcons}/>
            </ListItemIcon>
            <ListItemText primary={type.title} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {sortedBusinessArray.map((business) => {
                return(
                <>
                    <ListItem
                      key={business.id+business.name}
                      button
                      onClick={() => businessClick(business.id)}
                      className={classes.nested}>
                      <ListItemText
                        key={business.name}
                        primary={business.name}
                        secondary={<div>{business.city}, { business.state}</div> }/>
                  </ListItem>
                </>
                )
              })}
            </List>
          </Collapse>
        </>
      )
}
