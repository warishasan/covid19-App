import React,{useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import GlobalStateSelector from './GlobalStateSelector.js'
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';


import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    
  root: {
    backgroundColor: 'green',
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    textAlign:'left'
  }
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <div >
      <AppBar className={classes.root} position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Covid-19 Information Centre
          </Typography>
          <div className={classes.root}>
            
          <GlobalStateSelector></GlobalStateSelector>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}