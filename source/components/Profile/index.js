import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// Instruments
import Styles from './styles.m.css';

// Components
import { withProfile } from './../../HOC/with-profile';

@withProfile
export default class Profile extends Component {
    render() {
        const { profile } = Styles;
        const { currentUserFirstName, currentUserLastName, avatar, isLoggedIn } = this.props;

        if (!isLoggedIn) {
            return <Redirect to = '/login' />;
        }

        return (
            <section className = { profile }>
                <h1>Welcome, { currentUserFirstName } { currentUserLastName }</h1>
                <img
                    alt = ' Avatar '
                    src = { avatar }
                />
            </section>
        );
    }
}
