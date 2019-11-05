import React from 'react';
import { Route, Redirect } from 'react-router-dom'

import HomePage from './pages/home';
import MonitorPage from './pages/monitor'
import BackupsPage from './pages/backups'

const Routes = ({currentPath}) =>
<section>
    { currentPath ===  "/" && <Redirect to={"/home"}/> }
    <Route exact path="/home" component={HomePage}/>
    <Route exact path="/monitor" component={MonitorPage}/>
    <Route exact path="/backups" component={BackupsPage}/>
</section>

export default Routes;