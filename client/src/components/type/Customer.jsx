import React,{ useState,useEffect } from 'react';
import {useLocation, Link} from 'react-router-dom';
import axios from "axios";
import PropTypes from 'prop-types';
import {withStyles, makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from "./Cards";
import TextField from '@material-ui/core/TextField';
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Cart from './Cart';
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
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  root: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
    // display: 'flex',
    height: 224,
    margin: "100px auto"
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
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


function Customer() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const email_id = params.get('email');
  const username = params.get('username');
  

  const [temp1,setTemp1]=useState([])
  const [temp2,setTemp2]=useState([])
  const [temp3,setTemp3]=useState([])
  const [cart,setCart]=useState([])
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [isExpanded, setExpanded] = useState(false);
  const [date, setdate] = useState(new Date());
  const [order_his,setOrder] = useState([]);
  const [summary,setSummary] = useState([]);
  
  // useEffect(() => {
  //   console.log("In usestate",date);
  //   if (temp1) {
  //     axios.get('/'+'customer'+'/dis_ban',{params: {date:date}})
  //       .then(res=>{setTemp1(res.data)})
  //       .catch(error=>console.log(error))
  //   }
  //   if (temp2) {
  //     axios.get('/'+'customer'+'/dis_cater',{params: {date:date}})
  //      .then(res=>{setTemp2(res.data)})
  //      .catch(error=>console.log(error))
  //  }
   
  //  if (temp3) {
  //     axios.get('/'+'customer'+'/dis_photo',{params: {date:date}})
  //       .then(res=>{setTemp3(res.data)})
  //       .catch(error=>console.log(error))
  //  }
  // },[]);

  useEffect(() => {
   if (cart) {
      axios.get('/'+'customer'+'/cart_items',{params: {cust_email: email_id, cust_name:username}})
        .then(res=>{setCart(res.data)})
        .catch(error=>console.log(error))
    }
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function handleSearchClick(){
    
    console.log("In usestate",date);
    if (temp1) {
      axios.get('/'+'customer'+'/dis_ban',{params: {date:date}})
        .then(res=>{setTemp1(res.data)})
        .catch(error=>console.log(error))
    }
    if (temp2) {
      axios.get('/'+'customer'+'/dis_cater',{params: {date:date}})
       .then(res=>{setTemp2(res.data)})
       .catch(error=>console.log(error))
   }
   
   if (temp3) {
      axios.get('/'+'customer'+'/dis_photo',{params: {date:date}})
        .then(res=>{setTemp3(res.data)})
        .catch(error=>console.log(error))
   }
   if(order_his) {
    axios.get('/customer/display/order',{params: {cust_email: email_id, cust_name:username}})
      .then(res=>{console.log("inside axios",res.data);setOrder(res.data)})
      .catch(error=>console.log(error))
  }
   setExpanded(true);
  }
  function ord_sum(){
    var summ=[];
    for(var i=0;i<order_his.length;i++){
      for(var j=0;j<order_his[i].length;j++){
        summ.push(order_his[i][j]);
      }
    }
    setSummary(summ);
  }

  return (
    <div className={classes.root}>
      {!isExpanded && <div >
          <Row>
            <Col style={{margin:"auto 0px 40px 285px"}}>
              <h4>Pick the date for which you want to book for:</h4>
            </Col>
          </Row>
          <Row>
          <Col></Col>
          <Col>
          <form className={classes.container} noValidate>
                <TextField
                        id="date"
                        
                        label="Pick Date:"
                        container="inline"
                        inputStyle={{ textAlign: 'center' }}
                        type="date"
                        onChange={(s)=>{
                          setdate(s.target.value);
                          console.log(s.target.value);
                        }                
                        }
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      </form>
          </Col>
          <Col></Col>
                        
          </Row>    
                
      <Row>
          <Button
            style={{margin:"20px auto"}} 
            variant="outline-dark"
            onClick={handleSearchClick}
            >
          Search
        </Button>
      </Row>       
      
      </div>}
      {isExpanded && <Row>
      <Col>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab label="Banquet Hall"  {...a11yProps(0)} />
          <Tab label="Caterer"  {...a11yProps(1)} />
          <Tab label="Photographer"  {...a11yProps(2)} />
          <Tab label="Cart" {...a11yProps(3)} />
          <Tab onClick={ord_sum} label="Orders" {...a11yProps(4)} />
        </Tabs>
      </Col>
      <Col>
      <TabPanel value={value} index={0}>
        
      {temp1.map((noteItem, index) => {
        return (

            <Card
              key={index}
              id={index}
              sid="1"
              cust_email={email_id}
              cust_name={username}
              email={noteItem.email}
              name={noteItem.name}
              company={noteItem.company}
              contact={noteItem.tel}
              cost={noteItem.cost}
              capacity={noteItem.capacity}
              content={noteItem.about}
              date={date}
            />
        );
      })}
      </TabPanel>
      <TabPanel value={value} index={1}>
      {temp2.map((noteItem, index) => {
        return (
            <Card
              key={index}
              id={index}
              sid="2"
              cust_email={email_id}
              cust_name={username}
              email={noteItem.email}
              name={noteItem.name}
              company={noteItem.company}
              contact={noteItem.tel}
              cuisine={noteItem.cuisines}
              cost={noteItem.cost}
              content={noteItem.about}
              date={date}
            />
        );
      })}
      </TabPanel>
      <TabPanel value={value} index={2}>
      {temp3.map((noteItem, index) => {
        return (
            <Card
              key={index}
              id={index}
              sid="3"
              cust_email={email_id}
              cust_name={username}
              email={noteItem.email}
              name={noteItem.name}
              company={noteItem.company}
              contact={noteItem.contact}
              cost={noteItem.cost}
              content={noteItem.about}
              date={date}
            />
        );
      })}
      </TabPanel>
      <TabPanel value={value} index={3}>
      {cart.map((noteItem, index) => {
        return (
            <Cart
              cid="0"
              note={noteItem}
              type={noteItem.type}
              company={noteItem.company}
              contact={noteItem.contact}
              cost={noteItem.cost}
            />
        );
      })}
      <Link to={{ 
          pathname: "/checkout", 
          state: {email_id,username}
          }}>
          <Button 
          variant="outline-dark"
          onClick={ () => {
            console.log(email_id,username);
            // axios.get('/book',{params: {cust_email: email_id, cust_name:username}})
            // .then(res=>{console.log("successfully routed",res)})
            // .catch(error=>console.log(error))
          }}
          >Checkout</Button>
        </Link>
      
      </TabPanel>
      <TabPanel value={value} index={4}>
          {/* {JSON.stringify(summary)} */}
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Company Name</StyledTableCell>
                  <StyledTableCell align="right">Category</StyledTableCell>
                  <StyledTableCell align="right">Contact</StyledTableCell>
                  <StyledTableCell align="right">Date</StyledTableCell>
                  <StyledTableCell align="right">Amount Paid</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {summary.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.company}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.type}</StyledTableCell>
                    <StyledTableCell align="right">{row.contact}</StyledTableCell>
                    <StyledTableCell align="right">{row.date}</StyledTableCell>
                    <StyledTableCell align="right">{row.cost}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      </TabPanel>
      </Col>
      <Col></Col>
      </Row>}
    </div>
  );
}

export default Customer;