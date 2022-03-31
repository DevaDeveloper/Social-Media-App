import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { pathComponentArray } from './RouteComponentMap';
import { ProtectedRoute } from './ProtectedRoute';
// import { LOGIN_PATH } from './path-constants';
// import Login from '../pages/LoginPage/Login';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      {pathComponentArray.map((pc) => (
        <ProtectedRoute
          key={pc.path}
          path={pc.path}
          exact
          component={pc.component}
        />
      ))}
      {/* <Route exact path={LOGIN_PATH}>
        <Login />
      </Route> */}
    </Switch>
  </BrowserRouter>
);

export default Routes;
