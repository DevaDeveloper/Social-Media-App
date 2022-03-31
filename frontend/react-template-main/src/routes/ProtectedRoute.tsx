/* eslint-disable arrow-body-style */
/* eslint-disable operator-linebreak */
import React, { FC } from 'react';
import { Route } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

interface ProtectedRouteProps {
  path: string;
  exact: boolean;
  component: FC;
}

// const authenticationService = {
//   roles: ['USER', 'ADMIN'],
// };
// TODO Implement case-specific logic
export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  path,
  exact,
  component: Component,
}) => {
  // const history = useHistory();
  // const { token } = useAppSelector((state) => state.login);
  const currentUserData = useAppSelector((state) => state.login.currentUser);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { userType } = currentUserData;

  return (
    <Route
      key={path}
      path={path}
      exact={exact}
      render={() => {
        // if (isLoggedIn) {
        //   return <Component />;
        // }
        // if (currentUser && !isLoggedIn && !token) {
        //   // not logged in so redirect to login page with the return url
        //   return (
        //     <Redirect
        //       to={{ pathname: '/login', state: { from: props.location } }}
        //       exact
        //     />
        //   );
        // }
        // console.log('ROUTE TESTING');
        // if (isLoggedIn && userType === 'ADMIN') {
        //   history.push('/admin');

        // return (
        //   <Redirect
        //     push
        //     to={{
        //       pathname: '/user-posts',
        //       state: { from: props.location },
        //     }}
        //     exact
        //   />
        // );
        //   return <Component />;
        // }

        // authorised so return component
        return <Component />;
      }}
    />
  );
};

export default ProtectedRoute;
