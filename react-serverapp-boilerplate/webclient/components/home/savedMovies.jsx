import React from 'react'
import {Container} from 'semantic-ui-react'
import SearchMovie from './searchmovie.jsx'
import DisplayMovie from './displaymovie.jsx'

export default class SavedMovies extends React.Component {

	constructor(){
		super();
		this.state={
			movies:[],
			error:'',
			flag:true

		}
	}


	

	getMovies(){

		$.ajax(

		{	
			url: '/stream/display',
			type:'GET',
			dataType:'json',
			success: function(data)
			{
				this.setState({movies:data})
				console.log(data);
				console.log("displayhello");

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


			<DisplayMovie movieList = {this.state.movies} dbMovies={this.state.flag} data2={this.getMovies.bind(this)}/>


			</Container>


			)
	}


}
