import React from 'react';
import { withProfile } from './../../HOC/with-profile';

const Login = ({isLoggedIn, toggleLogin, history}) => {
    const handleClick = () => {
        toggleLogin();
        history.goBack();
    };
    
    return (
        <div>
            <h1>Необходимо авторизоваться</h1>
            <button onClick = { handleClick }>
                {isLoggedIn ? 'Выйти' : 'Войти'}
            </button>
        </div>
    );
}

export default withProfile(Login);

