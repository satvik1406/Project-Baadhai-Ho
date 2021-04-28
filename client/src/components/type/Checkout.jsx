import React,{useState,useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import axios from 'axios';
import Cart from './Cart';
import {Link} from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      "& > * + *": {
        marginLeft: theme.spacing(2)
      }
    }
  }));
function Checkout(props){
    const classes = useStyles();
    console.log(props.location);
    console.log(props.location.state);
    // const location = useLocation();
    // const params = new URLSearchParams(location.search);
    const email_id = props.location.state.email_id;
    const username = props.location.state.username;
    const [total,setTotal]=useState(0)
    const [cart,setCart]=useState([])
    const [loading, isLoading] = useState(true);
    
    useEffect(() => {
    if (cart) {
        axios.get('/'+'customer'+'/cart_items',{params: {cust_email: email_id, cust_name:username}})
            .then(res=>{setCart(res.data);calTotal(res.data);isLoading(false)})
            .catch(error=>console.log(error))
        }
    },[]);
    function calTotal(cart){
        var t = 0;
        cart.map((item,index) =>{
            t = t + item.cost;
        })
        setTotal(t);
    }
    return (
    <Container>
        {loading && <CircularProgress color="dark" style={{margin:"200px 0px 300px 500px"}}/>}       
        {!loading && <>
        <h3 styles={{margin:"30px 0px 20px -10px"}}>Order Details:</h3>
            {cart.map((noteItem, index) => {
                    return (
                    <Cart
                        key={index}
                        id={index}
                        cid="10"
                        email={noteItem.email}
                        type={noteItem.type}
                        company={noteItem.company}
                        cost={noteItem.cost}
                    />
                );
            })}
        
        
        <Row>
            <Col>
                <h4 style={{margin:"20px 0px 0px 370px"}}>Total: {total}</h4>
            </Col>
        </Row>
      <Link to={{ 
          pathname: "/payment", 
          state: {email_id,username,total,cart}
          }}>
          <Button 
          variant="dark"
          style={{margin:"20px 0px 0px 400px"}}
          onClick={ () => {
            console.log(email_id,username,total,cart);
          }}
          >Proceed</Button>
        </Link>
        </>}
    </Container>
    );
}

export default Checkout;