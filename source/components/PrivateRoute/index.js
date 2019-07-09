import React from 'react';
import { Redirect } from 'react-router-dom';
import { withProfile } from './../../HOC/with-profile';

const PrivateRoute = ({isLoggedIn, history}) => {
    if (!isLoggedIn) {
        history.push('/private');
    }

    return isLoggedIn ? <h1>Приватная страница</h1> : <Redirect to = '/login'/>;
}

export default withProfile(PrivateRoute);

