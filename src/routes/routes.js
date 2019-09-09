import React from 'react';

import LoginPage from '../app/scenes/Accounts/Login';
//import ClaimList from 'AppScenes/Claim/ClaimList';
// import ErrorPage from 'AppScenes/ErrorPage';

import PATHS from './routes-path';

import { Route, Switch } from 'react-router';


const AppRoutes = (
    <div>
        <Switch>
            <Route exact path={PATHS.loginPage} component={LoginPage} />
            {/* <Route exact path={PATHS.claimListPage} component={ClaimList} /> */}
            {/* <Route exact path="*" component={ErrorPage} /> */}
        </Switch>
    </div>
);

export default AppRoutes;
