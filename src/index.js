import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Route, 
    Switch
} from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Profile from './Profile';
import EditProfile from './EditProfile';
import SearchResults from './SearchResults';
import UserProfile from './UserProfile';
import Messenger from './Messenger';
// import PV from './profile.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    <BrowserRouter>
        <Switch>
            <Route exact path='/' name='Login' component={Login} />
            <Route exact path='/login' name='Login' component={Login} />
            <Route exact path='/signup' name='signup' component={Signup} />
            <Route path='/profile' name='mainpage' component={Profile} />
            <Route path='/edit_profile' name='mainpage' component={EditProfile} />
            <Route path='/search_results' name='mainpage' component={SearchResults} />
            <Route path='/user_profile' name='mainpage' component={UserProfile} />
            <Route path='/messenger' name='mainpage' component={Messenger} />
        </Switch>
    </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
