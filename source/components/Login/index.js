import React from 'react';
import { Redirect } from 'react-router-dom';
import { withProfile } from './../../HOC/with-profile';

const Login = ({isLoggedIn, toggleLogin}) => {
    if (isLoggedIn) {
        return <Redirect to = '/profile' />;
    }

    return (
        <div>
            <h1>Необходимо авторизоваться</h1>
            <button onClick = { toggleLogin }>
                Войти
            </button>
        </div>
    );
}

export default withProfile(Login);

