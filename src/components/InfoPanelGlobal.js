import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Pie } from "react-chartjs-2";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1000,
    margin: "0 auto",
    marginTop: 50,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  pie: {
    marginTop: 50,
    textAlign: "center",
  },
  loading: {
    padding: "20px",
    marginRight: "500px",
    marginLeft: "500px",
    textAlign: "center",
  },

  error: {
    margin: "0 auto",
    fontSize: "2rem",
    textAlign: "center",
  },
  title: {
    color: "#3f51b5",
    textTransform: "uppercase",
  },
}));

export default function InfoPanelGlobal() {
  const classes = useStyles();

  const [globalState, changeState] = React.useState({});
  const [pieChart, changeData] = React.useState({});
  const [dataReceived, setDataReceived] = React.useState(false);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(
          "https://api.thevirustracker.com/free-api?global=stats"
        );
        let data = await response.json();

        delete data.results[0].source;
        console.log(data["results"]);
        changeState(data.results[0]);
        console.log(data.results[0]);

        const data1 = {
          labels: [
            "Total Recovered",
            "Total Unresolved",
            "Total Deaths",
            "Total Active Cases",
          ],
          datasets: [
            {
              data: [
                data.results[0].total_recovered,
                data.results[0].total_unresolved,
                data.results[0].total_deaths,
                data.results[0].total_active_cases,
              ],
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#00FF00"],
              hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#00FF00",
              ],
            },
          ],
        };

        changeData(data1);
        setDataReceived(true);
      } catch (e) {
        setError(true);
      }
    }

    getData();
  }, []);

  if (error) {
    return (
      <div className={classes.error}>
        Could not fetch data at this moment. Please try again later
      </div>
    );
  }

  if (dataReceived === false) {
    return <h1 className={classes.loading}>Loading</h1>;
  } else {
    return (
      <div className={classes.root}>
        <h1 className={classes.pie}>Global Stats</h1>
        <Grid container spacing={3}>
          {Object.keys(globalState).map((key, ind) => {
            return (
              <Grid item xs={12} sm={4} key={ind}>
                <Paper className={classes.paper} elevation={3}>
                  <h3 className={classes.title}>{key.replace(/_/g, " ")}</h3>
                  <h3>{globalState[key]}</h3>
                </Paper>
              </Grid>
            );
          })}
        </Grid>

        <div className={classes.pie}>
          <h2>Covid19 Worldwide Graphical Data</h2>
          <Pie data={pieChart} />
        </div>
      </div>
    );
  }
}
