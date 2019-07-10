// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch, Redirect } from 'react-router-dom';

//Components
import Catcher from './../../components/Catcher';
import Feed from './../../components/Feed';
import Profile from './../../components/Profile';
import StatusBar from './../../components/StatusBar';
import PublicRoute from './../../components/PublicRoute';
import PrivateRoute from './../../components/PrivateRoute';
import Login from './../../components/Login';
import { Provider } from './../../HOC/with-profile';

//Instruments
import avatar from 'theme/assets/lisa';

const defaultOptions = {
    currentUserFirstName: '',
    currentUserLastName:  '',
    avatar:               null,
};

const userOptions = {
    currentUserFirstName: 'Михаил',
    currentUserLastName:  'Шардин',
    avatar:               avatar,
};

@hot(module)
export default class App extends Component {
    state = {
        isLoggedIn: JSON.parse(window.localStorage.getItem('isLoggedIn') || 'false'),
        options:    JSON.parse(window.localStorage.getItem('options') || JSON.stringify(defaultOptions)),
    }

    updateLocalStorage = () => {
        const { isLoggedIn, options } = this.state;
        window.localStorage.setItem('isLoggedIn', isLoggedIn);
        window.localStorage.setItem('options', JSON.stringify(options));
    }

    toggleLogin = () => {
        this.setState(({ isLoggedIn }) => {
            if (!isLoggedIn) {
                return {
                    isLoggedIn: true,
                    options:    userOptions,
                };
            }

            return {
                isLoggedIn: false,
                options:    defaultOptions,
            };
        }, this.updateLocalStorage);
    }

    render() {
        const { isLoggedIn, options } = this.state;

        return (
            <Catcher>
                <Provider value = {{...options, isLoggedIn, toggleLogin: this.toggleLogin }}>
                    <StatusBar />
                    <Switch>
                        <Route
                            component = { Feed }
                            path = '/feed'
                        />
                        <Route
                            component = { Profile }
                            path = '/profile'
                        />
                        <Route
                            component = { PublicRoute }
                            path = '/public'
                        />
                        <Route
                            component = { PrivateRoute }
                            path = '/private'
                        />
                        <Route
                            component = { Login }
                            path = '/login'
                        />
                        <Redirect to = { `/${isLoggedIn ? 'profile' : 'login'}` } />
                    </Switch>
                </Provider>
            </Catcher>
        );
    }
}
