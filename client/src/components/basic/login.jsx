import React from 'react';
import Button from "react-bootstrap/Button";
import { GoogleLogin } from 'react-google-login';
// refresh token
import { refreshTokenSetup } from './refreshtoken';







function Login(props) {
  var clientid = "";
  var type = "";
  if(props.id == "1"){
    type="customer";
    clientid ="555870655579-bqapve62o7voor5885lurgu6786kd1du.apps.googleusercontent.com";
  }else if(props.id == "2"){
    type="banquet";
    clientid="555870655579-m69mm0cnsqla4lk06455js8pamkuednp.apps.googleusercontent.com";
  }else if(props.id == "3"){
    type="caterer";
    clientid="555870655579-7d8cb26oa098ueoag8ep7ae3l1sjoske.apps.googleusercontent.com";
  }else if(props.id == "4"){
    type="photographer";
    clientid="555870655579-oda4ck5fgm1rkf7le38j8jau7ce8c77g.apps.googleusercontent.com";
  }
  // console.log(props.variab);
  const redirect=  "http://localhost:3000/" + type;
  // const clientid = props.type;
  // console.log(clientid);
  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    // alert(
    //   `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
    // );
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    // alert(
    //   `Failed to login. 😢`
    // );
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientid}
        render={renderProps => (
           <Button onClick={renderProps.onClick} disabled={renderProps.disabled} variant="outline-dark">Login for Free</Button>
        )}
        // clientId={clientid}
        // render={renderProps => (
        //   <Button onClick={renderProps.Onclick} disabled={renderProps.disabled} variant="outline-dark">Login for Free</Button> 
        // )}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        uxMode='redirect'
        redirectUri={redirect}
        // cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={false}
      />
    </div>
  );
}

export default Login;