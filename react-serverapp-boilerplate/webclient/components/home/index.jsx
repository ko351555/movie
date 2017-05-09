import Home from './home.jsx';
import SavedMovies from './savedMovies'
import Navigation from './navigation'
import Login from './Login.jsx'
//Export the component, so that by including the Folder, by default the component is exported
//ES5 export
//module.exports = Sample;

//ES6 export
//export default Home;

//If your functional module have multiple components and more than one of them have 
// to be exported, follow the object notation to export them
module.exports =  {
	Navigation: Navigation,
	Home: Home,
	SavedMovies:SavedMovies ,
	Login:Login
}