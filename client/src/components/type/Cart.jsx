import React from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

function Cart(props){
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
function handle(){
  axios.post('/customer'+'/remove_item',props.note)
      .then(res=>{console.log("sent successfully")})
      .catch(error=>console.log(error))
  
      setOpen(true);
}
const handleClose = (event, reason) => {
  if (reason === "clickaway") {
    return;
  }

  setOpen(false);
};
  return(
    <Card className="text-center" style={{width:"500px",margin:"20px 0px 10px 0px"}}>
      <Card.Body>
        <Card.Title>{props.company}</Card.Title>
        <Card.Text>
            <p>{props.type}</p>
            {props.cid != "10"?<p>Contact No: {props.contact}</p>:null}
            <p>Amount to be paid: {props.cost}</p>
            {props.cid == "10"?<p>email:{props.email}</p>:null}
        </Card.Text>
        {props.cid != "10" && <div className={classes.root}>
            <Button onClick ={handle} style={{float:"right"}} variant="dark">Delete</Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="warning">
              Deleted from the cart!
            </Alert>
          </Snackbar>
        </div>}
      </Card.Body>
    </Card>
);

}

export default Cart;
