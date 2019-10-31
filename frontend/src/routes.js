import React from 'react';
import { Route, Redirect } from 'react-router-dom'

import HomePage from './pages/home';

const Routes = ({currentPath}) =>
<section>
    { currentPath ===  "/" && <Redirect to={"/home"}/> }
    <Route exact path="/home" component={HomePage}/>
</section>

export default Routes;