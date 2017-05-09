import React from 'react'
import {Container,Card} from 'semantic-ui-react'
import MovieCard from './card.jsx'


export default class DisplayMovie extends React.Component {

	constructor(){
		super();
	}

	render(){
		const MovieList = this.props.movieList.map((movie,index)=>{
			return <MovieCard data3={this.props.data2} dbMovies={this.props.dbMovies} key={index} movies={movie}/>;

		})
		return (

			<Container>
			<Card.Group >
			{MovieList}
			</Card.Group>

			</Container>


			)
	}


}
