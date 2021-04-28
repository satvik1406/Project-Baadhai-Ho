import React,{ useState,useEffect} from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import axios from "axios";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts";
  import { PieChart, Pie } from 'recharts';
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
    root: {
      flexGrow: 1,
    //   backgroundColor: theme.palette.background.paper,
      display: 'flex',
      height: 224,
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  }));
  
function Admin(){
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [total,setTotal] = useState([]);
    const [banquet,setBanquet] = useState([]);
    const [caterer,setCaterer] = useState([]);
    const [photographer,setPhotographer] = useState([]);
    const [plot,setPlot] = useState([]);
    const [amount,setAmount] = useState([]);
    const [share,setShare] = useState([]);
    const [average,setAverage] = useState([]);
    useEffect(() => {
          console.log("In usestate");
          if (plot) {
            axios.get('/'+'admin'+'/orders')
              .then(async res=>{ await createData(res.data);setPlot(res.data);console.log(res.data);})
              .catch(error=>console.log(error))
          }
        },[]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    function createData(data){
      console.log("Inside Data",data);
      var count = data[0];
      var revenue = data[1];
      var orders = data[2];
      var banquet = [];
      var caterer = [];
      var photographer = [];
      var total = [];
      var ar_banq = Object.keys(count[0])
      var ar_cat = Object.keys(count[1])
      var ar_pho = Object.keys(count[2])
      var ar = Object.keys(count[3]);
      ar_banq.sort();
      ar_cat.sort();
      ar_pho.sort();
      ar.sort();
      console.log(ar);
      for(var i=0;i<ar.length;i++){
         total.push({date:ar[i],num:count[3][ar[i]],rev:revenue[3][ar[i]]});
      }
      for(var i=0;i<ar_banq.length;i++){
        banquet.push({date:ar_banq[i],num:count[0][ar_banq[i]],rev:revenue[0][ar_banq[i]]});
      }
      for(var i=0;i<ar_cat.length;i++){
        caterer.push({date:ar_cat[i],num:count[1][ar_cat[i]],rev:revenue[1][ar_cat[i]]});
      }

      for(var i=0;i<ar_pho.length;i++){
        photographer.push({date:ar_pho[i],num:count[2][ar_pho[i]],rev:revenue[2][ar_pho[i]]});
      }

      const names= ["Banquet","Caterer","Photographer"];
      var sum_banq = 0;
      var share_banq = 0;
      var avg_banq = 0;
      for(var i=0;i<banquet.length;i++){
        sum_banq = sum_banq + banquet[i]["rev"];
        share_banq = share_banq + banquet[i]["num"];
      }
      avg_banq = sum_banq/share_banq;
      var sum_cat = 0;
      var share_cat = 0;
      var avg_cat = 0;
      for(var i=0;i<caterer.length;i++){
        sum_cat = sum_cat + caterer[i]["rev"];
        share_cat = share_cat + caterer[i]["num"];
      }
      avg_cat = sum_cat/share_cat;
      var sum_pho = 0;
      var share_pho = 0;
      var avg_pho = 0;
      for(var i=0;i<photographer.length;i++){
        sum_pho = sum_pho + photographer[i]["rev"];
        share_pho = share_pho + photographer[i]["num"];
      }
      avg_pho = sum_pho/share_pho;
      var sum_total = [sum_banq,sum_cat,sum_pho];
      var share_total = [share_banq,share_cat,share_pho];
      var avg_total = [avg_banq,avg_cat,avg_pho];
      var average = [];
      var share = [];
      var amount = [];
      for(var i=0;i<names.length;i++){
        amount.push({name:names[i],value:sum_total[i]});
        share.push({name:names[i],value:share_total[i]});
        average.push({name:names[i],value:avg_total[i]});
      }
      setTotal(total);
      setBanquet(banquet);
      setCaterer(caterer);
      setPhotographer(photographer);
      setAmount(amount);
      setShare(share);
      setAverage(average);
    }
    return(
        <Row>
            <Col>
            <div className={classes.root}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >
                    <Tab label="SUMMARY" {...a11yProps(0)} />
                    <Tab label="BANQUET" {...a11yProps(1)} />
                    <Tab label="CATERER" {...a11yProps(2)} />
                    <Tab label="PHOTOGRAPHER" {...a11yProps(3)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                <h4>Revenue vs Time:</h4>
                    <LineChart
                        width={500}
                        height={300}
                        data={total}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="rev"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                    />
                    
                    </LineChart>
                    <h4>Number of Orders vs Time:</h4>
                    <LineChart
                        width={500}
                        height={300}
                        data={total}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="num"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                    />                  
                    </LineChart>
                    <h4>Pie Charts on Total Revenue, Total Orders, Average Revenue:</h4>
                    <PieChart width={800} height={1000}>
                        <Pie
                          dataKey="value"
                          isAnimationActive={false}
                          data={amount}
                          cx={100}
                          cy={200}
                          outerRadius={80}
                          fill="#8884d8"
                          label
                        />
                        <Pie
                          dataKey="value"
                          isAnimationActive={false}
                          data={share}
                          cx={400}
                          cy={200}
                          outerRadius={80}
                          fill="#8884d8"
                          label
                        />
                        <Pie
                          dataKey="value"
                          isAnimationActive={false}
                          data={average}
                          cx={250}
                          cy={400}
                          outerRadius={80}
                          fill="#8884d8"
                          label
                        />
                        <Tooltip />
                      </PieChart>
                </TabPanel>
                <TabPanel value={value} index={1}>
                <h4>Revenue vs Time:</h4>
                <LineChart
                      width={500}
                      height={300}
                      data={banquet}
                      margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5
                      }}
                  >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                      type="monotone"
                      dataKey="rev"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                  />
                  
                  </LineChart>
                  <h4>Number of Orders vs Time:</h4>
                  <LineChart
                      width={500}
                      height={300}
                      data={banquet}
                      margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5
                      }}
                  >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                      type="monotone"
                      dataKey="num"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                  />                  
                  </LineChart>
                </TabPanel>
                <TabPanel value={value} index={2}>
                <h4>Revenue vs Time:</h4>
                <LineChart
                      width={500}
                      height={300}
                      data={caterer}
                      margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5
                      }}
                  >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                      type="monotone"
                      dataKey="rev"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                  />
                  
                  </LineChart>
                  <h4>Number of Orders vs Time:</h4>
                  <LineChart
                      width={500}
                      height={300}
                      data={caterer}
                      margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5
                      }}
                  >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                      type="monotone"
                      dataKey="num"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                  />                  
                  </LineChart>
                </TabPanel>
                <TabPanel value={value} index={3}>
                <h4>Revenue vs Time:</h4>
                <LineChart
                      width={500}
                      height={300}
                      data={photographer}
                      margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5
                      }}
                  >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                      type="monotone"
                      dataKey="rev"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                  />
                  </LineChart>
                  <h4>Number of Orders vs Time:</h4>
                  <LineChart
                      width={500}
                      height={300}
                      data={photographer}
                      margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5
                      }}
                  >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                      type="monotone"
                      dataKey="num"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                  />                  
                  </LineChart>
                </TabPanel>
            </div>
            </Col>
        </Row>
    );
}

export default Admin;