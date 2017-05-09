import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory,browserHistory, IndexRoute} from 'react-router';


import {Home,SavedMovies,Navigation,Login} from './components/home';


ReactDOM.render(

	<Router history={browserHistory}>
	<Route path="/" component={Login}>
	</Route>

	<Route path="/nav" component={Navigation} >


	<Route path="/search" component={Home} />
	<Route path="/movies" component={SavedMovies} />
	</Route>
	</Router>,
	document.getElementById('mountapp')
	);
