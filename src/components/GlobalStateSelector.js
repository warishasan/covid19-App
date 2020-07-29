import React,{useContext} from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import {GlobalContext} from '../GlobalState.js';


const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 50,
    alignItems: 'center',
    backgroundColor: 'white',
    width: 180,
    color:"black", 
    border: '2px solid #4CAF50',
    '&:hover': {
        backgroundColor: 'green', 
        color: 'white',
        border: '2px solid #4CAF50',
    },
     
  },
  
 
}));

export default function GlobalStateSelector() {
  const classes = useStyles();

  const {changeToGlobal,changeToCountry} = useContext(GlobalContext);
  
  console.log(global);
    const clickGlobal = () => {

        changeToGlobal();
    }

    const clickCountry = () => {

        changeToCountry();
    }


  return (
    <div >
      
      <ButtonGroup color="secondary" aria-label="outlined secondary button group">
        <Button onClick = {clickGlobal} className={classes.root}>Global Stats</Button>
        <Button onClick = {clickCountry} className={classes.root}>Country Stats</Button>
      </ButtonGroup>
     
    </div>
  );
}