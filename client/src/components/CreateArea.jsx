import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {useLocation} from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 224
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}));

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
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


export default function Customer(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handlerChange = (event, newValue) => {
    setValue(newValue);
  };
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const email_id = params.get("email");
  const username = params.get("username");
  const [temp, setTemp] = useState("");
  const [book,setBook] = useState([]);
  useEffect(() => {
    if (!temp) {
      axios
        .get("/" + props.cat + "/display", {
          params: { email: email_id, name: username }
        })
        .then((res) => {
          console.log("Inside axios",res.data[1]);
          setTemp(res.data[0]);
          setBook(res.data[1].bookings);
        })
        .catch((error) => console.log(error));
    }
  });
  console.log("imma heere", temp);
  console.log("Bookings",book);
  const [note, setNote] = useState({
    email: email_id,
    name: username,
    title: temp.title,
    tel: temp.tel,
    type: temp.type,
    cost: temp.cost,
    content: temp.content
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }
  function submitNote(event) {
    props.onAdd(note);
    event.preventDefault();
  }

  function expand() {
    setExpanded((prevState) => {
      return !prevState;
    });
  }

  function handleClick() {
    props.onDelete(props.id, email_id, username);
    setNote({
      title: "",
      tel: "",
      type: "",
      cost: "",
      content: ""
    });
  }
  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handlerChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="ORDERS" {...a11yProps(0)} />
        <Tab label="DETAILS" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
      <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Customer Name</StyledTableCell>
                <StyledTableCell align="right">Email</StyledTableCell>
                <StyledTableCell align="right">Date</StyledTableCell>
                <StyledTableCell align="right">Amount Recieved</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {book.map((row) => (
                <StyledTableRow key={row.username}>
                  <StyledTableCell component="th" scope="row">
                    {row.cust_name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.cust_email}</StyledTableCell>
                  <StyledTableCell align="right">{row.date}</StyledTableCell>
                  <StyledTableCell align="right">{row.cost}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div>
          <form className="create-note">
            <div styles={{ fontFamily: "Montserrat" }}>
              <h1
                onClick={expand}
                style={{
                  textAlign: "center",
                  fontFamily: "Montserrat,sans serif"
                }}
              >
                {" "}
                Welcome!!{" "}
              </h1>
            </div>
              <h5
                style={{
                  textAlign: "center",
                  fontFamily: "Montserrat,sans serif"
                }}
              >
                Edit your details below.
              </h5>
            
        
              <h5
                style={{
                  textAlign: "center",
                  color: "white",
                  fontFamily: "Montserrat,sans serif"
                }}
              >
                Edit your details below.
              </h5>

              <input
                autoComplete="off"
                name="title"
                onChange={handleChange}
                value={note.title}
                placeholder="Your company name"
                defaultValue={temp.title || ""}
              />

              <input
                autoComplete="off"
                name="tel"
                onChange={handleChange}
                value={note.tel}
                placeholder="Enter your contact..."
                defaultValue={temp.tel || ""}
              />

              {props.id!=3 && 
                <input
                autoComplete="off"
                name="type"
                onChange={handleChange}
                value={note.type}
                placeholder={
                  props.id == 1
                    ? "Cuisines specialised in..."
                    : props.id == 2
                    ? "Seating capacity..."
                    : ""
                }
                defaultValue={temp.type || ""}
              />}

              <input
                autoComplete="off"
                name="cost"
                onChange={handleChange}
                value={note.cost}
                placeholder={
                  props.id == 1
                    ? "Cost per plate"
                    : props.id == 2
                    ? "Cost per day"
                    : "Per hour charge..."
                }
                defaultValue={temp.cost || ""}
              />
 
              <textarea
                name="content"
                autoComplete="off"
                onChange={handleChange}
                value={note.content}
                placeholder={
                  props.id == "2"
                    ? "Mention your location and about your service..."
                    : "About your service..."
                }
                rows={props.id == "2" ? 2 : 1}
                defaultValue={temp.content || ""}
              />

            <Zoom in="true">
              <Fab onClick={handleClick}>
                <DeleteIcon />
              </Fab>
            </Zoom>

            <Zoom in="true">
              <Fab onClick={submitNote}>
                <AddIcon/>
              </Fab>
            </Zoom>
          </form>
        </div>
      </TabPanel>
      
    </div>
  );
}
