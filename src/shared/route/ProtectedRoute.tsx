import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute(props: any) {

    const loggedIn: boolean = useSelector((state: any) => state.loggedInReducer);
    return (
        <Route {...props.exact} render={({ location }) =>
            loggedIn ? props.children :
                <Redirect to={
                    {
                        pathname: '/login',
                        state: { from: location }
                    }
                } />
        } />
    )
}