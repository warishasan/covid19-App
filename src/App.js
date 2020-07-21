import React from 'react';
import Navbar from './components/Navbar.js'
import {GlobalProvider} from './GlobalState.js'
import PageSelector from './components/pageSelector.js'
import './App.css';
import { fade, makeStyles } from '@material-ui/core/styles';


function App() {

  const useStyles = makeStyles((theme) => ({
    
    root: {
      backgroundColor: 'lightgreen'
    }
    
  }));

  const classes = useStyles();


  return (

   
    <GlobalProvider  >
      
    <div className = {classes.root}>
     <Navbar />
     <PageSelector></PageSelector>
    </div>
    
    </GlobalProvider>

  );
}

export default App;
