import React from 'react'
import { Input,Button,Grid} from 'semantic-ui-react'


export default class SearchMovie extends React.Component {

	constructor(){
		super();
		this.state={
			title:''
		}
	}


	setMovieTitle(e){

		this.setState({title:e.target.value});

	}
	submitTitle(e){

		this.props.submitTitle(this.state.title)

	}

	render(){

		return (

			<Grid>
			<Grid.Row>
			<Grid.Column width={16}>
			<Input placeholder='Search Movie...' onChange={this.setMovieTitle.bind(this)}/>
			<Button circular color='blue' onClick={this.submitTitle.bind(this)}>Search Movie</Button>
			</Grid.Column> 
			</Grid.Row>
			</Grid>



			)
	}


}
