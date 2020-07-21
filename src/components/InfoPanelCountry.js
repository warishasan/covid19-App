import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    marginTop: 80
  },
});

export default function InfoPanelCountry() {
  const classes = useStyles();

  const [countryState,changeState] = React.useState([{}]);

  
  React.useEffect(() =>{

    async function getData(){
        const response = await fetch("https://api.thevirustracker.com/free-api?countryTotals=ALL");
        let data = await response.json();

        //data = data.countryitems[0]
       // let totalCountries =Object.keys(data).length;
       //changeState(data);
       //console.log(data);
        //console.log(Object.values(Object.values(data.countryitems)[0]));
        changeState(Object.values(Object.values(data.countryitems)[0]));
        console.log(Object.values(Object.values(data.countryitems)[0]));
    }
   
    getData();

},[])


    
    return (
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell >Country</TableCell>
                <TableCell >Total Cases</TableCell>
                <TableCell >Total Recovered</TableCell>
                <TableCell >Total Unresolved</TableCell>
                <TableCell >Total Deaths</TableCell>
                <TableCell >Total Active Cases</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
            {countryState.map((key, ind) => {
                 return (
            <TableRow key={ind}>
                <TableCell >
                    {countryState[ind].title}
                </TableCell>
                <TableCell>
                    {countryState[ind].total_cases}
                </TableCell>
                <TableCell>
                    {countryState[ind].total_recovered}
                </TableCell>
                <TableCell>
                    {countryState[ind].total_unresolved}
                </TableCell>
                <TableCell>
                    {countryState[ind].total_deaths}
                </TableCell>
                <TableCell>
                    {countryState[ind].total_active_cases}
                </TableCell>
            </TableRow>
        )
    })}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }

 