import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { pathComponentArray } from './RouteComponentMap';
import { ProtectedRoute } from './ProtectedRoute';

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
    </Switch>
  </BrowserRouter>
);

export default Routes;
