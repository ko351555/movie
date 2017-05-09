import React from 'react'
import {Container} from 'semantic-ui-react'
import SearchMovie from './searchmovie.jsx'
import DisplayMovie from './displaymovie.jsx'

export default class Home extends React.Component {

constructor(){
	super();
	this.state={
		movies:[],
		error:'',
		flag:false

	}
}



getMovies(movieTitle){

$.ajax(

		{
			url: 'http://www.omdbapi.com/?s='+movieTitle,
			type:'GET',
			dataType:'json',
			success: function(data)
			{
					this.setState({movies:data.Search})
					console.log(data);
			}.bind(this),
			error:function(err){

					this.setState({error:err})
			}.bind(this)

		}
	);

}



render(){

	return (


	<Container>
   	
   	<SearchMovie submitTitle={this.getMovies.bind(this)} />
   	<DisplayMovie movieList = {this.state.movies} dbMovies={this.state.flag}/>
   	

  </Container>
		

		)
}


}
