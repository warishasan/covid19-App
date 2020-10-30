import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Pie } from "react-chartjs-2";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    marginTop: 30,
  },

  loading: {
    padding: "20px",
    marginRight: "500px",
    marginLeft: "500px",
    textAlign: "center",
  },
  tableHeader: {
    fontSize: "30px",
    color: "darkGreen",
    paddingBottom: "20px",
    textAlign: "center",
  },
  tableData: {
    textAlign: "center",
    fontSize: "15px",
  },
  graphContainer: {
    textAlign: "center",
  },
  graphTitle: {
    fontSize: "50px",
    textShadow: "0px 10px 6px grey",
  },
  gobackButton: {
    width: "200px",
    height: "40px",
    fontSize: "25px",
    marginTop: "10px",
  },
  pieChart: {
    marginBottom: "20px",
  },

  infoText: {
    textAlign: "center",
    fontSize: "20px",
  },

  error: {
    margin: "0 auto",
    fontSize: "2rem",
    textAlign: "center",
  },

  tableRow: {
    "&:hover": {
      backgroundColor: "grey",
      border: "2px solid #FFFFF",
    },
  },
});

export default function InfoPanelCountry() {
  const classes = useStyles();

  const [countryState, changeState] = React.useState([{}]);
  const [dataReceived, setDataReceived] = React.useState(false);
  const [viewGraph, setViewGraph] = React.useState(false);
  const [graphData, setgraphData] = React.useState({});
  const [pieChart, setPieChart] = React.useState({});
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(
          "https://api.thevirustracker.com/free-api?countryTotals=ALL"
        );
        let data = await response.json();

        changeState(Object.values(Object.values(data.countryitems)[0]));
        console.log(Object.values(Object.values(data.countryitems)[0]));
        setDataReceived(true);
      } catch (e) {
        setError(true);
      }
    }

    getData();

    const pieData = {
      labels: [
        "Total Recovered",
        "Total Unresolved",
        "Total Deaths",
        "Total Active Cases",
      ],
      datasets: [
        {
          data: [
            graphData.total_recovered,
            graphData.total_unresolved,
            graphData.total_deaths,
            graphData.total_active_cases,
          ],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#00FF00"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#00FF00"],
        },
      ],
    };

    setPieChart(pieData);
  }, [viewGraph, dataReceived, graphData]);

  console.log(error);

  function viewGraphs(countryData) {
    setViewGraph(true);
    setgraphData(countryData);

    console.log(graphData);
  }

  if (error) {
    return (
      <div className={classes.error}>
        Could not fetch data at this moment. Please try again later
      </div>
    );
  }

  if (viewGraph === true) {
    return (
      <div className={classes.graphContainer}>
        <button
          className={classes.gobackButton}
          onClick={() => setViewGraph(false)}
        >
          Go back to table
        </button>
        <h1 className={classes.graphTitle}>{graphData.title}</h1>
        <h1> Total Cases: {graphData.total_cases}</h1>

        <Pie className="pieChart" data={pieChart} />
      </div>
    );
  } else {
    if (dataReceived === false) {
      return <h1 className={classes.loading}> Loading </h1>;
    }

    if (dataReceived === true) {
      return (
        <div className={classes.infoText}>
          Click on the country to view Graphical representation
          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeader}>Country</TableCell>
                  <TableCell className={classes.tableHeader}>
                    Total Cases
                  </TableCell>
                  <TableCell className={classes.tableHeader}>
                    Total Recovered
                  </TableCell>
                  <TableCell className={classes.tableHeader}>
                    Total Unresolved
                  </TableCell>
                  <TableCell className={classes.tableHeader}>
                    Total Deaths
                  </TableCell>
                  <TableCell className={classes.tableHeader}>
                    Total Active Cases
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {countryState.map((key, ind) => {
                  return (
                    <TableRow
                      className={classes.tableRow}
                      onClick={() => {
                        viewGraphs(countryState[ind]);
                      }}
                      key={ind}
                    >
                      <TableCell className={classes.tableData}>
                        {countryState[ind].title}
                      </TableCell>
                      <TableCell className={classes.tableData}>
                        {countryState[ind].total_cases}
                      </TableCell>
                      <TableCell className={classes.tableData}>
                        {countryState[ind].total_recovered}
                      </TableCell>
                      <TableCell className={classes.tableData}>
                        {countryState[ind].total_unresolved}
                      </TableCell>
                      <TableCell className={classes.tableData}>
                        {countryState[ind].total_deaths}
                      </TableCell>
                      <TableCell className={classes.tableData}>
                        {countryState[ind].total_active_cases}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      );
    }
  }
}
