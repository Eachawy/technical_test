import React from 'react';
import { Route } from 'react-router-dom';


import LoginPage from 'app/modules/login-page/loginPage';
import UsersListPage from './modules/user-list/usersListPage';
import PrivateRoute from 'app/shared/auth/private-route';
import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
// import PageNotFound from 'app/shared/error/page-not-found';
import { AUTHORITIES } from 'app/config/constants';

const AppRoutes = () => {
    return (
        <div className="view-routes">
            <ErrorBoundaryRoutes>
                <Route index element={<LoginPage />} />
                <Route
                    path="*"
                    element={
                        <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]}>
                            <UsersListPage />
                        </PrivateRoute>

                    }
                />
                {/* <Route path="users-list" element={<UsersListPage />} /> */}
                {/* <Route path="login" element={<Home />} /> */}
                {/* <Route path="users-list">
                    <Route
                        path="*"
                        element={
                            // <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]}></PrivateRoute>
                            <UsersListPage />

                        }
                    />
                </Route> */}
                {/* <Route path="*" element={<PageNotFound />} /> */}
            </ErrorBoundaryRoutes>
        </div>
    );
};

export default AppRoutes;
