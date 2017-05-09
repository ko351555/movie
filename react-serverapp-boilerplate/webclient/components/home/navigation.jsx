import React from 'react'
import {Menu, Input,Button} from 'semantic-ui-react'
import {Link} from 'react-router';
var {browserHistory} = require('react-router');


export default class Navigation extends React.Component {

  constructor(){
   super();
   this.state = { activeItem: 'Search' }
 }


 handleItemClick = (e, { name }) => this.setState({ activeItem: name })


 logoutCall() {
  $.ajax({
    url: 'http://localhost:8080/logout',
    type: 'GET',
    // datatype: 'JSON',
    // data:{username :this.state.username,password:this.state.password},
    success: function(res)
    {

      console.log(res.redirect)
      browserHistory.push('/');
    }.bind(this),
    error: function(err)
    {
      alert("error occurred while logging out");
      console.log(err.responseText);
    }.bind(this)
  });
}


render(){
 const { activeItem } = this.state

 return (

  <div>
  <Menu pointing>

  <Menu.Item name='Search' active={activeItem === 'Search'} onClick={this.handleItemClick} as={Link} to="search"/>
  <Menu.Item name='Movie' active={activeItem === 'Movie'} onClick={this.handleItemClick} as={Link} to="movies" />
  <Menu.Menu position='right'>
  <Button color='pink' onClick={this.logoutCall.bind(this)} > logout </Button></Menu.Menu>
  </Menu>
  {this.props.children}
  </div>





  )
}


}
