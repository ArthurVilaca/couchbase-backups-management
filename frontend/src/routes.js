import React from 'react';
import { Route, Redirect } from 'react-router-dom'

import HomePage from './pages/home';
import MonitorPage from './pages/monitor'

const Routes = ({currentPath}) =>
<section>
    { currentPath ===  "/" && <Redirect to={"/home"}/> }
    <Route exact path="/home" component={HomePage}/>
    <Route exact path="/monitor" component={MonitorPage}/>
</section>

export default Routes;