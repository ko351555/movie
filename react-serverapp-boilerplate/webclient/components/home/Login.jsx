var React = require('react');
var {browserHistory} = require('react-router');
import $ from 'jquery';
import {Input, Button, Grid} from 'semantic-ui-react';
import Navigation from './navigation.jsx'

class Login extends React.Component {
  constructor() {
    super();
    this.state={username:'',password:'',};
  }

  handleUserName(e)
  {
    this.setState({username:e.target.value});
  }
  handlePassword(e)
  {
    this.setState({password:e.target.value});
  }
  UserLogin(){
    $.ajax({
      url:"http://localhost:8080/login",
      type: 'POST',
      datatype: 'JSON',
      data:{
        'username':this.state.username,
        'password':this.state.password
      },
      success: function(data){

       console.log("Data1: "+data.responseText);
       browserHistory.push('/nav');


     }.bind(this),
     error: function(err){
       alert("Invalid username or password");
       console.log("Error:"+err.responseText);
     }.bind(this)
   });
  }

  render(){
   return(
     <Grid centered style={{marginTop: 300}} padded>
     <Grid.Row>
     <Grid.Column>
     <h2 className="text-center" style={{color:'green'}}>Login Page</h2>
     </Grid.Column>
     </Grid.Row>
     <Grid.Row>
     <Grid.Column>
     <div className="form-group">
     <Input className="form-control" onChange={this.handleUserName.bind(this)}
     placeholder="Enter User Name"  type="text" />
     </div>
     </Grid.Column>
     </Grid.Row>
     <Grid.Row>
     <Grid.Column>
     <div className="form-group">
     <Input className="form-control" onChange={this.handlePassword.bind(this)}
     placeholder="Enter Password"  type="password" />
     </div>
     <br/>
     <Button onClick={this.UserLogin.bind(this)} size='large' color='purple'> Login </Button>
     </Grid.Column>
     </Grid.Row>
     </Grid>);
   <Navigation />
 }
}

module.exports=Login;
