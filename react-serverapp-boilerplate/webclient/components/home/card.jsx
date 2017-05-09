import React from 'react'
import {Card,Image,Button,Label,TextArea} from 'semantic-ui-react'
import SavedMovies from './savedMovies.jsx'


export default class MovieCard extends React.Component {

	constructor(){
		super();
		this.state={message:'',comments:''}
	}

	addMovie(){
		$.ajax(

		{

			url: '/stream/add',
			type:'POST',
			dataType:'json',
			data:this.props.movies,

			success: function(data)
			{
				this.setState({message:data.success})
				console.log("hello");


			}.bind(this),

			error:function(err){

				this.setState({message:err})
				
			}.bind(this)

		}
		);
	}

	deleteMovie(){
		$.ajax(

		{
			url: '/stream/delete',
			type:'DELETE',
			dataType:'json',
			data:{id:this.props.movies._id},

			success: function(data)
			{
				this.setState({message:data.success})

			}.bind(this),

			error:function(err){

				this.setState({message:err})
				
			}.bind(this)
			
		}
		
		);
		this.props.data3()

	}
	updateMovie()
	{

		$.ajax(

		{
			url: '/stream/update',
			type:'PUT',
			dataType:'json',
			data:{id:this.props.movies._id,comments:this.state.comments},

			success: function(data)
			{
				this.setState({message:data.success})

			}.bind(this),

			error:function(err){

				this.setState({message:err})
				
			}.bind(this)

		}
		);

	}

	handleComment(e){
		this.setState({comments:e.target.value})
	}

	render(){
		var img;



		return (

			<Card>
			<Card.Content>
			
			<Image floated='right' size='large' src={this.props.movies.Poster}/>
			<Card.Header>
			{this.props.movies.Title}
			</Card.Header>
			<Card.Meta>
			{this.props.movies.Year}
			</Card.Meta>
			<Card.Description>
			{this.props.dbMovies?this.props.movies.comments:this.props.movies.imdbID}
			</Card.Description>
			</Card.Content>
			<Card.Content extra>

			{this.props.dbMovies?

				<div>

				<TextArea placeholder='Comments...' autoHeight onChange={this.handleComment.bind(this)}/>
				<div className='ui two buttons'>

				<Button  color='green' onClick={this.updateMovie.bind(this)}>Update</Button> 	

				<Button  color='yellow' onClick={this.deleteMovie.bind(this)}>Delete</Button> 	
				<Label>{this.state.message}</Label>	

				</div>
				</div>


				:<div className='ui two buttons'>
				<Button  color='green' onClick={this.addMovie.bind(this)}>Add to DB</Button> 	
				<Label>{this.state.message}</Label>	
				</div>

			}
			</Card.Content>
			</Card>
			


			)
}


}
