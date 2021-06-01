import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from '@material-ui/core/Grid';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const App = () => {
  const classes = useStyles();
  const [product, setProduct] = useState([]);
  
  const getProductData = async () => {
    try {
      const data = await axios.get(
        "https://60b5cd41fe923b0017c84a63.mockapi.io/orders"
      );
      console.log(data.data);
      setProduct(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <div className="App">
     <Grid container>
   
      <Grid item >   
      <h3>Work Order Details</h3>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="right">WorkOrder</StyledTableCell>
              <StyledTableCell align="right">Date Submitted</StyledTableCell>
              <StyledTableCell align="right">Successful</StyledTableCell>
              <StyledTableCell align="right">Errors</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {product      
              .map((item) => {
                return (
                  <StyledTableRow key={item.id}>
                    <StyledTableCell component="th" scope="row">
                      {item.id}
                    </StyledTableCell>
                    <StyledTableCell align="right"> {item.workorder} </StyledTableCell>
                    <StyledTableCell align="right"> {item.dateSubmitted} </StyledTableCell>
                    <StyledTableCell align="right"> {item.Successful} </StyledTableCell>
                    <StyledTableCell align="right"> {item.Errors} </StyledTableCell>
                 
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      </Grid>
      </Grid>
    </div>
  );
};

export default App;
